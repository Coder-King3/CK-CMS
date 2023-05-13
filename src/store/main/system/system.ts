import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import {
  postAddPageData,
  deleteRemovePageData,
  patchUpdatePageData,
  getQueryPageData
} from '@/service/main/system/system'
import { KElMessage } from '@/utils'
import { IStatusType } from '@/types'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    /* 增加 add*/
    async addPageDataAction(pageName: string, userInfo: any, resetFrom: any) {
      // 1.新增数据操作
      const { type, message } = await postAddPageData(pageName, userInfo)

      // 2.请求最新数据
      this.queryPageDataAction(pageName, resetFrom)

      // 3.操作提示
      KElMessage(type, message)

      // 4.刷新公用数据
      const mainStore = useMainStore()
      mainStore.fatchEntireDataAction()

      // 5.返回操作结果
      return { statu: type == IStatusType.success }
    },
    /* 删除 remove*/
    async removePageDataAction(pageName: string, id: any, resetFrom: any) {
      // 1.删除数据操作
      const { type, message } = await deleteRemovePageData(pageName, id)

      // 2.请求最新数据
      this.queryPageDataAction(pageName, resetFrom)

      // 3.操作提示
      KElMessage(type, message)

      // 4.刷新公用数据
      const mainStore = useMainStore()
      mainStore.fatchEntireDataAction()

      // 5.返回操作结果
      return { statu: type == IStatusType.success }
    },
    /* 修改 Update*/
    async updatePageDataAction(
      pageName: string,
      id: number,
      userInfo: any,
      resetFrom: any
    ) {
      // 1.修改数据操作
      const { type, message } = await patchUpdatePageData(
        pageName,
        id,
        userInfo
      )

      // 2.请求最新数据
      this.queryPageDataAction(pageName, resetFrom)

      // 3.操作提示
      KElMessage(type, message)

      // 4.刷新公用数据
      const mainStore = useMainStore()
      mainStore.fatchEntireDataAction()

      // 5.返回操作结果
      return { statu: type == IStatusType.success }
    },
    /* 查询 Query*/
    async queryPageDataAction(
      pageName: string,
      queryInfo: any,
      isMessage: boolean = false,
      url?: any
    ) {
      // 1.修改数据操作
      const { data, type, message } = await getQueryPageData(
        pageName,
        queryInfo,
        url
      )
      const { list, totalCount } = data
      this.pageList = list || []
      this.pageTotalCount = totalCount || 0

      // 3.操作提示
      if (isMessage) KElMessage(type, message)

      // 4.刷新公用数据
      const mainStore = useMainStore()
      mainStore.fatchEntireDataAction()

      // 5.返回操作结果
      return { statu: type == IStatusType.success }
    }
  }
})

export default useSystemStore
