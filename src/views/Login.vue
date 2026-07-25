<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>邦达国际物流后台管理系统</h1>
          </div>
          <el-form
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm"
            :rules="rules"
            :model="formData"
          >
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="login"
                :loading="loading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { post } from "../utils/http";
export default {
  data() {
    return {
      loading: false,
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^\w{4,8}$/,
            message: "用户名必须是4-8位数字字母组合",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "密码必须是6位纯数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        //验证，validate方法的第一个参数是个布尔值，第二个参数是表单的具体信息对象
        if (valid) {
          this.loading = true;
          // 用自定义的axios
          post("/login", this.formData)
            .then((res) => {
              console.log("22222", res);
              sessionStorage.setItem("token", res.token);
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              console.error(err);
            });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  width: 480px;
  margin-top: 160px;
  h1 {
    text-align: center;
  }
}
</style>
