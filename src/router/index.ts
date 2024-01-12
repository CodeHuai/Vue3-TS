import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import cache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name:'main',
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
  if (to.path !== '/login') {
    if (!cache.getCache('token')) {
      cache.clearCache()
      return '/login'
    }
    next()
  } else {
    cache.clearCache()
    next()
  }
})

export default router
