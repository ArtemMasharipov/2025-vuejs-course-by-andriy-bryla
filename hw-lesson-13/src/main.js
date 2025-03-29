import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import EmptyLayout from './layouts/EmptyLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

const app = createApp(App)

app.component('MainLayout', MainLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.use(store)
app.mount('#app')
