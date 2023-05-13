<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">CMS-CK</h1>

    <!-- 中间tab切换框 -->
    <el-tabs v-model="tabsName" type="border-card" stretch class="tabs">
      <!-- 帐号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <div class="label">
            <king-icon type="User" />
            <span>帐号登录</span>
          </div>
        </template>
        <panel-account ref="accountRef" @handleLoadling="handleLoadling" />
      </el-tab-pane>

      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <div class="label">
            <king-icon type="Iphone" />
            <span>手机登录</span>
          </div>
        </template>
        <panel-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      type="primary"
      class="login-btn"
      :loading="loadingLogin"
      @click="handleLoginClick"
    >
      立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts" name="LoginPanel">
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import { KElMessage } from '@/utils'
import { localCache } from '@/utils/cache'

/* 定义内部数据 */
const loadingLogin = ref(false)
const isKeepPassword = ref<boolean>(
  localCache.getCache('isKeepPassword') ?? false
)
watch(isKeepPassword, (newValue) => {
  localCache.setCache('isKeepPassword', newValue)
})

/* 定义内部方法 */
const tabsName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const handleLoginClick = () => {
  if (tabsName.value == 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else if (tabsName.value == 'phone') {
    KElMessage('warning', '手机号登录暂未开放，敬请期待哦。')
  }
}
const handleLoadling = (type: boolean) => {
  loadingLogin.value = type
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 10%;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .tabs {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-btn {
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
}
</style>
