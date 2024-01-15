<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseForm from '@/base-ui/form/index'

const emits = defineEmits(['resetBtnClick', 'queryBtnClick', 'echoSearchParams'])
const props = defineProps(['searchFormConfig'])
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 重置
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emits('resetBtnClick', formData.value)
}

// 搜索
const handleQueryClick = () => {
  emits('queryBtnClick', formData.value)
}

watch(formData, () => {
  emits('echoSearchParams', formData.value)
}, {deep: true})
</script>

<template>
  <BaseForm v-bind="props.searchFormConfig" v-model="formData">
    <template #footer>
      <div class="handle-btns">
        <el-button icon="refresh" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="Search" @click="handleQueryClick">搜索</el-button>
      </div>
    </template>
  </BaseForm>
</template>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
