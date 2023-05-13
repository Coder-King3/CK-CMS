const contentConfig = {
  pageName: '部门',
  pageParam: 'department',
  permissionsKey: 'department',
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
      label: '部门名称',
      width: 120
    },
    {
      prop: 'leader',
      label: '部门领导',
      width: 120
    },
    {
      type: 'custom',
      prop: 'parentId',
      label: '上级部门',
      width: 120,
      soltName: 'parent'
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
