import { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import { fetchLoginByAccount, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/index'
import cache from '@/utils/cache'
import router from '@/router'


const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {
    getUserMenus(state){
      return state.userMenus || cache.getCache('userMenus')
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      try {
        const { data } = await fetchLoginByAccount(payload)
        const { token, name, id } = data
        // 存储 token
        commit('changeToken', token)

        //   处理用户信息
        const result = await requestUserInfoById(id)
        commit('changeUserInfo', result.data)


        // 请求用户菜单栏
        const userMenus = await requestUserMenusByRoleId(id)
        commit('changeUserMenus', userMenus?.data)


        // 跳转到主页面
        router.push('/main')
      } catch (err: any) {
        //   返回登录页， 清除所有cache
        router.replace('/')
        cache.clearCache()
      }
    },
    phoneLoginAction({ commit }, payload) {
      console.log('手机号', payload)
    },
    loadLocalLogin({ commit }) {
      const token = cache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = cache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  mutations: {
    changeToken(state, value) {
      state.token = value
      cache.setCache('token', value)
    },
    changeUserInfo(state, value) {
      state.userInfo = value
      cache.setCache('userInfo', value)
    },
    changeUserMenus(state, value){
      state.userMenus = value
      cache.setCache('userMenus', value)
    }
  }
}

export default loginModule
