import { auth } from '@/config/firebase';
import StorageService from '@/services/storageService';
import { rbacRepository, usersDb } from './firestore';

const USER_ROLE_KEY = 'userRole';

class RbacService {
  constructor() {
    this.userRole = StorageService.get(USER_ROLE_KEY, 'guest');
    this.syncRoleWithFirestore();
  }

  async syncRoleWithFirestore() {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await usersDb.getById(currentUser.uid);
        if (userDoc && userDoc.role) {
          this.setUserRole(userDoc.role);
        }
      }
    } catch (error) {
      console.error('Error syncing role with Firestore:', error);
    }
  }

  async setUserRole(role) {
    this.userRole = role || 'guest';
    StorageService.set(USER_ROLE_KEY, this.userRole);
    
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await usersDb.update(currentUser.uid, { role: this.userRole });
      }
    } catch (error) {
      console.error('Error updating role in Firestore:', error);
    }
  }

  async getUserRole() {
    await this.syncRoleWithFirestore();
    return this.userRole || 'guest';
  }

  async hasPermission(permission) {
    await this.syncRoleWithFirestore();
    return await rbacRepository.hasPermission(this.userRole, permission);
  }

  clearUserRole() {
    this.userRole = 'guest';
    StorageService.set(USER_ROLE_KEY, 'guest');
  }

  async getRbacConfig() {
    return await rbacRepository.getRbacConfig();
  }

  async updateRbacConfig(config) {
    await this.syncRoleWithFirestore();
    if (this.userRole !== 'admin') {
      throw new Error('Only admins can update RBAC configuration');
    }
    return await rbacRepository.updateRbacConfig(config);
  }
}

const rbacService = new RbacService();
export default rbacService;