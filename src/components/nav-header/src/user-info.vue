<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import user from '@/router/main/system/user/user'
import cache from '@/utils/cache'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const userInfo = computed(() => store.getters['loginModule/getUserInfo'])
const name = computed(() => userInfo.value.name) || ''


const handleExitClick = () => {
  cache.deleteCache('token')
  router.push('/main')
}
</script>

<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span class="name-style">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  .name-style {
    margin-left: 10px;
  }
}
</style>
