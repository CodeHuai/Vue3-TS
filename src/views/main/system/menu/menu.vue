<template>
  <div class="menu">
    <page-content :content-table-config="contentTableConfig" page-name="menu"></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/index'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped>

</style>
