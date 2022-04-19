import { MenuInterface } from '@/apis/userApi'
import { RouteRecordRaw } from 'vue-router'

// 处理动态菜单
// 只支持二级菜单
export function toDealWithDynamicMenu(menus: MenuInterface[]) {
    const routes = menus.map(menu => {
        const pRoute: RouteRecordRaw = {
            path: menu.path,
            name: menu.name,
            component: () => import('@/layouts/admin.vue'),
            redirect: menu.redirect,
            meta: {
                auth: true,
                menu: {
                    title: menu.title,
                    icon: menu.icon,
                    sort: menu.sord
                }
            }
        }
        pRoute.children = menu.children.map(cMenu => {
            const cRoute: RouteRecordRaw = {
                path: cMenu.path,
                name: cMenu.name,
                component: () => import('../views/' + cMenu.component),
                meta: {
                    menu: {
                        title: cMenu.title,
                        sort: cMenu.sord
                    }
                }
            }
            return cRoute
        })
        return pRoute
    })

    return routes
}

// 路由排序
export function theRoutingSequence(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    const newRoutes = routes
        .map(r => {
            r.children = r.children?.sort(
                (r1: RouteRecordRaw, r2: RouteRecordRaw) => {
                    return r1.meta!.menu!.sort - r2.meta!.menu!.sort
                }
            )
            return r
        })
        .sort((r1: RouteRecordRaw, r2: RouteRecordRaw) => {
            return r1.meta!.menu!.sort - r2.meta!.menu!.sort
        })

    return newRoutes
}
