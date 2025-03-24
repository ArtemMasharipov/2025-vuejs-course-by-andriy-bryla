<template>
  <paginated-comp
    title="Стаж працівників"
    :workers-list="workersList"
    :perPage="perPage"
    :initial-page-index="initialPageIndex"
  >
    <template #default="{ currentPageWorkersList }">
      <div v-for="worker in currentPageWorkersList" :key="worker.id">
        {{ worker.name }} - {{ worker.experience }}
      </div>
    </template>
  </paginated-comp>
</template>

<script>
import PaginatedComp from './PaginatedComp.vue'
export default {
  name: 'PaginatedCompExp',

  components: {
    PaginatedComp,
  },

  props: {
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
}
</script>

<style lang="scss" scoped></style>
