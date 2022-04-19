import utils from '@/utils'
import getRoutes from './autoload'
import autoloadModuleRoutes from './module'
import { userStore } from '@/store/userStore'

import { Router, RouteRecordRaw } from 'vue-router'
import { toDealWithDynamicMenu, theRoutingSequence } from '@/utils/menu'

function autoload(router: Router) {
    let routes: RouteRecordRaw[] = []

    if (utils.env.VITE_ROUTER_AUTOLOAD_TYPE == '0') {
        // 自动加载路由，src/*.vue 和 views/**/*.vue
        routes = getRoutes()
    } else if (utils.env.VITE_ROUTER_AUTOLOAD_TYPE == '1') {
        // 加载modeule里面的路由
        routes = autoloadModuleRoutes()
        routes = theRoutingSequence(routes)
    } 
    else if (utils.env.VITE_ROUTER_AUTOLOAD_TYPE == '2') {
        // 可以获取动态路由
        // await userStore().getUserInfo()
        
        // 从服务端动态加载路由
        const user = userStore()
        routes = toDealWithDynamicMenu(user.info!.menus)
        routes = theRoutingSequence(routes)
    }
    routes.forEach(route => {
        router.addRoute(route)
    })
    
}

export default autoload
