<template>
  <div class="laptop-list">
    <loading-spinner v-if="isLoading" />
    <template v-else>
      <laptop-card
        v-for="laptop in laptops"
        :key="laptop.id"
        :laptop="laptop"
        @add-to-cart="addToCart"
      />
    </template>
  </div>
</template>

<script>
import LaptopCard from '@/components/LaptopShop/LaptopCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { fetchLaptopsFromDB } from '@/services/api'

export default {
  name: 'LaptopList',
  components: {
    LaptopCard,
    LoadingSpinner
  },
  emits: ['add-to-cart'],
  data() {
    return {
      laptops: [],
      isLoading: true
    }
  },
  async created() {
    try {
      this.laptops = await fetchLaptopsFromDB()
    } catch (error) {
      console.error('Error loading laptops:', error.message)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    addToCart(laptop) {
      this.$emit('add-to-cart', laptop);
    }
  }
}
</script>

<style scoped>
.laptop-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
