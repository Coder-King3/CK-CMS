<template>
  <div class="not-found">
    <el-result>
      <template #icon>
        <king-icon
          type="CircleCloseFilled"
          :size="64"
          color="#f56c6c"
        ></king-icon>
      </template>

      <template #title>
        <h1>&nbsp;&nbsp;出错了，找不到页面！</h1>
      </template>

      <template #sub-title>
        <p style="color: #8c8c8c; font-size: 16px">
          你访问的页面不存在哦！请返回。
        </p>
      </template>

      <template #extra>
        <el-button type="primary" @click="backIndex">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts" name="NotFound">
import { useRouter } from 'vue-router'
let router = useRouter()

// 返回方法
let backIndex = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .el-result {
    margin-bottom: 5%;
  }
}
</style>
