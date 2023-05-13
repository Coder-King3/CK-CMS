import CkRequest from '@/service'
import type { IDataType, ILoginResult } from '@/service/types'
import type { IAccountType } from '@/types'
// import router from '@/router'

const LoginAPI = {
  AccountLogin: '/login',
  LoginUserInfo: (id: string) => `/user/info/${id}`,
  UserMenus: (id: string) => `/role/${id}/menu`
}

// 登录接口
export const accountLoginRequest = (account: IAccountType) => {
  return CkRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export const requestUserInfoById = (id: string) => {
  return CkRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo(id)
  })
}

export const requestUserMenusByRoleId = (id: string) => {
  return CkRequest.get<IDataType>({
    url: LoginAPI.UserMenus(id)
  })
}
