<template>
  <div class="container">
    <h1>Список студентів</h1>
    <div class="controls">
      <grade-system-select />
      <category-filter />
    </div>
    <loading-spinner v-if="isLoading"/>
    <div v-else>
      <div v-if="!students.length" class="empty-message">
        <p>У вибраній категорії немає студентів</p>
      </div>
      <table v-else class="student-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ id, name, displayGrade, categoryLabel } in students" :key="id">
            <td>{{ name }}</td>
            <td>{{ displayGrade }}</td>
            <td>{{ categoryLabel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { HEADERS } from '../constants/table';
import GradeSystemSelect from './GradeSystemSelect.vue';
import CategoryFilter from './CategoryFilter.vue';
import LoadingSpinner from './common/LoadingSpinner.vue';

export default {
  components: { GradeSystemSelect, CategoryFilter, LoadingSpinner },
  data: () => ({
    headers: HEADERS
  }),
  computed: {
    ...mapGetters({
      students: 'filteredStudentsByCategory',
      isLoading: 'isLoading'
    })
  },
  created() {
    this.loadStudents();
  },
  methods: {
    ...mapActions(['loadStudents'])
  }
};
</script>

<style>
.container {
  font-family: Arial, sans-serif;
  margin: 20px;
}
.student-table {
  width: 100%;
  border-collapse: collapse;
}
.student-table th,
.student-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.student-table th {
  background-color: #f4f4f4;
}
.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.controls select {
  padding: 5px;
  min-width: 150px;
  max-width: 200px;
}
.table-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-message {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #6c757d;
  font-size: 1.1rem;
}
</style>
