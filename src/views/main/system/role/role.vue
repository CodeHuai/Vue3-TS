<template>
  <div class="role">
    <pageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
                @queryBtnClick="handleQueryClick" @echoSearchParams="echoSearchParams"></pageSearch>
    <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="role"
                 @newBtnClick="handleNewData"
                 @editBtnClick="handleEditData"></PageContent>
    <page-modal ref="pageModalRef" :modalConfig="modalConfig" pageName="role" :defaultInfo="defaultInfo"
                :otherInfo="otherInfo">
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { computed, ref, nextTick } from 'vue'
import { store } from '@/store'
import { ElTree } from 'element-plus'

// 回调，处理点击编辑时候回显的问题
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(undefined, editCallback)
const [pageContentRef, handleResetClick, handleQueryClick, echoSearchParams] = usePageSearch()

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const menus = computed(() => store.getters['getEntireMenu'])
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped leng="less">
.menu-tree {
  margin-left: 25px;
}
</style>
