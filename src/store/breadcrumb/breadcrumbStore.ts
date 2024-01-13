import { Module } from 'vuex'
import { IBreadCrumbArrType } from './types'
import { IRootState } from '../types'
import { getBreadcrumbData } from '@/utils/map-menus'

export const breadCrumbModule: Module<IBreadCrumbArrType, IRootState> = {
  namespaced: true,
  state: () => ({
    breadCrumbArr: []
  }),
  getters: {
    getBreadCrumbData(state) {
      return state.breadCrumbArr
    }
  },
  mutations: {
    changeBreadCrumbData(state, {menus, route}) {
      state.breadCrumbArr = getBreadcrumbData(menus, route)
    }
  }
}
