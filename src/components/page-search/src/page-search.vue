<script setup lang="ts">
import { ref } from 'vue'
import BaseForm from '@/base-ui/form/index'

const props = defineProps(['searchFormConfig'])

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<template>
  <BaseForm v-bind="props.searchFormConfig" v-model="formData">
    <template #footer>
      <div class="handle-btns">
        <el-button icon="refresh">重置</el-button>
        <el-button type="primary" icon="Search">搜索</el-button>
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
