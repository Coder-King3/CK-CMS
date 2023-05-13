import { defineStore } from 'pinia'
import type { IAnalysisState } from './type'
import {
  getAmountList,
  getCategoryCount,
  getCategorySale,
  getCategoryFavor,
  getSaleTop10,
  getAddressSale
} from '@/service/main/analysis/analysis'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    goodsPanelDatas: [],
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    goodsSaleTop10: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      // 1. 请求商品展示信息
      const amountListResult = await getAmountList()
      const categoryCountResult = await getCategoryCount()
      const categorySaleResult = await getCategorySale()
      const categoryFavorResult = await getCategoryFavor()
      const saleTop10Result = await getSaleTop10()
      const addressSaleResult = await getAddressSale()

      // 2.保存商品展示信息
      this.goodsPanelDatas = amountListResult.data
      this.categoryGoodsCount = categoryCountResult.data
      this.categoryGoodsSale = categorySaleResult.data
      this.categoryGoodsFavor = categoryFavorResult.data
      this.goodsSaleTop10 = saleTop10Result.data
      this.goodsAddressSale = addressSaleResult.data
    }
  }
})

export default useAnalysisStore
