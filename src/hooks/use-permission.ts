import { useStore } from 'vuex'
import { computed } from 'vue'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = computed(() => store.getters['loginModule/getUserPermisions'])
  const verifyPermission = `system:${pageName}:${hanldeName}`
  return !!permissions.value.find((el: string) => el === verifyPermission)
}
