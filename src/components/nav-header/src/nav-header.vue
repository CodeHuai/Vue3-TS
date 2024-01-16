<script setup lang="ts">
import { computed, ref } from 'vue'
import UserInfo from '@/components/nav-header/src/user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { getBreadcrumbData } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types/index'

const store = useStore()
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
    <div class="content">
      <Breadcrumb></Breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
