<template>
  <div class="nav-header">
    <div class="menu-icon">
      <king-icon :type="isFold ? 'Expand' : 'Fold'" @click="handleFoldClick" />
    </div>
    <div class="content">
      <king-header-crumb :breadcrumbs="breadcrumbs"></king-header-crumb>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts" name="NavHeader">
import { ref, computed } from 'vue'
import KingHeaderCrumb from '@/base-ui/king-breadcurmb'
import HeaderInfo from './cpns/header-info.vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-menus'

let isFold = ref(false)
const emits = defineEmits(['handleFoldChange'])

// 是否折叠
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('handleFoldChange', isFold.value)
}

// 面包屑列
const route = useRoute()
let { userMenus } = useLoginStore()
let breadcrumbs = computed(() => mapPathToBreadcrumb(route.path, userMenus))
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 28px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
