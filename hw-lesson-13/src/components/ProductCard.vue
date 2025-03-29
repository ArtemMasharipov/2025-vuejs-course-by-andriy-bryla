<template>
  <base-card class="product-card">
    <slot name="badge"></slot>
    
    <div class="product-image">
      <slot name="image">
        <img v-if="product.imageData" :src="product.imageData" :alt="product.name" class="actual-image" />
        <div v-else class="placeholder-image">{{ productEmoji }}</div>
      </slot>
    </div>
    
    <div class="product-content">
      <slot name="title">
        <h3>{{ product.name }}</h3>
      </slot>
      
      <slot name="price">
        <p class="price">{{ displayPrice }}</p>
      </slot>
      
      <slot name="content"></slot>
      
      <slot></slot>
      
      <div class="product-actions">
        <slot name="actions">
          <base-button variant="primary" full-width>
            Купити
          </base-button>
        </slot>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';

export default {
  name: 'ProductCard',
  components: {
    BaseButton,
    BaseCard
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    productEmoji() {
      return this.getProductEmoji(this.product.name);
    },
    displayPrice() {
      return this.formatProductPrice(this.product.price);
    }
  },
  methods: {
    getProductEmoji(productName) {
      const emojiMap = {
        'Макарони': '🍝',
        'Ковбаса': '🥓',
        'Хліб': '🍞',
        'Сир': '🧀',
        'Політ': '✈️',
        'Надійність': '🛡️',
        'Швидка': '🚀',
        'Економ': '💰',
        'default': '📦'
      };
      return emojiMap[productName] || emojiMap.default;
    },
    
    formatProductPrice(price) {
      return typeof price === 'number' ? 
        `${price} грн.` : price;
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 200px;
  margin: var(--space-sm);
  transition: transform var(--transition-fast);
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.placeholder-image {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-color: var(--color-background-lighter);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  color: var(--color-text-light);
  border-radius: var(--border-radius-sm);
}

.actual-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-content {
  padding-top: var(--space-sm);
}

h3 {
  margin: var(--space-sm) 0;
  font-size: var(--font-size-base);
}

.price {
  color: var(--color-primary);
  font-weight: bold;
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
}

.product-actions {
  margin-top: var(--space-md);
}
</style>
