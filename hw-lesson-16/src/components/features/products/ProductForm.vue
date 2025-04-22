<template>
  <v-card class="product-form">
    <v-card-title>
      {{ product.id ? $t('products.edit') : $t('products.add') }}
    </v-card-title>
    
    <v-card-text>
      <Form v-slot="{ errors }" :validation-schema="schema" :initial-values="form">
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
      </Form>
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
import { createProductSchema, getEmptyProductForm, prepareProductData } from '@/services/utils/validation/schemas/productSchema';
import { Form } from 'vee-validate';

export default {
  name: 'ProductForm',
  
  components: {
    Form
  },
  
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
      schema: null
    };
  },
  
  created() {
    this.schema = createProductSchema(this.$t.bind(this));
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
    },
    
    validateAndSubmit(event) {
      if (event) event.preventDefault();
      
      if (this.loading) {
        return;
      }
      
      this.schema.validate(this.form)
        .then(validData => {
          this.loading = true;
          const productData = prepareProductData(this.form, this.product.id);
          this.$emit('submit', productData);
        })
        .catch(() => {
          // Ошибки валидации будут автоматически отображены через VeeValidate
        });
    }
  }
};
</script>

<style scoped>
.product-form {
  padding: 16px;
}
</style>