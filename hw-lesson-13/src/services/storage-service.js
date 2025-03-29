import productsData from '@/data/products.json';
import suppliersData from '@/data/suppliers.json';

export const storageService = {
  getData(key, defaultData = []) {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultData;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return defaultData;
    }
  },

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
      return false;
    }
  },

  removeData(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  getProducts() {
    return this.getData('products', productsData);
  },
  
  saveProducts(products) {
    return this.saveData('products', products);
  },
  
  getSuppliers() {
    return this.getData('suppliers', suppliersData);
  },
  
  saveSuppliers(suppliers) {
    return this.saveData('suppliers', suppliers);
  },

  addEntity(key, entity, defaultData = []) {
    const entities = this.getData(key, defaultData);
    entities.push(entity);
    return this.saveData(key, entities) ? entity : null;
  },
  
  updateEntity(key, entity, defaultData = []) {
    const entities = this.getData(key, defaultData);
    const index = entities.findIndex(e => e.id === entity.id);
    
    if (index !== -1) {
      entities[index] = { ...entity };
      return this.saveData(key, entities) ? entity : null;
    }
    return null;
  },
  
  removeEntity(key, id, defaultData = []) {
    const entities = this.getData(key, defaultData);
    const filteredEntities = entities.filter(e => e.id !== id);
    return this.saveData(key, filteredEntities) ? id : null;
  }
};
