<template>
  <div class="goods">
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
      <template #imgUrl="{ row, prop }">
        <img :src="row[prop]" alt="img" style="width: 50px; height: 50px" />
      </template>
    </page-content>

    <page-modal ref="modalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="Goods">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
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
let mainStore = useMainStore()
let { entireCategory } = storeToRefs(mainStore)
const contentConfigRef = computed(() => {
  contentConfig.queryInfo = queryInfo
  return contentConfig
})
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop == 'parentId')
      item.options = entireCategory.value.map(({ name, id }) => ({
        label: name,
        value: id
      }))
  })
  modalConfig.queryData = queryData
  return modalConfig
})

// search逻辑处理
const { searchRef, queryInfo } = usePageSearch()

// content逻辑处理
const { contentRef, queryData, handleSearchClick, handleResetClick } =
  usePageContent()

// modal逻辑处理
const { modalRef, addDataClick, editDataClick } = usePageModal()
</script>

<style lang="less" scoped></style>
