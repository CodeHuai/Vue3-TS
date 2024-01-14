import { createStore } from 'vuex'
import { IRootState } from './types'

import loginModule from './login/loginStore'
import { breadCrumbModule } from '@/store/breadcrumb/breadcrumbStore'
import systemModule from './main/system/system'

export default createStore<IRootState>({
  state: () => {
    return {
      name: '',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    breadCrumbModule,
    systemModule
  }
})
