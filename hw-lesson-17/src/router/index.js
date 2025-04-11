import HomePage from '@/views/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendsPage.vue'),
    },
    {
      path: '/gifts',
      name: 'gifts',
      component: () => import('@/views/GiftsPage.vue'),
    },
    {
      path: '/assignments',
      name: 'assignments',
      component: () => import('@/views/AssignmentsPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutPage.vue'),
    },
  ],
})

export default router
