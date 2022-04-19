import _ from 'lodash'

// 为环境变量进行类型转换
const env: any = _.cloneDeep(import.meta.env)
Object.entries(env).forEach(([key, value]) => {
    if (value == 'true') env[key] = true
    if (value == 'false') env[key] = false
    if (/^\d+$/.test(value as string)) env[key] = Number(value)
    if (value == 'null') env[key] = null
    if (value == 'undefined') env[key] = undefined
})

export default env as ViteEnv
