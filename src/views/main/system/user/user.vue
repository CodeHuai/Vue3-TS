<template>
  <div class="user">
    <pageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick"
                @queryBtnClick="handleQueryClick" @echoSearchParams="echoSearchParams"></pageSearch>
    <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="users"></PageContent>
  </div>
</template>

<script setup lang="ts">
import { searchFormConfig } from './config/search.config'
import pageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/use-page-search'

// hooks 用法
const [pageContentRef, handleResetClick, handleQueryClick, echoSearchParams] = usePageSearch()
</script>

<style lang="less" scoped></style>
