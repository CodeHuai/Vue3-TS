import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig } from './type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING_STATE = true // loading 的默认状态

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  showLoading?: boolean
  loading?: ReturnType<typeof ElLoading.service>

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING_STATE


    // 实现 axios实例 自定义拦截器
    // this.instance.interceptors.request.use(
    //   this.interceptors?.requestInterceptors,
    //   this.interceptors?.requestInterceptorsCatch
    // )
    // this.instance.interceptors.response.use(
    //   this.interceptors?.responseInterceptors,
    //   this.interceptors?.responseInterceptorsCatch
    // )

    //   所有实例都添加 拦截器
    this.instance.interceptors.request.use(config => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      error => {
        return Promise.reject(error)
      })

    this.instance.interceptors.response.use(response => {
        if (this.showLoading) {
          this.loading?.close()
        }
        this.showLoading = DEFAULT_LOADING_STATE // 还原默认值
        return response.data
      },
      error => {
        if (this.showLoading) {
          this.loading?.close()
        }
        this.showLoading = DEFAULT_LOADING_STATE // 还原默认值
        return Promise.reject(error)
      })
  }

  request(config: RequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        this.showLoading = DEFAULT_LOADING_STATE // 还原默认值
      })
    })
  }
}


export default Request
