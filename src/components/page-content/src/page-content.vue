<template>
  <el-card class="page-content page-card">
    <div class="header">
      <h3>
        {{ contentConfig.header?.title ?? `${contentConfig.pageName}列表` }}
      </h3>
      <el-button v-if="isCreate" type="primary" @click="handleAddClick">
        {{ contentConfig.header?.btnTitle ?? `新建${contentConfig.pageName}` }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        :border="true"
        :max-height="contentConfig?.layout?.maxHeight ?? 438"
        style="width: 100%"
        v-bind="{ ...contentConfig.tableAttrs, ...contentConfig.layout }"
      >
        <template v-for="item in contentConfig.tableProps" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column
              v-bind="item"
              :align="item.align ?? contentConfig.layout?.align ?? 'center'"
              :width="item.width ?? contentConfig.layout?.width ?? ''"
            >
              <template #default="{ row }">
                {{ formatUTC(row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column
              v-if="!isUpdate && !isDelete ? false : true"
              v-bind="item"
              :align="item.align ?? contentConfig.layout?.align ?? 'center'"
              :width="item.width ?? contentConfig.layout?.width ?? ''"
            >
              <template #default="{ row }">
                <template v-for="tool in item.tools" :key="tool.type">
                  <el-button
                    v-if="isUpdate ? tool.type == 'edit' : false"
                    type="primary"
                    :icon="Edit"
                    size="small"
                    link
                    @click="handleEditClick(row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="isDelete ? tool.type == 'delete' : false"
                    type="danger"
                    :icon="Delete"
                    size="small"
                    link
                    @click="handleDeleteClick(row[contentConfig.idKey])"
                    >删除</el-button
                  >
                  <template v-if="tool.type == 'custom'">
                    <slot
                      :name="tool.soltName"
                      v-bind="row"
                      :config="contentConfig"
                    ></slot>
                  </template>
                </template>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column
              v-bind="item"
              :align="item.align ?? contentConfig.layout?.align ?? 'center'"
              :width="item.width ?? contentConfig.layout?.width ?? ''"
            >
              <template #default="scope">
                <slot
                  :name="item.soltName"
                  v-bind="scope"
                  :prop="item.prop"
                  :config="contentConfig"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              v-bind="item"
              :align="item.align ?? contentConfig.layout?.align ?? 'center'"
              :width="item.width ?? contentConfig.layout?.width ?? ''"
            />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts" name="PageContent">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { Delete, Edit } from '@element-plus/icons-vue'
import { formatUTC } from '@/utils/format'
import { ElMessageBox } from 'element-plus'
import usePermissions from '@/hooks/usePermissions'

// 定义接收数据
interface IProps {
  contentConfig: {
    pageName: string
    pageParam: string
    permissionsKey: string
    idKey: string
    tableProps: any[]
    tableAttrs?: any
    queryInfo: any
    url?: any
    header?: {
      title?: string
      btnTitle?: string
    }
    layout?: {
      width?: number
      align?: string
      maxHeight?: number
    }
  }
}
const props = defineProps<IProps>()
// 定义接收事件
const emit = defineEmits(['addDataClick', 'editDataClick'])

// 获取增删改查权限
const isCreate = usePermissions(`${props.contentConfig.permissionsKey}:create`)
const isDelete = usePermissions(`${props.contentConfig.permissionsKey}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.permissionsKey}:update`)
const isQuery = usePermissions(`${props.contentConfig.permissionsKey}:query`)

/* 初始化数据 */
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
const size = computed(() => pageSize.value)
const offset = computed(() => (currentPage.value - 1) * size.value)
const queryData = computed(() => {
  return {
    offset: offset.value,
    size: size.value,
    ...props.contentConfig.queryInfo.value
  }
})

// 1.定义获取数据函数，发起action请求pagelist数据
const fetchPageListData = () => {
  if (!isQuery) return

  let queryUrl = props.contentConfig?.url ?? null
  systemStore.queryPageDataAction(
    props.contentConfig.pageParam,
    queryData.value,
    false,
    queryUrl
  )
}
fetchPageListData()

// 2.获取pageuserlist数据并在页面中展示
let { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关逻辑
const handleSizeChange = (value: number) => {
  pageSize.value = value
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

// 4.按钮操作逻辑(新建/编辑/删除/...)
const handleAddClick = () => {
  emit('addDataClick', true)
}
const handleEditClick = (tabData: any) => {
  emit('editDataClick', true, tabData)
}
const handleDeleteClick = (id: number) => {
  ElMessageBox.confirm(`确认删除该${props.contentConfig.pageName}？`, '提示', {
    type: 'warning'
  })
    .then(() => {
      systemStore.removePageDataAction(
        props.contentConfig.pageParam,
        id,
        queryData.value
      )
    })
    .catch(() => {})
}

defineExpose({ fetchPageListData, queryData })
</script>

<style lang="less" scoped>
.page-content {
  margin-top: 10px;
  .header {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .table {
    margin-bottom: 10px;
  }
  .pagination {
    display: flex;
    justify-content: end;
  }
}
</style>
