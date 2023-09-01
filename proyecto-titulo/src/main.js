import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js';

// Import our custom CSS
import '@/assets/scss/styles.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');
