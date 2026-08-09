<template>
  <div>
    <el-card class="mt">
      <el-row :gutter="24">
        <el-col :span="18">
          <el-row :gutter="15">
            <el-col :span="7">
              <el-input placeholder="用户昵称" v-model="username"></el-input>
            </el-col>
            <el-col :span="7">
              <el-input placeholder="用户ID" v-model="id"></el-input
            ></el-col>
            <el-col :span="7">
              <el-input placeholder="联系电话" v-model="tel"></el-input
            ></el-col>
            <el-col :span="2">
              <span class="el-dropdown-link" @click="modifyShow">
                {{ show ? "收起" : "展开"
                }}<i
                  :class="
                    show
                      ? 'el-icon-arrow-up el-icon--right'
                      : 'el-icon-arrow-down el-icon--right'
                  "
                ></i>
              </span>
            </el-col>
          </el-row>

          <el-row :gutter="15" class="mt" v-show="show">
            <el-col :span="7">
              <el-input placeholder="车牌号" v-model="registration"></el-input>
            </el-col>
            <el-col :span="7">
              <el-input placeholder="客户类型" v-model="type"></el-input
            ></el-col>
            <el-col :span="7">
              <el-input placeholder="配送区域" v-model="area"></el-input
            ></el-col>
          </el-row>
        </el-col>

        <el-col :span="6" style="text-align: right">
          <el-button type="primary" size="mini"> 查询</el-button>
          <el-button type="primary" size="mini"> 重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      username: "",
      registration: "",
      type: "",
      area: "",
      id: "",
      tel: "",
    };
  },
  methods: {
    modifyShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
