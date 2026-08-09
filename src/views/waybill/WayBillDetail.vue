<template>
  <div>
    <bread-list></bread-list>
    <el-card class="mt">
      <el-row>
        <el-col :span="12"
          ><span>运单编号：100001</span
          ><span style="margin: 0 20px">创建时间：2020-12-01</span
          ><span>审核员：张三丰</span>
        </el-col>
        <el-col :span="12" style="text-align: right"
          ><el-button type="primary" size="mini" @click="back"
            >返回</el-button
          ></el-col
        >
      </el-row>
    </el-card>

    <el-card class="mt">
      <el-steps :active="2" align-center>
        <el-step title="步骤一" description="未发货"></el-step>
        <el-step title="步骤二" description="已发货"></el-step>
        <el-step title="步骤三" description="运输中"></el-step>
        <el-step title="步骤四" description="已完成"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
import BreadList from "../../components/BreadList.vue";
export default {
  components: { BreadList },
  methods: {
    back() {
      this.$router.push("/waybill/list");
    },
  },
};
</script>

<style lang="less" scoped></style>
