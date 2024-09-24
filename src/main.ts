import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles

const vuetify = createVuetify(); // Create a Vuetify instance

const app = createApp(App);

app.use(router);
app.use(vuetify); // Use Vuetify

app.mount('#app');
