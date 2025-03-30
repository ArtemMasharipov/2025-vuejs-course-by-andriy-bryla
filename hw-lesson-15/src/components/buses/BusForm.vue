<template>
  <div class="form-container">
    <div class="form-card">
      <h1 class="page-heading">{{ isEditing ? 'Edit Bus' : 'Add New Bus' }}</h1>
      
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      
      <Form @submit="saveBus" :validation-schema="validationSchema" v-slot="{ errors, submitCount }">
        <div class="form-group">
          <label for="model" class="form-label">Bus Model</label>
          <Field
            name="model"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.model }"
            id="model"
            v-model="formData.model"
          />
          <div v-if="submitCount > 0 && errors.model" class="invalid-feedback">{{ errors.model }}</div>
        </div>
        
        <div class="form-group">
          <label for="licensePlate" class="form-label">License Plate</label>
          <Field
            name="licensePlate"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.licensePlate }"
            id="licensePlate"
            v-model="formData.licensePlate"
          />
          <div v-if="submitCount > 0 && errors.licensePlate" class="invalid-feedback">{{ errors.licensePlate }}</div>
        </div>
        
        <div class="form-group">
          <label for="capacity" class="form-label">Capacity</label>
          <Field
            name="capacity"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': submitCount > 0 && errors.capacity }"
            id="capacity"
            v-model.number="formData.capacity"
          />
          <div v-if="submitCount > 0 && errors.capacity" class="invalid-feedback">{{ errors.capacity }}</div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
          <router-link :to="{ name: 'buses' }" class="btn btn-secondary">
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
import { busSchema } from '@/helpers/validationSchemas';

export default {
  name: 'BusForm',
  components: {
    Form,
    Field
  },
  data() {
    return {
      formData: {
        model: '',
        licensePlate: '',
        capacity: 20
      },
      documentId: null,
      loading: false,
      error: null,
      validationSchema: busSchema
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
    async saveBus(values, { resetForm }) {
      this.loading = true;
      this.error = null;
      try {
        if (this.isEditing) {
          await this.updateBus({
            itemId: this.documentId,
            data: {
              model: values.model,
              licensePlate: values.licensePlate,
              capacity: Number(values.capacity)
            }
          });
        } else {
          await this.createBus({
            model: values.model,
            licensePlate: values.licensePlate,
            capacity: Number(values.capacity)
          });
          resetForm();
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
            this.documentId = bus.id;
            this.formData = {
              model: bus.model,
              licensePlate: bus.licensePlate,
              capacity: bus.capacity
            };
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
