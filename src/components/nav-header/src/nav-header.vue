<script setup lang="ts">
import { ref } from 'vue'

const isFold = ref(false)
const emits = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}
</script>

<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" class="fold-menu">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
