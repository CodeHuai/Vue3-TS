import Request from '@/service/request'
import { baseURL, timeout } from './request/config'


const request = new Request({
  baseURL,
  timeout,
  interceptors: {
    requestInterceptors: config => {
      return config
    },
    requestInterceptorsCatch: error => {
      return error
    },
    responseInterceptors: res => {
      return res
    },
    responseInterceptorsCatch: error => {
      return error
    }
  }
})
export default request
