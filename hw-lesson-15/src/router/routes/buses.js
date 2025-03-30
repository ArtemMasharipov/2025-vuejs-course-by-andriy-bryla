import { validateEntityFormAccess } from '../guards';

export default [
    {
        path: '/buses',
        name: 'buses',
        component: () => import('@/components/buses/BusesList.vue'),
    },
    {
        path: '/buses/form/:id?',
        name: 'bus-form',
        component: () => import('@/components/buses/BusForm.vue'),
        beforeEnter: validateEntityFormAccess('bus'),
    },
];
