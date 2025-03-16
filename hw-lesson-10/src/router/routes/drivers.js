import { validateEntityFormAccess } from '../guards';

export default [
    {
        path: '/drivers',
        name: 'drivers',
        component: () => import('@/components/drivers/DriversList.vue'),
    },
    {
        path: '/drivers/form/:id?',
        name: 'driver-form',
        component: () => import('@/components/drivers/DriverForm.vue'),
        beforeEnter: validateEntityFormAccess('driver'),
    },
];
