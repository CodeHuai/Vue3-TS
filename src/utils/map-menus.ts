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
          console.log(firstMenu)
        }
      } else {
        menu.children && _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}


export function pathMapToMenu(menus: Array<IRootRouterType>, currentPath: string):any {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.type === 1) {
      return pathMapToMenu(menu.children ?? [], currentPath)
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
