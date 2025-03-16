<template>
  <tr>
    <td>{{ driver.id }}</td>
    <td>{{ driver.name }}</td>
    <td>{{ driver.licenseNumber }}</td>
    <td>{{ driver.experience }}</td>
    <td>
      <item-actions 
        :id="driver.id" 
        form-route-name="driver-form" 
        @delete="handleDelete" 
      />
    </td>
  </tr>
</template>

<script>
import ItemActions from '../common/ItemActions.vue';

export default {
  name: 'DriverItem',
  components: {
    ItemActions
  },
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
