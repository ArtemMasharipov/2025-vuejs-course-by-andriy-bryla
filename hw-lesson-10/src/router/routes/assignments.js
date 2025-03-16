import { validateEntityFormAccess } from '../guards';

export default [
    {
        path: '/assignments',
        name: 'assignments',
        component: () => import('@/components/assignments/AssignmentsList.vue'),
    },
    {
        path: '/assignments/form/:id?',
        name: 'assignment-form',
        component: () => import('@/components/assignments/AssignmentForm.vue'),
        beforeEnter: validateEntityFormAccess('assignment'),
    },
];
