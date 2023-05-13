const modalConfig = {
  pageName: '角色',
  pageParam: 'role',
  permissionsKey: 'role',
  idKey: 'id',
  queryData: [],
  otherInfo: {},
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
      type: 'custom',
      label: '分配权限',
      prop: 'permissions',
      slotName: 'permissions'
    }
  ],
  modalRules: {
    name: {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur'
    },
    intro: {
      required: true,
      message: '请输入权限介绍',
      trigger: 'blur'
    }
  }
}

export default modalConfig
