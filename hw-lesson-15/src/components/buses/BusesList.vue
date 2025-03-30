<template>
  <div>
    <h1 class="text-h4 mb-4">Buses</h1>
    
    <div class="d-flex justify-end my-4">
      <v-btn 
        color="primary" 
        prepend-icon="mdi-plus"
        :to="{ name: 'bus-form' }"
      >
        Add New Bus
      </v-btn>
    </div>
    
    <loading-spinner v-if="isLoading" message="Loading buses..." />
    
    <v-alert v-else-if="getBuses.length === 0" type="info" border="start">
      No buses found. Please add a bus using the button above.
    </v-alert>
    
    <v-data-table
      v-else
      :headers="headers"
      :items="getBuses"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.licensePlate }}</td>
          <td>{{ item.capacity }}</td>
          <td>
            <div class="d-flex gap-2">
              <v-btn
                size="small"
                color="info"
                variant="text"
                :to="{ name: 'bus-form', params: { id: item.id } }"
              >
                Edit
              </v-btn>
              <v-btn
                size="small"
                color="error"
                variant="text"
                @click="handleDeleteBus(item.id)"
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
  name: 'BusesList',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Model', key: 'model' },
        { title: 'License Plate', key: 'licensePlate' },
        { title: 'Capacity', key: 'capacity' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
    }
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
