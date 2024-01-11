<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { reactive } from 'vue'

const locale = reactive(zhCn)
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
