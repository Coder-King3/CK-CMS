import { defineStore } from 'pinia'
import router, { addRoutesWithMenu } from '@/router/index'
import type { IAccountType } from '@/types'
import { IStatusType } from '@/types'
import { KElMessage } from '@/utils'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import useMainStore from '@/store/main/main'
import { mapMenusToPermis } from '@/utils/map-menus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: {},
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccountType) {
      // 1.账号登录，获取token等信息
      const { type, message, data } = await accountLoginRequest(account)
      // 1.1提示
      KElMessage(type, message)
      // 1.2登录失败return
      if (type == IStatusType.error) return
      // 1.3存储信息
      const { id, token } = data
      this.token = token
      localCache.setCache(LOGIN_TOKEN, token)

      // 2.获取登录用户的详细信息(role信息)
      const useInfoResult = await requestUserInfoById(id)
      const userInfo = useInfoResult.data
      this.userInfo = userInfo
      localCache.setCache(USER_INFO, userInfo)

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenuResult = await requestUserMenusByRoleId(userInfo.roleId)
      const userMenus = userMenuResult.data
      this.userMenus = userMenus
      localCache.setCache(USER_MENUS, userMenus)

      // 4.请求所有的角色和部门数据
      const mainStore = useMainStore()
      mainStore.fatchEntireDataAction()

      // 重要：获取登录用户所有按钮权限
      const permissions = mapMenusToPermis(userMenus)
      this.permissions = permissions

      // 重要：动态的添加路由
      addRoutesWithMenu(this.userMenus)

      // 跳转首页
      router.push('/main')
    },

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1.请求所有的角色和部门数据
        const mainStore = useMainStore()
        mainStore.fatchEntireDataAction()

        // 2.获取角色权限
        const permissions = mapMenusToPermis(userMenus)
        this.permissions = permissions

        // 3.动态加载路由
        addRoutesWithMenu(this.userMenus)
      }
    }
  }
})

export default useLoginStore
