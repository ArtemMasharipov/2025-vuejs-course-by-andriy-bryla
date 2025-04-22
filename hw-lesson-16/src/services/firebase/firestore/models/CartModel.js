export default class CartModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.items = data.items || [];
    this.totalPrice = data.totalPrice || 0;
    this.itemCount = data.itemCount || 0;
    this.updatedAt = data.updatedAt || new Date();
  }

  toFirestore() {
    return {
      userId: this.userId,
      items: this.items.map(item => ({
        productId: item.productId,
        title: item.title,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        imageUrl: item.imageUrl || ''
      })),
      totalPrice: this.calculateTotalPrice(),
      itemCount: this.calculateItemCount(),
      updatedAt: new Date()
    };
  }

  static fromFirestore(data) {
    return new CartModel({
      id: data.id,
      userId: data.userId,
      items: data.items || [],
      totalPrice: data.totalPrice || 0,
      itemCount: data.itemCount || 0,
      updatedAt: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date()
    });
  }

  addItem(product, quantity = 1) {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }
    
    const productId = product.id;
    const existingItem = this.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: productId,
        title: product.title || 'Unknown Product',
        price: parseFloat(product.price) || 0,
        quantity: quantity,
        imageUrl: product.imageUrl || ''
      });
    }
    
    this.updateTotals();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.updateTotals();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = parseInt(quantity);
      this.updateTotals();
    }
  }

  clear() {
    this.items = [];
    this.updateTotals();
  }

  calculateTotalPrice() {
    return parseFloat(
      this.items.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0).toFixed(2)
    );
  }

  calculateItemCount() {
    return this.items.reduce((count, item) => count + parseInt(item.quantity), 0);
  }

  updateTotals() {
    this.totalPrice = this.calculateTotalPrice();
    this.itemCount = this.calculateItemCount();
    this.updatedAt = new Date();
  }
}