import CkRequest from '@/service'
import type { IDataType } from '@/service/types'

const SyatemAPI = {
  addPageData: (page: string) => `/${page}`,
  removePageData: (page: string, id: number) => `/${page}/${id}`,
  updatePageData: (page: string, id: number) => `/${page}/${id}`,
  queryPageData: (page: string) => `/${page}/list`
}

/* 页面 */
// 增加接口
export const postAddPageData = (pageName: string, userinfo: any) => {
  return CkRequest.post<IDataType>({
    url: SyatemAPI.addPageData(pageName),
    data: userinfo
  })
}

// 删除接口
export const deleteRemovePageData = (pageName: string, id: number) => {
  return CkRequest.delete<IDataType>({
    url: SyatemAPI.removePageData(pageName, id)
  })
}

// 修改接口
export const patchUpdatePageData = (
  pageName: string,
  id: number,
  userinfo: any
) => {
  return CkRequest.patch<IDataType>({
    url: SyatemAPI.updatePageData(pageName, id),
    data: userinfo
  })
}

// 查询列表接口
export const getQueryPageData = (
  pageName: string,
  queryInfo: any,
  url?: any
) => {
  return CkRequest.get<IDataType>({
    url: url ?? SyatemAPI.queryPageData(pageName),
    params: queryInfo
  })
}
