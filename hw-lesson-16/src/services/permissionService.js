import store from '@/store';

class PermissionService {
  hasPermission(permission) {
    if (permission === 'read:products') {
      return true;
    }
    
    if (this.isAdmin()) {
      return true;
    }
    
    const role = this.getUserRole();
    if (role === 'user' && permission === 'manage:cart') {
      return true;
    }
    
    return store.getters['auth/hasPermission'](permission);
  }
  
  isAuthenticated() {
    return store.getters['auth/isAuthenticated'];
  }
  
  isAdmin() {
    return store.getters['auth/isAdmin'];
  }
  
  getCurrentUser() {
    return store.getters['auth/user'];
  }
  
  getUserRole() {
    return store.getters['auth/userRole'];
  }
}

export const permissionService = new PermissionService();