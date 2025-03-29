export default [
  {
    path: '/contacts',
    component: () => import('@/views/ContactsPage.vue'),
    name: 'Contacts',
    meta: { 
      title: 'Контакти',
      layout: 'empty' 
    }
  },
  {
    path: '/shopping-rules',
    component: () => import('@/views/ShoppingRulesPage.vue'),
    name: 'ShoppingRules',
    meta: { 
      title: 'Правила купівлі',
      layout: 'empty'
    }
  }
]
