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
        <div class="item">
          创建时间:&emsp;{{ new Date(this.info.ctime).toLocaleString() }}
        </div>
        <div class="line"></div>
        <div class="item" avatar>
          管理员头像:&emsp;<el-image
            style="width: 100px; height: 100px"
            :src="info.imgUrl"
            fit="full"
            @click="changeAvatar"
          ></el-image>
        </div>
      </div>
    </el-card>
    <el-dialog title="编辑头像" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      dialogVisible: false,
      imageUrl: "",
    };
  },
  methods: {
    changeAvatar() {
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleSave() {
      this.$axios
        .get("http://localhost:5000/users/avataredit?imgUrl=" + this.imageUrl)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogVisible = false;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
