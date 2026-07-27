<template>
  <div>
    <el-row :gutter="10" class="card-row">
      <el-col :span="6">
        <el-card shadow="never" class="in">
          <div class="card-content">
            <div class="card-left">
              <p>本月进件</p>
              <p class="data">6588</p>
              <p>+20.12% <span>与上月同比</span></p>
            </div>
            <i class="el-icon-tickets icon"></i>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="out">
          <div class="card-content">
            <div class="card-left">
              <p>本月放款（元）</p>
              <p class="data">1210000000</p>
              <p>+1.25% <span>与上月同比</span></p>
            </div>
            <i class="el-icon-money icon"></i>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="in-total">
          <div class="card-content">
            <div class="card-left">
              <p>累计进件</p>
              <p class="data">128700</p>
              <p>+11.48% <span>与去年同比</span></p>
            </div>
            <i class="el-icon-date icon"></i>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="out-total">
          <div class="card-content">
            <div class="card-left">
              <p>累计放款（元）</p>
              <p class="data">9233180079</p>
              <p>-2.06% <span>与去年同比</span></p>
            </div>
            <i class="el-icon-coin icon"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="18">
        <el-card>
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="analysis"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="percentage"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt" :gutter="10">
      <el-col :span="12">
        <el-card style="height: 700px">
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>Update Github template</h4>
                  <p>Tom committed 2018/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>Update Github template</h4>
                  <p>Tom committed 2018/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>Update Github template</h4>
                  <p>Tom committed 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: 700px">
          <el-calendar v-model="value"> </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 1.导入echarts
import * as echarts from "echarts";
import { get } from "../../utils/http";
export default {
  data() {
    return {
      dataKeys: [],
      dataValues: [],
      value: new Date(),
    };
  },
  mounted() {
    this.getLinerData();
    this.pie();
  },
  methods: {
    liner() {
      // 2.创造一个echart实例（初始化一个容器）
      const myChart = echarts.init(this.$refs.analysis);
      // 3.配置项
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dataKeys,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.dataValues,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff", // color at 0%
                  },
                  {
                    offset: 1,
                    color: "#fff", // color at 100%
                  },
                ],
                global: false, // default is false
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    pie() {
      const myChart = echarts.init(this.$refs.percentage);
      const option = {
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   top: 0,
        //   left: "center",
        //   orient: "vertical",
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    async getLinerData() {
      const { data } = await get("/line");
      for (let key in data) {
        this.dataKeys.push(key);
        this.dataValues.push(data[key]);
      }
      this.liner();
    },
  },
};
</script>

<style lang="less" scoped>
.card-row {
  margin-bottom: 10px;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 14px;
  color: #fff;
  .data {
    font-weight: 600;
    margin: 10px 0;
  }
  .icon {
    font-size: 80px;
    color: rgba(255, 255, 255, 0.3);
  }

  p {
    font-size: 14px;

    span {
      font-size: 12px;
    }
  }
}

.in {
  background-color: #4f88ff;
}

.out {
  background-color: #f26075;
}

.in-total {
  background-color: #5050ff;
}

.out-total {
  background-color: #f49b3b;
}

:deep(.el-card__body) {
  padding: 10px !important;
}

// .el-col {
//   padding-right: 5px !important;
//   padding-left: 5px !important;
// }
// .el-row {
//   margin-left: -5px !important;
//   margin-right: -5px !important;
// }
</style>
