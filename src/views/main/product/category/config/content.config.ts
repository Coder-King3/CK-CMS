const contentConfig = {
  pageName: '类别',
  pageParam: 'category',
  permissionsKey: 'category',
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
      label: '类别名称'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间'
    },
    {
      type: 'handler',
      label: '操作',
      tools: [{ type: 'edit' }, { type: 'delete' }]
    }
  ]
}

export default contentConfig
