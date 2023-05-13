const searchConfig = {
  pageName: '角色',
  pageParam: 'role',
  permissionsKey: 'role',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
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
