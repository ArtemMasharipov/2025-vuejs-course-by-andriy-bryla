<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Bus' : 'Add New Bus' }}</h1>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <Form @submit="saveBus" :validation-schema="validationSchema" v-slot="{ errors }">
      <div class="form-group">
        <label for="model" class="form-label">Bus Model</label>
        <Field
          name="model"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.model }"
          id="model"
          v-model="formData.model"
        />
        <div v-if="errors.model" class="invalid-feedback">{{ errors.model }}</div>
      </div>
      
      <div class="form-group">
        <label for="licensePlate" class="form-label">License Plate</label>
        <Field
          name="licensePlate"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.licensePlate }"
          id="licensePlate"
          v-model="formData.licensePlate"
        />
        <div v-if="errors.licensePlate" class="invalid-feedback">{{ errors.licensePlate }}</div>
      </div>
      
      <div class="form-group">
        <label for="capacity" class="form-label">Capacity</label>
        <Field
          name="capacity"
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errors.capacity }"
          id="capacity"
          v-model.number="formData.capacity"
        />
        <div v-if="errors.capacity" class="invalid-feedback">{{ errors.capacity }}</div>
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'buses' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </Form>
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
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
