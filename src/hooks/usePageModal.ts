import { ref } from 'vue'
import type PageModal from '@/components/page-modal'

type CallBackFnType = (data?: any) => void

function usePageModal(
  newCallBack?: CallBackFnType,
  editCallBack?: CallBackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  const addDataClick = (visibleValue: boolean) => {
    modalRef.value?.setModalVisible(visibleValue, 'add')
    if (newCallBack) newCallBack()
  }
  const editDataClick = (visibleValue: boolean, itemData: any) => {
    modalRef.value?.setModalVisible(visibleValue, 'edit', itemData)
    if (editCallBack) editCallBack(itemData)
  }

  return { modalRef, addDataClick, editDataClick }
}

export default usePageModal
