<template>
    <div ref="filtersContainer" class="filters">
        <div class="filter-controls">
            <select v-model="filters.availability" class="filter-select" @change="updateFilters">
                <option value="all">Всі товари</option>
                <option value="available">В наявності</option>
                <option value="unavailable">Немає в наявності</option>
            </select>
            <select v-model="filters.sortBy" class="filter-select" @change="updateFilters">
                <option value="name">За назвою</option>
                <option value="priceAsc">Ціна (від нижчої)</option>
                <option value="priceDesc">Ціна (від вищої)</option>
            </select>
        </div>
        <div class="search-box">
            <input 
                ref="searchInput"
                v-model="filters.searchQuery" 
                type="text" 
                placeholder="Пошук товарів..."
                class="search-input"
                @input="updateFilters"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductFilters',
    emits: ['filter-change'],
    data() {
        return {
            filters: {
                searchQuery: '',
                availability: 'all',
                sortBy: 'name'
            }
        }
    },
    watch: {
        'filters.availability'() {
            this.updateFilters()
        },
        'filters.sortBy'() {
            this.updateFilters()
        }
    },
    mounted() {
        this.$refs.searchInput.focus()
    },
    methods: {
        updateFilters() {
            this.$emit('filter-change', { ...this.filters })
        }
    }
}
</script>

<style scoped>
.filters {
    display: flex;
    gap: calc(var(--spacing-unit) * 2);
    margin: calc(var(--spacing-unit) * 2) 0;
    justify-content: space-between;
}

.filter-controls {
    display: flex;
    gap: var(--spacing-unit);
    flex: 0 0 auto;
}

.search-box {
    flex: 0 1 300px;
    min-width: 200px;
    padding-right: calc(var(--spacing-unit) * 2);
    box-sizing: border-box;
}

.search-input {
    width: 100%;
    padding: var(--spacing-unit);
    border: 1px solid #ddd;
    border-radius: calc(var(--border-radius) / 2);
    font-size: 1em;
    box-sizing: border-box;
}

.filter-select {
    padding: var(--spacing-unit);
    border: 1px solid #ddd;
    border-radius: calc(var(--border-radius) / 2);
    background-color: white;
    min-width: 180px;
    max-width: 200px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .filters {
        flex-direction: column;
    }

    .filter-controls {
        flex-direction: column;
        width: 100%;
    }

    .filter-select {
        width: 100%;
        max-width: none;
    }

    .search-box {
        width: 100%;
        flex: none;
        padding-right: 0;
    }
}
</style>
