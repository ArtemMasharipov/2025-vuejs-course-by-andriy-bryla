<template>
  <ol :start="startIndex">
    <li v-for="worker in currentPageWorkersList" :key="worker.id">
      {{ worker.name }}
    </li>
  </ol>
</template>

<script>
export default {
  name: 'OrderedList',
  props: {
    currentPageWorkersList: {
      type: Array,
      default: () => [],
    },
    startIndex: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped></style>
