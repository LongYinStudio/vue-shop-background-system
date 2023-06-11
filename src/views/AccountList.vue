<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>账户列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="user" label="账号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="group" label="用户组" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ new Date(scope.row.date).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div btn_page>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 100, 150]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <div btn>
          <el-button del @click="multipleDel()">批量删除</el-button>
          <el-button cancel @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="编辑账号"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="ruleForm.group" placeholder="请选择用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
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
  data() {
    var checkPrimaryPassword = (rule, value, callback) => {
      // 验证原始密码是否正确匹配
      if (!value) {
        return callback(new Error("不能为空"));
      }
    };
    return {
      total: 0,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      ruleForm: {
        id: -1,
        user: "",
        group: "",
        primaryPassword: "",
      },
      rules: {
        primaryPassword: [{ validator: checkPrimaryPassword, trigger: "blur" }],
      },
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.ruleForm.group = row.group;
      this.ruleForm.user = row.user;
      this.ruleForm.id = row.id;
      console.log("点击编辑");
    },
    handleSubmit() {
      this.editUser(this.ruleForm.id, this.ruleForm.user, this.ruleForm.group);
      this.dialogVisible = false;
      console.log("点击确定");
    },
    handleDelete(index, row) {
      this.delUser(row.id);
      // console.log(row.id);
      this.getUsers();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers();
    },
    multipleDel() {
      this.multipleSelection.forEach((item) => {
        this.delUser(item.id);
      });
      this.getUsers();
    },
    getUsers() {
      this.$axios
        .get(
          "http://localhost:5000/users/list?currentPage=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          // console.log(res.data.total);
          this.total = res.data.total;
          this.tableData = [];
          res.data.data.forEach((element) => {
            this.tableData.push({
              id: element.id,
              user: element.account,
              date: new Date(element.ctime),
              group: element.userGroup,
              password: element.password,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delUser(id) {
      this.$axios
        .get("http://localhost:5000/users/del?id=" + id)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "删除失败",
            type: "error",
          });
        });
    },
    editUser(id, account, userGroup) {
      this.$axios
        .post("http://localhost:5000/users/edit", {
          id: id,
          account: account,
          userGroup: userGroup,
        })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "修改成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
      this.getUsers();
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
.main {
  .header {
    display: flex;
  }
  [btn_page] {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    [btn] {
      display: flex;
      margin-top: 20px;
      [del] {
        color: #fff;
        background: #f56c6c;
      }
      [cancel] {
        color: #fff;
        background: #409eff;
      }
    }
  }
}
</style>
