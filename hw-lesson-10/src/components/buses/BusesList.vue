<template>
  <div>
    <h1 class="page-heading">Buses</h1>
    
    <div class="action-buttons">
      <router-link :to="{ name: 'bus-form' }" class="btn btn-primary">
        Add New Bus
      </router-link>
    </div>
    
    <loading-spinner v-if="isLoading" message="Loading buses..." />
    
    <div v-else-if="getBuses.length === 0" class="alert alert-info">
      No buses found. Please add a bus using the button above.
    </div>
    
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>License Plate</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <bus-item
            v-for="bus in getBuses"
            :key="bus.id"
            :bus="bus"
            @delete="handleDeleteBus"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import BusItem from './BusItem.vue';

export default {
  name: 'BusesList',
  components: {
    LoadingSpinner,
    BusItem
  },
  computed: {
    ...mapGetters('buses', ['getBuses', 'isLoading'])
  },
  methods: {
    ...mapActions('buses', ['deleteBus', 'loadBuses']),
    async handleDeleteBus(id) {
      try {
        await this.deleteBus(id);
      } catch (error) {
        console.error('Error deleting bus:', error);
      }
    },
  },
  created() {
    this.loadBuses();
  }
};
</script>
