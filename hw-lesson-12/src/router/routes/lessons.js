export default [
  {
    path: '/lessons',
    name: 'lessons',
    component: () => import('@/views/LessonSelectionView.vue'),
    meta: { 
      requiresAuth: true,
      title: 'Select Lessons'
    }
  },
  {
    path: '/lessons/:lessonIds(.*)',
    name: 'teachers',
    component: () => import('@/views/TeacherSelectionView.vue'),
    meta: { 
      requiresAuth: true,
      requiresLessonSelection: true,
      title: 'Select Teachers'
    },
    beforeEnter: (to, from) => {
      if (from.name !== 'lessons') {
        return { name: 'lessons' };
      }
    }
  },
  {
    path: '/report/:pairs(.*)',
    name: 'report',
    component: () => import('@/views/ReportView.vue'),
    meta: {
      requiresValidPairs: true,
      title: 'Study Plan Report'
    }
  }
];
