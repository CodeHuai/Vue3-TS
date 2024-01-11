import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/assets/css/index.css'

store.dispatch('loginModule/loadLocalLogin') // 用户信息的持久化 vuex

createApp(App).use(store).use(router).use(ElementPlus, {
  locale: zhCn
}).mount('#app')
