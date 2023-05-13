<template>
  <el-card v-if="isCreate" class="page-search page-card">
    <!-- 表单输入 -->
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      :label-width="searchConfig.layout?.labelWidth ?? 80"
      :size="searchConfig.layout?.size ?? 'large'"
    >
      <el-row :gutter="searchConfig.layout?.gutter ?? 20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="item.span ?? searchConfig.layout?.span ?? 8">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :label-width="item.labelWidth"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  :clearable="item.clearable ?? true"
                  :show-password="item.showPassword ?? false"
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <template v-if="item.component === 'daterange'">
                  <el-date-picker
                    v-model="searchForm[item.prop]"
                    type="daterange"
                    :range-separator="item.rangeSeparator ?? '至'"
                    :value-format="item.valueFormat ?? 'YYYY-MM-DD'"
                    :start-placeholder="item.startPlaceholder ?? '开始时间'"
                    :end-placeholder="item.endPlaceholder ?? '结束时间'"
                  />
                </template>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :clearable="item.clearable ?? true"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div class="btn">
      <el-button :icon="Refresh" type="default" @click="handleResetClick"
        >重置</el-button
      >
      <el-button :icon="Search" type="primary" @click="handleQueryClick"
        >搜索</el-button
      >
    </div>
  </el-card>
</template>

<script setup lang="ts" name="PageSearch">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { Refresh, Search } from '@element-plus/icons-vue'
import usePermissions from '@/hooks/usePermissions'

// 定义自定回事件/接受的数据
interface IProps {
  searchConfig: {
    pageName: string
    pageParam: string
    permissionsKey: string
    formItems: any[]
    layout?: {
      gutter?: number
      span?: number
      labelWidth?: number
      size?: string
    }
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['queryClick', 'resetClick'])

// 获取增删改查权限
const isCreate = usePermissions(`${props.searchConfig.permissionsKey}:create`)

// 定义表单数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item['prop']] = item['initialValue'] ?? null
}
const searchForm = reactive(initialForm)
const searchFormRef = ref<InstanceType<typeof ElForm>>()

// 按钮操作
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
const handleResetClick = () => {
  searchFormRef.value?.resetFields()
  // Object.keys(searchForm).forEach((key) => (searchForm[key] = null))
  emit('resetClick')
}

// 定义暴露出去的方法/事件
defineExpose({ queryInfo: searchForm })
</script>

<style lang="less" scoped>
.page-search {
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
