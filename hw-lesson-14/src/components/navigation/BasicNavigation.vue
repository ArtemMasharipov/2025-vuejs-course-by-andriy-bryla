<template>
  <div class="d-flex justify-center">
    <v-pagination
      v-model="localCurrentPage"
      :length="pagesNumber"
      :total-visible="5"
      rounded
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'BasicNavigation',
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
  data() {
    return {
      localCurrentPage: this.currentPage
    }
  },
  watch: {
    currentPage(newValue) {
      this.localCurrentPage = newValue;
    },
    localCurrentPage(newValue) {
      this.$emit('page-change', newValue);
    }
  }
}
</script>
