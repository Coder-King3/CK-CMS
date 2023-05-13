// 表单校验规则
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      message: '用户名必须是3-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}

export { rules }
