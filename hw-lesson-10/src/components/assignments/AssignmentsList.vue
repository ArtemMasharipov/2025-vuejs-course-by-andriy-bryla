<template>
  <div>
    <h1 class="page-heading">Bus-Driver Assignments</h1>
    
    <div class="action-buttons">
      <router-link :to="{ name: 'assignment-form' }" class="btn btn-primary">
        Create New Assignment
      </router-link>
    </div>
    
    <loading-spinner v-if="isLoading" message="Loading assignments..." />
    
    <div v-else-if="assignmentsWithDetails.length === 0" class="alert alert-info">
      No assignments found. Please create an assignment using the button above.
    </div>
    
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Bus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <assignment-item
            v-for="assignment in assignmentsWithDetails"
            :key="assignment.id"
            :assignment="assignment"
            @delete="deleteAssignment"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import AssignmentItem from './AssignmentItem.vue';

export default {
  name: 'AssignmentsList',
  components: {
    LoadingSpinner,
    AssignmentItem
  },
  computed: {
    ...mapGetters({
      assignmentsWithDetails: 'assignments/getAssignmentsWithDetails',
      isLoading: 'assignments/isLoading'
    })
  },
  methods: {
    ...mapActions('assignments', ['deleteAssignment', 'loadAssignments']),
    ...mapActions('drivers', ['loadDrivers']),
    ...mapActions('buses', ['loadBuses']),
    async loadAllData() {
      await Promise.all([
        this.loadAssignments(),
        this.loadDrivers(),
        this.loadBuses()
      ]);
    }
  },
  created() {
    this.loadAllData();
  }
};
</script>
