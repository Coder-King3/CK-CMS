<template>
  <div
    v-if="isOnlineSvg"
    :style="{ '--svg-icon-url': `url(${type})` }"
    class="svg-icon svg-icon-online"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue'

const props = defineProps({
  // SVG 图标名称或在线URL
  type: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.type))
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -10%;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
