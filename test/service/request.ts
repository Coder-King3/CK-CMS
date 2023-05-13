import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface RequestInterceptor {
  onFulfilled?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  onRejected?: (error: any) => any
}

interface ResponseInterceptor {
  onFulfilled?: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: any) => any
}

interface AxiosRequestConfigWithInterceptors extends AxiosRequestConfig {
  requestInterceptors?: RequestInterceptor[]
  responseInterceptors?: ResponseInterceptor[]
}

class AxiosWrapper {
  private axiosInstance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.axiosInstance.interceptors.request.use(
      interceptor.onFulfilled as (
        value: InternalAxiosRequestConfig<any>
      ) =>
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>>,
      interceptor.onRejected
    )
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.axiosInstance.interceptors.response.use(
      interceptor.onFulfilled,
      interceptor.onRejected
    )
  }

  public request<T = any>(
    config: AxiosRequestConfigWithInterceptors
  ): Promise<AxiosResponse<T>> {
    const { requestInterceptors, responseInterceptors, ...restConfig } = config

    if (requestInterceptors && requestInterceptors.length) {
      for (const interceptor of requestInterceptors) {
        this.addRequestInterceptor(interceptor)
      }
    }

    if (responseInterceptors && responseInterceptors.length) {
      for (const interceptor of responseInterceptors) {
        this.addResponseInterceptor(interceptor)
      }
    }

    return this.axiosInstance.request<T>(restConfig)
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfigWithInterceptors
  ): Promise<AxiosResponse<T>> {
    const { requestInterceptors, responseInterceptors, ...restConfig } =
      config || {}

    if (requestInterceptors && requestInterceptors.length) {
      for (const interceptor of requestInterceptors) {
        this.addRequestInterceptor(interceptor)
      }
    }

    if (responseInterceptors && responseInterceptors.length) {
      for (const interceptor of responseInterceptors) {
        this.addResponseInterceptor(interceptor)
      }
    }

    return this.axiosInstance.get<T>(url, restConfig)
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigWithInterceptors
  ): Promise<AxiosResponse<T>> {
    const { requestInterceptors, responseInterceptors, ...restConfig } =
      config || {}

    if (requestInterceptors && requestInterceptors.length) {
      for (const interceptor of requestInterceptors) {
        this.addRequestInterceptor(interceptor)
      }
    }

    if (responseInterceptors && responseInterceptors.length) {
      for (const interceptor of responseInterceptors) {
        this.addResponseInterceptor(interceptor)
      }
    }

    return this.axiosInstance.post<T>(url, data, restConfig)
  }

  // 在此处添加其他 HTTP 方法，如 PUT、DELETE 等
}

export default AxiosWrapper
