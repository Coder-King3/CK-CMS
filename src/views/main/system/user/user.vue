<template>
  <div class="user">
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
      <template #enable="scope">
        <el-button
          :type="scope.row[scope.prop] ? 'success' : 'danger'"
          plain
          @click="
            handleEnableClick(
              scope.row[scope.config.idKey],
              scope.row[scope.prop]
            )
          "
        >
          {{ scope.row[scope.prop] ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>

    <page-modal ref="modalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="User">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

import PageSearch from '@/components/page-search'
import searchConfig from './config/search.config'
import usePageSearch from '@/hooks/usePageSearch'

import PageContent from '@/components/page-content'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

import PageModal from '@/components/page-modal'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePermissions from '@/hooks/usePermissions'

/* 定义数据 */
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepts } = storeToRefs(mainStore)

const contentConfigRef = computed(() => {
  contentConfig.queryInfo = queryInfo
  return contentConfig
})
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'roleId')
      item.options = entireRoles.value.map(({ name, id }) => ({
        label: name,
        value: id
      }))

    if (item.prop === 'deptId')
      item.options = entireDepts.value.map(({ name, id }) => ({
        label: name,
        value: id
      }))
  })
  modalConfig.queryData = queryData
  return modalConfig
})

// 获取用户权限
const isCreate = usePermissions(`${contentConfig.pageParam}:create`)

// 处理启用/禁用用户逻辑
const handleEnableClick = (id: number, enable: number) => {
  if (!isCreate) return
  let msgType = enable ? '禁用' : '启用'
  ElMessageBox.confirm(`确认${msgType}该用户？`, '提示', {
    type: 'warning'
  })
    .then(() => {
      systemStore.updateUserDataAction(
        id,
        { enable: enable ? 0 : 1 },
        queryData.value
      )
    })
    .catch(() => {})
}

// search逻辑处理
const { searchRef, queryInfo } = usePageSearch()

// content逻辑处理
const { contentRef, queryData, handleSearchClick, handleResetClick } =
  usePageContent()

// modal逻辑处理
const { modalRef, addDataClick, editDataClick } = usePageModal()
</script>

<style lang="less" scoped></style>
