<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <nav-left />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "../components/NavLeft.vue";

export default {
  components: { NavLeft },
};
</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  background-color: #001529;
}
</style>
