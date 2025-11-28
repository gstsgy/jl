import { defineConfig } from 'vite'

export default defineConfig({
    base: '/jl/',  // 必须和仓库名一致
    optimizeDeps: {
        include: ['html2pdf.js']
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['all','5173.app.cloudstudio.work','127.0.0.1','localhost'] // 允许所有的hosts连接到Vite开发服务器
    }
  })
  