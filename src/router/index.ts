import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import cache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { ElMessage } from 'element-plus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 只要没有 token 都是需要重新登陆
  if (!cache.getCache('token')) {
    ElMessage.error('请重新登陆！')
    cache.clearCache()
    return '/login'
  } else {
    if (to.path !== '/login') {
      if(to.path === '/main'){
        return firstMenu.url
      } else {
        next()
      }
    } else if (to.path === '/login') {
      cache.clearCache()
      next()
    }
  }
})

export default router
