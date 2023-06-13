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
      class: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
      amountData: [120, 132, 101, 134, 90, 230, 210],
      orderData: [110, 162, 81, 104, 70, 210, 200],
    };
  },
  components: {
    HomeCard,
  },

  mounted() {
    this.$axios
      .get("http://localhost:5000/order/totaldata")
      .then((res) => {
        this.cardData[0].num = res.data.totalOrder;
        this.cardData[1].num = res.data.totalAmount;
        this.cardData[2].num = res.data.todayOrder;
        this.cardData[3].num = res.data.totayAmount;
        this.class = res.data.xData;
        this.amountData = res.data.amountData;
        this.orderData = res.data.orderData;
        this.drawLineGraph();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    drawLineGraph() {
      this.$echarts.init(this.$refs.home_chart).setOption({
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "金额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.class,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            data: this.orderData,
          },
          {
            name: "金额",
            type: "line",
            data: this.amountData,
          },
        ],
      });
    },
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
