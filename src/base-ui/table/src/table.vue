<script setup lang="ts">
import { pathMapToMenu } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const emits = defineEmits(['selectionChange'])
const store = useStore()
const route = useRoute()
const menus = computed(() => store.getters['loginModule/getUserMenus'])
const currentMenu = pathMapToMenu(menus.value, route.path)

const props = defineProps({
  title: {
    type: String
  },
  listData: {
    required: true,
    type: Array
  },
  propList: {
    required: true,
    type: Array
  },
  showSelectColumn: {
    default: false,
    type: Boolean
  },
  showIndexColumn: {
    default: false,
    type: Boolean
  }
})


// 勾选对应行数据
const onSelectChange = (selection: any) => {
  emits('selectionChange', selection)
}

// 每页数量改变时
const handleSizeChange = () => {

}

// 当前页改变时
const handleCurrentChange = () => [

]

const currentPage = ref(1)
</script>

<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title || currentMenu.name }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="props.listData" @selection-change="onSelectChange" border style="width: 100%">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in props.propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
