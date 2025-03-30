import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { setupValidation } from './plugins/validation'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import EntityLayout from './layouts/EntityLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

setupValidation()

const app = createApp(App)

app.component('MainLayout', MainLayout)
app.component('EntityLayout', EntityLayout)

app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
