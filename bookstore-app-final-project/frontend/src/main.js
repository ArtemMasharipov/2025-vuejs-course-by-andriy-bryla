import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store'
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#42b983',
                    secondary: '#2c3e50',
                    error: '#dc3545',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                },
            },
        },
    },
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).use(vuetify).use(ToastPlugin, {
    position: 'top-right',
    duration: 5000,
    dismissible: true,
    pauseOnHover: true,
})

const authStore = useAuthStore()
authStore.initialize().then(() => {
    app.mount('#app')
})
