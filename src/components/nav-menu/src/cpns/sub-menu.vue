<template>
  <template v-for="item in menuList" :key="item.id">
    <template v-if="item.type != '3'">
      <!-- 1.没有子级 -->
      <template v-if="!item.children || item.type == '2'">
        <el-menu-item
          :index="item.id.toString()"
          @click="handleItemClick(item)"
        >
          <king-icon v-if="item.icon" :type="iconType(item.icon)"></king-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
      <!-- 2.有子级 -->
      <template v-else>
        <el-sub-menu :index="item.id.toString()" :popper-offset="7">
          <template #title>
            <king-icon v-if="item.icon" :type="iconType(item.icon)"></king-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="item.children">
            <sub-menu
              :menu-list="item.children"
              :itemMargin="itemMargin"
              :iconOffset="iconOffset"
              @handleItemClick="handleItemClick"
              @iconType="iconType"
            ></sub-menu>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </template>
</template>

<script setup lang="ts" name="SubMenu">
defineProps<{
  menuList: any[]
  iconOffset: any
  itemMargin: any
}>()
const emit = defineEmits(['iconType', 'handleItemClick'])

const iconType = (icon: string) => {
  emit('iconType', icon)
}

const handleItemClick = (item: string) => {
  emit('handleItemClick', item)
}
</script>

<style lang="less" scoped>
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
</style>
