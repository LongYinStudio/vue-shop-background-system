<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>商品分类</span>
        <el-button type="primary">添加分类</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="cateName" label="分类名称" width="180">
          <template slot-scope="scope">
            <div v-if="scope.$index != editIndex">{{ scope.row.cateName }}</div>
            <el-input v-model="scope.row.cateName" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.$index != editIndex"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              type="success"
              v-if="scope.$index === editIndex"
              @click="save(scope.$index, scope.row)"
              >保存</el-button
            >
            <el-button
              type="default"
              v-else
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="danger">删除</el-button>
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
  name: "ShopView",
  data() {
    return {
      goodsClass: [],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: -1,
      editIndex: -1,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClasses();
    },
    handleEdit(index, row) {
      this.editIndex = index;
      console.log(index);
      row.edit = true;
    },
    save(index, row) {
      console.log(row);
      this.$axios
        .post("http://localhost:5000/goods/editcate", {
          id: row.id,
          cateName: row.cateName,
          state: row.state,
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
      this.editIndex = -1;
    },
    getClasses() {
      this.$axios
        .get(
          "http://localhost:5000/goods/catelist?currentPage=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          this.total = res.data.total;
          this.tableData = [];
          res.data.data.forEach((element) => {
            this.tableData.push({
              id: element.id,
              cateName: element.cateName,
              state: element.state,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getClasses();
  },
};
</script>

<style lang="scss" scoped>
.main {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
