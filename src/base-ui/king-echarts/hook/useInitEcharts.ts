import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaMap from '../map/china.json'

echarts.registerMap('china', ChinaMap as any)

function useInitEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setChartOption = function (options: EChartsOption) {
    echartsInstance.setOption(options)
  }
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  const updateSize = () => {
    echartsInstance.resize()
  }
  return {
    echartsInstance,
    setChartOption,
    updateSize
  }
}

export default useInitEcharts
