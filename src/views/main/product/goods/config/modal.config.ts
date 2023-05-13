const modalConfig = {
  pageName: '商品',
  pageParam: 'goods',
  permissionsKey: 'shops',
  idKey: 'id',
  queryData: [],
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入原价格'
    },
    {
      type: 'input',
      label: '新价格',
      prop: 'newPrice',
      placeholder: '请输入新价格'
    },
    {
      type: 'input',
      label: '商品描述',
      prop: 'desc',
      placeholder: '请输入商品描述'
    },
    {
      type: 'input',
      label: '商品状态',
      prop: 'status',
      placeholder: '请输入商品状态'
    },
    {
      type: 'input',
      label: '商品图片',
      prop: 'imgUrl',
      placeholder: '请输入商品图片'
    },
    {
      type: 'input',
      label: '商品库存',
      prop: 'inventoryCount',
      placeholder: '请输入商品库存'
    },
    {
      type: 'input',
      label: '商品销量',
      prop: 'saleCount',
      placeholder: '请输入商品销量'
    },
    {
      type: 'input',
      label: '商品收藏',
      prop: 'favorCount',
      placeholder: '请输入商品收藏'
    },
    {
      type: 'input',
      label: '商品地址',
      prop: 'address',
      placeholder: '请输入商品地址'
    },
    {
      type: 'select',
      label: '商品分类',
      prop: 'parentId',
      options: [],
      placeholder: '请输入商品分类'
    }
  ],
  modalRules: {
    name: {
      required: true,
      message: '请输入商品名称',
      trigger: 'blur'
    },
    oldPrice: {
      required: true,
      message: '请输入原价格',
      trigger: 'blur'
    },
    newPrice: {
      required: true,
      message: '请输入新价格',
      trigger: 'blur'
    },
    desc: {
      required: true,
      message: '请输入商品描述',
      trigger: 'blur'
    },
    status: {
      required: true,
      message: '请输入商品状态',
      trigger: 'blur'
    },
    imgUrl: {
      required: true,
      message: '请输入商品图片',
      trigger: 'blur'
    },
    inventoryCount: {
      required: true,
      message: '请输入商品库存',
      trigger: 'blur'
    },
    saleCount: {
      required: true,
      message: '请输入商品销量',
      trigger: 'blur'
    },
    favorCount: {
      required: true,
      message: '请输入商品收藏',
      trigger: 'blur'
    },
    address: {
      required: true,
      message: '请输入商品地址',
      trigger: 'blur'
    },
    parentId: {
      required: true,
      message: '请输入商品分类',
      trigger: 'blur'
    }
  }
}

export default modalConfig
