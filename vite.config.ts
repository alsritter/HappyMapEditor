import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0',
    port: 8991,
    // 是否开启 https
    https: false
  },
  resolve: {
    // 配置别名
    alias: {
      '@': path.join(__dirname, './src'),
      '@components': path.join(__dirname, './src/components')
    }
  }
});
