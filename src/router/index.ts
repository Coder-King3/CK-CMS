import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstRoute, mapMenusToRoutes } from '@/utils/map-menus'
import { PersonalCenter } from '@/components/nav-setting'

const Login = () =>
  import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
const Main = () =>
  import(/* webpackChunkName: "main" */ '@/views/main/main.vue')
const NotFound = () =>
  import(/* webpackChunkName: "notFound" */ '@/base-ui/not-found/')

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
    children: [
      {
        path: 'personal',
        component: PersonalCenter,
        meta: { breadcurmb: [{ name: '个人中心', path: '/main/personal' }] }
      }
    ],
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
  history: createWebHashHistory()
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

NProgress.configure({ easing: 'ease', speed: 300, showSpinner: false })

// 导航守卫
router.beforeEach((to) => {
  // 开启虚拟加载进度条
  NProgress.start()
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  if (to.path === '/main' && firstRoute) {
    return firstRoute
  }
})

router.afterEach((to) => {
  // 关闭虚拟加载进度条
  NProgress.done()
})

export default router
