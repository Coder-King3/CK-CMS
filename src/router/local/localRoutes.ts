export default [
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/analysis/overview',
    name: 'overview',
    component: () => import('@/views/main/analysis/overview/overview.vue')
  },
  {
    path: '/main/product/category',
    name: 'category',
    component: () => import('@/views/main/product/category/category.vue'),
    children: []
  },
  {
    path: '/main/product/goods',
    name: 'goods',
    component: () => import('@/views/main/product/goods/goods.vue'),
    children: []
  },
  {
    path: '/main/story/chat',
    name: 'chat',
    component: () => import('@/views/main/story/chat/chat.vue'),
    children: []
  },
  {
    path: '/main/story/list',
    name: 'list',
    component: () => import('@/views/main/story/list/list.vue'),
    children: []
  },
  {
    path: '/main/system/department',
    name: 'department',
    component: () => import('@/views/main/system/department/department.vue'),
    children: []
  },
  {
    path: '/main/system/menu',
    name: 'menu',
    component: () => import('@/views/main/system/menu/menu.vue'),
    children: []
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: () => import('@/views/main/system/role/role.vue'),
    children: []
  },
  {
    path: '/main/system/user',
    name: 'user',
    component: () => import('@/views/main/system/user/user.vue'),
    children: []
  },
  {
    path: '/main/test1/test2/test3',
    name: 'test3',
    component: () => import('@/views/main/test1/test2/test3/test3.vue'),
    children: []
  }
]
