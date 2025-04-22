import { createRouter, createWebHistory } from 'vue-router';
import { globalGuard } from './helpers/guards';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products/ProductsView.vue'),
    meta: { requiresPermission: 'read:products' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/CartView.vue'),
    meta: { requiresAuth: true, requiresPermission: 'add:to:cart' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAuth: true, requiresPermission: 'access:admin' },
    children: [
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/ProductsManagementView.vue'),
        meta: { requiresAuth: true, requiresPermission: 'access:admin' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/views/MyContacts.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(globalGuard);

export default router;
