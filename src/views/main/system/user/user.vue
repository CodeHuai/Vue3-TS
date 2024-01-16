<template>
  <div class="user">
    <pageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
                @queryBtnClick="handleQueryClick" @echoSearchParams="echoSearchParams"></pageSearch>
    <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="users"
                 @newBtnClick="handleNewData"
                 @editBtnClick="handleEditData"></PageContent>
    <page-modal :modal-config="modalConfigRef" pageName="users" ref="pageModalRef" :defaultInfo="defaultInfo"></page-modal>
  </div>
</template>

<script setup lang="ts">
import { searchFormConfig } from './config/search.config'
import pageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/use-page-search'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
import { computed } from 'vue'
import { useStore } from 'vuex'


const store = useStore()
// 新增时候。需要展示密码的输入选项
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
// 编辑时候不需要展示修改密码的选项
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

// 处理部门和角色的数据请求
// 处理 比如有一些异步的操作时，第一次不能正常加载数据。但是 数据确实有的时候，第二次进来时候就显示有数据了这种情况解决思路，要手动给 vue 创建一个依赖的环境
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(el => {
    return el.field === 'departmentId'
  })

  const entireDepartmentList = computed(() => store.getters['getEntireDepartmentList'])
  departmentItem!.options = entireDepartmentList.value.map((el: any) => ({ title: el.name, value: el.id }))


  const roleItem = modalConfig.formItems.find(
    (item) => item.field === 'roleId'
  )
  const roleList = computed(() => store.getters['getEntireRole'])
  roleItem!.options = roleList.value.map((item: any) => {return { title: item.name, value: item.id }})
  return modalConfig
})


// hooks 用法
const [pageContentRef, handleResetClick, handleQueryClick, echoSearchParams] = usePageSearch()
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(newCallback, editCallback)
</script>

<style lang="less" scoped></style>
