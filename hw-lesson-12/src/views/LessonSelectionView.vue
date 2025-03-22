<template>
  <div class="lesson-selection-view">
    <lesson-selection />
  </div>
</template>

<script>
import LessonSelection from '@/components/lessons/LessonSelection.vue';

export default {
  name: 'LessonSelectionView',
  components: {
    LessonSelection
  }
}
</script>

<style scoped>
.lesson-selection-view {
  width: 100%;
}
</style>
