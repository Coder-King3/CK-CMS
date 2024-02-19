<template>
  <div class="page-modal">
    <el-dialog
      class="modal-dialog"
      v-model="dialogVisible"
      @close="resetModalFrom"
      width="450px"
      :title="
        modalTypeRef === modalType.add
          ? modalConfig?.header?.addTitle ?? `新建${modalConfig.pageName}`
          : modalConfig?.header?.editTitle ?? `编辑${modalConfig.pageName}`
      "
    >
      <el-form
        ref="modalFromRef"
        class="modal-from"
        :rules="modalConfig.modalRules ?? {}"
        :model="modalFrom"
        :label-width="modalConfig.layout?.labelWidth ?? 80"
        :size="modalConfig.layout?.size ?? 'large'"
      >
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item
            v-if="
              modalTypeRef === modalType.add
                ? !item.addHide
                : modalTypeRef === modalType.edit
                ? !item.editHide
                : true
            "
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <template v-if="item.type === 'input'">
              <el-input
                :clearable="item.clearable ?? true"
                :show-password="item.showPassword ?? false"
                v-model="modalFrom[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-else-if="item.type === 'date-picker'">
              <template v-if="item.component === 'daterange'">
                <el-date-picker
                  v-model="modalFrom[item.prop]"
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
                v-model="modalFrom[item.prop]"
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
              <slot :name="item.slotName" v-bind="item"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setModalVisible(false)">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="PageModal">
import type { ElForm } from 'element-plus'
import useSystemStore from '@/store/main/system/system'
import { ref, reactive } from 'vue'

interface IModalProps {
  modalConfig: {
    pageName: string
    pageParam: string
    permissionsKey: string
    formItems: any[]
    modalRules: any
    queryData?: any
    idKey: string
    otherInfo?: any
    header?: {
      addTitle?: string
      editTitle?: string
    }
    layout?: {
      labelWidth?: number
      size?: string
    }
  }
}

const props = defineProps<IModalProps>()
const emit = defineEmits(['resetDataClick'])

/* 1.定义内部属性 */
enum modalType {
  add = 'add',
  edit = 'edit'
}
const dialogVisible = ref(false)
const modalTypeRef = ref<string>(modalType.add)
const editData = ref<any>(null)
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item['prop']] = item['initialValue'] ?? null
}
const modalFrom = reactive(initialForm)
const modalFromRef = ref<InstanceType<typeof ElForm>>()
const systemStore = useSystemStore()

/* 2.定义设置dialogVisible方法 */
const setModalVisible = (
  visibleValue: boolean,
  isModalType?: string,
  data?: any
) => {
  // 2.1当传入isModalType赋值给modalTypeRef
  if (isModalType) modalTypeRef.value = isModalType

  // 2.2isModalType为edit时填充modalFrom
  if (isModalType === modalType.edit) {
    for (const key in data) modalFrom[key] = data[key]
    editData.value = data
  } else if (isModalType === modalType.add) {
    for (const key in data)
      modalFrom[key] =
        props.modalConfig.formItems.find((item) => item['prop'] === key)[
          'initialValue'
        ] ?? null
    editData.value = null
  }
  // 2.3关闭/开启对话框
  dialogVisible.value = visibleValue
}

/* 3.定义重置modalFrom方法 */
const resetModalFrom = () => {
  modalFromRef.value?.resetFields()
  Object.keys(modalFrom).forEach((key) => (modalFrom[key] = null))
  emit('resetDataClick')
}

/* 4.点击确定逻辑 */
const handleConfirmClick = () => {
  modalFromRef.value?.validate((valid) => {
    // 4.1是否通过校验
    if (!valid) return

    // 4.2设置重置resetFrom
    let resetFrom = props.modalConfig.queryData?.value ?? {}

    // 4.3判断提交类型并发送请求
    if (modalTypeRef.value === modalType.add) {
      let submitFrom = { ...modalFrom, ...props.modalConfig.otherInfo }
      // console.log('submitFrom', { ...submitFrom })
      systemStore
        .addPageDataAction(props.modalConfig.pageParam, submitFrom, resetFrom)
        .then(({ statu }) => {
          if (statu) setModalVisible(false)
        })
    } else if (modalTypeRef.value === modalType.edit) {
      let submitFrom = { ...modalFrom, ...props.modalConfig.otherInfo }
      systemStore
        .updatePageDataAction(
          props.modalConfig.pageParam,
          editData.value[props.modalConfig.idKey],
          submitFrom,
          resetFrom
        )
        .then(({ statu }) => {
          if (statu) setModalVisible(false)
        })
    }
  })
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.user-modal {
  .modal-dialog {
    :global(.el-dialog__body) {
      padding: 20px 40px 0px 40px !important;
    }
  }
}
</style>
