export default {
  namespaced: true,
  state: {
    currentReport: null
  },
  getters: {
    currentReport: state => state.currentReport
  },
  mutations: {
    SET_REPORT(state, report) {
      state.currentReport = report;
    }
  },
  actions: {
    generateReport({ commit, rootGetters }, pairs) {
      if (!pairs || !pairs.length) return null;
      
      const getLesson = rootGetters['lessons/getById'];
      const getTeacher = rootGetters['teachers/getTeacher'];
      
      const items = pairs
        .map(({ lessonId, teacherId }) => ({
          lesson: getLesson(lessonId),
          teacher: getTeacher(teacherId)
        }))
        .filter(item => item.lesson && item.teacher);
      
      const isValid = items.length === pairs.length;
      
      if (!isValid) return { isValid, items };
      
      const reportData = {
        pairs,
        items: items.map(({ lesson, teacher }) => ({
          lesson: {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description
          },
          teacher: {
            id: teacher.id,
            name: teacher.name,
            experience: teacher.experience
          }
        })),
        timestamp: new Date().toISOString()
      };
      
      commit('SET_REPORT', reportData);
      
      return { isValid, items };
    }
  }
};
