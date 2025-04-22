<template>
  <v-card class="base-product-item" :class="cardClass">
    <div class="d-flex" :class="layout === 'horizontal' ? 'align-center pa-3' : 'flex-column'">
      <div :class="imageContainerClass">
        <slot name="image">
          <v-img
            :src="item.imageUrl || fallbackImage"
            :height="layout === 'horizontal' ? '80' : '200'"
            :width="layout === 'horizontal' ? '80' : '100%'"
            :cover="true"
          ></v-img>
        </slot>
      </div>
      
      <div :class="contentContainerClass">
        <slot name="header">
          <h3 class="text-h6">{{ item.title }}</h3>
        </slot>
        
        <slot name="content">
          <p class="text-body-2" :class="{'text-truncate': truncate}" :style="truncate ? 'max-width: 400px;' : ''">
            {{ item.description }}
          </p>
        </slot>
        
        <slot name="price">
          <v-chip color="primary" class="mt-2">
            {{ formatPrice(item.price) }}
          </v-chip>
        </slot>
      </div>
      
      <slot name="actions"></slot>
    </div>
  </v-card>
</template>

<script>
import { formatCurrency } from '@/services/utils/formatters';

export default {
  name: 'BaseProductItem',
  
  props: {
    item: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'vertical',
      validator: (val) => ['horizontal', 'vertical'].includes(val)
    },
    cardClass: {
      type: String,
      default: ''
    },
    truncate: {
      type: Boolean,
      default: false
    },
    fallbackImage: {
      type: String,
      default: 'https://placehold.co/500x500?text=No+Image'
    }
  },
  
  computed: {
    imageContainerClass() {
      return this.layout === 'horizontal' 
        ? 'flex-shrink-0 me-3' 
        : '';
    },
    
    contentContainerClass() {
      return this.layout === 'horizontal' 
        ? 'flex-grow-1' 
        : 'pa-3';
    }
  },
  
  methods: {
    formatPrice(price) {
      return formatCurrency(price, this.$i18n.locale);
    }
  }
};
</script>

<style scoped>
.base-product-item {
  transition: all 0.2s ease;
}

.base-product-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>