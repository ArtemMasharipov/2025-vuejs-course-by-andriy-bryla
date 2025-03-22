<template>
  <div class="report-view">
    <report-container />
  </div>
</template>

<script>
import ReportContainer from '@/components/reports/ReportContainer.vue';

export default {
  name: 'ReportView',
  components: {
    ReportContainer
  }
}
</script>

<style scoped>
.report-view {
  width: 100%;
}
</style>
