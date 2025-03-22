<template>
  <div class="content-container">
    <h1>Your Study Plan Report</h1>
    
    <loading-spinner v-if="isReportLoading" message="Preparing your report..." />
    
    <template v-else>
      <div v-if="error" class="error-container">
        <error-message :message="error" @close="error = ''" />
        <div class="action-buttons centered">
          <button @click="loadAndPrepareReport" class="btn-primary">Try Again</button>
          <button @click="$router.push('/lessons')" class="btn-secondary">Return to Lessons</button>
        </div>
      </div>

      <template v-else>
        <report-table
          v-if="reportData.valid" 
          :items="reportData.items"
        />
        
        <div v-else class="error-container">
          <p>Could not generate report with the provided data.</p>
        </div>
        
        <div v-if="reportData.valid" class="action-buttons spaced">
          <button @click="$router.push('/lessons')" class="btn-primary">Make New Selection</button>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { extractPairs, validatePairs } from '@/utils/urlHelpers';
import { mapActions, mapGetters } from 'vuex';
import ReportTable from './ReportTable.vue';

export default {
  name: 'ReportContainer',
  components: { 
    ReportTable,
    LoadingSpinner,
    ErrorMessage
  },
  data() {
    return {
      isReportLoading: true,
      error: '',
      reportData: {
        valid: false,
        items: []
      }
    }
  },
  computed: {
    ...mapGetters({
      findLessonById: 'lessons/getById',
      findTeacherById: 'teachers/getTeacher'
    })
  },
  methods: {
    ...mapActions({
      loadLessonsData: 'lessons/fetch',
      loadTeachersData: 'teachers/fetch',
      generateReportData: 'reports/generateReport'
    }),
    
    async loadAndPrepareReport() {
      this.isReportLoading = true;
      this.error = '';
      
      try {
        await Promise.all([
          this.loadLessonsData(),
          this.loadTeachersData()
        ]);
        
        const lessonTeacherPairs = extractPairs(this.$route.params.pairs || '');
        
        if (!validatePairs(lessonTeacherPairs, this.findLessonById, this.findTeacherById)) {
          return this.$router.push('/not-found');
        }
        
        const reportResult = await this.generateReportData(lessonTeacherPairs);
        this.reportData = {
          valid: Boolean(reportResult?.isValid),
          items: reportResult?.items || []
        };
        
        if (!this.reportData.valid) {
          this.$router.push('/not-found');
        }
      } catch (error) {
        this.error = 'Failed to generate report. Please try again.';
        console.error('Error generating report:', error);
      } finally {
        this.isReportLoading = false;
      }
    }
  },
  created() {
    this.loadAndPrepareReport();
  }
}
</script>

<style scoped>
.error-container {
  margin: 20px 0;
}
</style>
