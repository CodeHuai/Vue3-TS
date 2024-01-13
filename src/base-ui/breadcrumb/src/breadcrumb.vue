<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const userMenus = computed(() => store.getters['loginModule/getUserMenus']) || [] // 路由菜单
const breadcrumbs = computed(() => store.getters['breadCrumbModule/getBreadCrumbData']) || []

onMounted(() => {
  store.commit('breadCrumbModule/changeBreadCrumbData', { menus: userMenus.value, route: route.path })
})


</script>

<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less">

</style>
