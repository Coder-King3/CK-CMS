<template>
  <div class="list">
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
      <template #content="{ row, prop }">
        <span class="story-content">{{ row[prop] }}</span>
      </template>
      <template #check="scope">
        <el-button
          type="success"
          :icon="ZoomIn"
          size="small"
          link
          @click="handleCheckClick(scope)"
          >查看</el-button
        >
      </template>
    </page-content>

    <page-modal
      ref="modalRef"
      :modal-config="modalConfigRef"
      @reset-data-click="resetDataClick"
    >
      <template #content>
        <el-input
          v-model="otherInfo.content"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入故事内容"
        />
      </template>
    </page-modal>

    <!-- 查看故事对话框 -->
    <el-dialog
      v-model="checkVisible"
      title="查看故事"
      width="30%"
      destroy-on-close
      center
    >
      <div style="margin-bottom: 15px; text-align: center; line-height: 25px">
        <p>
          <b>《{{ checkInfo.title }}》</b>
        </p>
        <p>
          {{ checkInfo.content }}
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="checkVisible = false">已阅</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="List">
import { ref, reactive, computed } from 'vue'
import { ZoomIn } from '@element-plus/icons-vue'
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
const contentConfigRef = computed(() => {
  contentConfig.queryInfo = queryInfo
  return contentConfig
})
const modalConfigRef = computed(() => {
  modalConfig.queryData = queryData
  modalConfig.otherInfo = otherInfo
  return modalConfig
})

// content处理逻辑
const otherInfo = reactive<{ [key: string]: any }>({ content: null })
const editCallback = (data: any) => {
  otherInfo.content = data.content
}
const resetDataClick = () => {
  Object.keys(otherInfo).forEach((key) => (otherInfo[key] = null))
}

// check处理逻辑
const checkVisible = ref(false)
const checkInfo = reactive({
  title: '',
  content: ''
})
const handleCheckClick = (row: any) => {
  // console.log('row', row)
  checkInfo.title = row.title
  checkInfo.content = row.content
  checkVisible.value = true
}

// search逻辑处理
const { searchRef, queryInfo } = usePageSearch()

// content逻辑处理
const { contentRef, queryData, handleSearchClick, handleResetClick } =
  usePageContent()

// modal逻辑处理
const { modalRef, addDataClick, editDataClick } = usePageModal(
  undefined,
  editCallback
)
</script>

<style lang="less" scoped>
.story-content {
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 省略号代替 */
  white-space: nowrap; /* 不换行 */
}
</style>
