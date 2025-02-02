<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="imageUrl" :alt="product.name">
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="store-availability">
        <span class="store-label">{{ product.storeIcon }} {{ product.store }}</span>
        <span v-if="product.availability" class="availability">В наявності</span>
        <span v-else class="availability out-of-stock">Немає в наявності</span>
      </div>
      <p class="product-description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    imageUrl() {
      try {
        return require(`../assets/images/${this.product.image}`)
      } catch (e) {
        return require('../assets/images/no-image.png')
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 250px;
  max-width: 300px;
  max-height: 400px;
  margin: 0 auto;
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0;
}

.store-availability {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.store-label {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.availability {
  font-size: 14px;
  font-weight: 600;
  color: #28a745;
}

.availability.out-of-stock {
  color: #dc3545;
  text-decoration: line-through;
}

.product-description {
  font-size: 14px;
  color: #555;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
