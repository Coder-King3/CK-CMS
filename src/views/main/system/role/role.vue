<template>
  <div class="role">
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleSearchClick"
      @reset-click="handleResetClick"
    />

    <page-content
      ref="contentRef"
      :content-config="contentConfigRef"
      @add-data-click="addDataClick"
      @edit-data-click="editDataClick"
    >
    </page-content>

    <page-modal
      ref="modalRef"
      :modal-config="modalConfigRef"
      @reset-data-click="resetDataClick"
    >
      <template #permissions>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleMenuCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="Role">
import { computed, ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import useMainStore from '@/store/main/main'
import { mapMenusToIds } from '@/utils/map-menus'
import PageSearch from '@/components/page-search'
import searchConfig from './config/search.config'
import usePageSearch from '@/hooks/usePageSearch'

import PageContent from '@/components/page-content'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

import PageModal from '@/components/page-modal'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'

/* 定义数据 */
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const contentConfigRef = computed(() => {
  contentConfig.queryInfo = queryInfo
  return contentConfig
})
const modalConfigRef = computed(() => {
  modalConfig.queryData = queryData
  modalConfig.otherInfo = otherInfo.value
  return modalConfig
})

// menusTree逻辑处理
const otherInfo = ref({})
const handleMenuCheck = (data: any, node: any) => {
  let permissions = [...node.checkedKeys, ...node.halfCheckedKeys]
  otherInfo.value = { permissions }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
const resetDataClick = () => {
  treeRef.value?.setCheckedKeys([])
  // 收起树节点的展开
  const nodesMap = treeRef.value?.store?.nodesMap
  for (let key in nodesMap) {
    nodesMap[key].expanded = false
    nodesMap[key].isCurrent = false
  }
}
const editCallback = (data: any) => {
  nextTick(() => {
    let treeIds = mapMenusToIds(entireMenus.value, data.permissions)
    treeRef.value?.setCheckedKeys(treeIds)
  })
}

// Page组件逻辑关系
const { searchRef, queryInfo } = usePageSearch()
const { contentRef, queryData, handleSearchClick, handleResetClick } =
  usePageContent()
const { modalRef, addDataClick, editDataClick } = usePageModal(
  undefined,
  editCallback
)
</script>

<style lang="less" scoped></style>
