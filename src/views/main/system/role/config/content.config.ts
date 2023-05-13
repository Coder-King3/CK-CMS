const contentConfig = {
  pageName: '角色',
  pageParam: 'role',
  permissionsKey: 'role',
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
      label: '角色名称'
    },
    {
      prop: 'intro',
      label: '角色权限'
    },
    {
      prop: 'createAt',
      label: '创建时间'
    },
    {
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
