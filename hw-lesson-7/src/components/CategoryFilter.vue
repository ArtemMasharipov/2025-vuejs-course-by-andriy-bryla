<template>
    <select v-model="currentCategory" :disabled="isLoading">
        <option v-for="{ id, label } in categories" :key="id" :value="id">
            {{ label }}
        </option>
    </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CATEGORIES } from '../constants/grades'

export default {
    computed: {
        ...mapGetters(['categories', 'isLoading']),
        currentCategory: {
            get() {
                return this.selectedCategory || CATEGORIES.ALL.id
            },
            set(value) {
                this.changeCategory(value)
            },
        },
    },
    methods: {
        ...mapActions(['changeCategory']),
    },
}
</script>

<style scoped>
select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f5f5f5;
}
</style>
