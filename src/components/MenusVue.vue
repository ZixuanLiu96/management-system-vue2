<template>
  <div>
    <el-submenu v-if="menu.children" :index="menu.url">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
      </template>
      <!-- 递归：组件自己调用自己，直到没有下级菜单为止 -->
      <menu-nav
        v-for="(item, index) in menu.children"
        :key="index"
        :menu="item"
      >
      </menu-nav>
    </el-submenu>

    <el-menu-item v-else :index="menu.url">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuNav",
  props: {
    menu: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped></style>
