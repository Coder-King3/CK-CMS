<template>
  <div class="theme-config">
    <el-drawer v-model="drawerVisible" class="theme-config_drawer" size="20%">
      <template #header>
        <h3 class="drawer-title">主题配置</h3>
      </template>
      <template #default>
        <div class="drawer-item">
          <div class="drawer-item_header">
            <b>主题风格</b>
          </div>
          <div class="drawer-item_content">
            <ul class="theme-list">
              <li @click="handleSetThemeClick('theme-dark')">
                <svg-icon type="dark-theme"></svg-icon>
                <p>
                  <span
                    v-if="themeClass === 'theme-dark'"
                    class="isActive"
                  ></span
                  >暗黑
                </p>
              </li>
              <li @click="handleSetThemeClick('theme-white')">
                <svg-icon type="white-theme"></svg-icon>
                <p>
                  <span
                    v-if="themeClass === 'theme-white'"
                    class="isActive"
                  ></span
                  >光明
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="drawer-item">
          <div class="drawer-item_header">
            <b>颜色</b>
          </div>
          <div class="drawer-item_content"></div>
        </div> -->
        <!-- <div class="drawer-item">
          <div class="drawer-item_header">
            <b>布局</b>
          </div>
          <div class="drawer-item_content"></div>
        </div> -->
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="ThemeConfig">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSettingStore from '@/store/setting/setting'
import { localCache } from '@/utils/cache'
import { THEME_CLASS } from '@/global/constants'

const drawerVisible = ref(false)
const setDrawerVisible = (visibleValue: boolean) => {
  drawerVisible.value = visibleValue
}

const settimgStore = useSettingStore()
const { themeClass } = storeToRefs(settimgStore)
const handleSetThemeClick = (theme: string) => {
  themeClass.value = theme
  localCache.setCache(THEME_CLASS, theme)
}

defineExpose({ setDrawerVisible })
</script>

<style lang="less" scoped>
.theme-config {
  .theme-config_drawer {
    :global(.el-drawer__header) {
      margin-bottom: 10px !important;
    }
    .drawer-title {
      color: #060708;
    }
    .drawer-item {
      text-align: left;
      .drawer-item_header {
        color: #616569;
        margin-bottom: 15px;
      }
      .drawer-item_content {
        .theme-list {
          display: flex;
          li {
            text-align: center;
            font-size: 14px;
            &:first-of-type {
              margin-right: 30px;
            }
          }
          .isActive {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: #0187fb;
            border-radius: 50%;
            margin-right: 5px;
          }
          .svg-icon {
            font-size: 60px;
          }
        }
      }
    }
  }
}
</style>
