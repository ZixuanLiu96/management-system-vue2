<template>
  <div>
    <bread-list></bread-list>
    <el-card class="mt">
      <el-row :gutter="10">
        <el-col :span="6"
          ><el-input
            placeholder="请输入运单号"
            v-model="params.waybillNo"
          ></el-input
        ></el-col>
        <el-col :span="6"
          ><el-input
            placeholder="请输入客户名称"
            v-model="params.name"
          ></el-input
        ></el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            default-value=""
          >
          </el-date-picker
        ></el-col>
        <el-col :span="6" style="text-align: right"
          ><el-button type="primary" @click="loadData">查询</el-button
          ><el-button type="primary" @click="reset">重置</el-button></el-col
        >
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="params.status" @input="loadData">
        <el-radio-button :label="1">全部运单(300)</el-radio-button>
        <el-radio-button :label="2">装货中(120)</el-radio-button>
        <el-radio-button :label="3">运输中(20)</el-radio-button>
        <el-radio-button :label="4">已完成(67)</el-radio-button>
        <el-radio-button :label="5">运单异常(10)</el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="no" label="订单号" width="50"></el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数" width="50"></el-table-column>
        <el-table-column prop="start" label="起始城市"></el-table-column>
        <el-table-column prop="end" label="目的城市"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column
          prop="driver"
          label="司机"
          width="50"
        ></el-table-column>
        <el-table-column prop="tel" label="司机电话"></el-table-column>
        <el-table-column prop="needReceive" label="需要接货">
          <template slot-scope="scope">
            <span v-if="scope.row.needReceive == 1">需要</span>
            <span v-else>不需要</span>
          </template>
        </el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
        <el-table-column prop="percent" label="运输进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operate" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="jump">详情</el-button>
            <el-button type="danger" size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mt fr"
      >
      </el-pagination>
      <div class="clear"></div>
    </el-card>
  </div>
</template>

<script>
import BreadList from "../../components/BreadList.vue";
import { post } from "../../utils/http.js";
import timeTransfer from "../../utils/timeTransfer";
import moment from "moment";
export default {
  components: { BreadList },
  data() {
    return {
      loading: false,
      date: [],
      params: {
        waybillNo: "",
        name: "",
        page: 1,
        pageSize: 10,
        status: 1,
      },
      tableData: [],
      total: 0,
    };
  },
  created() {
    this.loadData();
  },
  // 导航守卫， 离开页面的时候，清缓存
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/waybill/list/detail") {
      this.clearLoad();
    }
    next();
  },
  methods: {
    reset() {
      this.date = [];
      this.params = {
        waybillNo: "",
        name: "",
        page: 1,
        pageSize: 10,
        status: 1,
      };
      this.loadData();
    },
    async loadData() {
      // const startDate = moment(this.date[0]).format("YYYY-MM-DD");
      // const endDate = moment(this.date[1]).format("YYYY-MM-DD");
      const startDate = this.date.length ? timeTransfer(this.date[0]) : "";
      const endDate = this.date.length ? timeTransfer(this.date[1]) : "";
      this.loading = true;
      const {
        data: { list, total },
      } = await post("/waybillList", {
        ...this.params,
        startDate,
        endDate,
      });

      this.loading = false;
      this.tableData = list;
      // console.log(this.tableData);
      this.total = total;
      // console.log(this.total);
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.loadData();
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.loadData();
    },
    jump() {
      this.$router.push("/waybill/list/detail");
    },
    clearLoad() {
      let Vnode = this.$vnode;
      let parentVnode = Vnode && Vnode.parent;
      if (
        parentVnode &&
        parentVnode.componentInstance &&
        parentVnode.componentInstance.cache
      ) {
        var key =
          Vnode.key == null
            ? Vnode.componentOptions.Ctor.cid +
              (Vnode.componentOptions.tag
                ? `::${Vnode.componentOptions.tag}`
                : "")
            : Vnode.key;
        var cache = parentVnode.componentInstance.cache;
        var keys = parentVnode.componentInstance.keys;
        if (cache[key]) {
          this.$destroy();
          if (keys.length) {
            var index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
          cache[key] = null;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
