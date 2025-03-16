<template>
  <div class="flex gap-small">
    <router-link :to="{ name: formRouteName, params: { id } }" class="btn btn-info btn-small">
      Edit
    </router-link>
    <button @click="$emit('delete')" class="btn btn-danger btn-small">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'ItemActions',
  props: {
    id: {
      type: String,
      required: true
    },
    formRouteName: {
      type: String,
      required: true
    }
  },
  emits: ['delete']
}
</script>
