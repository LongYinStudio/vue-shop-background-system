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
          :total="users.length"
        >
        </el-pagination>
        <div btn>
          <el-button del @click="toggleSelection()">批量删除</el-button>
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
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="ruleForm.group" placeholder="请选择用户组">
            <el-option label="普通管理员" value="normal"></el-option>
            <el-option label="超级管理员" value="super"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      users: [
        {
          user: "admin",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "root",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "longyinstudio",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "张三",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "李四",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "王五",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "赵六",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "穆森林",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "guest",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "som",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "tom",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "小刘",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "小龙",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "文文",
          group: "超级管理员",
          date: "2016-05-03",
        },
        {
          user: "刘军",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "小何",
          group: "普通管理员",
          date: "2016-05-03",
        },
        {
          user: "流星",
          group: "超级管理员",
          date: "2016-05-03",
        },
      ],
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        primaryPassword: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
    handleEdit() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSubmit() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableData = this.users.slice(0, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.users.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
  },
  mounted() {
    this.tableData = this.users.slice(0, this.pageSize);
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
