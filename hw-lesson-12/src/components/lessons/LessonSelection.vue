<template>
  <div class="content-container">
    <h1>Select Lessons</h1>
    <p>Please select the lessons you'd like to take:</p>
    
    <error-message 
      :message="errorMessage" 
      @close="errorMessage = ''"
    />
    
    <lesson-list 
      :lessons="allLessons"
      v-model:selectedIds="selectedIds"
      :loading="isLoading"
    />
    
    <div class="lesson-summary" v-if="selectedIds.length > 0">
      <div>Selected lessons: {{ selectedIds.length }}</div>
    </div>
    
    <div class="action-buttons centered">
      <button 
        @click="goToTeacherSelection" 
        class="btn-primary"
        :disabled="isLoading || !selectedIds.length"
      >
        Select Teachers
      </button>
    </div>
  </div>
</template>

<script>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import { buildLessonsPath } from '@/utils/urlHelpers';
import { mapActions, mapGetters } from 'vuex';
import LessonList from './LessonList.vue';

export default {
  name: 'LessonSelection',
  components: { 
    LessonList,
    ErrorMessage
  },
  data() {
    return {
      selectedIds: [],
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters('lessons', ['allLessons', 'isLoading']),
    hasSelectedLessons() {
      return this.selectedIds.length > 0;
    }
  },
  methods: {
    ...mapActions('lessons', ['fetch', 'selectLessons']),
    
    goToTeacherSelection() {
      if (!this.hasSelectedLessons) {
        this.errorMessage = 'Please select at least one lesson';
        return;
      }
      
      this.selectLessons(this.selectedIds);
      
      const teacherPath = buildLessonsPath(this.selectedIds);
      this.$router.push(teacherPath);
    }
  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>
.lesson-summary {
  margin-top: var(--element-spacing);
  text-align: right;
  font-weight: 500;
  color: var(--color-heading);
}
</style>
