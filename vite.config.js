import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['all','5173.app.cloudstudio.work','127.0.0.1','localhost'] // 允许所有的hosts连接到Vite开发服务器
    }
  })
  