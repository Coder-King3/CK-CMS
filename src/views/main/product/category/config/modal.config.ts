const modalConfig = {
  pageName: '类别',
  pageParam: 'category',
  permissionsKey: 'category',
  idKey: 'id',
  queryData: [],
  formItems: [
    {
      type: 'input',
      label: '类别名称',
      prop: 'name',
      placeholder: '请输入类别名称'
    }
  ],
  modalRules: {
    name: {
      required: true,
      message: '请输入类别名称',
      trigger: 'blur'
    }
  }
}

export default modalConfig
