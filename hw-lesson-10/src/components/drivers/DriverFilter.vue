<template>
  <div class="card margin-bottom">
    <div class="card-body">
      <h5 class="card-title">Filter Drivers</h5>
      
      <div class="row">
        <div class="col-4">
          <label for="nameFilter" class="form-label">Driver Name</label>
          <input 
            type="text" 
            id="nameFilter" 
            class="form-control" 
            v-model="filtersData.name" 
            @input="emitFilter"
          >
        </div>
        
        <div class="col-4">
          <label for="experienceMinFilter" class="form-label">Min Experience (years)</label>
          <input 
            type="number" 
            id="experienceMinFilter" 
            class="form-control" 
            v-model.number="filtersData.experienceMin" 
            min="0"
            @input="emitFilter"
          >
        </div>

        <div class="col-4">
          <label for="experienceMaxFilter" class="form-label">Max Experience (years)</label>
          <input 
            type="number" 
            id="experienceMaxFilter" 
            class="form-control" 
            v-model.number="filtersData.experienceMax" 
            min="0"
            @input="emitFilter"
          >
        </div>
      </div>
      
      <div class="flex justify-end margin-top">
        <button class="btn btn-secondary" @click="resetFilters">
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DriverFilter',
  data() {
    return {
      filtersData: {
        name: '',
        experienceMin: null,
        experienceMax: null
      }
    };
  },
  computed: {
    filters() {
      return this.$store.state.drivers.filters;
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.filtersData = { ...newFilters };
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('drivers', ['setFilters', 'setFiltersDebounced']),
    emitFilter() {
      this.setFiltersDebounced({ ...this.filtersData });
    },
    resetFilters() {
      this.filtersData = {
        name: '',
        experienceMin: null,
        experienceMax: null
      };
      this.setFilters({ ...this.filtersData });
    }
  }
};
</script>
