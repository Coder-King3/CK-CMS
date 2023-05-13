<template>
  <div class="overview">
    <king-card title="关于">
      <span>
        <b>CK-CMS</b>
        是基于
        <b>
          Vue3、Pinia、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
        </b>
        等后台系统解决方案。
      </span>
    </king-card>
    <king-card title="技术栈"> </king-card>
    <king-card title="项目解构"> </king-card>
    <king-card title="项目规范"> </king-card>
  </div>
</template>

<script setup lang="ts" name="Overview">
import KingCard from '@/base-ui/king-card'
</script>

<style lang="less" scoped>
.overview {
  color: #57606a;
  .technology-stacks {
    margin-bottom: 30px;
    li {
      font-weight: 600;
      font-size: 16px;
      line-height: 30px;
      a {
        margin-left: 20px;
        font-weight: 500;
        text-decoration: none;
        color: #409eff;
      }
    }
  }
  pre {
    font-size: 18px;
    font-weight: 600;
    background: #dee1e6;
  }
}
</style>
