import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './assets/main.css'

import App from './App.vue'
import MasterPageLayout from './layouts/MasterPageLayout.vue'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#606C38',
                    secondary: '#5CBBF6',
                    accent: '#ff4081',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                },
            },
        },
    },
});

const app = createApp(App)

// Register MasterPageLayout globally
app.component('MasterPageLayout', MasterPageLayout)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
