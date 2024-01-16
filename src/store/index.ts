import { createStore } from 'vuex'
import { IRootState } from './types'

import loginModule from './login/loginStore'
import { breadCrumbModule } from '@/store/breadcrumb/breadcrumbStore'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

export const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {
    getEntireDepartmentList(state) {
      return state.entireDepartment || []
    },
    getEntireRole(state) {
      return state.entireRole || []
    },
    getEntireMenu(state){
      return state.entireMenu || []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeEntireDepartment', departmentList)


      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    breadCrumbModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}
