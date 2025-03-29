<template>
  <div class="products-editor">
    <page-title :title="pageTitle" />
    
    <div class="back-link">
      <router-link :to="{ name: 'Products' }">&larr; Назад до продуктів</router-link>
    </div>
    
      <h3>Список товарів</h3>
      <loading-spinner v-if="isLoading" />
      <table v-else>
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Зображення</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in allProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }} грн</td>
            <td>
              <div class="product-image-thumbnail" v-if="product.imageData">
                <img :src="product.imageData" :alt="product.name" />
              </div>
              <span v-else>{{ product.image }}</span>
            </td>
            <td class="actions">
              <base-button 
                variant="success" 
                @click="navigateToEdit(product.id)"
              >
                Редагувати
              </base-button>
              <base-button 
                variant="danger" 
                @click="removeProduct(product.id)"
              >
                Видалити
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>
    
    <product-form
      :product="currentProduct"
      :is-editing="!!routeId"
      @submit="saveProduct"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import LoadingSpinner from '@/components/base/LoadingSpinner.vue';
import PageTitle from '@/components/base/PageTitle.vue';
import ProductForm from '@/components/ProductForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsEditorPage',
  components: {
    BaseButton,
    LoadingSpinner,
    PageTitle,
    ProductForm
  },
  data() {
    return {
      currentProduct: {}
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('products', ['allProducts', 'getEmptyProductTemplate']),
    
    routeId() {
      return this.$route.params.id;
    },
    
    pageTitle() {
      return this.routeId ? 'Редагувати товар' : 'Керування товарами';
    }
  },
  watch: {
    routeId: {
      immediate: true,
      handler(newId) {
        this.initializeForm(newId);
      }
    }
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'updateProduct', 'addProduct', 'removeProduct']),
    
    async saveProduct(productToSave) {
      try {
        if (this.routeId) {
          await this.updateProduct(productToSave);
        } else {
          await this.addProduct(productToSave);
        }
        
        if (this.routeId) {
          this.$router.push({ name: 'ProductsEditor' });
        } else {
          this.currentProduct = this.getEmptyProductTemplate();
        }
      } catch (error) {
        console.error('Error saving product:', error);
      }
    },
    
    navigateToEdit(productId) {
      this.$router.push({ 
        name: 'ProductsEditor', 
        params: { id: productId }
      });
    },
    
    initializeForm(id) {
      if (id) {
        const product = this.allProducts.find(p => p.id == id);
        if (product) {
          this.currentProduct = { ...product };
        } else {
          console.error(`Product with ID ${id} not found`);
          this.$router.push({ name: 'ProductsEditor' });
        }
      } else {
        this.currentProduct = this.getEmptyProductTemplate();
      }
    },
    
    cancelEdit() {
      if (this.routeId) {
        this.$router.push({ name: 'ProductsEditor' });
      } else {
        this.currentProduct = this.getEmptyProductTemplate();
      }
    }
  },
  async created() {
    await this.fetchProducts();
  }
}
</script>

<style scoped>
.products-editor {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-lg);
}

.back-link {
  margin-bottom: 20px;
  text-align: left;
}

.back-link a {
  color: #4CAF50;
  text-decoration: none;
  display: inline-block;
}

.back-link a:hover {
  text-decoration: underline;
}

.product-list {
  margin-bottom: var(--space-xl);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid var(--color-border-dark);
  padding: var(--space-sm);
  text-align: left;
}

th {
  background-color: var(--color-background-light);
}

tr:nth-child(even) {
  background-color: var(--color-background-lighter);
}

.actions {
  display: flex;
  gap: var(--space-sm);
}

.product-image-thumbnail {
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-thumbnail img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
