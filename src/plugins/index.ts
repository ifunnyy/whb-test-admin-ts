import { App } from 'vue'
import setupPinia from './pinia'

// 插件管理（vue）
export function setupPlugins(app: App) {
    setupPinia(app)
}
