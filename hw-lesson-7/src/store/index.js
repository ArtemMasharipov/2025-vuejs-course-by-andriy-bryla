import { createStore } from 'vuex';
import { SYSTEMS, CATEGORIES } from '../constants/grades';
import { convertGrade, getCategory } from '../utils/gradeUtils';
import { fetchStudents } from '../utils/api';

const store = {
    state: {
        students: [],
        currentSystem: SYSTEMS.TWELVE.id,
        selectedCategory: CATEGORIES.ALL.id,
        isLoading: false
    },
    
    mutations: {
        SET_GRADING_SYSTEM: (state, system) => state.currentSystem = system,
        SET_CATEGORY: (state, category) => state.selectedCategory = category,
        SET_STUDENTS: (state, students) => state.students = students,
        SET_LOADING: (state, status) => state.isLoading = status
    },
    
    actions: {
        loadStudents: async ({ commit }) => {
            commit('SET_LOADING', true);
            try {
                const data = await fetchStudents();
                commit('SET_STUDENTS', data.students);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        changeSystem: ({ commit }, system) => commit('SET_GRADING_SYSTEM', system),
        changeCategory: ({ commit }, category) => commit('SET_CATEGORY', category)
    },
    
    getters: {
        students: ({ students = [], currentSystem }) => 
            students.map(student => ({
                ...student,
                displayGrade: convertGrade(student.average, SYSTEMS.TWELVE.id, currentSystem),
                category: getCategory(student.average),
                categoryLabel: Object.values(CATEGORIES)
                    .find(c => c.id === getCategory(student.average))?.label
            })),
            
        filteredStudentsByCategory: (state, { students = [] }) => {
            if (!Array.isArray(students) || !students.length) return [];
            return state.selectedCategory === CATEGORIES.ALL.id
                ? students
                : students.filter(s => s.category === state.selectedCategory);
        },
                
        categories: () => Object.values(CATEGORIES),
        isLoading: ({ isLoading }) => isLoading,
        selectedCategory: state => state.selectedCategory
    }
};

export default createStore(store);
