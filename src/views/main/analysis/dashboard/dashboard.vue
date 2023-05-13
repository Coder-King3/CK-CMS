<template>
  <div class="dashboard">
    <!-- 1.顶部商品统计 -->
    <el-row :gutter="10">
      <template v-for="item in goodsPanelDatas" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间饼图地图-商品展示 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <king-card title="分类商品数量(饼图)">
          <pie-echart :pie-data="showGoodsCategoryCount"></pie-echart>
        </king-card>
      </el-col>
      <el-col :span="10">
        <king-card title="不同城市商品销量">
          <map-echart :map-data="showGoodsAddressSale"></map-echart>
        </king-card>
      </el-col>
      <el-col :span="7">
        <king-card title="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="showGoodsCategoryCount"></rose-echart>
        </king-card>
      </el-col>
    </el-row>

    <!-- 2.底部柱形折线-商品展示 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <king-card title="分类商品销量">
          <line-echart :line-data="showGoodsCategorySale"></line-echart>
        </king-card>
      </el-col>
      <el-col :span="12">
        <king-card title="分类商品收藏">
          <bar-echart :bar-data="showGoodsCategoryFavor"></bar-echart>
        </king-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis/analysis'
import CountCard from '@/components/count-card'
import KingCard from '@/base-ui/king-card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/index'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
const {
  goodsPanelDatas,
  categoryGoodsCount,
  categoryGoodsSale,
  categoryGoodsFavor,
  // goodsSaleTop10,
  goodsAddressSale
} = storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return categoryGoodsCount.value
    .map((item: any) => ({
      name: item.name,
      value: item.count
    }))
    .filter((item: any) => item.value > 0)
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item: any) => ({
    name: item.address,
    value: item.sale
  }))
})

const showGoodsCategorySale = computed(() => {
  let labels = categoryGoodsSale.value.map((item: any) => item.name)
  let values = categoryGoodsSale.value.map((item: any) => item.sale)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  let labels = categoryGoodsFavor.value.map((item: any) => item.name)
  let values = categoryGoodsFavor.value.map((item: any) => item.favor)
  return { labels, values }
})
</script>

<style lang="less" scoped>
.dashboard {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
