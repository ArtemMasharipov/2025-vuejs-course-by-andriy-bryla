<template>
  <div v-for="worker in currentPageWorkersList" :key="worker.id">
    {{ worker.name }} - {{ worker.experience }}
  </div>
</template>

<script>
export default {
  name: 'ListExp',
  props: {
    currentPageWorkersList: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
