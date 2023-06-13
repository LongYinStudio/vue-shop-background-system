<template>
  <div class="login-wrap">
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="submitForm('ruleForm')"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "LoginView",
  data() {
    return {
      //定义loading默认为false
      logining: false,
      ruleForm: {
        //username和password默认为空
        username: "",
        password: "",
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://localhost:5000/users/checkLogin", {
              account: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              console.log("登录");
              console.log(res);
              if (res.data.code === 0) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.logining = false;
                //把token存入本地存储
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", this.ruleForm.username);
                //跳转到首页
                this.$store.commit("login", "true");
                this.$router.push({ path: "/home" });
              }
              if (res.data.code === 1) {
                this.$message({
                  message: "登录失败",
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
          this.logining = true;
        } else {
          this.$message.error("请输入用户名密码！");
          this.logining = false;
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding-top: 12%;
  background-color: #2d3a4b;
  /* background: url("@/assets/background.png") repeat; */
  /* background-repeat: no-repeat; */
  background-position: center right;
  /* background-size: 100%; */
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
