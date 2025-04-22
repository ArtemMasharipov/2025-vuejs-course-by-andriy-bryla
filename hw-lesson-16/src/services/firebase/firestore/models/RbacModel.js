export default class RbacModel {
  constructor(data = {}) {
    this.id = data.id || 'config';
    this.roles = data.roles || this.getDefaultRoles();
    this.updatedAt = data.updatedAt || new Date();
  }

  toFirestore() {
    return {
      roles: this.roles,
      updatedAt: new Date()
    };
  }

  static fromFirestore(data) {
    if (!data) {
      return new RbacModel();
    }
    
    return new RbacModel({
      id: data.id || 'config',
      roles: data.roles || {},
      updatedAt: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date()
    });
  }

  hasPermission(role, permission) {
    if (role === 'admin') {
      return true;
    }
    
    if (role === 'user' && (permission === 'read:products' || permission === 'manage:cart')) {
      return true;
    }
    
    if (role === 'guest' && permission === 'read:products') {
      return true;
    }
    
    return !!this.roles?.[role]?.permissions?.includes(permission);
  }

  addPermission(role, permission) {
    if (!this.roles[role]) {
      this.roles[role] = { permissions: [] };
    }
    
    if (!this.roles[role].permissions.includes(permission)) {
      this.roles[role].permissions.push(permission);
    }
  }

  removePermission(role, permission) {
    if (this.roles[role] && this.roles[role].permissions) {
      this.roles[role].permissions = this.roles[role].permissions.filter(
        p => p !== permission
      );
    }
  }

  addRole(role, permissions = []) {
    if (!this.roles[role]) {
      this.roles[role] = {
        permissions: permissions
      };
    }
  }

  removeRole(role) {
    if (role !== 'admin' && role !== 'user' && role !== 'guest') {
      delete this.roles[role];
    }
  }

  getDefaultRoles() {
    return {
      admin: {
        permissions: [
          'read:products', 'create:products', 'update:products', 'delete:products',
          'read:users', 'update:users', 'delete:users',
          'access:admin', 'manage:cart'
        ]
      },
      user: {
        permissions: [
          'read:products', 
          'manage:cart'
        ]
      },
      guest: {
        permissions: [
          'read:products'
        ]
      }
    };
  }
}