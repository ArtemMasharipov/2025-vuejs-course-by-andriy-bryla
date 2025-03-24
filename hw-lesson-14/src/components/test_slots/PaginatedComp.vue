<template>
  <div class="paginated-container">
    <div class="paginated-header">
      <slot name="header" :workersList="workersList">
        {{ title }}
      </slot>
    </div>
    <div class="paginated-content">
      <slot :currentPageWorkersList="currentPageWorkersList">
        <ol :start="startIndex">
          <li v-for="worker in currentPageWorkersList" :key="worker.id">
            {{ worker.name }}
          </li>
        </ol>
      </slot>
    </div>
    <div class="paginated-nav">
      <slot name="footer" :pagesNumber="pagesNumber" :currentPage="currentPage">
        <button
          v-for="pageNum in pagesNumber"
          :key="pageNum"
          class="paginated-btn"
          :disabled="pageNum === currentPage"
          @click="onSelectPage(pageNum)"
        >
          {{ pageNum }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginatedComp',
  props: {
    title: {
      type: String,
      default: '',
    },
    workersList: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 7,
    },
    initialPageIndex: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      currentPage: 1,
    }
  },

  watch: {
    initialPageIndex(newValue) {
      this.currentPage = newValue
    },
  },

  computed: {
    pagesNumber() {
      return Math.ceil(this.workersList.length / this.perPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage + 1
    },
    currentPageWorkersList() {
      const endIndex = this.startIndex - 1 + this.perPage
      return this.workersList.slice(this.startIndex - 1, endIndex)
    },
  },

  methods: {
    onSelectPage(pageNum) {
      this.currentPage = pageNum
    },
  },
}
</script>

<style lang="scss" scoped>
/* Component specific styles only - base styles moved to App.vue */
</style>
