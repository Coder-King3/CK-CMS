<template>
  <div class="nav-menu">
    <!-- 1.logo -->
    <div class="logo">
      <a href="/">
        <svg-icon type="logo" class="icon" />
        <span v-show="!props.isFold" class="title">CK-CMS</span>
      </a>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="activeMenu"
        :collapse="props.isFold"
        class="el-menu-vertical"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <!-- 多级菜单递归 -->
        <template v-for="item in menus" :key="item.id">
          <!-- 1.没有子级 -->
          <template v-if="!item.children">
            <el-menu-item
              :index="item.id.toString()"
              @click="handleItemClick(item)"
            >
              <king-icon
                v-if="item.icon"
                :type="iconType(item.icon)"
              ></king-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
          <!-- 2.有子级 -->
          <template v-else>
            <el-sub-menu :index="item.id + ''" :popper-offset="7">
              <template #title>
                <!-- 字符串: king-icon => 组件 -> 动态图标 -->
                <king-icon
                  v-if="item.icon"
                  :type="iconType(item.icon)"
                ></king-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleItemClick(subitem)"
                >
                  <king-icon
                    v-if="subitem.icon"
                    :type="iconType(subitem.icon)"
                  ></king-icon>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template> -->
              <sub-menu
                :menu-list="item.children"
                :itemMargin="itemMargin"
                :iconOffset="iconOffset"
                @handleItemClick="handleItemClick"
                @iconType="iconType"
              ></sub-menu>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts" name="NavMenu">
import { computed } from 'vue'
import SubMenu from './cpns/sub-menu.vue'
import { stringCase } from '@/utils'
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取菜单数据
const loginStore = useLoginStore()
const menus = computed(() => {
  return loginStore.userMenus
})
const iconType = (str: string) => {
  return stringCase(str, '-', 8, str.length)
}

// 监听菜单点击
let router = useRouter()
const handleItemClick = (item: any) => {
  // console.log('item', item)
  router.push(item.url)
}

// 菜单默认值设置
let route = useRoute()
let activeMenu = computed(() => {
  const pathMenu = mapPathToMenu(route.path, menus.value) ?? {
    ...route,
    id: undefined
  }
  return `${pathMenu.id}`
})

// 绑定样式
const itemMargin = computed(() => {
  return props.isFold ? '2px 0px' : '4px'
})
const iconOffset = computed(() => {
  return props.isFold ? 'translateX(0px)' : 'translateX(-5px)'
})
</script>

<style lang="less" scoped>
/* 侧边栏样式 */
.nav-menu {
  // LOGO标题样式
  .logo a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    white-space: nowrap;
    text-decoration: none;

    .icon {
      height: 100%;
      color: var(--theme-aside-logo);
      font-size: 36px;
      transform: v-bind(iconOffset);
    }

    .title {
      font-size: 25px;
      font-weight: 600;
      color: var(--theme-aside-logo);
    }
  }

  // 菜单列Menu
  ::v-deep .el-menu {
    border-right: none;
    background-color: var(--theme-aside-bg) !important;
  }

  // 折叠
  .el-menu--collapse {
    margin: auto !important;
  }

  /* 目录 */
  .el-sub-menu {
    transition: all 0.3s;
    padding: v-bind(itemMargin) !important;
    overflow: hidden;
    .el-menu-item {
      // padding-left: 45px !important;
      color: var(--theme-aside-menu-txt) !important;
      background-color: var(--theme-aside-menu-bg) !important;
    }
    .el-menu-item:hover {
      color: var(--theme-aside-menu-txt-hover) !important;
      background-color: var(--theme-aside-menu-bg-active) !important;
    }
    ::v-deep .el-menu {
      overflow: hidden !important;
    }
    .el-icon {
      margin-right: 0px;
      transform: v-bind(iconOffset);
    }
  }
  // 目录标题样式
  ::v-deep .el-sub-menu__title {
    border-radius: 5px !important;
    color: var(--theme-aside-submenu-txt) !important;
    background-color: var(--theme-aside-submenu-bg) !important;
  }
  // 目录标题样式
  ::v-deep .el-sub-menu__title:hover {
    color: var(--theme-aside-submenu-txt-hover) !important;
    background-color: var(--theme-aside-submenu-bg-hover) !important;
  }

  /* 菜单 */
  .el-menu-item {
    transition: all 0.3s;
    margin: v-bind(itemMargin) !important;
    border-radius: 5px !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: var(--theme-aside-submenu-txt-hover) !important; // 菜单
    background-color: var(--theme-aside-submenu-bg-hover);
  }
  // active 点击
  .el-menu-item.is-active {
    color: var(--theme-aside-menu-txt-active) !important;
    background-color: var(--theme-aside-menu-bg-active) !important;
  }
}

/* 侧边栏宽高计算 */
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 70px);
}
</style>
