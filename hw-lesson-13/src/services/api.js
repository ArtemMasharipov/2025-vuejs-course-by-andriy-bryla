import { storageService } from './storage-service';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProducts() {
    await delay(800);
    return storageService.getProducts();
  },
  
  async addProduct(product) {
    await delay(500);
    
    const newProduct = { ...product };
    storageService.addEntity('products', newProduct);
    
    return newProduct;
  },
  
  async updateProduct(product) {
    await delay(500);
    
    const updatedProduct = { ...product };
    storageService.updateEntity('products', updatedProduct);
    
    return updatedProduct;
  },
  
  async deleteProduct(id) {
    await delay(500);
    
    storageService.removeEntity('products', id);
    
    return { id };
  },
  
  async getSuppliers() {
    await delay(800);
    return storageService.getSuppliers();
  }
}
