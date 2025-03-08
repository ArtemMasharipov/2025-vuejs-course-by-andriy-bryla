import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('@/views/ShopView.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                if (!store.getters['categories/getCategories'].length) {
                    await store.dispatch('categories/fetchCategories');
                }
                const currentCategoryId = store.getters['categories/getCurrentCategoryId'];
                if (!to.params.categoryId && currentCategoryId) {
                    return next({ 
                        name: 'CategoryProducts',
                        params: { categoryId: String(currentCategoryId) }
                    });
                }
                
                next();
            } catch (error) {
                console.error("Failed to load categories:", error);
                next();
            }
        },
        children: [
            {
                path: 'category/:categoryId',
                name: 'CategoryProducts',
                component: () => import('@/components/products/ProductList.vue'),
                props: true,
            },
            {
                path: 'product-form/:id?',
                name: 'ProductForm',
                component: () => import('@/components/products/ProductForm.vue'),
                props: route => ({ 
                    id: route.params.id ? parseInt(route.params.id) : null,
                    categoryId: parseInt(route.query.categoryId)
                })
            },
        ],
    },
    {
        path: '/payment-rules',
        name: 'PaymentRules',
        component: () => import('@/views/PaymentRulesView.vue'),
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('@/views/ContactsView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve(async (to, from, next) => {
    if (to.name === 'CategoryProducts' || 
       (to.name === 'Shop' && store.getters['categories/getCurrentCategoryId'])) {
        const categoryId = parseInt(to.params.categoryId) || store.getters['categories/getCurrentCategoryId'];
        try {
            await store.dispatch('products/fetchProductsByCategory', categoryId);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    }
    next();
});

export default router;
