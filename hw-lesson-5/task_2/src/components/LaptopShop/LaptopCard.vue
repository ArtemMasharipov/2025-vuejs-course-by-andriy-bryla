<template>
  <div class="product-card">
    <div class="image-container">
      <img 
        :src="imageUrl"
        :alt="laptop.name"
      />
    </div>
    <div class="product-info">
      <div class="info-main">
        <h3 class="product-title">{{ laptop.name }}</h3>
        <p v-if="laptop.savings" class="savings">
          Ваша економія: <span class="savings-amount">{{ laptop.savings }} ₴</span>
        </p>
        <div class="price-container">
          <p v-if="laptop.oldPrice" class="old-price">Стара ціна: {{ laptop.oldPrice }} ₴</p>
          <p class="current-price">Ціна: {{ laptop.currentPrice }} ₴</p>
        </div>
      </div>
      <button @click="addToCart">Купити</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaptopCard',
  props: {
    laptop: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart'],
  computed: {
    imageUrl() {
      try {
        return require(`@/assets/images/${this.laptop.image}`)
      } catch (e) {
        return require('@/assets/images/no-image.png')
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.laptop);
    }
  }
}
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  overflow: hidden;
}

.image-container {
  width: 200px;
  min-width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 10px;
  border-right: 1px solid #eee;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.product-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.info-main {
  flex: 1;
}

.price-container {
  margin-top: 15px;
}

.product-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 10px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.old-price {
  font-size: 14px;
  color: #888888;
  text-decoration: line-through;
  margin: 5px 0;
  margin-bottom: 5px;
}

.current-price {
  font-size: 20px;

  font-weight: 700;
  color: #dc355c;
  margin: 10px 0;
}

.savings {
  font-size: 14px;
  color: #333;
  margin: 10px 0;
  font-weight: normal;
}

.savings-amount {
  color: #dc355c;
  font-weight: 600;

}

button {
  width: 100px;
  align-self: flex-end;
  height: 40px;
  background: #28a745;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
}

button:hover {
  background: #218838;
}

@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }

  .image-container {
    width: 100%;
    height: 150px;
    border-right: none;
    border-bottom: 1px solid #eee;
  }

  .product-info {
    padding: 15px;
  }

  button {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
