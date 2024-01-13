<template>
  <div class="user">
    <BaseForm v-bind="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts">
import { searchFormConfig } from './config/search.config'
import BaseForm from '@/base-ui/form/index'
</script>

<style scoped>

</style>
