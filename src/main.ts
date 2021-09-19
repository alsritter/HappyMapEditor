import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus, { ElIcon } from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App).use(router).use(ElementPlus).use(ElIcon);
app.mount('#app');
