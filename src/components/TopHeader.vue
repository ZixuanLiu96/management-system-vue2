<template>
  <div class="top-header">
    <p class="text">
      今天是您在阿里的 <span>{{ getDays }}</span> 天
    </p>
    <el-dropdown @command="handleDropdown">
      <span class="el-dropdown-link">
        您好，{{ nickname }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
        <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { get } from "../utils/http";
export default {
  data() {
    return {
      nickname: sessionStorage.getItem("nickname"),
      time: "",
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    async getTime() {
      const { time } = await get("/in");
      // console.log(time);
      this.time = time;
    },
    handleDropdown(command) {
      if (command == "exit") {
        sessionStorage.clear();
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else if (command == "personal") {
        this.$router.push("/personal");
      }
    },
  },
  computed: {
    getDays() {
      const nowDate = new Date();
      const targetDate = new Date(this.time || nowDate);
      return Math.floor((nowDate - targetDate) / 1000 / 3600 / 24);
    },
  },
};
</script>

<style lang="less" scoped>
.top-header {
  background-color: #fff;
  height: 50px;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: end;
  padding: 0 20px;
  .text {
    font-size: 14px;
    color: #444;
    span {
      font-size: 20px;
      color: #6cadfc;
    }
  }
}
</style>
