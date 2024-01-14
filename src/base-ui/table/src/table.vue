<script setup lang="ts">
const props = defineProps({
  listData: {
    required: true,
    type: Array
  },
  propList: {
    required: true,
    type: Array
  }
})
</script>

<template>
  <div class="hy-table">
    <el-table :data="props.listData" border style="width: 100%">
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
  </div>
</template>

<style scoped lang="less">

</style>
