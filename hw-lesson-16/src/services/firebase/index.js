import authService from './auth';
import {
    cartRepository,
    firestoreService,
    productsDb,
    rbacRepository,
    userRepository,
    usersDb
} from './firestore';
import rbacService from './rbac';

export {
    authService,
    cartRepository,
    firestoreService,
    productsDb,
    rbacRepository,
    rbacService,
    userRepository,
    usersDb
};

export default {
  login: (provider) => authService.login(provider),
  loginWithGoogle: () => authService.loginWithGoogle(),
  logout: () => authService.logout(),
  getCurrentUser: () => authService.getCurrentUser(),
  isAuthenticated: () => authService.isAuthenticated(),
  onAuthStateChanged: (callback) => authService.onAuthStateChanged(callback),
  
  getCart: (userId) => cartRepository.loadCart(userId),
  saveCart: (userId, items) => cartRepository.saveCart(userId, items),
  addToCart: (userId, product, quantity) => cartRepository.addToCart(userId, product, quantity),
  removeFromCart: (userId, productId) => cartRepository.removeFromCart(userId, productId),
  updateCartQuantity: (userId, productId, quantity) => cartRepository.updateQuantity(userId, productId, quantity),
  clearCart: (userId) => cartRepository.clearCart(userId),
  
  getRbacConfig: () => rbacRepository.getRbacConfig(),
  updateRbacConfig: (config) => rbacRepository.updateRbacConfig(config),
  hasPermission: (role, permission) => rbacRepository.hasPermission(role, permission),
  
  getUser: (userId) => userRepository.getUserById(userId),
  createUser: (userId, data) => userRepository.saveUser(userId, data),
  updateUserRole: (userId, role) => userRepository.updateUserRole(userId, role),
  
  getFirestoreService: () => firestoreService
};
