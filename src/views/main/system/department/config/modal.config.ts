const modalConfig = {
  pageName: '部门',
  pageParam: 'department',
  permissionsKey: 'department',
  idKey: 'id',
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      options: [],
      placeholder: '请输入上级部门'
    }
  ],
  queryData: [],
  modalRules: {
    name: {
      required: true,
      message: '请输入部门名称',
      trigger: 'blur'
    },
    leader: {
      required: true,
      message: '请输入部门领导',
      trigger: 'blur'
    }
  }
}

export default modalConfig
