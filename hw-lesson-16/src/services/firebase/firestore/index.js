import FirestoreService from './core/FirestoreService';
import CartRepository from './repositories/CartRepository';
import RbacRepository from './repositories/RbacRepository';
import UserRepository from './repositories/UserRepository';

const firestoreService = new FirestoreService();

const cartRepository = new CartRepository(firestoreService);
const rbacRepository = new RbacRepository(firestoreService);
const userRepository = new UserRepository(firestoreService);

const usersDb = {
  getById: (id) => userRepository.getUserById(id),
  getAll: () => userRepository.getAllUsers(),
  create: (id, data) => userRepository.saveUser(id, data),
  update: (id, data) => userRepository.saveUser(id, data),
  delete: (id) => userRepository.deleteUser(id),
  createIfNotExists: (id, data) => userRepository.createIfNotExists(id, data),
  updateRole: (id, role) => userRepository.updateUserRole(id, role)
};

const productsDb = {
  getById: (id) => firestoreService.getById('products', id),
  getAll: () => firestoreService.getAll('products'),
  create: (data) => firestoreService.add('products', data),
  update: (id, data) => firestoreService.update('products', id, data),
  delete: (id) => firestoreService.delete('products', id),
  query: (conditions, orderBy, desc, limit) => 
    firestoreService.query('products', conditions, orderBy, desc, limit)
};

export {
    cartRepository,
    firestoreService, productsDb, rbacRepository,
    userRepository,
    usersDb
};

export default {
  getService: () => firestoreService,
  
  getCartRepository: () => cartRepository,
  getRbacRepository: () => rbacRepository,
  getUserRepository: () => userRepository,
  
  products: productsDb,
  users: usersDb
};