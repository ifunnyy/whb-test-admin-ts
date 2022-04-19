import 'vue-router'
import { MenuItem } from './menu'

declare module 'vue-router' {
    export interface RouteMeta {
        auth?: boolean // 是否需要登录验证
        guest?: boolean // 游客验证，登录状态不可访问
        menu?: MenuItem
    }
}
