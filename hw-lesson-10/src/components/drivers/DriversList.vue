<template>
  <div>
    <h1 class="page-heading">Drivers</h1>
    
    <driver-filter />
    
    <div class="action-buttons">
      <router-link :to="{ name: 'driver-form' }" class="btn btn-primary">
        Add New Driver
      </router-link>
    </div>
    
    <loading-spinner v-if="isLoading" message="Loading drivers..." />
    
    <div v-else-if="getFilteredDrivers.length === 0" class="alert alert-info">
      {{ alertMessage }}
    </div>
    
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>License Number</th>
            <th>Experience (years)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in getFilteredDrivers" :key="driver.id">
            <td>{{ driver.id }}</td>
            <td>{{ driver.name }}</td>
            <td>{{ driver.licenseNumber }}</td>
            <td>{{ driver.experience }}</td>
            <td>
              <div class="flex gap-small">
                <router-link :to="{ name: 'driver-form', params: { id: driver.id }}" class="btn btn-info btn-small">
                  Edit
                </router-link>
                <button @click="deleteDriver(driver.id)" class="btn btn-danger btn-small">
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
import DriverFilter from './DriverFilter.vue';

export default {
  name: 'DriversList',
  components: {
    DriverFilter,
    LoadingSpinner
  },
  computed: {
    ...mapGetters('drivers', ['getFilteredDrivers', 'getDrivers', 'isLoading']),
    alertMessage() {
      if (this.getDrivers.length > 0 && this.getFilteredDrivers.length === 0) {
        return 'No drivers match your current filter criteria. Adjust filters or clear them to see all drivers.';
      }
      
      return 'No drivers found. Please add a driver using the button above.';
    }
  },
  methods: {
    ...mapActions('drivers', ['deleteDriver', 'loadDrivers']),
  },
  created() {
    this.loadDrivers();
  }
};
</script>
