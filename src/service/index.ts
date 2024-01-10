import Request from '@/service/request'
import { baseURL, timeout } from './request/config'


const network = new Request({
  baseURL,
  timeout,
  // interceptors: {
  //   requestInterceptors: config => {
  //
  //     const token = ''
  //     if(token){
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //     return config
  //   },
  //   requestInterceptorsCatch: error => {
  //     return error
  //   },
  //   responseInterceptors: res => {
  //     return res.data
  //   },
  //   responseInterceptorsCatch: error => {
  //     return error
  //   }
  // }
})
export default network
