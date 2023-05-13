import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { CKRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class CKRequest {
  private instance: AxiosInstance
  private readonly config: CKRequestConfig

  // request实例 => axios的实例
  constructor(config: CKRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  // 设置拦截器
  private setupInterceptors() {
    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的request实例添加拦截器
    this.instance.interceptors.request.use(
      this.config.interceptors?.requestSuccessFn as (
        value: InternalAxiosRequestConfig<any>
      ) =>
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>>,
      this.config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      this.config.interceptors?.responseSuccessFn,
      this.config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: CKRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: CKRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: CKRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: CKRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: CKRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default CKRequest
