<template>
  <div class="product-card">
    <div class="product-icon">{{ product.itemImg }}</div>
    <div class="product-info">
      <h3 class="product-title">{{ product.name }}</h3>
      <div class="product-price">{{ product.price.toFixed(2) }} ₴</div>
      <div class="product-description">{{ truncateDescription(product.description) }}</div>
      
      <div class="product-meta">
        <div class="stock" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }">
          {{ product.inStock ? 'В наявності' : 'Немає в наявності' }}
        </div>
        <div class="rating">Рейтинг: {{ product.rating }}/5</div>
      </div>
      
      <div class="product-actions">
        <button class="edit-button" @click="editProduct">Редагувати</button>
        <button class="delete-button" @click="deleteProduct">Видалити</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-card',
  props: {
    product: { 
      type: Object, 
      required: true 
    }
  },
  
  methods: {
    truncateDescription(text, maxLength = 100) {
      return text?.length > maxLength ? `${text.substr(0, maxLength)}...` : text;
    },
    
    editProduct() {
      const categoryId = this.$route.params.categoryId;
      this.$router.push({
        name: 'ProductForm',
        params: { id: String(this.product.id) },
        query: { categoryId }
      });
    },
    
    deleteProduct() {
      this.$emit('delete', this.product.id);
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background-color: #fff;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-icon {
  font-size: 3em;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
}

.product-info {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  margin-top: 0;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-description {
  color: #666;
  flex: 1;
  margin-bottom: 15px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.in-stock {
  color: green;
}

.out-of-stock {
  color: red;
}

.product-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.edit-button {
  background-color: #4c8bf5;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>
