const searchConfig = {
  pageName: '部门',
  pageParam: 'department',
  permissionsKey: 'department',
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      span: 8,
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
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
