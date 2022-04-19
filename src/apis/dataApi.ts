import { http } from '@/plugins/axios'

export interface DataInterface {
    name: string
}

export interface DataBodyInterface {
    page: number
}

export function getList(params: DataBodyInterface) {
    return http.requect<DataInterface[]>({
        url: `data/list`
    })
}