import { storeToRefs } from 'pinia'
import useLoginStore from '@/store/login/login'

function usePermissions(permissionsID: string) {
  const loginStore = useLoginStore()
  const { permissions } = storeToRefs(loginStore)

  return !!permissions.value.find((item) => item.includes(permissionsID))
}

export default usePermissions
