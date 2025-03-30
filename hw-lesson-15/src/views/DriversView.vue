<template>
  <div class="drivers-view">
    <h1>Drivers Management</h1>
    <p class="lead">View, add, edit and delete drivers information</p>
    
    <entity-layout module="drivers">
      <router-view />
    </entity-layout>
  </div>
</template>

<script>
export default {
  name: 'DriversView'
}
</script>
