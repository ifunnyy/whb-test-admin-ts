import { RouteRecordRaw } from 'vue-router'
export default {
    path: '/data',
    name: 'data',
    component: () => import('@/layouts/admin.vue'),
    redirect: '/data/index',
    meta: {
        auth: false,
        menu: {
            title: '数据',
            icon: '图表',
            sort: 1
        }
    },
    children: [
        {
            path: 'index',
            name: 'data.index',
            component: () => import('@/views/Data/index.vue'),
            meta: { 
                menu: 
                { 
                    title: '数据',
                    sort: 0 
                } 
            }
        }
    ]
} as RouteRecordRaw
