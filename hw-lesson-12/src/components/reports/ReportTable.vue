<template>
  <div class="report-content">
    <div class="summary">
      <p>You have selected {{ items.length }} courses with assigned teachers.</p>
    </div>
    
    <table class="report-table">
      <thead>
        <tr>
          <th>Lesson</th>
          <th>Description</th>
          <th>Teacher</th>
          <th>Experience</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.lesson.title }}</td>
          <td>{{ item.lesson.description }}</td>
          <td>{{ item.teacher.name }}</td>
          <td>{{ item.teacher.experience }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReportTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.summary {
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.2em;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.report-table th,
.report-table td {
  border: 1px solid var(--color-border);
  padding: 12px;
  text-align: left;
}

.report-table th {
  background-color: var(--color-background-soft);
  color: var(--color-heading);
  font-weight: bold;
}

.report-table tr:nth-child(even) {
  background-color: var(--color-background-mute);
}
</style>
