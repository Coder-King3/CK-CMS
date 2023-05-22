<template>
  <div class="personal-center">
    <el-row :gutter="15">
      <el-col :span="7">
        <king-card title="个人信息" class="personal-center_info">
          <div class="info-avatar">
            <img src="/public/King.jpg" class="info-avatar__img" alt="avatar" />
          </div>
          <div class="info-list">
            <li v-for="info in infos" class="info-list__item">
              <span><king-icon :type="info.icon" />&nbsp;{{ info.lable }}</span>
              <span>{{ info.value }}</span>
            </li>
          </div>
        </king-card>
      </el-col>
      <el-col :span="17">
        <king-card class="personal-center_setting">
          <el-tabs class="setting">
            <el-tab-pane label="基本设置" class="setting-base">
              <el-form
                class="setting-base__from"
                :model="baseSetForm"
                :rules="baseSetRules"
                ref="baseSetFormRef"
              >
                <el-form-item label="昵称" prop="name">
                  <el-input
                    v-model="baseSetForm.name"
                    placeholder="请输入昵称"
                    clearable
                  >
                    <template #append>
                      <king-icon type="UserFilled"></king-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="cellphone">
                  <el-input
                    v-model="baseSetForm.cellphone"
                    placeholder="请输入手机号"
                    clearable
                  >
                    <template #append>
                      <king-icon type="Iphone"></king-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item class="from-submit">
                  <el-button
                    type="primary"
                    class="from-submit__primary"
                    @click="handleSubmitClick"
                  >
                    更新基本信息
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="安全设置" class="setting-security">
              <ul class="setting-security__list">
                <li class="security-list__item">
                  <p class="list-item__title">账户密码</p>
                  <p class="list-item__contnt">
                    设置复杂度高的密码，可以使你的账户更安全哦
                    <span @click="setModalVisible(true)">修改</span>
                  </p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </king-card>
      </el-col>
    </el-row>

    <!-- 修改密码模态框 -->
    <el-dialog
      v-model="modalVisible"
      title="修改密码"
      width="30%"
      class="personal-center_modal"
      @close="resetModal"
    >
      <div class="modal-content">
        <el-form
          ref="modalFromRef"
          class="modal-content_from"
          :model="modalFrom"
          :rules="modalFromRules"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="modalFrom.oldPassword"
              placeholder="请输入原密码"
              clearable
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="modalFrom.newPassword"
              placeholder="请输入新密码"
              clearable
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="modalFrom.confirmPassword"
              placeholder="请确认密码"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="modal-footer">
          <el-button type="primary" @click="handleUpdateClick">
            修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="PersonalCenter">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import KingCard from '@/base-ui/king-card'
import useLoginStore from '@/store/login/login'
import { formatUTC } from '@/utils/format'
import { KElMessage } from '@/utils'
import { patchUpdatePageData } from '@/service/main/system/system'

/* 1.个人信息 */
const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const infos = [
  { icon: 'UserFilled', lable: '用户名称', value: userInfo.value.name },
  { icon: 'Iphone', lable: '手机号码', value: userInfo.value.cellphone },
  { icon: 'Briefcase', lable: '所属部门', value: userInfo.value.dept.name },
  { icon: 'CollectionTag', lable: '所属角色', value: userInfo.value.role.name },
  {
    icon: 'Timer',
    lable: '创建时间',
    value: formatUTC(userInfo.value.createAt)
  }
]

/* 2.用户设置 */
// 2.1 基本设置
const baseSetForm = reactive({
  name: userInfo.value.name,
  cellphone: userInfo.value.cellphone
})
const baseSetRules = {
  name: {
    required: true,
    message: '昵称不能为空',
    trigger: 'blur'
  },
  cellphone: {
    required: true,
    message: '手机号不能为空',
    trigger: 'blur'
  }
}
const baseSetFormRef = ref<InstanceType<typeof ElForm>>()
const handleSubmitClick = () => {
  baseSetFormRef.value?.validate(async (valid) => {
    if (valid) {
      const { type, message } = await patchUpdatePageData(
        'user',
        userInfo.value.id,
        baseSetForm
      )
      KElMessage(type, message)
    }
  })
}

// 2.2 安全设置
const modalVisible = ref(false)
const modalFrom = reactive<{ [key: string]: any }>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const modalFromRef = ref<InstanceType<typeof ElForm>>()
const validateOldPwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('原密码不能为空!'))
  } else {
    if (modalFrom.oldPassword !== '') {
      if (!modalFromRef.value) return
      if (value !== userInfo.value.password) {
        callback(new Error('原密码错误!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}
const validateNewPwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('新密码不能为空!'))
  } else {
    if (modalFrom.confirmPassword !== '') {
      if (!modalFromRef.value) return
      if (value !== modalFrom.confirmPassword) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}
const validateConfirmPwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码不能为空!'))
  } else {
    if (modalFrom.newPassword !== '') {
      if (!modalFromRef.value) return
      if (value !== modalFrom.newPassword) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}
const modalFromRules = reactive<FormRules>({
  oldPassword: [{ validator: validateOldPwd, trigger: 'blur' }],
  newPassword: [{ validator: validateNewPwd, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPwd, trigger: 'blur' }]
})
const handleUpdateClick = () => {
  modalFromRef.value?.validate(async (valid) => {
    if (valid) {
      const { type, message } = await patchUpdatePageData(
        'user',
        userInfo.value.id,
        { password: modalFrom.newPassword }
      )
      KElMessage(type, message)
      if (type === 'success') userInfo.value.password = modalFrom.newPassword
      setModalVisible(false)
    }
  })
}
const setModalVisible = (visibleValue: boolean) => {
  modalVisible.value = visibleValue
  if (!visibleValue) resetModal()
}
const resetModal = () => {
  Object.keys(modalFrom).forEach((key) => (modalFrom[key] = ''))
  modalFromRef.value?.resetFields()
}
</script>

<style lang="less" scoped>
.personal-center {
  .king-card {
    ::v-deep .el-card {
      min-height: 600px;
    }
  }
  .personal-center_info {
    .info-avatar {
      margin: 0px auto 30px auto;
      width: 150px;
      border-radius: 50%;
      overflow: hidden;
      .info-avatar__img {
        width: 100%;
      }
    }
    .info-list {
      .info-list__item {
        display: flex;
        justify-content: space-between;
        // padding: 3px 5px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ebeef5;
        border-radius: 3px;
        span:first-of-type {
          color: #606266;
          background-color: #f5f7fa;
          padding: 0 10px;
          border-right: 1px solid #ebeef5;
        }
        span:last-of-type {
          padding-right: 10px;
        }
        &:nth-of-type(n + 2) {
          margin-top: 20px;
        }
        .el-icon {
          vertical-align: -2px;
        }
      }
    }
  }
  .personal-center_setting {
    .setting-base__from {
      ::v-deep .el-form-item {
        display: block;
        .el-form-item__label {
          display: flex;
          flex-direction: row-reverse;
          margin: 0px 0px 0px 2px;
          &::before {
            margin: 0px 0px 0px 5px;
          }
        }
        .el-form-item__content {
          width: 300px;
        }
      }
      .from-submit {
        margin-top: 40px;
      }
    }
    .setting-security__list {
      .security-list__item {
        padding: 10px 0;
        margin-bottom: 5px;
        border-bottom: 1px solid #efeff5;
        .list-item__title {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .list-item__contnt {
          font-size: 13px;
          color: #9ca3af;
          span {
            color: #409eff;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
