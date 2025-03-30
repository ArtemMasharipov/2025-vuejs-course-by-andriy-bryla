<template>
  <div>
    <h1 class="text-h4 mb-4">Drivers</h1>
    
    <driver-filter />
    
    <div class="d-flex justify-end my-4">
      <v-btn 
        color="primary" 
        prepend-icon="mdi-plus"
        :to="{ name: 'driver-form' }"
      >
        Add New Driver
      </v-btn>
    </div>

    <v-alert v-if="getFilteredDrivers.length === 0" type="info" border="start">
      {{ alertMessage }}
    </v-alert>
    
    <v-data-table
      v-else
      :headers="headers"
      :items="getFilteredDrivers"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.licenseNumber }}</td>
          <td>{{ item.experience }}</td>
          <td>
            <div class="d-flex gap-2">
              <v-btn
                size="small"
                color="info"
                variant="text"
                :to="{ name: 'driver-form', params: { id: item.id } }"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="text"
                @click="handleDeleteDriver(item.id)"
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
import DriverFilter from './DriverFilter.vue';

export default {
  name: 'DriversList',
  components: {
    DriverFilter,
    LoadingSpinner
  },
  data() {
    return {
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name' },
        { title: 'License Number', key: 'licenseNumber' },
        { title: 'Experience (years)', key: 'experience' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
    }
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
    async handleDeleteDriver(id) {
      try {
        await this.deleteDriver(id);
      } catch (error) {
        console.error('Error deleting driver:', error);
      }
    },
  },
  created() {
    this.loadDrivers();
  }
};
</script>
