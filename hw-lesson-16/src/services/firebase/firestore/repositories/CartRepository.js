import StorageService from '@/services/storageService';
import CartModel from '../models/CartModel';

const CART_PREFIX = 'cart_';

export default class CartRepository {
  constructor(firestoreService) {
    this.firestoreService = firestoreService;
    this.collectionName = 'carts';
    this.userId = null;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  getLocalStorageKey(userId) {
    const id = userId || this.userId;
    return id ? `${CART_PREFIX}${id}` : 'cart_guest';
  }

  async loadCart(userId) {
    const id = userId || this.userId;
    
    if (!id) {
      const items = StorageService.get(this.getLocalStorageKey(), []);
      return {
        items,
        userId: 'guest',
        itemCount: items.reduce((count, item) => count + (parseInt(item.quantity) || 0), 0),
        totalPrice: items.reduce((total, item) => total + ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)), 0)
      };
    }
    
    try {
      const result = await this.firestoreService.getById(this.collectionName, id);
      
      if (result) {
        const cartModel = CartModel.fromFirestore(result);
        StorageService.set(this.getLocalStorageKey(id), cartModel.items);
        return cartModel;
      } 
      
      const localItems = StorageService.get(this.getLocalStorageKey(id), []);
      if (localItems.length > 0) {
        const cartData = new CartModel({ userId: id, items: localItems });
        return await this.saveCart(id, cartData);
      }
      
      return new CartModel({ userId: id });
    } catch (error) {
      console.error('Error loading cart:', error);
      
      const localItems = StorageService.get(this.getLocalStorageKey(id), []);
      return new CartModel({ userId: id, items: localItems });
    }
  }

  async saveCart(userId, cart) {
    const id = userId || this.userId;
    
    const cartModel = cart instanceof CartModel 
      ? cart 
      : new CartModel({ userId: id, items: cart });
    
    if (!id) {
      StorageService.set(this.getLocalStorageKey(), cartModel.items);
      return cartModel;
    }
    
    try {
      const cartData = cartModel.toFirestore();
      const result = await this.firestoreService.set(this.collectionName, id, cartData);
      
      const savedCart = CartModel.fromFirestore(result);
      StorageService.set(this.getLocalStorageKey(id), savedCart.items);
      
      return savedCart;
    } catch (error) {
      console.error('Error saving cart:', error);
      
      StorageService.set(this.getLocalStorageKey(id), cartModel.items);
      throw error;
    }
  }

  async addToCart(userId, product, quantity = 1) {
    const id = typeof userId === 'string' ? userId : this.userId;
    
    if (typeof userId === 'object' && !product) {
      product = userId;
      quantity = product?.quantity || 1;
    }
    
    try {
      const cart = await this.loadCart(id);
      
      if (!product || !product.id) {
        console.error('Invalid product data:', product);
        throw new Error('Cannot add invalid product to cart');
      }
      
      if (cart instanceof CartModel) {
        cart.addItem(product, quantity);
      } else {
        const productId = product.id;
        const existingItem = cart.items.find(item => item.productId === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({
            productId: productId,
            title: product.title || 'Unknown Product',
            price: parseFloat(product.price) || 0,
            quantity: quantity,
            imageUrl: product.imageUrl || ''
          });
        }
      }
      
      return await this.saveCart(id, cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  async removeFromCart(userId, productId) {
    if (typeof userId === 'string' && !productId) {
      productId = userId;
      userId = this.userId;
    }
    
    try {
      const cart = await this.loadCart(userId);
      
      if (cart instanceof CartModel) {
        cart.removeItem(productId);
      } else {
        cart.items = cart.items.filter(item => item.productId !== productId);
      }
      
      return await this.saveCart(userId, cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  async updateQuantity(userId, productId, quantity) {
    if (typeof userId === 'string' && typeof productId === 'number' && quantity === undefined) {
      quantity = productId;
      productId = userId;
      userId = this.userId;
    }
    
    try {
      if (quantity <= 0) {
        return await this.removeFromCart(userId, productId);
      }
      
      const cart = await this.loadCart(userId);
      
      if (cart instanceof CartModel) {
        cart.updateQuantity(productId, quantity);
      } else {
        const item = cart.items.find(item => item.productId === productId);
        if (item) {
          item.quantity = parseInt(quantity);
        }
      }
      
      return await this.saveCart(userId, cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  }

  async clearCart(userId) {
    const id = userId || this.userId;
    
    try {
      StorageService.set(this.getLocalStorageKey(id), []);
      
      if (!id) {
        return new CartModel();
      }
      
      const emptyCart = new CartModel({ userId: id });
      return await this.saveCart(id, emptyCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  async removeProductFromAllCarts(productId) {
    try {
      const carts = await this.firestoreService.getAll(this.collectionName);
      
      const cartsWithProduct = carts.filter(cart => 
        cart.items && cart.items.some(item => item.productId === productId)
      );
      
      if (cartsWithProduct.length === 0) {
        return 0;
      }
      
      const updatePromises = cartsWithProduct.map(cart => {
        const cartModel = CartModel.fromFirestore(cart);
        
        cartModel.removeItem(productId);
        
        return this.firestoreService.set(
          this.collectionName, 
          cart.id, 
          cartModel.toFirestore()
        );
      });
      
      await Promise.all(updatePromises);
      
      if (this.userId) {
        const userCart = cartsWithProduct.find(cart => cart.id === this.userId);
        if (userCart) {
          const updatedItems = userCart.items.filter(item => item.productId !== productId);
          StorageService.set(this.getLocalStorageKey(this.userId), updatedItems);
        }
      }
      
      console.log(`Removed product ${productId} from ${cartsWithProduct.length} carts`);
      return cartsWithProduct.length;
    } catch (error) {
      console.error('Error removing product from all carts:', error);
      throw error;
    }
  }
}