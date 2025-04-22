import { executeApiAction } from '@/services/api/apiActions';
import { cartRepository } from '@/services/firebase/firestore';
import StorageService from '@/services/storageService';
import { showToast } from '@/services/utils/toast';

const CART_LOCAL_KEY = 'cart';

function updateCartCalculations(state) {
  state.itemCount = state.items.reduce((count, item) => count + (parseInt(item.quantity) || 0), 0);
  state.uniqueItemCount = state.items.length;
  state.totalPrice = state.items.reduce((total, item) => 
    total + ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)), 0);
  state.lastUpdated = new Date();
  StorageService.set(CART_LOCAL_KEY, state.items);
}

export default {
  namespaced: true,
  
  state: () => ({
    items: StorageService.get(CART_LOCAL_KEY, []),
    loading: false,
    totalPrice: 0,
    itemCount: 0,
    uniqueItemCount: 0,
    lastUpdated: null,
    error: null
  }),
  
  getters: {
    cartItems: state => state.items,
    cartCount: state => state.uniqueItemCount,
    cartTotalItems: state => state.itemCount,
    cartTotal: state => state.totalPrice,
    isInCart: state => productId => state.items.some(item => item.productId === productId),
    loading: state => state.loading,
    lastUpdated: state => state.lastUpdated,
    error: state => state.error
  },
  
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    
    setError(state, error) {
      state.error = error;
    },
    
    setCartItems(state, items) {
      state.items = Array.isArray(items) ? items : [];
      updateCartCalculations(state);
    },
    
    setCartData(state, { items, totalPrice, itemCount, updatedAt }) {
      state.items = Array.isArray(items) ? items : [];
      state.totalPrice = totalPrice || 0;
      state.itemCount = itemCount || 0;
      state.uniqueItemCount = state.items.length;
      state.lastUpdated = updatedAt || new Date();
      StorageService.set(CART_LOCAL_KEY, state.items);
    },
    
    addToCart(state, item) {
      const existingItem = state.items.find(i => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      updateCartCalculations(state);
    },
    
    removeFromCart(state, productId) {
      state.items = state.items.filter(item => item.productId !== productId);
      updateCartCalculations(state);
    },
    
    updateQuantity(state, { productId, quantity }) {
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        updateCartCalculations(state);
      }
    },
    
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.itemCount = 0;
      state.uniqueItemCount = 0;
      StorageService.remove(CART_LOCAL_KEY);
    }
  },
  
  actions: {
    async initCart({ commit, dispatch }, userId) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          if (!userId) {
            commit('clearCart');
            cartRepository.setUserId(null);
            return;
          }
          
          cartRepository.setUserId(userId);
          const cartData = await cartRepository.loadCart();
          
          if (cartData?.items) {
            await dispatch('synchronizeCartWithProducts', cartData.items);
            
            commit('setCartData', {
              items: cartData.items,
              totalPrice: cartData.totalPrice || 0,
              itemCount: cartData.itemCount || 0,
              updatedAt: cartData.updatedAt || new Date()
            });
          }
          
          return cartData;
        }
      });
    },
    
    async loadCartFromFirestore({ commit, rootGetters, dispatch }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const user = rootGetters['auth/user'];
          if (!user) return null;
          
          cartRepository.setUserId(user.uid);
          const cartData = await cartRepository.loadCart();
          
          if (cartData?.items) {
            await dispatch('synchronizeCartWithProducts', cartData.items);
            
            commit('setCartData', {
              items: cartData.items,
              totalPrice: cartData.totalPrice || 0,
              itemCount: cartData.itemCount || 0,
              updatedAt: cartData.updatedAt || new Date()
            });
          }
          
          return cartData;
        }
      });
    },
    
    async synchronizeCartWithProducts({ commit, rootGetters }, cartItems) {
      if (!cartItems || cartItems.length === 0) return cartItems;
      
      try {
        const { productsDb } = await import('@/services/firebase/firestore');
        const existingProducts = new Set();
        
        const products = await productsDb.getAll();
        products.forEach(product => existingProducts.add(product.id));
        
        const removedItems = cartItems.filter(item => !existingProducts.has(item.productId));
        
        if (removedItems.length > 0) {
          const user = rootGetters['auth/user'];
          cartRepository.setUserId(user?.uid || null);
          
          for (const item of removedItems) {
            await cartRepository.removeFromCart(item.productId);
            console.log(`Removed non-existent product ${item.productId} from cart`);
          }
          
          for (let i = cartItems.length - 1; i >= 0; i--) {
            if (!existingProducts.has(cartItems[i].productId)) {
              cartItems.splice(i, 1);
            }
          }
          
          showToast('cartSynchronized', 'info', { 
            message: `${removedItems.length} удалённых товаров было удалено из корзины` 
          });
        }
        
        return cartItems;
      } catch (error) {
        console.error('Error synchronizing cart with products:', error);
        return cartItems;
      }
    },
    
    async addToCart({ commit, rootGetters }, { product, quantity = 1 }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          if (!product?.id || typeof product.price !== 'number' || product.price <= 0) return;
          
          const normalizedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));
          const cartItem = {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: normalizedQuantity,
            imageUrl: product.imageUrl || ''
          };
          
          const user = rootGetters['auth/user'];
          const userId = user?.uid || null;
          
          cartRepository.setUserId(userId);
          await cartRepository.addToCart(userId, product, quantity);
          commit('addToCart', cartItem);
          showToast('itemAdded', 'success');
          
          return cartItem;
        },
        onError: (error) => {
          showToast('error', 'error', { message: 'Failed to add product to cart' });
          throw error;
        }
      });
    },
    
    async removeFromCart({ commit, rootGetters }, productId) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const user = rootGetters['auth/user'];
          cartRepository.setUserId(user?.uid || null);
          
          await cartRepository.removeFromCart(productId);
          commit('removeFromCart', productId);
          
          return { productId };
        }
      });
    },
    
    async updateQuantity({ commit, rootGetters }, { productId, quantity }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const user = rootGetters['auth/user'];
          cartRepository.setUserId(user?.uid || null);
          
          await cartRepository.updateQuantity(productId, quantity);
          commit('updateQuantity', { productId, quantity });
          
          return quantity;
        }
      });
    },

    async updateQuantityOptimistic({ commit, rootGetters }, { productId, quantity }) {
      commit('updateQuantity', { productId, quantity });
      
      try {
        const user = rootGetters['auth/user'];
        cartRepository.setUserId(user?.uid || null);
        
        await cartRepository.updateQuantity(productId, quantity);
        return quantity;
      } catch (error) {
        showToast('error', 'error', { message: 'Failed to update quantity' });
        throw error;
      }
    },
    
    async clearCart({ commit, rootGetters }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const user = rootGetters['auth/user'];
          cartRepository.setUserId(user?.uid || null);
          
          await cartRepository.clearCart();
          commit('clearCart');
          showToast('cartCleared', 'success');
          
          return true;
        }
      });
    },
    
    resetCart({ commit }) {
      commit('clearCart');
      cartRepository.setUserId(null);
    }
  }
};