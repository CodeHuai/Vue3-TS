<template>
  <div>
    <pageSearch :searchFormConfig="searchFormConfig"></pageSearch>
    <div class="page-content">
      <BaseTable :prop-list="propList" :list-data="userList">
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
  </div>
</template>

<script setup lang="ts">
import { searchFormConfig } from './config/search.config'
import pageSearch from '@/components/page-search'
import { useStore } from 'vuex'
import { computed } from 'vue'
import BaseTable from '@/base-ui/table/index'

const store = useStore()
store.dispatch('systemModule/getPageListAction', {
  pageUrl: '/users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const userList = computed(() => store.getters['systemModule/getUserList']) || []
const userCount = computed(() => store.getters['systemModule/getUserCount']) || 0

const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '250',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '250',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '120', slotName: 'handler' }
]

</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
