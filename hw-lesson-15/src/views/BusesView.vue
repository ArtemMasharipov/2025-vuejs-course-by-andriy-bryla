<template>
  <div>
    <h1 class="page-heading">Buses Management</h1>
    <p class="page-description">View, add, edit and delete bus information</p>
    
    <entity-layout module="buses">
      <router-view />
    </entity-layout>
  </div>
</template>

<script>
export default {
  name: 'BusesView'
}
</script>
