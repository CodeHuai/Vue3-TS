<script setup lang="ts">
import LoginPanel from './cpns/login-panel.vue'
</script>

<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
