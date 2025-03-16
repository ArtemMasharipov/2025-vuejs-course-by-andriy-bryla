<template>
  <tr>
    <td>{{ bus.id }}</td>
    <td>{{ bus.model }}</td>
    <td>{{ bus.licensePlate }}</td>
    <td>{{ bus.capacity }}</td>
    <td>
      <item-actions 
        :id="bus.id" 
        form-route-name="bus-form" 
        @delete="handleDelete" 
      />
    </td>
  </tr>
</template>

<script>
import ItemActions from '../common/ItemActions.vue';

export default {
  name: 'BusItem',
  components: {
    ItemActions
  },
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
