<template>
  <div class="header-bar">
    <!-- 操作图标 -->
    <nav-operation></nav-operation>

    <!-- 个人中心 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar style="background: none" :size="36" src="/King.jpg" />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleToUserClick">
              <king-icon type="InfoFilled"></king-icon>
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleSettingClick" divided>
              <svg-icon type="palette" style="margin-right: 5px"></svg-icon>
              <span>主题设置</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleExitClick">
              <svg-icon type="exit" style="margin-right: 5px"></svg-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 主题配置 -->
    <theme-config ref="ThemeConfigRef"></theme-config>
  </div>
</template>

<script setup lang="ts" name="HeaderBar">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import NavOperation from '@/components/nav-operation'
import { ThemeConfig } from '@/components/nav-setting'

import useLoginstore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const router = useRouter()
const loginStore = useLoginstore()

// 跳转个人中心
const handleToUserClick = () => {
  router.push('/main/personal')
}

// 退出登录
const handleExitClick = () => {
  ElMessageBox.confirm(`确定注销并退出系统吗？`, '提示', {
    type: 'warning'
  })
    .then(() => {
      localCache.deleteCache(LOGIN_TOKEN)
      router.push('/login')
    })
    .catch(() => {})
}

// 主题设置
const ThemeConfigRef = ref<InstanceType<typeof ThemeConfig>>()
const handleSettingClick = () => {
  ThemeConfigRef.value?.setDrawerVisible(true)
}
</script>

<style lang="less" scoped>
.header-bar {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
