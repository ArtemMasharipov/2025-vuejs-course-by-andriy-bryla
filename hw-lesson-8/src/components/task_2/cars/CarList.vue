<template>
    <div class="car-list">
        <div v-if="isLoading" class="loading">
            Loading...
        </div>
        <div v-else-if="!filteredCars.length" class="no-results">
            No cars found matching your criteria
        </div>
        <div v-else class="cars-grid">
            <car-card v-for="car in filteredCars" :key="car.id" :car="car" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CarCard from './CarCard.vue';

export default {
    name: 'CarList',
    components: {
        CarCard
    },
    computed: {
        ...mapGetters('carsShop', ['filteredCars', 'isLoading'])
    }
}
</script>

<style scoped>
.car-list {
    margin: 20px 0;
}

.cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.loading,
.no-results {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 1.2rem;
}
</style>
