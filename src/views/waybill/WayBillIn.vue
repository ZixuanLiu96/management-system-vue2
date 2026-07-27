<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import breadCrumb from "../../mixins/breadCrumb";

export default {
  mixins: [breadCrumb],
};
</script>

<style lang="less" scoped></style>
