import { createStore } from 'vuex'
import type { IRootState } from './types'

import loginModule from './login/loginStore'


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
    loginModule
  }
})
