<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import {rules} from '../config/phone-config'
import { useStore } from 'vuex'

const store = useStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const phone = reactive({
  num: '',
  code: ''
})

const reset = () => {
  phone.num = ''
  phone.code = ''
}

const loginAction = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      store.dispatch('loginModule/phoneLoginAction', {...phone})
    }
  })
}

onMounted(() => {
  reset()
})

defineExpose({
  reset,
  loginAction
})
</script>

<template>
  <el-form label-width="80px" :rules="rules" :model="phone" ref="formRef">
    <el-form-item label="手机号" prop="num">
      <el-input clearable v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input clearable v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
