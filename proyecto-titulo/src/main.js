import { createApp } from 'vue';
import App from './App.vue'
import router from './router';
// Import our custom CSS
import '../src/assets/scss/styles.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');
