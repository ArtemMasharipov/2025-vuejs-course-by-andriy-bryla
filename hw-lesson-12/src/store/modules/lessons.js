import api from '@/api';
import { createBaseModule } from '../createBaseModule';

const baseModule = createBaseModule({ 
  namespace: 'lessons', 
  fetchAction: api.getLessons,
  initialState: { 
    selectedIds: [] 
  } 
});

export default {
  ...baseModule,
  getters: {
    ...baseModule.getters,
    allLessons: state => state.data,
    selectedLessons: state => state.selectedIds
  },
  mutations: {
    ...baseModule.mutations,
    SET_SELECTED(state, ids) {
      state.selectedIds = ids;
    }
  },
  actions: {
    ...baseModule.actions,
    selectLessons({ commit }, lessonIds) {
      commit('SET_SELECTED', lessonIds);
    }
  }
};
