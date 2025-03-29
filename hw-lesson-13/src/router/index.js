import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

import infoRoutes from './info'
import productsRoutes from './products'
import suppliersRoutes from './suppliers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { title: 'Головна', layout: 'main' }
    },
    ...productsRoutes,
    ...suppliersRoutes,
    ...infoRoutes,
    
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
