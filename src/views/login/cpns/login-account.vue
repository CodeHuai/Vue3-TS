<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

const store = useStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const account = reactive({
  name: '',
  password: ''
})

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate(valid => {
    if (valid) {
      if (isKeepPassword) {
        //   记住了密码
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        //   没有记住密码
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      store.dispatch('loginModule/accountLoginAction', {...account})
    }
  })
}

const reset = () => {
  account.name = ''
  account.password = ''
}

onMounted(() => {
  reset()
})

defineExpose({
  loginAction,
  reset
})
</script>

<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input clearable v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">

</style>
