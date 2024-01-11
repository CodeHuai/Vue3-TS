<script setup lang="ts">
import loginPhone from './login-phone.vue'
import loginAccount from './login-account.vue'
import { ref } from 'vue'
import { TabPaneName } from 'element-plus'

// 记住密码
const isKeepPassword = ref(false)
const activeName = ref('ACCOUNT')
const accountRef = ref<InstanceType<typeof loginAccount>>(null)
const loginPhoneRef = ref<InstanceType<typeof loginPhone>>(null)

// 立即登陆
const handleLoginClick = () => {
  if(activeName.value === 'ACCOUNT'){
    accountRef.value?.loginAction(isKeepPassword.value)
  }
  if(activeName.value === 'PHONE'){
    loginPhoneRef.value?.loginAction()
  }
}


const tabChange = (name: string) => {
  if (name === 'PHONE') {
    loginPhoneRef.value?.reset()
  } else {
    accountRef.value?.reset()
  }
  activeName.value = name
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch @tab-change="tabChange" v-model="activeName">
      <el-tab-pane name="ACCOUNT">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="PHONE">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" :disabled="activeName !== 'ACCOUNT'">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
