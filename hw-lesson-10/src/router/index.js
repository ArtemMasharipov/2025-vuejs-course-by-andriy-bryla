import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import driverRoutes from './routes/drivers'
import busRoutes from './routes/buses'
import assignmentRoutes from './routes/assignments'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...driverRoutes,
    ...busRoutes,
    ...assignmentRoutes,
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
