<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/base-ui/table/index'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  }
})

const store = useStore()
store.dispatch('systemModule/getPageListAction', {
  pageUrl: '/users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const userList = computed(() => store.getters['systemModule/getUserList']) || []
// const userCount = computed(() => store.getters['systemModule/getUserCount']) || 0
</script>

<template>
  <div class="page-content">
    <BaseTable v-bind="contentTableConfig" :list-data="userList">
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>

      <template #status="scope">
        <el-button :type="scope.row.enable ? 'primary': 'danger'" plain>{{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button icon="Edit" size="small" type="primary"></el-button>
          <el-button icon="Delete" size="small" type="danger"></el-button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
