<template>
  <tr>
    <td>{{ bus.id }}</td>
    <td>{{ bus.model }}</td>
    <td>{{ bus.licensePlate }}</td>
    <td>{{ bus.capacity }}</td>
    <td>
      <div class="flex gap-small">
        <router-link :to="{ name: 'bus-form', params: { id: bus.id } }" class="btn btn-info btn-small">
          Edit
        </router-link>
        <button @click="handleDelete" class="btn btn-danger btn-small">
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'BusItem',
  props: {
    bus: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete', this.bus.id);
    }
  }
}
</script>
