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
          <tr v-for="bus in getBuses" :key="bus.id">
            <td>{{ bus.id }}</td>
            <td>{{ bus.model }}</td>
            <td>{{ bus.licensePlate }}</td>
            <td>{{ bus.capacity }}</td>
            <td>
              <div class="flex gap-small">
                <router-link :to="{ name: 'bus-form', params: { id: bus.id }}" class="btn btn-info btn-small">
                  Edit
                </router-link>
                <button @click="deleteBus(bus.id)" class="btn btn-danger btn-small">
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
  name: 'BusesList',
  components: {
    LoadingSpinner
  },
  computed: {
    ...mapGetters('buses', ['getBuses', 'isLoading'])
  },
  methods: {
    ...mapActions('buses', ['deleteBus', 'loadBuses']),
  },
  created() {
    this.loadBuses();
  }
};
</script>
