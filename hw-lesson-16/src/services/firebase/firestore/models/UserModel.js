export default class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.email = data.email || '';
    this.displayName = data.displayName || '';
    this.photoURL = data.photoURL || '';
    this.role = data.role || 'user';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.metadata = data.metadata || {};
  }

  toFirestore() {
    return {
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      role: this.role,
      metadata: this.metadata,
      updatedAt: new Date()
    };
  }

  static fromFirestore(data) {
    if (!data) {
      return null;
    }

    return new UserModel({
      id: data.id,
      email: data.email || '',
      displayName: data.displayName || '',
      photoURL: data.photoURL || '',
      role: data.role || 'user',
      createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
      metadata: data.metadata || {}
    });
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isGuest() {
    return !this.id || this.role === 'guest';
  }

  updateMetadata(metadata) {
    this.metadata = {
      ...this.metadata,
      ...metadata
    };
    this.updatedAt = new Date();
  }
}