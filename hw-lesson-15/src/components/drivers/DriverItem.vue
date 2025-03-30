<template>
  <tr>
    <td>{{ driver.id }}</td>
    <td>{{ driver.name }}</td>
    <td>{{ driver.licenseNumber }}</td>
    <td>{{ driver.experience }}</td>
    <td>
      <div class="flex gap-small">
        <router-link :to="{ name: 'driver-form', params: { id: driver.id } }" class="btn btn-info btn-small">
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
  name: 'DriverItem',
  props: {
    driver: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete', this.driver.id);
    }
  }
}
</script>
