<template>
  <div 
    class="lesson-item" 
    :class="{ 'selected': isSelected }"
    @click="toggleSelection"
  >
    <div class="checkbox-container">
      <input 
        type="checkbox" 
        :id="'lesson-' + lesson.id" 
        :checked="isSelected"
        @change.stop="toggleSelection"
        class="lesson-checkbox"
      >
    </div>
    <label :for="'lesson-' + lesson.id" class="lesson-content">
      <div class="lesson-title">{{ lesson.title }}</div>
      <p class="lesson-description">{{ lesson.description }}</p>
    </label>
  </div>
</template>

<script>
export default {
  name: 'LessonItem',
  props: {
    lesson: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-selection'],
  methods: {
    toggleSelection() {
      this.$emit('toggle-selection', this.lesson.id);
    }
  }
}
</script>

<style scoped>
.lesson-item {
  display: flex;
  padding: var(--element-spacing);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: var(--color-background-soft);
  margin-bottom: var(--element-spacing);
  cursor: pointer;
  transition: var(--transition-default);
}

.lesson-item:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lesson-item.selected {
  background-color: rgba(44, 62, 80, 0.05);
  border-color: var(--color-heading);
}

.checkbox-container {
  flex: 0 0 30px;
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
}

.lesson-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.lesson-content {
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.lesson-title {
  font-weight: 500;
  color: var(--color-heading);
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.lesson-description {
  color: var(--color-text);
  font-size: 0.95rem;
  margin: 0;
}
</style>
