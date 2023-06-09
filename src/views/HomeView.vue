<template>
  <div class="main">
    <div class="cards">
      <HomeCard
        v-for="(item, index) in cardData"
        :key="index"
        :icon="item.icon"
        :title="item.title"
        :num="item.num"
      ></HomeCard>
    </div>
    <div class="chart" ref="home_chart"></div>
  </div>
</template>

<script>
import HomeCard from "@/components/HomeCard.vue";
export default {
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
    };
  },
  components: {
    HomeCard,
  },

  mounted() {
    this.$echarts.init(this.$refs.home_chart).setOption({
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  .cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .chart {
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    margin-top: 26px;
    width: calc(100% - 20px);
    height: 66vh !important;
  }
}
.cards > div {
  width: 100%;
  margin: 0px 10px;
}
</style>
