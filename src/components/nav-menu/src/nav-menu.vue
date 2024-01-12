<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { randomCreateIcon } from '@/config/index'

const props = defineProps(['collapse'])
const store = useStore()
const userMenus = computed(() => store.getters['loginModule/getUserMenus']) || [] // 路由菜单

</script>

<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!props.collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :collapse="props.collapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!--        二级菜单-->
        <template v-if="item.type === 1">
          <el-sub-menu :index="String(item.sort)">
            <template #title>
              <component v-if="item.icon" :is="randomCreateIcon()" class="icon-class"></component>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item :index="String(child.sort)">
                <component v-if="child.icon" :is="randomCreateIcon()" class="icon-class"></component>
                <span>{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!--        一级菜单-->
        <template v-if="item.type === 2">
          <el-menu-item :index="String(item.sort)">
            <component v-if="item.icon" :is="randomCreateIcon()" class="icon-class"></component>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.icon-class {
  width: 20px;
  margin-right: 10px;
}

.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 48px;
    line-height: 48px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    background: #001529;
    overflow: hidden;
    box-sizing: border-box;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
