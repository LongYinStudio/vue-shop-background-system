<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>管理员信息</span>
      </div>
      <div class="info">
        <div class="item">管理员ID:&emsp;{{ this.info.id }}</div>
        <div class="line"></div>
        <div class="item">账号:&emsp;{{ this.info.account }}</div>
        <div class="line"></div>
        <div class="item">用户组:&emsp;{{ this.info.userGroup }}</div>
        <div class="line"></div>
        <div class="item">创建时间:&emsp;{{ this.info.ctime }}</div>
        <div class="line"></div>
        <div class="item" avatar>
          管理员头像:&emsp;<el-image
            style="width: 100px; height: 100px"
            :src="info.imgUrl"
            fit="full"
          ></el-image>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {},
  created() {
    this.$axios
      .get("http://localhost:5000/users/info")
      .then((res) => {
        this.info = {
          id: res.data.id,
          ctime: res.data.ctime,
          account: res.data.account,
          userGroup: res.data.userGroup,
          imgUrl: res.data.imgUrl,
        };
        console.log(this.info);
      })
      .catch((err) => {
        console.log(err);
      });
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
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .line {
        width: 100% !important;
        height: 2px !important;
        background: #eee;
        margin: 20px 0px;
      }
      [avatar] {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
