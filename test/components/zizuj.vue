<template>
  <div>
    <button @click="testBtn">测试</button>
  </div>
</template>

<script setup lang="ts" name="test2">
const props = defineProps({
  param: {
    type: Object,
    required: true
  }
})

const testBtn = () => {
  // console.log('props.param', props.param)
  // console.log('props.param.num', props.param.num)
}
</script>

<style lang="less" scoped></style>
