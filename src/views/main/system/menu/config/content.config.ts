const contentConfig = {
  pageName: '菜单',
  pageParam: 'menu',
  permissionsKey: 'menu',
  idKey: 'id',
  tableAttrs: {
    'row-key': 'id'
  },
  url: '/menu/tree',
  tableProps: [
    {
      prop: 'name',
      label: '菜单名称',
      width: 150
    },
    {
      prop: 'type',
      label: '级别'
    },
    {
      prop: 'url',
      label: '菜单url'
    },
    {
      prop: 'icon',
      label: '菜单icon'
    },
    {
      prop: 'sort',
      label: '排序'
    },
    {
      prop: 'permission',
      label: '权限'
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
