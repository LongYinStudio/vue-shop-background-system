<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>修改密码</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" required prop="primaryPassword">
          <el-input
            type="text"
            v-model="ruleForm.primaryPassword"
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
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
      ruleForm: {
        pass: "",
        checkPass: "",
        primaryPassword: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // primaryPassword: [{ validator: checkPrimaryPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get(
              "http://localhost:5000/users/checkoldpwd?oldPwd=" +
                this.ruleForm.primaryPassword
            )
            .then((res) => {
              if (res.data.code === 200) {
                console.log(1);
                this.$axios
                  .post("http://localhost:5000/users/editpwd", {
                    newPwd: this.ruleForm.pass,
                  })
                  .then((res) => {
                    console.log(1);
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
                  });
              }
              if (res.data.code === 201) {
                this.$message({
                  message: "原密码验证失败",
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  .box-card {
    // width: 100% !important;
    .header {
      display: flex;
    }
    .demo-ruleForm {
      width: 300px;
    }
  }
}
</style>
