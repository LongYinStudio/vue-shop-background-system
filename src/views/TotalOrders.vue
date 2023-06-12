<template>
  <div class="main">
    <div class="timer">
      <div class="title">时间范围</div>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
    <el-card class="box-card">
      <div id="echarts" ref="echarts"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TotalOrders",
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      this.$echarts.init(this.$refs.echarts).setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        color: ["#c23531", "#2f4554", "#70a9b0"],

        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "降水量",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " °C";
              },
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#echarts {
  width: 100%;
  height: 600px;
}

.main {
  .timer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
    .el-date-editor {
      margin: 0px 10px;
      .el-range-separator {
        width: 6% !important;
      }
    }
  }
}

::v-deep .el-range-separator {
  padding: 0px !important;
}
</style>
