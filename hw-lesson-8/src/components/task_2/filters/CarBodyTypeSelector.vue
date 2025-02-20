<template>
    <div class="body-type-selector" :class="{ 'disabled': !isCarType }">
        <label class="section-label">
            Тип кузова
            <span v-if="!isCarType" class="disabled-hint">(доступно тільки для легкових авто)</span>
        </label>
        <div class="checkbox-group">
            <div v-for="type in availableBodyTypes" :key="type" class="checkbox-item"
                :class="{ 'disabled': !isCarType }">
                <input type="checkbox" :id="type" :value="type" :checked="selectedTypes.includes(type)"
                    :disabled="!isCarType" @change="handleChange(type)" />
                <label :for="type">{{ type }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CarBodyTypeSelector',
    computed: {
        ...mapGetters('carsShop', ['availableBodyTypes', 'filters']),
        selectedTypes() {
            return [...(this.filters.bodyTypes || [])]
        },
        isCarType() {
            return this.filters.transportType === 'Легкові'
        }
    },
    watch: {
        'filters.transportType'(newType) {
            if (newType !== 'Легкові' && this.selectedTypes.length) {
                this.updateFilters({ bodyTypes: [] })
            }
        }
    },
    methods: {
        ...mapActions('carsShop', ['updateFilters']),
        handleChange(type) {
            if (!this.isCarType) return

            const currentTypes = [...this.selectedTypes]
            const newTypes = currentTypes.includes(type)
                ? currentTypes.filter(t => t !== type)
                : [...currentTypes, type]

            this.updateFilters({ bodyTypes: newTypes })
        }
    }
}
</script>

<style scoped>
.body-type-selector {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.section-label {
    font-weight: 500;
    color: #666;
}

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
}

.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.disabled-hint {
    font-size: 0.8rem;
    color: #999;
    font-weight: normal;
    margin-left: 8px;
}

.checkbox-item.disabled label {
    color: #999;
}

input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.checkbox-item.disabled:hover {
    cursor: not-allowed;
}
</style>
