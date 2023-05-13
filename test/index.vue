<template>
  <div><zizuj :param="param"></zizuj></div>
</template>

<script setup lang="ts" name="test">
import { reactive } from 'vue'
import zizuj from './components//zizuj.vue'

let param = reactive<{ num: any }>({
  num: undefined
})

param.num = 999
</script>

<style lang="less" scoped></style>
