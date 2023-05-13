<template>
  <div class="rose-echart">
    <king-echarts :options="options" :config="config"></king-echarts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import KingEcharts from '@/base-ui/king-echarts'
import type { EChartsOption } from 'echarts'
import type { IPieEchartData, IEchartConfig } from '../types'

const props = defineProps<{
  roseData: IPieEchartData[]
  config?: IEchartConfig
}>()

const options = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        // 内半径/外半径的大小
        radius: [10, 120],
        // 设置区域的位置
        center: ['50%', '50%'],
        roseType: 'area', // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
