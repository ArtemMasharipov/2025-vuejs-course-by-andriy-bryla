import store from '@/store';
import { extractLessonIds, extractPairs } from '@/utils/urlHelpers';

const REDIRECT_ROUTES = {
  LOGIN: 'login',
  LESSONS: '/lessons',
  NOT_FOUND: '/not-found'
};

function verifyAuthentication(to, from, next) {
  const isUserAuthenticated = store.getters['auth/isAuthenticated'];
  
  if (to.meta.requiresAuth && !isUserAuthenticated) {
    return next({ 
      name: REDIRECT_ROUTES.LOGIN, 
      query: { redirect: to.fullPath } 
    });
  }
  
  if (to.meta.guestOnly && isUserAuthenticated) {
    return next(REDIRECT_ROUTES.LESSONS);
  }
  
  return true;
}

function verifyLessonSelection(to, from, next) {
  if (!to.meta.requiresLessonSelection) {
    return true;
  }
  
  const selectedLessonIds = extractLessonIds(to.params.lessonIds);
  if (!selectedLessonIds.length) {
    return next(REDIRECT_ROUTES.LESSONS);
  }
  
  return true;
}

function verifyTeacherAssignments(to, from, next) {
  if (!to.meta.requiresValidPairs) {
    return true;
  }
  
  const lessonTeacherPairs = extractPairs(to.params.pairs);
  if (!lessonTeacherPairs.length) {
    return next(REDIRECT_ROUTES.NOT_FOUND);
  }
  
  return true;
}

export function setupNavigationGuards(router) {
  router.beforeEach(async (to, from, next) => {
    const authVerificationResult = verifyAuthentication(to, from, next);
    if (authVerificationResult !== true) return;
    
    const lessonSelectionResult = verifyLessonSelection(to, from, next);
    if (lessonSelectionResult !== true) return;
    
    const teacherAssignmentsResult = verifyTeacherAssignments(to, from, next);
    if (teacherAssignmentsResult !== true) return;
    
    next();
  });
}
