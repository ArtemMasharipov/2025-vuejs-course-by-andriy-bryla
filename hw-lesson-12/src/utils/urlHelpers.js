const APP_ROUTES = {
  LESSONS: '/lessons',
  REPORT: '/report'
};

const convertToId = val => parseInt(val) || null;

export function extractLessonIds(pathParam) {
  if (!pathParam) return [];
  return pathParam.split('/').filter(Boolean).map(convertToId).filter(Boolean);
}

export function extractPairs(pairsParam) {
  if (!pairsParam) return [];
  
  return pairsParam.split('/')
    .filter(Boolean)
    .map(pair => {
      const [lessonId, teacherId] = pair.split('-').map(convertToId);
      return lessonId && teacherId ? { lessonId, teacherId } : null;
    })
    .filter(Boolean);
}

export function buildLessonsPath(lessonIds) {
  if (!Array.isArray(lessonIds) || !lessonIds.length) return APP_ROUTES.LESSONS;
  return `${APP_ROUTES.LESSONS}/${lessonIds.join('/')}`;
}

export function buildReportPath(teacherAssignments) {
  if (!teacherAssignments) return APP_ROUTES.LESSONS;
  
  const pairs = Object.entries(teacherAssignments)
    .filter(([_, teacherId]) => Boolean(teacherId))
    .map(([lessonId, teacherId]) => `${lessonId}-${teacherId}`)
    .join('/');
    
  return pairs ? `${APP_ROUTES.REPORT}/${pairs}` : APP_ROUTES.LESSONS;
}

export function validatePairs(pairs, findLesson, findTeacher) {
  if (!pairs?.length) return false;
  return pairs.every(({ lessonId, teacherId }) => 
    findLesson?.(lessonId) && findTeacher?.(teacherId));
}

export const createUrlOperations = (store) => ({
  getLessonIds: (route) => extractLessonIds(route.params.lessonIds),
  getPairs: (route) => extractPairs(route.params.pairs),
  validateSelection: (lessonIds) => lessonIds.length > 0,
  validatePairsWithStore: (pairs) => validatePairs(
    pairs, 
    store.getters['lessons/getById'], 
    store.getters['teachers/getTeacher']
  ),
  navigateToTeachers: (router, lessonIds) => {
    router.push(buildLessonsPath(lessonIds));
  },
  navigateToReport: (router, selections) => {
    router.push(buildReportPath(selections));
  }
});
