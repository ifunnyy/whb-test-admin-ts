import utils from '@/utils'
import { RouteRecordRaw } from 'vue-router'

// 如果不需要自动加载路由的可以把 .env 里面的 VITE_ROUTER_AUTOLOAD_TYPE 设置为 0
// 如果只是单个 view 不要注册为组件，则 设置 route: { auto: false }，更多配置项可以查看 route.d.ts 里的 AutoRouteConfig
/**
 * <script lang="ts">
        export default {
            route: {
                auto: false,
                path: '/xxx/xxx/xxx'
            } as AutoRouteConfig
        }
    </script>
 */
function getRoutes() {
    // vite api 下面遍历文件夹获取模块的方法
    const layouts = import.meta.globEager('../../layouts/*.vue')
    // 递归到子目录
    const views = import.meta.globEager('../../views/**/*.vue')

    const layoutRoutes: RouteRecordRaw[] = []

    Object.entries(layouts).forEach(([fileName, module]) => {
        const route = getRouteByModule(fileName, module)
        if (route === undefined) {
            return
        }
        route.children = []

        Object.entries(views).forEach(([cFileName, cModule]) => {
            const cRoute = getRouteByModule(cFileName, cModule, route)
            if (cRoute) {
                route.children!.push(cRoute)
            }
        })
        layoutRoutes.push(route)
    })

    return layoutRoutes
}

function getRouteByModule(
    fileName: string,
    module: { [key: string]: any },
    route: RouteRecordRaw | null = null
): RouteRecordRaw | undefined {
    let name = fileName.split('/').pop()!.split('.')[0]
    let path = ''

    // 看看配置中是否有不要自动加载的配置
    const isAutoLoad: boolean = module.default.route?.auto ?? true
    if (!isAutoLoad) {
        return undefined
    }

    if (fileName.includes('../views/')) {
        // view路由逻辑
        if (!fileName.includes(`../views/${route!.name as string}`)) {
            return undefined
        }
        path = `${route!.path}/${name.toLocaleLowerCase()}`
    } else {
        // layout路由逻辑
        path = `/${name.toLocaleLowerCase()}`
    }

    // 如果页面想要自定义路由路径，可以在页面组件下 <script> export default { route: { path: '自定义路由路径' } } </script>
    return {
        ...{
            name,
            path,
            component: module.default
        },
        ...module.default.route
    }
}

export default getRoutes
