const contentConfig = {
  pageName: '用户',
  pageParam: 'user',
  permissionsKey: 'user',
  idKey: 'id',
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
      label: '用户名',
      width: 120
    },
    {
      prop: 'realname',
      label: '真实姓名',
      width: 120
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      width: 120
    },
    {
      type: 'custom',
      prop: 'enable',
      label: '状态',
      width: 120,
      soltName: 'enable'
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
  ],
  queryInfo: {}
}

export default contentConfig
