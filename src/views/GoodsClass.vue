<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>商品分类</span>
        <el-button type="primary" @click="addClass">添加分类</el-button>
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
            <el-button type="danger" @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
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
    <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="类名" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.class"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="ruleForm.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleForm)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      dialogVisible: false,
      ruleForm: {
        class: "",
        state: false,
      },
      rules: {
        class: [{ required: true, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClasses();
    },
    addClass() {
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.dialogVisible = false;
      this.$axios
        .post("http://localhost:5000/goods/addcate", {
          cateName: this.ruleForm.class,
          state: this.ruleForm.state,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.getClasses();
          }
          if (res.data.code === 1) {
            this.$message({
              message: "添加失败",
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
        });
    },
    handleDel(index, row) {
      this.$axios
        .get("http://localhost:5000/goods/delcate?id=" + row.id)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getClasses();
          }
          if (res.data.code === 1) {
            this.$message({
              message: "删除失败",
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
            message: "删除失败",
            type: "error",
          });
        });
    },
    save(index, row) {
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
    handleEdit(index, row) {
      this.editIndex = index;
      console.log(index);
      row.edit = true;
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
