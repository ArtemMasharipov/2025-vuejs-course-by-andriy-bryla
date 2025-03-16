<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Assignment' : 'Create New Assignment' }}</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <form @submit.prevent="saveAssignment">
      <div class="form-group">
        <label for="driverId" class="form-label">Driver</label>
        <select 
          id="driverId" 
          class="form-select" 
          v-model="assignment.driverId" 
          required
        >
          <option value="" disabled>Select a driver</option>
          <option 
            v-for="driver in drivers" 
            :key="driver.id" 
            :value="driver.id"
          >
            {{ driver.name }} ({{ driver.licenseNumber }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="busId" class="form-label">Bus</label>
        <select 
          id="busId" 
          class="form-select" 
          v-model="assignment.busId" 
          required
        >
          <option value="" disabled>Select a bus</option>
          <option 
            v-for="bus in buses" 
            :key="bus.id" 
            :value="bus.id"
          >
            {{ bus.model }} ({{ bus.licensePlate }})
          </option>
        </select>
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'assignments' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssignmentForm',
  data() {
    return {
      assignment: {
        id: null,
        driverId: '',
        busId: ''
      },
      isSubmitting: false,
      error: null,
      isDataLoading: false
    };
  },
  computed: {
    ...mapGetters({
      getAssignmentById: 'assignments/getAssignmentById',
      drivers: 'drivers/getDrivers',
      buses: 'buses/getBuses'
    }),
    isEditing() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    ...mapActions('assignments', ['createAssignment', 'updateAssignment']),
    ...mapActions('drivers', ['loadDrivers']),
    ...mapActions('buses', ['loadBuses']),
    async saveAssignment() {
      this.isSubmitting = true;
      this.error = null;
      
      try {
        if (this.isEditing) {
          await this.updateAssignment({ ...this.assignment });
        } else {
          await this.createAssignment({ ...this.assignment });
        }
        
        this.$router.push({ name: 'assignments' });
      } catch (error) {
        this.error = error.message || 'Failed to save assignment. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    },
    async loadData() {
      try {
        this.isDataLoading = true;
        await Promise.all([
          this.loadDrivers(),
          this.loadBuses()
        ]);
        
        if (this.isEditing) {
          const assignment = this.getAssignmentById(this.$route.params.id);
          if (assignment) {
            this.assignment = { ...assignment };
          }
        }
      } catch (error) {
        this.error = 'Failed to load data. Please try again.';
      } finally {
        this.isDataLoading = false;
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
