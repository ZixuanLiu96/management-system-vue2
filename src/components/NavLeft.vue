<template>
  <div>
    <h3 class="title">邦达国际物流平台</h3>
    <el-menu background-color="#001529" text-color="#fff" :router="true">
      <menu-vue
        v-for="item in menuData"
        :key="item.name"
        :menu="item"
      ></menu-vue>
    </el-menu>
  </div>
</template>

<script>
import { get } from "../utils/http";
import MenuVue from "./MenusVue.vue";
export default {
  data() {
    return {
      menuData: [],
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      const { data } = await get("/menu");
      this.menuData = data;
      // console.log(data);
    },
  },
  components: { MenuVue },
};
</script>

<style lang="less" scoped>
.title {
  color: #fff;
  padding: 10px 0;
  text-align: center;
}
.el-menu {
  width: 201px;
}
</style>
