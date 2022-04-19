export interface MenuItem {
    title: string
    icon?: string
    isClick?: boolean
    route?: string
    sort: number
}

export interface Menu extends MenuItem {
    children?: MenuItem[]
}
