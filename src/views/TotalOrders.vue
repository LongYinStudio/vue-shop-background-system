<template>
  <div class="main">
    <h1>total orders</h1>
    <div ref="chartBox" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: "TotalOrders",
  mounted() {
    this.$echarts.init(this.$refs.chartBox).setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  .chart {
    width: 100%;
    height: 600px;
  }
}
</style>
