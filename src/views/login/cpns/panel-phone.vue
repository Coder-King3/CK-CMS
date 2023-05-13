<template>
  <el-form
    ref="ruleFormRef"
    :model="phone"
    class="login-phone"
    label-width="70px"
    status-icon
  >
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" placeholder="请输入验证码" clearable />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="PanelPhone">
import { reactive } from 'vue'

const phone = reactive({
  num: '',
  code: ''
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}

.get-btn {
  width: 90px;
  margin-left: 8px;
}
</style>
