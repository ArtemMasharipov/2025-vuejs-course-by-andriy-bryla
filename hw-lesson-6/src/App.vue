<template>
    <div id="app">
        <task-selector />
    </div>
</template>

<script>
import TaskSelector from './components/TaskSelector.vue'

export default {
    name: 'App',
    components: {
        TaskSelector,
    },
}
</script>

<style>
#app {
    font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    background: #f8fafc;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

</style>
