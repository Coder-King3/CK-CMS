<template>
  <div class="app">
    <!-- theme-basic -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts" name="App">
import '@/assets/style/common.less'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style lang="less" scoped></style>
