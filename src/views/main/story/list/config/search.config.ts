const searchConfig = {
  pageName: '故事',
  pageParam: 'story',
  permissionsKey: 'list',
  formItems: [
    {
      type: 'input',
      label: '故事标题',
      prop: 'title',
      placeholder: '请输入故事标题'
    },
    {
      type: 'input',
      label: '故事内容',
      prop: 'content',
      placeholder: '请输入故事内容'
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
