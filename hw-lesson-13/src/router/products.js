export default [
  {
    path: '/products',
    component: () => import('@/views/ProductsPage.vue'),
    name: 'Products',
    meta: { title: 'Продукти', layout: 'main' },
    children: [
      {
        path: 'selector',
        component: () => import('@/views/ProductsSelectorPage.vue'),
        name: 'ProductsSelector',
        meta: { title: 'Підбір товарів', layout: 'main' }
      },
      {
        path: 'editor/:id?',
        component: () => import('@/views/ProductsEditorPage.vue'),
        name: 'ProductsEditor',
        meta: { 
          title: 'Керування товарами', 
          layout: 'main'
        }
      }
    ]
  }
]
