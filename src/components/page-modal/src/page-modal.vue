<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseForm from '@/base-ui/form/index'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})

const dialogVisible = ref(false)
const formData = ref<any>({})


// 改变弹框的方法
const changeVisiable = (status: boolean) => {
  dialogVisible.value = status
}


// 取消按钮
const handleConfirmClick = () => {
  changeVisiable(false)
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('systemModule/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('systemModule/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value }
    })
  }
}

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)


defineExpose({
  changeVisiable,
  dialogVisible
})
</script>

<template>
  <div class="page-modal">
    <el-dialog
      append-to-body
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <BaseForm v-bind="modalConfig" v-model="formData"></BaseForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">

</style>
