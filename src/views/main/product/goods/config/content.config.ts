const contentConfig = {
  pageName: '商品',
  pageParam: 'goods',
  permissionsKey: 'shops',
  idKey: 'id',
  queryInfo: [],
  tableProps: [
    {
      type: 'selection',
      label: '选择'
    },
    {
      type: 'index',
      label: '序号',
      width: 80
    },
    {
      prop: 'name',
      label: '商品名称',
      width: 150
    },
    {
      prop: 'oldPrice',
      label: '原价格'
    },
    {
      prop: 'newPrice',
      label: '新价格'
    },
    {
      prop: 'desc',
      label: '商品描述',
      width: 300
    },
    {
      prop: 'status',
      label: '状态'
    },
    {
      type: 'custom',
      prop: 'imgUrl',
      label: '图片',
      soltName: 'imgUrl'
    },
    {
      prop: 'inventoryCount',
      label: '库存'
    },
    {
      prop: 'saleCount',
      label: '销量'
    },
    {
      prop: 'favorCount',
      label: '收藏'
    },
    {
      prop: 'address',
      label: '地址',
      width: 150
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间',
      width: 200
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间',
      width: 200
    },
    {
      type: 'handler',
      label: '操作',
      width: 150,
      tools: [{ type: 'edit' }, { type: 'delete' }]
    }
  ]
}

export default contentConfig
