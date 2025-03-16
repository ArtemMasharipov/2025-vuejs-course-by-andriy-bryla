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
          <tr v-for="assignment in assignmentsWithDetails" :key="assignment.id">
            <td>{{ assignment.id }}</td>
            <td>{{ assignment.driverName }}</td>
            <td>{{ assignment.busModel }} ({{ assignment.busLicensePlate }})</td>
            <td>
              <div class="flex gap-small">
                <router-link :to="{ name: 'assignment-form', params: { id: assignment.id }}" class="btn btn-info btn-small">
                  Edit
                </router-link>
                <button @click="deleteAssignment(assignment.id)" class="btn btn-danger btn-small">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingSpinner from '../common/LoadingSpinner.vue';

export default {
  name: 'AssignmentsList',
  components: {
    LoadingSpinner
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
