import api from '@/api';
import { buildReportPath } from '@/utils/urlHelpers';
import { createBaseModule } from '../createBaseModule';

const baseModule = createBaseModule({ 
  namespace: 'teachers', 
  fetchAction: api.getTeachers,
  initialState: { 
    selectedTeachers: {} 
  } 
});

export default {
  ...baseModule,
  getters: {
    ...baseModule.getters,
    allTeachers: state => state.data,
    teachersForSubject: state => subjectId => {
      return state.data.filter(teacher => 
        teacher.subjects.includes(parseInt(subjectId))
      );
    },
    selectedTeachers: state => state.selectedTeachers,
    getTeacher: state => id => state.data.find(teacher => teacher.id === parseInt(id)),
    areAllTeachersSelected: state => lessonIds => {
      return lessonIds.every(id => Boolean(state.selectedTeachers[id]));
    }
  },
  mutations: {
    ...baseModule.mutations,
    SET_SELECTED_TEACHERS(state, selected) {
      state.selectedTeachers = selected;
    },
    UPDATE_TEACHER(state, { lessonId, teacherId }) {
      state.selectedTeachers = {
        ...state.selectedTeachers,
        [lessonId]: teacherId
      };
    }
  },
  actions: {
    ...baseModule.actions,
    resetTeachers({ commit }) {
      commit('SET_SELECTED_TEACHERS', {});
    },
    selectTeacher({ commit }, { lessonId, teacherId }) {
      commit('UPDATE_TEACHER', { lessonId, teacherId });
    },
    updateTeacherSelections({ commit }, selections) {
      Object.entries(selections).forEach(([lessonId, teacherId]) => {
        commit('UPDATE_TEACHER', { 
          lessonId: parseInt(lessonId), 
          teacherId: parseInt(teacherId) 
        });
      });
    },
    getReportPath({ state }) {
      return buildReportPath(state.selectedTeachers);
    },
    validateSelection({ state }, lessonIds) {
      return lessonIds.every(id => Boolean(state.selectedTeachers[id]));
    }
  }
};
