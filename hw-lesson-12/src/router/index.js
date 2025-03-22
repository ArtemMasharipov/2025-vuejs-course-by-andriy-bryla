import { createRouter, createWebHistory } from 'vue-router';
import { setupNavigationGuards } from './guards';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

setupNavigationGuards(router);

router.afterEach((to) => {
  let title = 'Lesson Management System';
  
  if (to.meta.title) {
    title = `${to.meta.title} | ${title}`;
  }
  
  document.title = title;
});

export default router;
