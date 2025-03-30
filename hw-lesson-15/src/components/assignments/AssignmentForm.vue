<template>
  <div class="form-container">
    <div class="form-card">
      <h1 class="page-heading">{{ isEditing ? 'Edit Assignment' : 'Create New Assignment' }}</h1>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      
      <Form 
        @submit="saveAssignment" 
        :validation-schema="validationSchema" 
        v-slot="{ errors, submitCount }" 
        :initial-values="initialValues"
        :key="formKey"
      >
        <div class="form-group">
          <label for="driverId" class="form-label">Driver</label>
          <Field 
            name="driverId" 
            as="select"
            class="form-select" 
            :class="{ 'is-invalid': submitCount > 0 && errors.driverId }"
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
          <div v-if="submitCount > 0 && errors.driverId" class="invalid-feedback">{{ errors.driverId }}</div>
        </div>
        
        <div class="form-group">
          <label for="busId" class="form-label">Bus</label>
          <Field 
            name="busId" 
            as="select"
            class="form-select" 
            :class="{ 'is-invalid': submitCount > 0 && errors.busId }"
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
          <div v-if="submitCount > 0 && errors.busId" class="invalid-feedback">{{ errors.busId }}</div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save' }}
          </button>
          <router-link :to="{ name: 'assignments' }" class="btn btn-secondary">
            Cancel
          </router-link>
        </div>
      </Form>
    </div>
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
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 30px;
}

.page-heading {
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out;
}

.form-select {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
}

.form-control:focus,
.form-select:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
}

.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px 24px;
  padding-right: 40px;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-secondary:hover {
  background-color: #5c636a;
}

.alert {
  padding: 12px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
}
</style>
