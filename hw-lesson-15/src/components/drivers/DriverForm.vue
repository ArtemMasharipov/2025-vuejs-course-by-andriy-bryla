<template>
  <div class="form-container">
    <div class="form-card">
      <h1 class="page-heading">{{ isEditing ? 'Edit Driver' : 'Add New Driver' }}</h1>
      
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      
      <Form @submit="saveDriver" :validation-schema="validationSchema" v-slot="{ errors, submitCount }">
        <div class="form-group">
          <label for="name" class="form-label">Driver Name</label>
          <Field
            name="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.name }"
            id="name"
            v-model="formData.name"
          />
          <div v-if="submitCount > 0 && errors.name" class="invalid-feedback">{{ errors.name }}</div>
        </div>
        
        <div class="form-group">
          <label for="licenseNumber" class="form-label">License Number</label>
          <Field
            name="licenseNumber"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.licenseNumber }"
            id="licenseNumber"
            v-model="formData.licenseNumber"
          />
          <div v-if="submitCount > 0 && errors.licenseNumber" class="invalid-feedback">{{ errors.licenseNumber }}</div>
        </div>
        
        <div class="form-group">
          <label for="experience" class="form-label">Experience (years)</label>
          <Field
            name="experience"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.experience }"
            id="experience"
            v-model.number="formData.experience"
          />
          <div v-if="submitCount > 0 && errors.experience" class="invalid-feedback">{{ errors.experience }}</div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
          <router-link :to="{ name: 'drivers' }" class="btn btn-secondary">
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
import { driverSchema } from '@/helpers/validationSchemas';

export default {
  name: 'DriverForm',
  components: {
    Form,
    Field
  },
  data() {
    return {
      formData: {
        name: '',
        licenseNumber: '',
        experience: null
      },
      documentId: null,
      loading: false,
      error: null,
      validationSchema: driverSchema
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
    async saveDriver(values, { resetForm }) {
      this.loading = true;
      this.error = null;
      
      try {
        if (this.isEditing) {
          await this.updateDriver({
            itemId: this.documentId,
            data: {
              name: values.name,
              licenseNumber: values.licenseNumber,
              experience: Number(values.experience)
            }
          });
        } else {
          await this.createDriver({
            name: values.name,
            licenseNumber: values.licenseNumber,
            experience: Number(values.experience)
          });
          resetForm();
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
            this.documentId = driver.id;
            this.formData = {
              name: driver.name,
              licenseNumber: driver.licenseNumber,
              experience: driver.experience
            };
          }
        } catch (error) {
          this.error = 'Failed to load driver data';
        }
      }
    }
  },
  created() {
    this.loadDriverData();
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

.form-control:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
}

.form-select {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
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
