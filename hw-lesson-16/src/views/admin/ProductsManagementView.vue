<template>
  <div>
    <v-row class="mb-4 d-flex align-center">
      <v-col>
        <h2 class="text-h5">{{ $t('admin.productsManagement') }}</h2>
      </v-col>
      <v-col class="text-right">
        <v-btn
          color="success"
          prepend-icon="mdi-plus"
          @click="openProductForm()"
        >
          {{ $t('admin.addProduct') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-text-field
      v-model="search"
      :label="$t('common.search')"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      clearable
      class="mb-4"
    ></v-text-field>

    <div v-if="loading" class="d-flex justify-center my-5">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>

    <v-alert v-else-if="!filteredProducts.length" type="info" class="my-4">
      {{ search ? $t('admin.noProductsFound') : $t('admin.noProducts') }}
    </v-alert>

    <div v-else>
      <admin-product-item
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @edit="editProduct"
        @delete="confirmDelete"
      />
    </div>

    <v-dialog v-model="dialogs.product.open" max-width="600" persistent>
      <product-form
        :product="dialogs.product.item"
        :loading="dialogs.product.loading"
        @submit="saveProduct"
        @cancel="closeDialog({}, 'product')"
      />
    </v-dialog>

    <v-dialog v-model="dialogs.delete.open" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          {{ $t('admin.deleteConfirmation') }}
        </v-card-title>

        <v-card-text>
          {{ dialogs.delete.item.title }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog({}, 'delete')">
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="deleteProduct"
            :loading="dialogs.delete.loading"
          >
            {{ $t('common.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AdminProductItem from '@/components/features/admin/AdminProductItem.vue';
import ProductForm from '@/components/features/products/ProductForm.vue';
import dialogHandlerMixin from '@/mixins/dialogHandlerMixin';
import { checkProductsAccess, cleanProductData, getEmptyProduct } from '@/services/productService';
import { formatPrice } from '@/services/utils/formatters';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsManagementView',

  mixins: [dialogHandlerMixin],

  components: {
    ProductForm,
    AdminProductItem
  },

  data() {
    return {
      search: '',
      accessChecked: false
    };
  },

  created() {
    this.initDialog('product', {
      open: false,
      loading: false,
      item: {}
    });

    this.initDialog('delete', {
      open: false,
      loading: false,
      item: {}
    });
  },

  computed: {
    ...mapGetters({
      products: 'products/products',
      loading: 'products/loading',
      error: 'products/error'
    }),

    filteredProducts() {
      if (!this.search) return this.products;

      const searchTerm = this.search.toLowerCase();
      return this.products.filter(product => {
        return (
          (product.title && product.title.toLowerCase().includes(searchTerm)) ||
          (product.description && product.description.toLowerCase().includes(searchTerm))
        );
      });
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductAction: 'products/addProduct',
      updateProductAction: 'products/updateProduct',
      deleteProductAction: 'products/deleteProduct'
    }),

    formatPrice,

    openProductForm(product = null) {
      const productData = product ? { ...product } : getEmptyProduct();
      this.openDialog(productData, {}, 'product');
    },

    editProduct(product) {
      this.openProductForm(product);
    },

    async saveProduct(productData) {
      if (this.dialogs.product.loading) {
        return;
      }

      this.setDialogLoading(true, 'product');

      try {
        const cleanedData = cleanProductData(productData);

        if (!cleanedData) {
          throw new Error('Invalid product data');
        }

        if (this.dialogs.product.item.id) {
          if (!cleanedData.id) {
            cleanedData.id = this.dialogs.product.item.id;
          }
          await this.updateProductAction({
            id: cleanedData.id,
            data: cleanedData
          });
        } else {
          await this.addProductAction(cleanedData);
        }

        this.closeDialog({}, 'product');
      } catch (error) {
      } finally {
        this.setDialogLoading(false, 'product');
      }
    },

    confirmDelete(product) {
      this.openDialog(product, {}, 'delete');
    },

    async deleteProduct() {
      const productId = this.dialogs.delete.item.id;

      if (!productId) {
        return;
      }

      this.setDialogLoading(true, 'delete');

      try {
        await this.deleteProductAction(productId);
        this.closeDialog({}, 'delete');
      } catch (error) {
      } finally {
        this.setDialogLoading(false, 'delete');
      }
    },

    async checkAccessAndLoadProducts() {
      const hasAccess = await checkProductsAccess();
      this.accessChecked = true;

      if (hasAccess && this.products.length === 0) {
        this.fetchProducts();
      } else if (!hasAccess) {
        this.$router.push({ name: 'home' });
      }
    }
  },

  async mounted() {
    await this.checkAccessAndLoadProducts();
  }
};
</script>