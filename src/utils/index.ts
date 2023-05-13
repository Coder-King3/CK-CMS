import { ElMessage } from 'element-plus'
import { IStatusType } from '@/types'

/* 字符串大小写 */
export const stringCase = (
  str: string,
  separator: string,
  start: number,
  end: number
) => {
  const newStr = str.slice(start, end).split(separator)
  for (let i = 0; i < newStr.length; i++) {
    newStr[i] =
      newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase()
  }
  return newStr.join('')
}

export const KElMessage = (
  type: string,
  message: string,
  showClose: boolean = true
) => {
  switch (type) {
    case IStatusType.success:
      ElMessage({ showClose, message, type: 'success' })
      break
    case IStatusType.error:
      ElMessage({ showClose, message, type: 'error' })
      break
    case IStatusType.warning:
      ElMessage({ showClose, message, type: 'warning' })
      break
    case IStatusType.other:
      ElMessage({ showClose, message })
      break
  }
}

/* 虚假数据生成 */
interface columnsType {
  key: string
  value: any
  isIndex?: boolean
  indexOffset?: number
  type?: string
}
export const createFakeData = (
  columns: columnsType[],
  start: number,
  total: number
) => {
  const list = []
  for (let i = start; i <= total; i++) {
    const obj: any = {}
    columns.forEach((item: any) => {
      // 不需要递增的直接赋值
      if (!item.isIndex) {
        obj[item.key] = item.value
      } else {
        // 根据位置递增下标
        obj[item.key] = insertStr(item.value, item.indexOffset, i)
      }
      // 类型转换
      if (item.type) {
        switch (item.type) {
          case 'number':
            obj[item.key] = parseFloat(obj[item.key])
            break
          case 'string':
            obj[item.key] = obj[item.key].toString()
            break
          case 'boolean':
            obj[item.key] = Boolean(obj[item.key])
            break
        }
      }
    })
    list.push(obj)
  }
  return list
}

/* 字符串指定位置插入字符 */
export const insertStr = (soure: string, start: number, newStr: any) => {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

/* 数字金额逗号转换 */
export function absAmount(val: number, isDot: boolean = true) {
  if (!val) {
    return '0'
  } else {
    if (!isDot) {
      val = Math.round(val)
    }
    //金额转换  保留2位小数 并每隔3位用逗号分开 1,234.56
    const str = (val / 1).toFixed(2) + ''
    const intSum = str
      .substring(0, str.indexOf('.'))
      .replace(/\B(?=(?:\d{3})+$)/g, ',') //取到整数部分
    const dot = str.substring(str.length, str.indexOf('.')) //取到小数部分搜索
    const ret = intSum + (isDot ? dot : '')
    return ret
  }
}
