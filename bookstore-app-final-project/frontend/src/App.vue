<template>
    <v-app>
        <nav-bar />

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>

        <footer-layout />

        
        <DialogUI />
    </v-app>
</template>

<script>
import DialogUI from './components/layout/DialogUI.vue'
import FooterLayout from './components/layout/FooterLayout.vue'
import NavBar from './components/layout/NavBar.vue'
import { useAuthStore } from './store'

export default {
    name: 'App',
    components: {
        NavBar,
        FooterLayout,
        DialogUI,
    },
    setup() {
        const authStore = useAuthStore()

        
        authStore.restoreUserFromToken()

        return {
            authStore,
        }
    },
}
</script>

<style>

@import './assets/styles/common-variables.css';

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

.v-application {
    font-family: 'Roboto', sans-serif;
}
</style>
