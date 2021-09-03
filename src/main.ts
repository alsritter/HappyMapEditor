import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App).use(router).use(ElementPlus);
app.mount('#app');
