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
      cardData: [
        {
          icon: require("@/assets/img/orders2.png"),
          title: "总订单",
          num: "102,400",
        },
        {
          icon: require("@/assets/img/money.png"),
          title: "总销售额",
          num: "102,400",
        },
        {
          icon: require("@/assets/img/orders.png"),
          title: "今日订单数",
          num: "102,400",
        },
        {
          icon: require("@/assets/img/money2.png"),
          title: "今日销售额",
          num: "102,400",
        },
      ],
      class: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
      value: [120, 132, 101, 134, 90, 230, 210],
    };
  },
  mounted() {
    // this.drawLineGraph();
    this.$axios
      .get("http://localhost:5000/order/ordertotal")
      .then((res) => {
        console.log(res);
        this.class = [];
        this.value = [];
        res.data.data.forEach((element) => {
          this.class.push(element.orderTime);
          this.value.push(element.orderAmount);
        });
        this.drawLineGraph();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    drawLineGraph() {
      this.$echarts.init(this.$refs.echarts).setOption({
        xAxis: {
          type: "category",
          data: this.class,
          axisLabel: {
            rotate: 80,
            formatter: function (value) {
              return value.substring(0, 10) + "\n" + value.substring(11, 19);
            },
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.value,
            type: "bar",
          },
        ],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 100,
        },
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
