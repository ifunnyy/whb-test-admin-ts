import axios, { AxiosRequestConfig } from 'axios'

export default class Axios {
    private instance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }

    public requect<T, D = ResponseResult<T>>(
        config: AxiosRequestConfig
    ): Promise<D> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    // 拦截器
    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }
    // 请求拦截器
    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            config => {
                // 在发送请求之前做些什么
                return config
            },
            error => {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )
    }
    // 响应拦截器
    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            response => {
                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                return response
            },
            error => {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                return Promise.reject(error)
            }
        )
    }
}
