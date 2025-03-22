import NotFoundView from '@/views/NotFoundView.vue';

export default [
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Page Not Found'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  }
];
