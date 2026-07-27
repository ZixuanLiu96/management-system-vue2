<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <nav-left />
      </el-aside>
      <el-container>
        <el-header>
          <top-header></top-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>京ICP备888888888888号 京公安网备123456号</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "../components/NavLeft.vue";
import TopHeader from "../components/TopHeader.vue";

export default {
  components: { NavLeft, TopHeader },
};
</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  background-color: #001529;
}

::-webkit-scrollbar {
  display: none;
}

.el-container {
  background-color: #e9eef3;
  .el-header {
    padding: 0;
  }
}

.el-main {
  height: 80vh;
}

.el-footer {
  text-align: center;
  font-size: 12px;
  padding-top: 20px;
}
</style>
