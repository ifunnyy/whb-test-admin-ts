// 类型声明
interface ViteEnv {
    VITE_ROUTER_AUTOLOAD_TYPE: string
    VITE_API_URL: string
    VITE_URL?: string
    VITE_SITE_NAME: string
}

// 为 import.meta.env 增加智能提示，vite 自带的环境变量
interface ImportMetaEnv extends ViteEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
