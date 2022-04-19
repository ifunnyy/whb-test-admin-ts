import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupPlugins } from '@/plugins'

async function bootstrap() {
    const app = createApp(App)

    // 注册插件
    setupPlugins(app)

    // 注册路由
    setupRouter(app)

    // 等待路由加载完后再挂载页面
    await router.isReady()
    
    app.mount('#app')
}

bootstrap()