<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '70px' : '250px'">
        <nav-menu :isFold="isFold" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @handleFoldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <router-view v-slot="{ Component }">
            <transition name="fade-animate" mode="out-in">
              <keep-alive>
                <component :key="key" :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="Main">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
const isFold = ref(false)
const handleFoldChange = (value: boolean) => {
  isFold.value = value
}
const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<style scoped lang="less">

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  padding: 10px;
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  z-index: 888;
  box-shadow: 2px 0 6px rgb(0 21 41 / 20%);
  transition: width 0.3s;
}

.el-aside {
  z-index: 999;
  height: 100%;
  background-color: var(--theme-aside-bg);
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  transition: all 0.3s;
  cursor: pointer;
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f6f8f9;
  // background-color: var(--theme-color);
}
</style>
