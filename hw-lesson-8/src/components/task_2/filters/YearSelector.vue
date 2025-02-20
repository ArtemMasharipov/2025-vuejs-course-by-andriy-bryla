<template>
    <div class="year-selector">
        <label>Рік випуску:</label>
        <div class="year-inputs">
            <div class="year-input">
                <input type="number" v-model.number="yearFrom" placeholder="Від" min="1900" :max="currentYear" />
            </div>
            <div class="year-input">
                <input type="number" v-model.number="yearTo" placeholder="До" :min="yearFrom || 1900"
                    :max="currentYear" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'YearSelector',
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    },
    computed: {
        ...mapGetters('carsShop', ['filters']),
        yearFrom: {
            get() {
                return this.filters.yearFrom
            },
            set(value) {
                this.updateFilters({ yearFrom: value === '' ? null : Number(value) })
            }
        },
        yearTo: {
            get() {
                return this.filters.yearTo
            },
            set(value) {
                this.updateFilters({ yearTo: value === '' ? null : Number(value) })
            }
        }
    },
    methods: {
        ...mapActions('carsShop', ['updateFilters'])
    }
}
</script>

<style scoped>
.year-selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.year-inputs {
    display: flex;
    gap: 16px;
}

.year-input {
    flex: 1;
}

input {
    width: 100%;
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
