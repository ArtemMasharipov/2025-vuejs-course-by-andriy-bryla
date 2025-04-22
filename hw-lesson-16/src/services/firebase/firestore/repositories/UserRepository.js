import UserModel from '../models/UserModel';

export default class UserRepository {
  constructor(firestoreService) {
    this.firestoreService = firestoreService;
    this.collectionName = 'users';
    this.cachedUsers = {};
  }

  async getUserById(userId, useCache = true) {
    try {
      if (useCache && this.cachedUsers[userId]) {
        return this.cachedUsers[userId];
      }

      const result = await this.firestoreService.getById(this.collectionName, userId);
      
      if (result) {
        const user = UserModel.fromFirestore(result);
        this.cachedUsers[userId] = user;
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async saveUser(userId, userData) {
    try {
      const userDataToSave = userData instanceof UserModel
        ? userData.toFirestore()
        : new UserModel(userData).toFirestore();

      const result = await this.firestoreService.set(
        this.collectionName, 
        userId, 
        userDataToSave
      );
      
      const user = UserModel.fromFirestore(result);
      this.cachedUsers[userId] = user;
      return user;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async createIfNotExists(userId, userData) {
    try {
      const result = await this.firestoreService.createIfNotExists(
        this.collectionName,
        userId,
        new UserModel(userData).toFirestore()
      );
      
      const user = UserModel.fromFirestore(result);
      this.cachedUsers[userId] = user;
      return { 
        user, 
        isNewlyCreated: result.isNewlyCreated 
      };
    } catch (error) {
      console.error('Error creating/getting user:', error);
      throw error;
    }
  }

  async updateUserRole(userId, role) {
    try {
      let user = await this.getUserById(userId);
      
      if (!user) {
        user = new UserModel({ id: userId });
      }
      
      user.role = role;
      return await this.saveUser(userId, user);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const results = await this.firestoreService.getAll(this.collectionName);
      return results.map(data => UserModel.fromFirestore(data));
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      delete this.cachedUsers[userId];
      return await this.firestoreService.delete(this.collectionName, userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  clearCache() {
    this.cachedUsers = {};
  }
}