<template>
  <v-card class="mb-4">
    <v-card-title>Filter Drivers</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="filtersData.name"
            label="Driver Name"
            variant="outlined"
            density="compact"
            @input="emitFilter"
            hide-details
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="filtersData.experienceMin"
            label="Min Experience (years)"
            variant="outlined"
            density="compact"
            type="number"
            min="0"
            @input="emitFilter"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="filtersData.experienceMax"
            label="Max Experience (years)"
            variant="outlined"
            density="compact"
            type="number"
            min="0"
            @input="emitFilter"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        color="secondary"
        @click="resetFilters"
        variant="text"
      >
        Clear Filters
      </v-btn>
    </v-card-actions>
  </v-card>
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
