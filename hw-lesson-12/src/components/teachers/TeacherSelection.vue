<template>
  <div class="content-container">
    <h1>Select Teachers</h1>
    <p>Choose a teacher for each selected lesson:</p>
    
    <error-message 
      :message="errorMessage" 
      @close="errorMessage = ''"
    />
    
    <loading-spinner v-if="isDataLoading" message="Loading data..." />
    
    <template v-else-if="selectedLessons.length">
      <teacher-list
        v-for="lesson in selectedLessons"
        :key="lesson.id"
        :lesson-id="lesson.id"
        :lesson-title="lesson.title"
        :teachers="getAvailableTeachersForSubject(lesson.id)"
        :selected-teacher-id="teacherAssignments[lesson.id]"
        @select-teacher="assignTeacherToLesson"
      />
      
      <div class="action-buttons spaced">
        <button @click="$router.push('/lessons')" class="btn-secondary">
          Back to Lessons
        </button>
        <button @click="prepareAndNavigateToReport" class="btn-primary" :disabled="!areAllTeachersAssigned">
          Generate Report
        </button>
      </div>
    </template>
    
    <div v-else class="no-data">
      <p>No lessons selected. Please select lessons first.</p>
      <button @click="$router.push('/lessons')" class="btn-primary">
        Select Lessons
      </button>
    </div>
  </div>
</template>

<script>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { buildReportPath, extractLessonIds } from '@/utils/urlHelpers';
import { mapActions, mapGetters } from 'vuex';
import TeacherList from './TeacherList.vue';

export default {
  name: 'TeacherSelection',
  components: { 
    TeacherList,
    ErrorMessage,
    LoadingSpinner
  },
  data() {
    return {
      teacherAssignments: {},
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      findLessonById: 'lessons/getById',
      getAvailableTeachersForSubject: 'teachers/teachersForSubject',
      isDataLoading: 'teachers/isLoading',
      savedTeacherAssignments: 'teachers/selectedTeachers'
    }),
    
    lessonIds() {
      return extractLessonIds(this.$route.params.lessonIds || '');
    },
    
    selectedLessons() {
      return this.lessonIds.map(id => this.findLessonById(id)).filter(Boolean);
    },
    
    areAllTeachersAssigned() {
      return this.selectedLessons.length > 0 && 
             this.selectedLessons.every(lesson => this.teacherAssignments[lesson.id]);
    }
  },
  methods: {
    ...mapActions({
      loadLessonsData: 'lessons/fetch',
      loadTeachersData: 'teachers/fetch',
      clearTeacherAssignments: 'teachers/resetTeachers',
      saveTeacherAssignments: 'teachers/updateTeacherSelections'
    }),
    
    assignTeacherToLesson({ lessonId, teacherId }) {
      this.teacherAssignments[lessonId] = teacherId;
      this.errorMessage = '';
    },
    
    async prepareAndNavigateToReport() {
      if (!this.areAllTeachersAssigned) {
        this.errorMessage = 'Please select a teacher for each lesson';
        return;
      }
      
      await this.saveTeacherAssignments(this.teacherAssignments);
      this.$router.push(buildReportPath(this.teacherAssignments));
    },
    
    async loadRequiredData() {
      await this.clearTeacherAssignments();
      
      await Promise.all([
        this.loadLessonsData(),
        this.loadTeachersData()
      ]);
      
      this.teacherAssignments = { ...this.savedTeacherAssignments };
    }
  },
  async created() {
    if (!this.lessonIds.length) {
      this.$router.push('/lessons');
      return;
    }
    
    await this.loadRequiredData();
  }
}
</script>
