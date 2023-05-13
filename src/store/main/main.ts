import { defineStore } from 'pinia'
import {
  getEntireRoles,
  getEntireDepts,
  getEntireCategory,
  getEntireMenus
} from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepts: any[]
  entireCategory: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepts: [],
    entireCategory: [],
    entireMenus: []
  }),
  actions: {
    async fatchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const deptsResult = await getEntireDepts()
      const entireCategory = await getEntireCategory()
      const entireMenus = await getEntireMenus()

      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepts = deptsResult.data.list
      this.entireCategory = entireCategory.data.list
      this.entireMenus = entireMenus.data.list
    }
  }
})

export default useMainStore
