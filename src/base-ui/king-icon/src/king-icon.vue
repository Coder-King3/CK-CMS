<template>
  <el-icon class="king-icon" :color="color" :size="size">
    <component :is="icon"></component>
  </el-icon>
</template>

<script setup lang="ts" name="KingIcon">
import { computed } from 'vue'
import { ElIcon } from 'element-plus' //引入ElIcon组件
import * as IconsPack from '@element-plus/icons-vue' // 全量引入svg图标
const props = defineProps({
  // 图标颜色
  color: {
    type: String,
    default: 'inherit'
  },
  // 图标大小
  size: {
    type: Number,
    default: 0
  },
  // SVG 图标名称
  type: {
    type: String,
    required: true
  }
})

// 1.动态指定Icons的类型使ts可以通过 []获取到值
const Icons: { [key: string]: any } = IconsPack

// 2.动态获取icon图标
const icon = computed(() => {
  // 通过[]方式动态获取
  return Icons[props.type]
})
</script>

<style lang="less" scoped>
.el-icons {
  vertical-align: -10%;
}
</style>
