<template>
  <base-product-item 
    :item="product" 
    layout="horizontal" 
    card-class="admin-product-item mb-4"
    :truncate="true"
  >
    
    <template v-slot:actions>
      <div class="ms-3">
        <div class="d-flex">
          <v-btn 
            icon 
            size="small"
            color="primary" 
            class="me-2"
            @click="$emit('edit', product)"
          >
            <v-icon>fas fa-edit</v-icon>
          </v-btn>
          
          <v-btn 
            icon 
            size="small"
            color="error"
            @click="$emit('delete', product)"
          >
            <v-icon>fas fa-trash</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
  </base-product-item>
</template>

<script>
import BaseProductItem from '@/components/common/BaseProductItem.vue';
import { formatPrice } from '@/services/utils/formatters';

export default {
  name: 'AdminProductItem',
  
  components: {
    BaseProductItem
  },
  
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    formatPrice
  }
};
</script>

<style scoped>
.admin-product-item:hover {
  background-color: #f5f5f5;
}
</style>