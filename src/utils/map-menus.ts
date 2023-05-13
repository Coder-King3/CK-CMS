// import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * * 获取本地路由对象 *
 * @function loadLocalRoutes
 * @return {RouteRecordRaw[]}
 */
function loadLocalRoutes() {
  /* 一、本地路由对应文件夹模块 */
  // 1.动态获取所有的路由对矿象，放到组中
  //  - 路油时象都在独立的文件中
  //  - 从文件中将所有路由象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取/router/main下所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  // console.log('localRoutes', localRoutes)
  return localRoutes

  /* 二、本地路由配置文件 */
  // let localRoutes: RouteRecordRaw[] = []
  // // 1.1读取/router/main下所有的ts文件
  // const files: Record<string, any> = import.meta.glob('@/router/local/*.ts', {
  //   eager: true
  // })
  // for (const key in files) {
  //   const module = files[key]
  //   localRoutes = module.default
  // }
  // return localRoutes
}

export let firstRoute: any = null

/**
 * * 动态添加路由 *
 * @function mapMenusToRoutes
 * @param {any[]} userMenus
 * @return {RouteRecordRaw[]}
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给一级菜单指定重定向
        if (!routes.find((item) => item.path == menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }
        // 二级菜单
        routes.push(route)
      }
      if (!firstRoute && route) firstRoute = route
    }
  }

  // const testRoutes: RouteRecordRaw[] = []
  // function _recursePushRoute(menus: any[]) {
  //   for (const menu of menus) {
  //     if (menu.children && menu.children.length > 0) {
  //       for (const submenu of menu.children) {
  //         const route = localRoutes.find((item) => item.path === submenu.url)
  //         if (route) {
  //           // 给一级菜单指定重定向
  //           if (!testRoutes.find((item) => item.path == menu.url)) {
  //             console.log('给一级菜单指定重定向')
  //             testRoutes.push({ path: menu.url, redirect: route })
  //           }
  //           // 二级菜单
  //           testRoutes.push(route)
  //         } else {
  //           console.log('submenu', submenu)
  //           if (submenu.children && submenu.children.length > 0) {
  //             _recursePushRoute(submenu.children)
  //           }
  //         }
  //       }
  //     } else {
  //       console.log('NoMenu', menu)
  //       const route = localRoutes.find((item) => item.path === menu.url)
  //       console.log('NoRoute', route)
  //       if (route) {
  //         // 二级菜单
  //         testRoutes.push(route)
  //       }
  //     }
  //   }
  // }
  // _recursePushRoute(userMenus)
  // console.log('testRoutes', testRoutes)
  // console.log('routes', routes)

  return routes
}

// export function mapMenusToRoutes(userMenus: any[]) {
//   console.log('userMenus!!!', userMenus)
//   // 1.加载本地路由
//   const localRoutes = loadLocalRoutes()

//   // 2.根据菜单去匹配正确的路由
//   const routes: RouteRecordRaw[] = []
//   function _recursePushRoute(menus: any[]) {
//     for (const menu of menus) {
//       if (menu.children && menu.children.length > 0) {
//         for (const submenu of menu.children) {
//           const route = localRoutes.find((item) => item.path === submenu.url)
//           if (route) {
//             // 给一级菜单指定重定向
//             if (!routes.find((item) => item.path == menu.url)) {
//               console.log('给一级菜单指定重定向')
//               routes.push({ path: menu.url, redirect: route })
//             }
//             // 二级菜单
//             routes.push(route)
//           } else {
//             console.log('submenu', submenu)
//             if (submenu.children && submenu.children.length > 0) {
//               _recursePushRoute(submenu.children)
//             }
//           }
//         }
//       } else {
//         console.log('NoMenu', menu)
//         const route = localRoutes.find((item) => item.path === menu.url)
//         console.log('NoRoute', route)
//         if (route) {
//           // 二级菜单
//           routes.push(route)
//         }
//       }

//       // if (route) {
//       //   // 给一级菜单指定重定向
//       //   if (!routes.find((item) => item.path == menu.url)) {
//       //     routes.push({ path: menu.url, redirect: route })
//       //   }
//       //   // 二级菜单
//       //   routes.push(route)
//       // }
//       // if (!firstRoute && route) firstRoute = route

//       // const route = localRoutes.find((item) => item.path === menu.url)
//       // if (route) {
//       //   // 给一级菜单指定重定向
//       //   if (!routes.find((item) => item.path == menu.url)) {
//       //     routes.push({ path: menu.url, redirect: route })
//       //   }
//       //   // 添加当前菜单路由
//       //   routes.push(route)
//       // }
//       // if (menu.children && menu.children.length > 0) {
//       //   // 递归添加子菜单路由
//       //   _recursePushRoute(menu.children)
//       // }
//     }
//   }
//   _recursePushRoute(userMenus)

//   console.log('routes!!!', routes)

//   return routes
// }

/**
 * * 根据路径匹配菜单 *
 * @function mapPathToMenu
 * @param {string} path
 * @param {any[]} userMenus
 * @return {RouteRecordRaw[]}
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}

/**
 * * 根据路径匹配面包屑列表 *
 * @function mapPathToBreadcrumb
 * @param {string} path
 * @param {any[]} userMenus
 * @return {RouteRecordRaw[]}
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({
          name: submenu.name,
          path: submenu.url
        })
      }
    }
  }
  return breadcrumbs
}
// interface IBreadcrumbs {
//   name: string
//   path: string
// }

// export function mapPathToBreadcrumb(
//   path: string,
//   userMenus: any[]
// ): IBreadcrumbs[] {
//   const breadcrumbs: IBreadcrumbs[] = []

//   function _recurseGetMenu(menus: any[], parentBreadcrumbs: IBreadcrumbs[]) {
//     for (const menu of menus) {
//       if (menu.url === path) {
//         // 如果找到与给定路径匹配的菜单项，则将该项及其所有祖先项添加到面包屑列表中
//         breadcrumbs.push(...parentBreadcrumbs, {
//           name: menu.name,
//           path: menu.url
//         })
//         return true
//       } else if (menu.children) {
//         // 如果当前菜单项有子菜单，则递归搜索子菜单
//         const found = _recurseGetMenu(menu.children, [
//           ...parentBreadcrumbs,
//           { name: menu.name, path: menu.url }
//         ])
//         if (found) {
//           // 如果找到了匹配的菜单项，则返回
//           return true
//         }
//       }
//     }

//     // 如果没有找到匹配的菜单项，则返回 false
//     return false
//   }

//   _recurseGetMenu(userMenus, [])

//   return breadcrumbs
// }

/**
 * * 根据权限id返回用户菜单列表 *
 * @function mapMenusToIds
 * @param {any[]} menus
 * @param {any[]} permissions
 * @return {number[]}
 */
export function mapMenusToIds(menus: any[], permissions: any[]) {
  const ids: number[] = []
  function _recurseGetId(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetId(menu.children)
      } else {
        permissions.forEach((id) => {
          if (id === menu.id) ids.push(menu.id)
        })
      }
    }
  }
  _recurseGetId(menus)
  return ids
}

/**
 * * 根据角色菜单返回角色权限 *
 * @function mapMenusToPermis
 * @param {any[]} menuList
 * @return {string[]}
 */
export function mapMenusToPermis(menuList: any[]) {
  const permissions: string[] = []
  function _recurseGetPermis(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 3) {
        permissions.push(menu.permission)
      } else {
        _recurseGetPermis(menu.children ?? [])
      }
    }
  }
  _recurseGetPermis(menuList)
  return permissions
}
