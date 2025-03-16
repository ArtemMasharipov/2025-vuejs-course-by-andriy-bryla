<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Driver' : 'Add New Driver' }}</h1>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <form @submit.prevent="saveDriver">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input 
          type="text" 
          id="name" 
          class="form-control" 
          v-model="driver.name" 
          required
        >
      </div>
      
      <div class="form-group">
        <label for="licenseNumber" class="form-label">License Number</label>
        <input 
          type="text" 
          id="licenseNumber" 
          class="form-control" 
          v-model="driver.licenseNumber" 
          required
        >
      </div>
      
      <div class="form-group">
        <label for="experience" class="form-label">Experience (years)</label>
        <input 
          type="number" 
          id="experience" 
          class="form-control" 
          v-model.number="driver.experience" 
          min="0" 
          required
        >
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'drivers' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DriverForm',
  data() {
    return {
      driver: {
        id: null,
        name: '',
        licenseNumber: '',
        experience: 0
      },
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('drivers', ['getDriverById']),
    isEditing() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    ...mapActions('drivers', ['createDriver', 'updateDriver', 'loadDrivers']),
    async saveDriver() {
      this.loading = true;
      this.error = null;
      try {
        if (this.isEditing) {
          await this.updateDriver({ ...this.driver });
        } else {
          await this.createDriver({ ...this.driver });
        }
        this.$router.push({ name: 'drivers' });
      } catch (error) {
        this.error = error.message || 'Failed to save driver';
      } finally {
        this.loading = false;
      }
    },
    async loadDriverData() {
      if (this.isEditing) {
        try {
          await this.loadDrivers();
          
          const driver = this.getDriverById(this.$route.params.id);
          if (driver) {
            this.driver = { ...driver };
          }
        } catch (error) {
          console.error('Failed to load driver data:', error);
        }
      }
    }
  },
  created() {
    this.loadDriverData();
  }
};
</script>
