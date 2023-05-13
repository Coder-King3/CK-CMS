export * from './login'
export * from './main'

// 返回数据类型
export interface IDataType<T = any> {
  code: number
  data: T
  message: string
  type: string
}
