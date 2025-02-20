<template>
    <div class="car-selector">
        <h2>Car Selection System</h2>
        <div class="content-wrapper">
            <filters-panel class="filters-section" />
            <car-list class="cars-section" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import CarList from './cars/CarList.vue';
import FiltersPanel from './filters/FiltersPanel.vue';

export default {
    name: 'CarsShopManager',
    components: {
        FiltersPanel,
        CarList,
    },
    created() {
        this.initializeCars()
    },
    methods: {
        ...mapActions('carsShop', ['initializeCars'])
    }
}
</script>

<style scoped>
.car-selector {
    padding: 20px;
    max-width: 1600px;
    margin: 0 auto;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.content-wrapper {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.filters-section {
    width: 300px;
    position: sticky;
    top: 20px;
}

.cars-section {
    flex: 1;
    min-width: 0;
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }

    .filters-section {
        width: 100%;
        position: static;
    }
}
</style>
