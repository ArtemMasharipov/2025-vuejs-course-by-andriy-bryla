<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Assignment' : 'Create New Assignment' }}</h1>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <Form 
      @submit="saveAssignment" 
      :validation-schema="validationSchema" 
      v-slot="{ errors, values }" 
      :initial-values="initialValues"
      :key="formKey"
    >
      <div class="form-group">
        <label for="driverId" class="form-label">Driver</label>
        <Field 
          name="driverId" 
          as="select"
          class="form-select" 
          :class="{ 'is-invalid': errors.driverId }"
          id="driverId" 
        >
          <option value="" disabled>Select a driver</option>
          <option 
            v-for="driver in drivers" 
            :key="driver.id" 
            :value="driver.id"
          >
            {{ driver.name }} ({{ driver.licenseNumber }})
          </option>
        </Field>
        <div v-if="errors.driverId" class="invalid-feedback">{{ errors.driverId }}</div>
      </div>
      
      <div class="form-group">
        <label for="busId" class="form-label">Bus</label>
        <Field 
          name="busId" 
          as="select"
          class="form-select" 
          :class="{ 'is-invalid': errors.busId }"
          id="busId" 
        >
          <option value="" disabled>Select a bus</option>
          <option 
            v-for="bus in buses" 
            :key="bus.id" 
            :value="bus.id"
          >
            {{ bus.model }} ({{ bus.licensePlate }})
          </option>
        </Field>
        <div v-if="errors.busId" class="invalid-feedback">{{ errors.busId }}</div>
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'assignments' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Form, Field } from 'vee-validate';
import { assignmentSchema } from '@/helpers/validationSchemas';

export default {
  name: 'AssignmentForm',
  components: {
    Form,
    Field
  },
  data() {
    return {
      documentId: null,
      assignmentData: {
        driverId: '',
        busId: ''
      },
      initialValues: {
        driverId: '',
        busId: ''
      },
      isSubmitting: false,
      error: null,
      validationSchema: assignmentSchema,
      formKey: 0
    };
  },
  computed: {
    ...mapGetters({
      getAssignmentById: 'assignments/getAssignmentById',
      drivers: 'drivers/getDrivers',
      buses: 'buses/getBuses',
      isLoading: 'assignments/isLoading'
    }),
    isEditing() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    ...mapActions('assignments', ['createAssignment', 'updateAssignment', 'loadAssignments']),
    ...mapActions('drivers', ['loadDrivers']),
    ...mapActions('buses', ['loadBuses']),
    async saveAssignment(values, { resetForm }) {
      this.isSubmitting = true;
      this.error = null;
      
      try {
        const assignmentData = {
          driverId: values.driverId,
          busId: values.busId
        };
        
        if (this.isEditing) {
          await this.updateAssignment({
            itemId: this.documentId,
            data: assignmentData
          });
        } else {
          await this.createAssignment(assignmentData);
          resetForm();
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
        await Promise.all([
          this.loadAssignments(),
          this.loadDrivers(),
          this.loadBuses()
        ]);
        
        if (this.isEditing) {
          const assignment = this.getAssignmentById(this.$route.params.id);
          
          if (assignment) {
            this.documentId = assignment.id;
            
            this.initialValues = {
              driverId: assignment.driverId,
              busId: assignment.busId
            };
            
            this.formKey += 1;
          } else {
            this.error = 'Assignment not found';
          }
        }
      } catch (error) {
        this.error = 'Failed to load data. Please try again.';
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped>
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: #dc3545;
}

.form-select.is-invalid {
  background-position: right calc(0.375em + 0.1875rem) center, center right 2.25rem;
}
</style>
