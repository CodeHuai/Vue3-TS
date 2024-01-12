import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'
import { createRandom } from '@/utils/mathTool'

export const randomCreateIcon = () => {
  const iconArr = Object.keys(ElementPlusIconsVue)
  const len = iconArr.length
  // 随机返回一个 icon 名称
  return iconArr[createRandom(0, len - 1)]
}

export const registerIcon = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
