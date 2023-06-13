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
        <el-table-column fixed prop="orderId" label="订单号" width="120">
        </el-table-column>
        <el-table-column prop="time" label="下单时间" width="120">
          <template slot-scope="scope">
            {{ scope.row.time }}
            <!-- {{ new Date(scope.row.time).toLocaleString().substring(0, 10) }}
            <br />
            {{ new Date(scope.row.time).toLocaleString().substring(11) }} -->
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === editIndex"
              v-model="scope.row.phone"
              placeholder="手机号"
            ></el-input>
            <div v-else>
              {{ scope.row.phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === editIndex"
              v-model="scope.row.consignee"
              placeholder="收货人"
            ></el-input>
            <div v-else>
              {{ scope.row.consignee }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="180">
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === editIndex"
              v-model="scope.row.address"
              placeholder="地址"
            ></el-input>
            <div v-else>
              {{ scope.row.address }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sendTime" label="送达时间" width="120">
          <template slot-scope="scope">
            {{ scope.row.sendTime }}
            <!-- {{ new Date(scope.row.sendTime).toLocaleString().substring(0, 10) }}
            <br />
            {{ new Date(scope.row.sendTime).toLocaleString().substring(11) }} -->
          </template>
        </el-table-column>
        <el-table-column prop="tips" label="用户备注" width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === editIndex"
              v-model="scope.row.tips"
              placeholder="用户备注"
            ></el-input>
            <div v-else>
              {{ scope.row.tips }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="订单金额" width="120">
          <template slot-scope="scope">
            <el-input
              v-if="scope.$index === editIndex"
              v-model="scope.row.money"
              placeholder="订单金额"
            ></el-input>
            <div v-else>
              {{ scope.row.tips }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="120">
          <template slot-scope="scope">
            <el-select
              v-if="scope.$index === editIndex"
              v-model="scope.row.state"
              placeholder="订单状态"
            >
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
            </el-select>
            <div v-else>
              {{ scope.row.state }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title="详细信息"
              width="600"
              trigger="click"
            >
              <el-row :gutter="20">
                <el-col :span="6">订单号:{{ scope.row.orderId }}</el-col>
                <el-col :span="10">下单时间:{{ scope.row.time }}</el-col>
                <el-col :span="8">手机号:{{ scope.row.phone }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="7">收货人:{{ scope.row.consignee }}</el-col>
                <el-col :span="5">地址:{{ scope.row.address }}</el-col>
                <el-col :span="10">送达时间:{{ scope.row.sendTime }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">用户备注:{{ scope.row.tips }}</el-col>
                <el-col :span="6">订单金额:{{ scope.row.money }}</el-col>
                <el-col :span="8">订单状态:{{ scope.row.state }}</el-col>
              </el-row>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                slot="reference"
                style="padding-right: 10px"
                >查看</el-button
              >
            </el-popover>
            <el-button
              type="text"
              size="small"
              v-if="scope.$index === editIndex"
              @click="save(scope.$index, scope.row)"
              >保存</el-button
            >
            <el-button
              type="text"
              size="small"
              v-else
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
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
      editForm: {
        phone: -1,
      },
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      orders: [],
      pageSize: 6,
      currentPage: 1,
      tableData: [],
      total: -1,
      editIndex: -1,
    };
  },
  methods: {
    onSubmit() {
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
      // console.log(queryParams);
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
              id: element.id,
              orderId: element.orderNo,
              time: new Date(element.orderTime).toLocaleString(),
              phone: element.phone,
              consignee: element.consignee,
              address: element.deliverAddress,
              sendTime: new Date(element.deliveryTime).toLocaleString(),
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
    handleEdit(index, row) {
      this.editIndex = index;
      row.edit = true;
    },
    save(index, row) {
      console.log(row);
      this.editIndex = -1;
      this.$axios
        .post("http://localhost:5000/order/edit", {
          id: row.id,
          orderNo: row.orderId,
          orderTime: row.time,
          phone: row.phone,
          consignee: row.consignee,
          deliverAddress: row.address,
          deliveryTime: row.sendTime,
          remarks: row.tips,
          orderAmount: row.money,
          orderState: row.state,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          }
          if (res.data.code === 1) {
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
          if (res.data.code === 5001) {
            this.$message({
              message: "参数错误",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "连接后台失败",
            type: "error",
          });
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
