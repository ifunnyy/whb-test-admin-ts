import { http } from '@/plugins/axios'

// 用户详细
export interface MenuInterface {
    id: number
    pid: number
    name: string
    title: string
    path: string
    redirect: string
    icon: string
    component: string
    sord: number
    type: number
    status: number
    pivot: {
        id: number
        admin_id: number
        permission_id: number
    }
    children: MenuInterface[]
}

export interface InfoInterface {
    id: string
    role_id: string
    name: string
    menus: MenuInterface[]
}

export function info() {
    return http.requect<InfoInterface>({
        url: `user/info`
    })
}