<template>
  <div class="teacher-selection-view">
    <teacher-selection />
  </div>
</template>

<script>
import TeacherSelection from '@/components/teachers/TeacherSelection.vue';

export default {
  name: 'TeacherSelectionView',
  components: {
    TeacherSelection
  }
}
</script>

<style scoped>
.teacher-selection-view {
  width: 100%;
}
</style>
