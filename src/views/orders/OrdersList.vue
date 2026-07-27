<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row class="flex">
        <el-col :span="6">
          <el-input
            placeholder="Please input"
            v-model="params.keyword"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTableData"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="11" text-align="right">
          <el-button type="primary" @click="newOrder">新建订单</el-button>
          <el-button :disabled="!selection.length" @click="open1"
            >审核</el-button
          >
          <el-button :disabled="!selection.length">修改</el-button>
          <el-button :disabled="!selection.length">作废</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column label="订单号" prop="id" width="70"> </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2">已审核</span>
            <span v-else-if="scope.row.status == 3">审核通过</span>
            <span v-else>审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="date"> </el-table-column>
        <el-table-column label="客户名称" prop="name"> </el-table-column>
        <el-table-column label="起始城市" prop="start"> </el-table-column>
        <el-table-column label="目的城市" prop="end"> </el-table-column>
        <el-table-column label="货物名称" prop="cargo"> </el-table-column>
        <el-table-column label="件数" prop="count" width="50">
        </el-table-column>
        <el-table-column label="单位" prop="unit" width="50"> </el-table-column>
        <el-table-column label="运费" prop="price" width="70">
        </el-table-column>
        <el-table-column label="订单来源" prop="from"> </el-table-column>
        <el-table-column label="是否支付" prop="pay">
          <template slot-scope="scope">
            <span v-if="scope.row.pay == 1">已支付</span>
            <span v-else>未支付</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operate" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mt fr"
      >
      </el-pagination>
      <div class="clear"></div>
    </el-card>
    <order-modal
      :visible="visible"
      @hide="visible = false"
      @reload="getTableData"
      :formData="formData"
    />
  </div>
</template>

<script>
import breadCrumb from "../../mixins/breadCrumb";
import { post } from "../../utils/http";
import OrderModal from "./OrderModal.vue";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage4: 1,
      params: {
        pageSize: 10,
        page: 1,
        keyword: "",
      },
      loading: false,
      selection: false,
      visible: false,
      formData: {},
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      this.loading = true;
      const {
        data: { list, total },
        data,
      } = await post("/orderList", this.params);
      this.loading = false;
      this.tableData = list;
      this.total = total;
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.getTableData();
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.getTableData();
    },
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    open1() {
      const ids = this.selection.map((item) => {
        return item.id;
      });
      this.$notify({
        title: "操作成功",
        message: ids,
        type: "success",
      });
    },
    edit(formData) {
      this.visible = true;
      this.formData = formData;
      // console.log(this.formData);
    },
    newOrder() {
      this.visible = true;
      this.formData = {
        name: "",
        start: "",
        end: "",
        unit: "",
        price: "",
        from: "",
        cargo: "",
        pay: "",
        count: "",
      };
    },
  },
  components: { OrderModal },
};
</script>

<style lang="less" scoped>
.flex {
  align-items: center;
}
</style>
