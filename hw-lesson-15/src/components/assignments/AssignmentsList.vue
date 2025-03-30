<template>
  <div>
    <h1 class="text-h4 mb-4">Bus-Driver Assignments</h1>
    
    <div class="d-flex justify-end my-4">
      <v-btn 
        color="primary" 
        prepend-icon="mdi-plus"
        :to="{ name: 'assignment-form' }"
      >
        Create New Assignment
      </v-btn>
    </div>
    
    <loading-spinner v-if="isLoading" message="Loading assignments..." />
    
    <v-alert v-else-if="assignmentsWithDetails.length === 0" type="info" border="start">
      No assignments found. Please create an assignment using the button above.
    </v-alert>
    
    <v-data-table
      v-else
      :headers="headers"
      :items="assignmentsWithDetails"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.driverName }}</td>
          <td>{{ item.busModel }} ({{ item.busLicensePlate }})</td>
          <td>
            <div class="d-flex gap-2">
              <v-btn
                size="small"
                color="info"
                variant="text"
                :to="{ name: 'assignment-form', params: { id: item.id } }"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="text"
                @click="deleteAssignment(item.id)"
              >
                Delete
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
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
  data() {
    return {
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Driver', key: 'driverName' },
        { title: 'Bus', key: 'busModel' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
    }
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
