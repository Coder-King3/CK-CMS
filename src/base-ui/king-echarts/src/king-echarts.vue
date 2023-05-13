<template>
  <div class="king-echarts">
    <div
      ref="echartRef"
      class="echart"
      :style="{
        width: config.width,
        height: config.height,
        zoom: config.zoom
      }"
    ></div>
  </div>
</template>

<script setup lang="ts" name="KingEcharts">
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import type { IEchartConfig } from '../types/types'
import useInitEcharts from '../hook/useInitEcharts'

interface IProps {
  options: EChartsOption
  config?: IEchartConfig
}

const props = withDefaults(defineProps<IProps>(), {
  config: () => ({
    width: '100%',
    height: '300px',
    zoom: 1
  })
})

const echartRef = ref<HTMLDivElement>()
onMounted(() => {
  // 1.初始化echart实例
  const { setChartOption } = useInitEcharts(echartRef.value!)

  // 2.使用watchEffect监听options变化并重新渲染
  watchEffect(() => {
    setChartOption(props.options)
  })
})
</script>

<style lang="less" scoped></style>
