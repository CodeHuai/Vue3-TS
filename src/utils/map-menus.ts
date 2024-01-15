import { RouteRecordRaw } from 'vue-router'
import { IRootRouterType } from '@/store/login/types'

let firstMenu: any = null // 始终拿到 菜单第一行对应的路由

export function mapMenusToRoutes(userMenus: Array<IRootRouterType>): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: Array<IRootRouterType>) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)

        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        menu.children && _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

/**
 * 根据当前地址栏路由 匹配对应的 菜单
 * @param menus 用户的userMenus数据
 * @param currentPath 当前地址栏的路由
 */
export function pathMapToMenu(menus: Array<IRootRouterType>, currentPath: string): any {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.url === currentPath) {
      return menu
    }

    if (menu.children) {
      let result = pathMapToMenu(menu.children, currentPath)
      if (result) {
        return result
      }
    }
  }
}

/**
 * 根据当前地址的路由，在 userMenus 中查找对应当前地址的路由，再根据 parentid 查找父级的路由信息,然后将父级信息存到数组中，这个数组就是对应的面包屑数据
 * @param menus 用户的userMenus数据
 * @param currentPath 当前地址栏的路由
 */
export function getBreadcrumbData(menus: Array<IRootRouterType>, currentPath: string): any {
  const menu = pathMapToMenu(menus, currentPath)
  if (menu.type === 1) {
    // 一级路由
    return [{ name: menu.name, path: menu.url }]
  } else if (menu.type === 2) {
    //   二级路由
    //   根据 二级路由的 parentid 从 一级路由中查找对应的 父级路由数据
    const ressult: any = menus.find(el => {
      return el.id === menu.parentId
    })
    return [{ name: ressult.name, path: ressult.url }, { name: menu.name, path: menu.url }]
  }
}

/**
 * 获取所有的按钮权限，在路由信息的 type 为 3的数据中
 * @param userMenus
 */
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {

    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export { firstMenu }
