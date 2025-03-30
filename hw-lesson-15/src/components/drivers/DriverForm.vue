<template>
  <div class="form-container">
    <h1 class="page-heading">{{ isEditing ? 'Edit Driver' : 'Add New Driver' }}</h1>
    
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <Form @submit="saveDriver" :validation-schema="validationSchema" v-slot="{ errors }">
      <div class="form-group">
        <label for="name" class="form-label">Driver Name</label>
        <Field
          name="name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          id="name"
          v-model="formData.name"
        />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <label for="licenseNumber" class="form-label">License Number</label>
        <Field
          name="licenseNumber"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.licenseNumber }"
          id="licenseNumber"
          v-model="formData.licenseNumber"
        />
        <div v-if="errors.licenseNumber" class="invalid-feedback">{{ errors.licenseNumber }}</div>
      </div>
      
      <div class="form-group">
        <label for="experience" class="form-label">Experience (years)</label>
        <Field
          name="experience"
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errors.experience }"
          id="experience"
          v-model.number="formData.experience"
        />
        <div v-if="errors.experience" class="invalid-feedback">{{ errors.experience }}</div>
      </div>
      
      <div class="flex gap-small">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
        <router-link :to="{ name: 'drivers' }" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </Form>
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
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
