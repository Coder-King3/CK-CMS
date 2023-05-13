const contentConfig = {
  pageName: '故事',
  pageParam: 'story',
  permissionsKey: 'list',
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
      prop: 'title',
      label: '故事标题'
    },
    {
      type: 'custom',
      prop: 'content',
      label: '故事内容',
      soltName: 'content'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'handler',
      label: '操作',
      tools: [
        { type: 'custom', soltName: 'check' },
        { type: 'edit' },
        { type: 'delete' }
      ]
    }
  ]
}

export default contentConfig
