<template>
  <div class="lesson-list">
    <loading-spinner v-if="loading" message="Loading lessons..." />
    <div v-else-if="lessons.length === 0" class="no-data">No lessons available</div>
    <div v-else class="lesson-table">
      <lesson-item
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        :is-selected="selectedIds.includes(lesson.id)"
        @toggle-selection="handleToggleSelection"
      />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import LessonItem from './LessonItem.vue';

export default {
  name: 'LessonList',
  components: {
    LessonItem,
    LoadingSpinner
  },
  props: {
    lessons: {
      type: Array,
      required: true
    },
    selectedIds: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selectedIds'],
  methods: {
    handleToggleSelection(lessonId) {
      const updatedSelection = [...this.selectedIds];
      const index = updatedSelection.indexOf(lessonId);
      
      if (index === -1) {
        updatedSelection.push(lessonId);
      } else {
        updatedSelection.splice(index, 1);
      }
      
      this.$emit('update:selectedIds', updatedSelection);
    }
  }
}
</script>

<style scoped>
.lesson-list {
  margin-bottom: var(--section-spacing);
}

.lesson-table {
  display: flex;
  flex-direction: column;
  gap: var(--element-spacing);
}

.loading, .no-data {
  text-align: center;
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
}
</style>
