<template>
    <div class="selector">
        <label>Тип транспорту:</label>
        <select v-model="selectedType">
            <option value="">Оберіть тип транспорту</option>
            <option v-for="type in availableTransportTypes" :key="type" :value="type">
                {{ type }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TransportTypeSelector',
    computed: {
        ...mapGetters('carsShop', ['availableTransportTypes', 'filters']),
        selectedType: {
            get() {
                return this.filters.transportType
            },
            set(value) {
                this.updateFilters({ transportType: value })
            }
        }
    },
    methods: {
        ...mapActions('carsShop', ['updateFilters'])
    }
}
</script>

<style scoped>
.selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

label {
    font-weight: 500;
    color: #666;
}
</style>
