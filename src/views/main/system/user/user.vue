<template>
  <div class="user">
    <pageSearch :searchFormConfig="searchFormConfig"></pageSearch>
    <PageContent :contentTableConfig="contentTableConfig" pageName="users"></PageContent>
  </div>
</template>

<script setup lang="ts">
import { searchFormConfig } from './config/search.config'
import pageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
</script>

<style lang="less" scoped></style>
