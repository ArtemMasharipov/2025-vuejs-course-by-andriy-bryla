<template>
  <select 
    :value="selectedCategory" 
    :disabled="isLoading"
    @change="handleChange"
  >
    <option v-for="{ id, label } in categories" :key="id" :value="id">
      {{ label }}
    </option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { CATEGORIES } from '../constants/grades';

export default {
  data: () => ({ selectedCategory: CATEGORIES.ALL.id }),
  computed: {
    ...mapGetters(['categories', 'isLoading'])
  },
  methods: {
    ...mapActions(['changeCategory']),
    handleChange(event) {
      this.changeCategory(event.target.value);
    }
  }
};
</script>

<style scoped>
select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
}
</style>
