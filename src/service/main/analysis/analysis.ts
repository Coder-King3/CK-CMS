import CkRequest from '@/service'
import type { IDataType } from '@/service/types'

const analysisAPI = {
  getAmountList: '/goods/amount/list',
  categoryCount: '/goods/category/count',
  categorySale: '/goods/category/sale',
  categoryFavor: '/goods/category/favor',
  saleTop10: '/goods/sale/top10',
  addressSale: '/goods/address/sale'
}

export const getAmountList = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.getAmountList
  })
}

export const getCategoryCount = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.categoryCount
  })
}

export const getCategorySale = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.categorySale
  })
}

export const getCategoryFavor = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.categoryFavor
  })
}

export const getSaleTop10 = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.saleTop10
  })
}

export const getAddressSale = () => {
  return CkRequest.get<IDataType>({
    url: analysisAPI.addressSale
  })
}
