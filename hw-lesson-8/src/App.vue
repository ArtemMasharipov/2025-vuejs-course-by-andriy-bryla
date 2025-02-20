<template>
    <div class="container">
        <task-selector />
    </div>
</template>

<script>
import TaskSelector from './components/TaskSelector.vue';

export default {
    name: 'App',
    components: {
        TaskSelector,
    },
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
