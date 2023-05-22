<template>
  <div class="app" :class="themeClass">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts" name="App">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { storeToRefs } from 'pinia'
import useSettingStore from '@/store/setting/setting'

// 获取当前主题
const settimgStore = useSettingStore()
const { themeClass } = storeToRefs(settimgStore)
</script>

<style lang="less"></style>
