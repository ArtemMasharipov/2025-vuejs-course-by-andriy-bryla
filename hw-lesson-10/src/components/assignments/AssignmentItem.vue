<template>
  <tr>
    <td>{{ assignment.id }}</td>
    <td>{{ assignment.driverName }}</td>
    <td>{{ assignment.busModel }} ({{ assignment.busLicensePlate }})</td>
    <td>
      <item-actions 
        :id="assignment.id" 
        form-route-name="assignment-form" 
        @delete="handleDelete" 
      />
    </td>
  </tr>
</template>

<script>
import ItemActions from '../common/ItemActions.vue';

export default {
  name: 'AssignmentItem',
  components: {
    ItemActions
  },
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
