<template>
  <v-card class="product-form">
    <v-card-title>
      {{ product.id ? $t('products.edit') : $t('products.add') }}
    </v-card-title>
    
    <v-card-text>
      <v-form @submit.prevent="validateAndSubmit">
        <v-text-field
          v-model="form.title"
          :label="$t('products.form.title')"
          :error-messages="errors.title"
          required
          autofocus
        ></v-text-field>
        
        <v-textarea
          v-model="form.description"
          :label="$t('products.form.description')"
          :error-messages="errors.description"
          rows="3"
          required
        ></v-textarea>
        
        <v-text-field
          v-model.number="form.price"
          :label="$t('products.form.price')"
          :error-messages="errors.price"
          type="number"
          step="0.01"
          min="0"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="form.imageUrl"
          :label="$t('products.form.imageUrl')"
          :error-messages="errors.imageUrl"
          type="url"
          hint="https://example.com/image.jpg"
        ></v-text-field>
        
        <div v-if="form.imageUrl" class="text-center my-4">
          <v-img
            :src="form.imageUrl"
            max-height="200"
            contain
            class="mx-auto"
          ></v-img>
        </div>
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="grey-lighten-1"
        variant="text"
        @click="$emit('cancel')"
      >
        {{ $t('common.cancel') }}
      </v-btn>
      <v-btn
        color="primary"
        @click="validateAndSubmit"
        :loading="loading"
      >
        {{ $t('common.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
    getEmptyProductErrors,
    getEmptyProductForm,
    prepareProductData,
    validateProductForm
} from '@/services/utils/validation/productFormValidation';

export default {
  name: 'ProductForm',
  
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      loading: false,
      form: getEmptyProductForm(),
      errors: getEmptyProductErrors()
    };
  },
  
  watch: {
    product: {
      handler(newProduct) {
        this.resetForm();
        if (newProduct) {
          this.form = { ...newProduct };
        }
      },
      immediate: true
    }
  },
  
  methods: {
    resetForm() {
      this.form = getEmptyProductForm();
      this.clearErrors();
    },
    
    clearErrors() {
      this.errors = getEmptyProductErrors();
    },
    
    validate() {
      const { errors, isValid } = validateProductForm(this.form, this.$t.bind(this));
      this.errors = errors;
      return isValid;
    },
    
    validateAndSubmit(event) {
      if (event) event.preventDefault();
      
      if (this.loading) {
        return;
      }
      
      if (this.validate()) {
        this.loading = true;
        
        const productData = prepareProductData(this.form, this.product.id);
        
        this.$emit('submit', productData);
      }
    }
  }
};
</script>

<style scoped>
.product-form {
  padding: 16px;
}
</style>