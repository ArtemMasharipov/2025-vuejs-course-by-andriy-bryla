export default [
  {
    path: '/suppliers',
    component: () => import('@/views/SuppliersPage.vue'),
    name: 'Suppliers',
    meta: { title: 'Постачальники', layout: 'main' }
  }
]
