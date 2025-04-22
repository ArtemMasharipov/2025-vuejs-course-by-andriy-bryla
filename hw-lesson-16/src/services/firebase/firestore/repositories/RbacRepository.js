import RbacModel from '../models/RbacModel';

export default class RbacRepository {
  constructor(firestoreService) {
    this.firestoreService = firestoreService;
    this.collectionName = 'rbac';
    this.configId = 'config';
    this.cachedConfig = null;
  }

  async getRbacConfig(useCache = true) {
    try {
      if (useCache && this.cachedConfig) {
        return this.cachedConfig;
      }

      const result = await this.firestoreService.getById(this.collectionName, this.configId);
      
      if (result) {
        this.cachedConfig = RbacModel.fromFirestore(result);
        return this.cachedConfig;
      } else {
        return await this.createDefaultConfig();
      }
    } catch (error) {
      console.error('Error getting RBAC config:', error);
      const defaultConfig = new RbacModel();
      return defaultConfig;
    }
  }

  async createDefaultConfig() {
    try {
      const defaultConfig = new RbacModel();
      const result = await this.firestoreService.set(
        this.collectionName, 
        this.configId, 
        defaultConfig.toFirestore()
      );
      
      this.cachedConfig = RbacModel.fromFirestore(result);
      return this.cachedConfig;
    } catch (error) {
      console.error('Error creating default RBAC config:', error);
      return new RbacModel();
    }
  }

  async updateRbacConfig(config) {
    try {
      const configData = config instanceof RbacModel 
        ? config.toFirestore() 
        : new RbacModel(config).toFirestore();
      
      const result = await this.firestoreService.set(
        this.collectionName, 
        this.configId, 
        configData
      );
      
      this.cachedConfig = RbacModel.fromFirestore(result);
      return this.cachedConfig;
    } catch (error) {
      console.error('Error updating RBAC config:', error);
      throw error;
    }
  }

  async hasPermission(role, permission) {
    try {
      if (role === 'admin') {
        return true;
      }
      
      if (role === 'user' && (permission === 'read:products' || permission === 'manage:cart')) {
        return true;
      }
      
      if (role === 'guest' && permission === 'read:products') {
        return true;
      }

      const config = await this.getRbacConfig();
      return config.hasPermission(role, permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  clearCache() {
    this.cachedConfig = null;
  }
}