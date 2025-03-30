<template>
  <div class="assignments-view">
    <h1>Assignments Management</h1>
    <p class="lead">View, create, edit and delete assignments of drivers to buses</p>
    
    <entity-layout module="assignments">
      <router-view />
    </entity-layout>
  </div>
</template>

<script>
export default {
  name: 'AssignmentsView'
}
</script>
