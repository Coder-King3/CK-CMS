// service统一出口
import CKRequest from './request'
import { BASE_URL, TIME_OUT } from './config/config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

export default new CKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    responseSuccessFn(response) {
      // console.log('responseSuccessFn', response)
      return response
    }
  }
})
