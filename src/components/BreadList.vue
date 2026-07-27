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
export default {
  data() {
    return {
      breadList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadList();
    },
  },
  created() {
    this.getBreadList();
  },
  methods: {
    getBreadList() {
      this.breadList = this.$route.meta.bread;
    },
  },
};
</script>

<style lang="less" scoped></style>
