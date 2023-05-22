<template>
  <div class="king-breadcurmb">
    <el-breadcrumb :separator-icon="ArrowRightBold">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="KingBreadCurmb">
import { watch } from 'vue'
import type { BreadCrumbsType } from '../types/types'
import { ArrowRightBold } from '@element-plus/icons-vue'

defineProps<{
  breadcrumbs: BreadCrumbsType[]
}>()
</script>

<style lang="less" scoped></style>
