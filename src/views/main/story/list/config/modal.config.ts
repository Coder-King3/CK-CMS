const modalConfig = {
  pageName: '故事',
  pageParam: 'story',
  permissionsKey: 'list',
  idKey: 'id',
  queryData: [],
  otherInfo: {},
  formItems: [
    {
      type: 'input',
      label: '故事标题',
      prop: 'title',
      placeholder: '请输入故事标题'
    },
    {
      type: 'custom',
      label: '故事内容',
      prop: 'content',
      slotName: 'content'
    }
  ],
  modalRules: {
    title: {
      required: true,
      message: '请输入故事标题',
      trigger: 'blur'
    }
  }
}

export default modalConfig
