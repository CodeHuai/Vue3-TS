<template>
  <div class="user">
    <pageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
                @queryBtnClick="handleQueryClick" @echoSearchParams="echoSearchParams"></pageSearch>
    <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="users"
                 @newBtnClick="handleNewData"
                 @editBtnClick="handleEditData"></PageContent>
    <page-modal :modal-config="modalConfig" pageName="users" ref="pageModalRef" :defaultInfo="defaultInfo"></page-modal>
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

// hooks 用法
const [pageContentRef, handleResetClick, handleQueryClick, echoSearchParams] = usePageSearch()
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(newCallback, editCallback)
</script>

<style lang="less" scoped></style>
