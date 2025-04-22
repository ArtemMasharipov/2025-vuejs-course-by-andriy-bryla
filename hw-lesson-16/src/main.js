import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from "vue";
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa';
import 'vuetify/styles';

import App from "./App.vue";
import i18n from "./config/i18n";
import canDirective from "./directives/can";
import router from "./router";
import store from "./store";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: { fa }
  }
});

const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

const app = createApp(App);

app.directive('can', canDirective);

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .use(Toast, toastOptions);

app.mount("#app");

// Initialize localization synchronization after app is mounted
store.dispatch('localization/initLocale');
