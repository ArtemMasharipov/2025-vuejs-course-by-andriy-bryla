<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Bus' : 'Add New Bus' }}</h1>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <form @submit.prevent="saveBus">
      <div class="form-group">
        <label for="model" class="form-label">Bus Model</label>
        <input
          v-model="formData.model"
          type="text"
          class="form-control"
          id="model"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="licensePlate" class="form-label">License Plate</label>
        <input
          v-model="formData.licensePlate"
          type="text"
          class="form-control"
          id="licensePlate"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="capacity" class="form-label">Capacity</label>
        <input
          v-model.number="formData.capacity"
          type="number"
          class="form-control"
          id="capacity"
          min="1"
          required
        />
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'buses' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BusForm',
  data() {
    return {
      formData: {
        id: null,
        model: '',
        licensePlate: '',
        capacity: 20
      },
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('buses', ['getBusById']),
    isEditing() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    ...mapActions('buses', ['createBus', 'updateBus', 'loadBuses']),
    async saveBus() {
      this.loading = true;
      this.error = null;
      try {
        if (this.isEditing) {
          await this.updateBus({ ...this.formData });
        } else {
          await this.createBus({ ...this.formData });
        }
        this.$router.push({ name: 'buses' });
      } catch (error) {
        this.error = error.message || 'Failed to save bus';
      } finally {
        this.loading = false;
      }
    },
    async loadBusData() {
      if (this.isEditing) {
        try {
          await this.loadBuses();
          
          const bus = this.getBusById(this.$route.params.id);
          if (bus) {
            this.formData = { ...bus };
          }
        } catch (error) {
          console.error('Failed to load bus data:', error);
        }
      }
    }
  },
  created() {
    this.loadBusData();
  }
};
</script>
