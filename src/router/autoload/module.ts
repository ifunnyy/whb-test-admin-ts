import { RouteRecordRaw } from 'vue-router'

// 加载 module 里面定义的路由
export default function autoloadModuleRoutes(): RouteRecordRaw[] {
    const modules = import.meta.globEager('../module/**/*.ts')
    let routes: RouteRecordRaw[] = []

    Object.values(modules).forEach(value => {
        routes.push(value.default)
    })
    return routes
}
