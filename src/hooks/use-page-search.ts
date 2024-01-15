import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = (queryInfo: any) => {
    pageContentRef.value.reset()
    pageContentRef.value?.fetchUserData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value.reset()
    pageContentRef.value?.fetchUserData(queryInfo)
  }

  // 将搜索参数同步到 pageContent中
  const echoSearchParams = (searchInfo: any) => {
    pageContentRef.value?.echoSearcgParams(searchInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick, echoSearchParams]
}
