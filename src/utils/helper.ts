import _ from 'lodash'

// 防抖
export function debounce(fn: Function, delay: number) {
    let timer: any = null
    return function () {
        if (timer) {
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) 
    }
}

// 节流
export function throttle(fn: Function, delay: number){
    let valid = true
    return function() {
       if(!valid){
           return false 
       }
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}

export function parseEnv(env: Record<string, string>): ViteEnv {
    // 深拷贝
    const envs: any = _.cloneDeep(env)
    Object.entries(envs).forEach(([key, value]) => {
        if (value == 'true') envs[key] = true
        if (value == 'false') envs[key] = false
        if (/^\d+$/.test(String(value))) envs[key] = Number(value)
        if (value == 'null') envs[key] = null
        if (value == 'undefined') envs[key] = undefined
    })

    return envs
}
