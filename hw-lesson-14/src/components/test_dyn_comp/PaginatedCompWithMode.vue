<template>
  <div class="paginated-container">
    <div class="paginated-header">
      <slot name="header" :workersList="workersList">
        {{ title }}
      </slot>
    </div>
    <div class="paginated-content">
      <slot :currentPageWorkersList="currentPageWorkersList">
        <component
          :is="currentListView"
          :currentPageWorkersList="currentPageWorkersList"
          :startIndex="startIndex"
        />
      </slot>
    </div>
    <div class="paginated-nav">
      <slot name="footer" :pagesNumber="pagesNumber" :currentPage="currentPage">
        <component 
          :is="currentNavigationView" 
          :pagesNumber="pagesNumber" 
          :currentPage="currentPage"
          @page-change="onSelectPage"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import ArrowNavigation from '../navigation/ArrowNavigation.vue'
import BasicNavigation from '../navigation/BasicNavigation.vue'
import ListExp from './components/ListExp.vue'
import OrderedList from './components/OrderedList.vue'

export default {
  name: 'PaginatedCompWithMode',

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
    mode: {
      type: Number,
      default: 1,
    },
    navMode: {
      type: String,
      default: 'basic', // 'basic' or 'arrow'
    },
    initialPageIndex: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      currentPage: this.initialPageIndex,
    }
  },

  watch: {
    initialPageIndex(newValue) {
      this.currentPage = newValue
    },
  },

  computed: {
    currentListView() {
      switch (this.mode) {
        case 1:
          return OrderedList
        default:
          return ListExp
      }
    },
    currentNavigationView() {
      switch (this.navMode) {
        case 'arrow':
          return ArrowNavigation
        default:
          return BasicNavigation
      }
    },
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
