<template>
  <div class="menu">
    <page-content
      ref="contentRef"
      :content-config="contentConfigRef"
      @add-data-click="addDataClick"
      @edit-data-click="editDataClick"
    ></page-content>

    <page-modal
      ref="modalRef"
      :modal-config="modalConfigRef"
      @reset-data-click="resetDataClick"
    >
      <template #type>
        <el-radio-group v-model="otherInfo.type" size="small">
          <el-radio :label="1" border>目录</el-radio>
          <el-radio :label="2" border>菜单</el-radio>
          <el-radio :label="3" border>按钮</el-radio>
        </el-radio-group>
      </template>
      <template #icon="{ placeholder }">
        <el-select
          style="width: 100%"
          v-model="otherInfo.icon"
          filterable
          clearable
          :placeholder="placeholder"
        >
          <el-option
            v-for="item in IconsKey"
            :key="item"
            :label="item"
            :value="item"
          >
            <king-icon :type="item"></king-icon>
            &nbsp;
            <span>{{ item }}</span>
          </el-option>
        </el-select>
      </template>
      <template #sort>
        <el-input-number v-model="otherInfo.sort" :min="0" size="small" />
      </template>
      <template #parentId>
        <el-tree-select
          v-model="selectValue"
          :data="entireMenus"
          :defaultProps="defaultProps"
          check-strictly
          node-key="name"
          filterable
          clearable
          :render-after-expand="false"
          @node-click="handleNodeClick"
          style="width: 100%"
        >
          <!-- <template #default="{ data }">
            {{ data.label }}<span style="color: gray">(suffix)</span>
          </template> -->
        </el-tree-select>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import * as IconsPack from '@element-plus/icons-vue' // 全量引入svg图标

import PageContent from '@/components/page-content'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'

/* 1.定义数据 */
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const contentConfigRef = computed(() => {
  return contentConfig
})
const modalConfigRef = computed(() => {
  modalConfig.otherInfo = otherInfo
  return modalConfig
})

/* 2.modal逻辑处理 */
const otherInfo = reactive<{ [key: string]: any }>({
  type: 2,
  sort: 0,
  icon: '',
  parentId: null
})

// 2.1图标选择执行逻辑
const Icons: { [key: string]: any } = IconsPack
const IconsKey = Object.keys(Icons)

// 2.2菜单选择执行逻辑
const defaultProps = {
  children: 'children',
  label: 'name'
}
const selectValue = ref()
const handleNodeClick = (value: any) => {
  otherInfo.parentId = value.id
}

// 2.3重置函数
const resetDataClick = () => {
  otherInfo.type = 2
  otherInfo.sort = 0
  otherInfo.icon = ''
  otherInfo.parentId = null
  selectValue.value = null
}
// 2.4编辑按钮回调函数
const editCallback = (data: any) => {
  // console.log('data', { ...data })
  otherInfo.type = data.type
  otherInfo.sort = data.sort
  otherInfo.icon = data.icon
  otherInfo.parentId = data.parentId
  selectValue.value = data.parentId
}

const { modalRef, addDataClick, editDataClick } = usePageModal(
  undefined,
  editCallback
)
</script>

<style lang="less" scoped></style>
