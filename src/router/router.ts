import { RouteRecordRaw } from 'vue-router'

// 基础路由
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'admin',
        component: () => import('../layouts/admin.vue'),
        meta: { auth: false }
    },
    {
        path: '/:any(.*)',
        name: 'notFound',
        component: () => import('../views/Error/404.vue')
    }
]

export default routes
