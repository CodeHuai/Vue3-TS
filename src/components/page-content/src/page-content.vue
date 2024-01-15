<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/base-ui/table/index'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    require: true
  }
})

const store = useStore()
// 处理分压器
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
let copySearchInfo = reactive({})
// 置空分页器
const reset = () => {
  copySearchInfo = {}
  pageInfo.value.currentPage = 1
  pageInfo.value.pageSize = 10
}
// 查询表格数据
const fetchUserData = (queryInfo = {}) => {
  store.dispatch('systemModule/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) ? (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize : 0,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
const dataList = computed(() => store.getters['systemModule/pageListData'](props.pageName))
const dataCount = computed(() => store.getters['systemModule/pageListCount'](props.pageName))


const echoSearcgParams = (info: any) => {
  copySearchInfo = info
}


// 动态插槽处理
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

watch(pageInfo, () => {
  // 想办法拿到 queryInfo
  fetchUserData(copySearchInfo)
})

onMounted(() => {
  fetchUserData()
})

defineExpose({
  reset,
  fetchUserData,
  echoSearcgParams
})
</script>

<template>
  <div class="page-content">
    <BaseTable v-bind="contentTableConfig" :list-data="dataList" :listCount="dataCount" v-model:page="pageInfo">
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
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
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
