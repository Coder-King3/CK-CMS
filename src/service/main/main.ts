import CkRequest from '@/service'
import type { IDataType } from '@/service/types'

const MainAPI = {
  EntireRoles: '/role/list',
  EntireDepts: '/department/list',
  EntireCategory: '/category/list',
  EntireMenus: '/menu/tree'
}

// 获取所有角色
export const getEntireRoles = () => {
  return CkRequest.get<IDataType>({
    url: MainAPI.EntireRoles
  })
}

// 获取所有部门
export const getEntireDepts = () => {
  return CkRequest.get<IDataType>({
    url: MainAPI.EntireDepts
  })
}

// 获取所有商品分类
export const getEntireCategory = () => {
  return CkRequest.get<IDataType>({
    url: MainAPI.EntireCategory
  })
}

// 获取所有菜单树
export const getEntireMenus = () => {
  return CkRequest.get<IDataType>({
    url: MainAPI.EntireMenus
  })
}
