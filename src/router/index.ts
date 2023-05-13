import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstRoute, mapMenusToRoutes } from '@/utils/map-menus'

const Login = () =>
  import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
const Main = () =>
  import(/* webpackChunkName: "main" */ '@/views/main/main.vue')
const NotFound = () =>
  // import(/* webpackChunkName: "notFound" */ '@/views/not-found/index.vue')
  import(/* webpackChunkName: "notFound" */ '@/base-ui/not-found/')

// import Login from '@/views/login/login.vue'
// import Main from '@/views/main/main.vue'
// import NotFound from '@/views/not-found/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // 跳转到首页 /home
    // 路由拦截中判断有没有token(store)
    //  > next
    //  > next("/login")
    redirect: '/main'
    // redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {}
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: {}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '/test/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export function addRoutesWithMenu(userMenus: any[]) {
  // 获取所有匹配的路由
  const routes = mapMenusToRoutes(userMenus)
  // console.log('addRoutesWithMenu-routes', routes)

  // 动态加载路由
  for (const route of routes) {
    router.addRoute('main', route)
  }
}

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  if (to.path === '/main' && firstRoute) {
    return firstRoute
  }
})

export default router
