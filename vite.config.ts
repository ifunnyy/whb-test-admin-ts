import { ConfigEnv, AliasOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'

export default ({ command, mode }: ConfigEnv) => {
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                // 自动导入api，不需要import。
                imports: ['vue', 'vue-router'],
                //为true时在项目根目录自动创建
                dts: 'types/auto-imports.d.ts'
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                //自动加载的组件目录，默认值为 ['src/components']
                dirs: ['src/components'],
                //组件名称包含目录，防止同名组件冲突
                directoryAsNamespace: true,
                //指定类型声明文件，为true时在项目根目录创建
                dts: 'types/components.d.ts'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '#': path.resolve(__dirname, './types')
            }
        }
    }
}

