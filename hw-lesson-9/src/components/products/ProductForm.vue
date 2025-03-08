<template>
  <div class="product-form-container">
    <h2>{{ isEditing ? 'Редагувати товар' : 'Додати новий товар' }}</h2>
    
    <form @submit.prevent="saveProduct" class="product-form">
      <div class="form-group">
        <label for="name">Назва товару:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="price">Ціна (₴):</label>
        <input
          id="price"
          v-model="form.price"
          type="number"
          step="0.01"
          min="0"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="description">Опис:</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="itemImg">Іконка (емодзі):</label>
        <input
          id="itemImg"
          v-model="form.itemImg"
          type="text"
          placeholder="📦"
        />
      </div>
      
      <div class="form-group">
        <label for="rating">Рейтинг (1-5):</label>
        <input
          id="rating"
          v-model="form.rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          required
        />
      </div>
      
      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" v-model="form.inStock" />
          <span>В наявності</span>
        </label>
      </div>
      
      <div class="form-actions">
        <button type="button" class="cancel-button" @click="cancelEdit">Скасувати</button>
        <button type="submit" class="save-button">Зберегти</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'product-form',
  
  data() {
    return {
      form: {
        id: null,
        name: '',
        price: 0,
        description: '',
        itemImg: '📦',
        rating: 5,
        inStock: true
      }
    };
  },
  
  computed: {
    ...mapGetters('products', ['getProductById']),
    isEditing() {
      return Boolean(this.$route.params.id);
    },
    categoryId() {
      return Number(this.$route.query.categoryId);
    }
  },
  
  created() {
    if (this.isEditing) {
      const product = this.getProductById(Number(this.$route.params.id));
      if (product) {
        this.form = { ...product };
      } else {
        this.navigateToCategory();
      }
    }
  },
  
  methods: {
    ...mapActions('products', ['addOrUpdateProduct']),
    
    async saveProduct() {
      const productData = {
        ...this.form,
        price: Number(this.form.price),
        rating: Number(this.form.rating)
      };
      
      await this.addOrUpdateProduct(productData);
      this.navigateToCategory();
    },
    
    cancelEdit() {
      this.navigateToCategory();
    },
    
    navigateToCategory() {
      this.$router.push({
        name: 'CategoryProducts',
        params: { categoryId: String(this.categoryId) }
      });
    }
  }
};
</script>

<style scoped>
.product-form-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.product-form-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group input {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #5a6268;
}

.save-button:hover {
  background-color: #218838;
}
</style>
