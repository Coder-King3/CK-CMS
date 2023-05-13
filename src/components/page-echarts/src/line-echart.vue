<template>
  <div class="line-echart">
    <king-echarts :options="options" :config="config"></king-echarts>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import KingEcharts from '@/base-ui/king-echarts'
import type { EChartsOption } from 'echarts'
import type { IEchartValueData, IEchartConfig } from '../types'

const props = defineProps<{
  lineData: {
    labels: string[]
    values: IEchartValueData[]
  }

  config?: IEchartConfig
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.lineData.labels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量统计',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.lineData.values
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
