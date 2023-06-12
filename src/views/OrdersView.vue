<template>
  <div class="main">
    <el-card>
      <el-form :inline="true" :model="ordersForm" class="demo-form-inline">
        <el-row
          ><el-form-item label="订单号">
            <el-input
              v-model="ordersForm.orderId"
              placeholder="订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input
              v-model="ordersForm.consignee"
              placeholder="收货人"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="ordersForm.phoneNum"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="ordersForm.state" placeholder="订单状态">
              <el-option label="出货中" value="outing"></el-option>
              <el-option label="派送中" value="sending"></el-option>
            </el-select> </el-form-item
        ></el-row>
        <el-row>
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
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </div>
        </el-row>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderId" label="订单号" width="150">
        </el-table-column>
        <el-table-column prop="time" label="下单时间" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="sendTime" label="送达时间" width="120">
        </el-table-column>
        <el-table-column prop="tips" label="用户备注" width="120">
        </el-table-column>
        <el-table-column prop="money" label="订单金额" width="120">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="120">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="orders.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersForm: {
        orderId: "",
        consignee: "",
        phoneNum: "",
        state: "",
      },
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      orders: [
        {
          orderId: "151617183232",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵六",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "151617118",
          time: "19:10:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:02:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:20",
          phone: "13666888777",
          consignee: "王五",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "王五",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "12:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵六",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:05:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵六",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "王五",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "王五",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
        {
          orderId: "15161718",
          time: "19:00:00",
          phone: "13666888777",
          consignee: "赵四",
          address: "成都市高新区发财路888号",
          sendTime: "15:10:05",
          tips: "微辣",
          money: "108",
          state: "已受理",
        },
      ],
      pageSize: 6,
      currentPage: 1,
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      alert("查询");
    },
    handleClick(row) {
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.orders.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
  },
  mounted() {
    this.tableData = this.orders.slice(0, this.pageSize);
  },
};
</script>

<style lang="scss" scoped>
.main {
  .el-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .timer {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 10px;
      .el-date-editor {
        margin: 0px 10px;
      }
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  ::v-deep .el-range-separator {
    // width: 20px !important;
    padding: 0px !important;
  }
}
</style>
