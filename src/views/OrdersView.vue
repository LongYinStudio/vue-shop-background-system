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
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
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
        <el-table-column prop="address" label="地址" width="180">
        </el-table-column>
        <el-table-column prop="sendTime" label="送达时间" width="120">
        </el-table-column>
        <el-table-column prop="tips" label="用户备注" width="120">
        </el-table-column>
        <el-table-column prop="money" label="订单金额" width="120">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="120">
        </el-table-column>
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
        :total="total"
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
      orders: [],
      pageSize: 6,
      currentPage: 1,
      tableData: [],
      total: -1,
    };
  },
  methods: {
    onSubmit() {
      // alert("查询");
      this.getClasses();
    },
    handleClick(row) {
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClasses();
    },
    getClasses() {
      let queryParams = "";
      if (this.ordersForm.orderId)
        queryParams += "&orderNo=" + this.ordersForm.orderId;
      if (this.ordersForm.consignee)
        queryParams += "&consignee=" + this.ordersForm.consignee;
      if (this.ordersForm.phoneNum)
        queryParams += "&phone=" + this.ordersForm.phoneNum;
      if (this.ordersForm.state)
        queryParams += "&orderState=" + this.ordersForm.state;
      console.log(queryParams);
      this.$axios
        .get(
          "http://localhost:5000/order/list?currentPage=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            queryParams
        )
        .then((res) => {
          this.total = res.data.total;
          this.tableData = [];
          res.data.data.forEach((element) => {
            this.tableData.push({
              orderId: element.orderNo,
              time: element.orderTime,
              phone: element.phone,
              consignee: element.consignee,
              address: element.deliverAddress,
              sendTime: element.deliveryTime,
              tips: element.remarks,
              money: element.orderAmount,
              state: element.orderState,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.tableData = this.orders.slice(0, this.pageSize);
    this.getClasses();
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
    padding: 0px !important;
  }
}
</style>
