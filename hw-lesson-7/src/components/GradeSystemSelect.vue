<template>
    <select v-model="selectedSystem" :disabled="isDisabled">
        <option v-for="{ id, name } in systems" :key="id" :value="id">
            {{ isDisabled ? '' : name }}
        </option>
    </select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SYSTEMS, CATEGORIES } from '../constants/grades'

export default {
    data: () => ({
        systems: Object.values(SYSTEMS),
    }),
    computed: {
        ...mapGetters(['filteredStudentsByCategory', 'isLoading', 'selectedCategory']),
        selectedSystem: {
            get() {
                return this.system || SYSTEMS.TWELVE.id
            },
            set(value) {
                this.changeSystem(value)
            },
        },
        hasStudents() {
            return this.filteredStudentsByCategory?.length > 0
        },
        isSpecialCategory() {
            return this.selectedCategory === CATEGORIES.SPECIAL.id
        },
        isDisabled() {
            return this.isLoading || this.isSpecialCategory || !this.hasStudents
        },
    },
    methods: {
        ...mapActions(['changeSystem']),
    },
}
</script>

<style scoped>
select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f5f5f5;
}

select:disabled option {
    color: transparent;
}
</style>
