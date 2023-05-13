<template>
  <el-form
    ref="fromRef"
    :model="account"
    :rules="rules"
    class="login-account"
    label-width="70px"
    status-icon
  >
    <el-form-item label="帐号" prop="name">
      <el-input v-model="account.name" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="account.password"
        placeholder="请输入密码"
        type="password"
        show-password
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="PanelAccount">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { KElMessage } from '@/utils'
import { rules } from '../config/account-config'
import { localCache } from '@/utils/cache'
import useLoginStore from '@/store/login/login'
import type { IAccountType } from '@/types'
import Crypto from '@/utils/crypto'

const emit = defineEmits(['handleLoadling'])

/* 定义内部数据 */
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
const account = reactive<IAccountType>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: Crypto.decrypt(localCache.getCache(CACHE_PASSWORD) ?? '')
})

/* 定义登录逻辑 */
const fromRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isKeepPassword: boolean) => {
  fromRef.value?.validate((valid) => {
    // 是否通过校验
    if (valid) {
      emit('handleLoadling', true)
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore
        .accountLoginAction({ name, password })
        .then(() => {
          // 3.判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache(CACHE_NAME, name)
            localCache.setCache(CACHE_PASSWORD, Crypto.encrypt(password))
          } else {
            localCache.deleteCache(CACHE_NAME)
            localCache.deleteCache(CACHE_PASSWORD)
          }
          emit('handleLoadling', false)
        })
        .catch((error) => {
          KElMessage('error', error)
          emit('handleLoadling', false)
        })
    } else {
      KElMessage('error', '请填写正确格式的账户密码！')
    }
  })
}

/* 定义暴露的属性方法 */
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
