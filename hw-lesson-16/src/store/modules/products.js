import { createFirestoreAction, executeApiAction } from '@/services/api/apiActions';
import { productsDb } from '@/services/firebase/firestore';
import { createProduct, deleteProduct as deleteProductService, updateProduct } from '@/services/productService';

export default {
  namespaced: true,
  
  state: () => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
  }),
  
  getters: {
    products: state => state.products,
    selectedProduct: state => state.selectedProduct,
    loading: state => state.loading,
    error: state => state.error
  },
  
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    setError(state, error) {
      state.error = error;
    },
    
    addProduct(state, product) {
      state.products.push(product);
    },
    
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      index !== -1 && state.products.splice(index, 1, updatedProduct);
      
      if (state.selectedProduct?.id === updatedProduct.id) {
        state.selectedProduct = updatedProduct;
      }
    },
    
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
      state.selectedProduct?.id === productId && (state.selectedProduct = null);
    }
  },
  
  actions: {
    fetchProducts({ commit }) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const products = await productsDb.getAll();
          commit('setProducts', products);
          return products;
        },
        onError: (error) => {
          console.error('Error fetching products:', error);
        }
      });
    },
    
    fetchProduct({ commit }, productId) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          const product = await productsDb.getById(productId);
          commit('setSelectedProduct', product);
          return product;
        },
        onError: (error) => {
          console.error('Error fetching product:', error);
        }
      });
    },
    
    addProduct: createFirestoreAction({
      operation: (productData) => createProduct(productData),
      commitType: 'addProduct',
      toast: {
        success: 'productAdded',
        error: 'error.default'
      }
    }),
    
    updateProduct: createFirestoreAction({
      operation: ({ id, data }) => {
        if (!id) throw new Error('Product ID for update is not specified');
        if (!data || typeof data !== 'object') throw new Error('No data provided for product update');
        return updateProduct(id, data);
      },
      commitType: 'updateProduct',
      toast: {
        success: 'productUpdated',
        error: 'error.productUpdateFailed'
      }
    }),
    
    deleteProduct({ commit, dispatch }, productId) {
      return executeApiAction({
        commit,
        actionFunction: async () => {
          await deleteProductService(productId);
          
          try {
            const { cartRepository } = await import('@/services/firebase/firestore');
            const cartsAffected = await cartRepository.removeProductFromAllCarts(productId);
            
            if (cartsAffected > 0) {
              dispatch('cart/loadCartFromFirestore', null, { root: true });
            }
          } catch (error) {
            console.error('Error removing product from carts:', error);
          }
          
          commit('deleteProduct', productId);
          return { id: productId };
        },
        toast: {
          success: 'productDeleted',
          error: 'error.productDeleteFailed'
        }
      });
    }
  }
};