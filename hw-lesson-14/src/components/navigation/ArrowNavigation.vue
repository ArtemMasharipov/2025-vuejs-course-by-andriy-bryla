<template>
  <div class="d-flex align-center justify-center">
    <v-btn
      variant="outlined"
      icon
      :disabled="currentPage === 1"
      @click="onPageChange(currentPage - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div class="mx-4 text-h6">{{ currentPage }} / {{ pagesNumber }}</div>
    <v-btn
      variant="outlined"
      icon
      :disabled="currentPage === pagesNumber"
      @click="onPageChange(currentPage + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ArrowNavigation',
  props: {
    pagesNumber: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    onPageChange(page) {
      this.$emit('page-change', page);
    }
  }
}
</script>
