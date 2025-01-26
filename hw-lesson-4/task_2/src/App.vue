<template>
    <div id="app">
        <chat-box />
    </div>
</template>

<script>
import ChatBox from './components/ChatBox.vue'

export default {
    name: 'App',
    components: {
        ChatBox
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

body {
    margin: 0;
    padding: 0;
    background: #f5f5f5;
}

h1 {
    color: #42b983;
    margin-bottom: 2rem;
}
</style>
