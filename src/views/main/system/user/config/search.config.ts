const searchConfig = {
  pageName: '用户',
  pageParam: 'user',
  permissionsKey: 'user',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      span: 8,
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      label: '状态',
      prop: 'enable',
      options: [
        { label: '开启', value: '1' },
        { label: '关闭', value: '0' }
      ],
      placeholder: '请选择状态'
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
