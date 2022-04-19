import Layout from '@/layouts/layout.vue'

export function open(
    title: string,
    component: object,
    unmontCallback: Function = () => {},
    aspectRatio: string = '85%'
) { 
    const unmount = () => {
        instance.unmount()
        document.body.removeChild(parentNode)
        unmontCallback()
    }

    const instance = createApp(Layout, { 
        title,
        component,
        aspectRatio,
        unmount
     })
    const parentNode = document.createElement('div')
    instance.mount(parentNode)
    
    document.body.appendChild(parentNode)
}