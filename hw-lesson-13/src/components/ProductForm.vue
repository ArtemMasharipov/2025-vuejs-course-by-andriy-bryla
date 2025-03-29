<template>
  <base-card class="product-form">
    <h3>{{ formTitle }}</h3>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="product-name">Назва товару:</label>
        <input 
          type="text" 
          id="product-name" 
          v-model="localProduct.name"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="product-price">Ціна (грн):</label>
        <input 
          type="number" 
          id="product-price" 
          v-model="localProduct.price"
          required
          min="0"
        >
      </div>
      
      <div class="form-group">
        <label for="product-image">Зображення:</label>
        <div class="image-upload-container">
          <div class="image-preview" v-if="imagePreview">
            <img :src="imagePreview" alt="Preview" />
          </div>
          <div class="image-placeholder" v-else>
            <span>🖼️ Додати фото</span>
          </div>
          <input 
            type="file" 
            id="product-image" 
            @change="handleImageUpload"
            accept="image/*"
            class="image-input"
          >
          <base-button 
            type="button" 
            variant="secondary" 
            class="upload-btn" 
            @click="triggerFileInput"
          >
            Вибрати файл
          </base-button>
        </div>
      </div>
      
      <div class="form-buttons">
        <base-button type="button" variant="danger" @click="$emit('cancel')">Скасувати</base-button>
        <base-button type="submit" variant="primary">
          {{ submitButtonText }}
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';

export default {
  name: 'ProductForm',
  components: {
    BaseButton,
    BaseCard
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      localProduct: { ...this.product },
      imagePreview: this.product.imageData
    }
  },
  computed: {
    formTitle() {
      return this.isEditing ? 'Редагування товару' : 'Додавання нового товару';
    },
    submitButtonText() {
      return this.isEditing ? 'Зберегти зміни' : 'Додати товар';
    }
  },
  watch: {
    product: {
      handler(newVal) {
        this.localProduct = { ...newVal };
        this.imagePreview = newVal.imageData;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm() {
      const productToSave = {
        ...this.localProduct,
        price: Number(this.localProduct.price)
      };
      this.$emit('submit', productToSave);
    },
    
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.localProduct.image = file.name;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        this.localProduct.imageData = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    triggerFileInput() {
      document.getElementById('product-image').click();
    }
  }
}
</script>

<style scoped>
.product-form {
  margin-top: var(--space-xl);
}

.form-group {
  margin-bottom: var(--space-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.image-preview, .image-placeholder {
  width: 200px;
  height: 200px;
  border: 1px dashed var(--color-border-dark);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
  background-color: var(--color-background-lighter);
  overflow: hidden;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-placeholder span {
  font-size: 1.5em;
  color: var(--color-text-light);
}

.image-input {
  display: none;
}

.upload-btn {
  width: 200px;
}
</style>
