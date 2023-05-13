const modalConfig = {
  pageName: '菜单',
  pageParam: 'menu',
  permissionsKey: 'menu',
  idKey: 'id',
  otherInfo: {},
  formItems: [
    {
      type: 'input',
      label: '菜单名称',
      prop: 'name',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'custom',
      label: '菜单类别',
      prop: 'type',
      placeholder: '请选择菜单类别',
      slotName: 'type'
    },
    {
      type: 'custom',
      label: '菜单图标',
      prop: 'icon',
      placeholder: '请选择菜单图标',
      slotName: 'icon'
    },
    {
      type: 'input',
      label: '菜单路径',
      prop: 'url',
      placeholder: '请选择菜单路径'
    },
    {
      type: 'input',
      label: '菜单权限',
      prop: 'permission',
      placeholder: '请选择菜单权限'
    },
    {
      type: 'custom',
      label: '父级项目',
      prop: 'parentId',
      placeholder: '请选择父级项目',
      slotName: 'parentId'
    },
    {
      type: 'custom',
      label: '菜单排序',
      prop: 'sort',
      placeholder: '请输入菜单排序',
      slotName: 'sort'
    }
  ],
  modalRules: {
    name: {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur'
    }
  }
}

export default modalConfig
