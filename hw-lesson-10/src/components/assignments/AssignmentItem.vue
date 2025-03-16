<template>
  <tr>
    <td>{{ assignment.id }}</td>
    <td>{{ assignment.driverName }}</td>
    <td>{{ assignment.busModel }} ({{ assignment.busLicensePlate }})</td>
    <td>
      <div class="flex gap-small">
        <router-link :to="{ name: 'assignment-form', params: { id: assignment.id } }" class="btn btn-info btn-small">
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
  name: 'AssignmentItem',
  props: {
    assignment: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete', this.assignment.id);
    }
  }
}
</script>
