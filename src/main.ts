import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/assets/css/index'

// 测试
import network from '@/service'

network.request({
  url: '/login',
  method: 'post',
  data: {
    "name": "coderwhy",
    "password": "123456"
  }
}).then(res => {
  console.log(res)
})


createApp(App).use(store).use(router).use(ElementPlus, {
  locale: zhCn
}).mount('#app')
