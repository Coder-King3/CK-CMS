const modalConfig = {
  pageName: '用户',
  pageParam: 'user',
  permissionsKey: 'user',
  idKey: 'id',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
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
      label: '密码',
      prop: 'password',
      editHide: true,
      placeholder: '请输入密码'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      label: '选择角色',
      prop: 'roleId',
      options: [],
      placeholder: '请选择角色'
    },
    {
      type: 'select',
      label: '选择部门',
      prop: 'deptId',
      options: [],
      placeholder: '请选择部门'
    }
  ],
  queryData: [],
  modalRules: {
    name: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    realname: {
      required: true,
      message: '请输入真实姓名',
      trigger: 'blur'
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    cellphone: {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    roleId: {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    },
    deptId: {
      required: true,
      message: '请选择部门',
      trigger: 'blur'
    }
  }
}

export default modalConfig
