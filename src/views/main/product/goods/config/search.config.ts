const searchConfig = {
  pageName: '商品',
  pageParam: 'goods',
  permissionsKey: 'shops',
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '商品地址',
      prop: 'address',
      placeholder: '请输入商品地址'
    },
    {
      type: 'date-picker',
      component: 'daterange',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export default searchConfig
