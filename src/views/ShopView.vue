<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>店铺管理</span>
        <el-button v-if="isDisabled" type="primary" @click="handleModify">
          修改
        </el-button>
        <el-button v-else type="primary" @click="handleSave"> 保存 </el-button>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="80px"
        :disabled="isDisabled"
      >
        <el-form-item label="店铺名称">
          <el-col :span="11"> <el-input v-model="form.name"></el-input></el-col>
        </el-form-item>
        <el-form-item label="店铺公告" prop="desc">
          <el-col :span="11">
            <el-input
              height="200"
              type="textarea"
              v-model="form.desc"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleShopSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-col :span="11">
            <el-input v-model="form.postageFee"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-col :span="11">
            <el-input v-model="form.postageTime" placeholder="分钟"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-col :span="11">
            <el-input v-model="form.postageDesc"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-col
            :span="11"
            style="height: 100%; display: flex; align-items: center"
          >
            <el-rate v-model="form.score" text-color="#ff9900"> </el-rate>
          </el-col>
        </el-form-item>
        <el-form-item label="销量">
          <el-col :span="11">
            <el-input v-model="form.salesVolume"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="活动" prop="activity">
          <el-checkbox-group v-model="form.activity">
            <el-checkbox label="在线支付满28减5" name="activity"></el-checkbox>
            <el-checkbox
              label="VC无限橙果汁全场8折"
              name="activity"
            ></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="activity"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="activity"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="activity"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间" prop="scaleTime">
          <div class="timer">
            <el-time-picker
              is-range
              v-model="form.scaleTime"
              value-format="HH:mm:ss"
              format="HH:mm:ss"
              range-separator="至"
              placeholder="选择时间范围"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-time-picker></div
        ></el-form-item>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  data() {
    return {
      form: {
        name: "",
        desc: "",
        avatar: "",
        pics: [],
        imgs: "",
        postageFee: 0,
        postageTime: 0,
        postageDesc: "",
        score: 0,
        salesVolume: 0,
        activity: [],
        scaleTime: [],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      isDisabled: true,
      fileList: [],
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleDownload(file) {
      console.log(file);
    },
    handleModify() {
      this.isDisabled = !this.isDisabled;
    },
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code === 0) {
        this.form.avatar = res.imgUrl;
        this.$message.success(res.msg);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let index = this.form.pics.indexOf(file.name);
      this.form.pics.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //店铺图片上传成功
    handleShopSuccess(res) {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.form.pics.push(res.imgUrl);
      }
    },
    handleSave() {
      this.$axios
        .post("http://localhost:5000/shop/edit", {
          id: 1,
          name: this.form.name,
          bulletin: this.form.desc,
          avatar: this.form.avatar,
          deliveryPrice: this.form.postageFee,
          deliveryTime: this.form.postageTime,
          description: this.form.postageDesc,
          score: this.form.score,
          sellCount: this.form.salesVolume,
          supports: this.form.activity,
          pics: this.form.pics,
          date: this.form.scaleTime,
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
        });
    },
  },
  created() {
    this.$axios
      .get("http://localhost:5000/shop/info")
      .then((res) => {
        console.log(res.data.data);
        this.form = {
          name: res.data.data.name,
          desc: res.data.data.bulletin,
          avatar: res.data.data.avatar,
          pics: res.data.data.pics,
          postageFee: res.data.data.deliveryPrice,
          postageDesc: res.data.data.description,
          score: res.data.data.score,
          salesVolume: res.data.data.sellCount,
          activity: res.data.data.supports,
          scaleTime: res.data.data.date,
        };
        this.fileList = this.form.pics.map((v) => {
          return {
            name: v,
            url: v,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
  .el-form {
    .el-form-item {
      display: flex !important;
      .el-col {
        width: 300px !important;
      }
      [shopImg] {
        width: 330px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .el-avatar {
          margin: 0px 8px 8px 0px;
        }
      }
      [shopImg] > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .el-checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        justify-items: start;
      }
    }
  }

  ::v-deep .avatar-uploader .el-upload {
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>
