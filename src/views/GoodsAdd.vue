<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>商品添加</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="商品名称">
          <el-col :span="11"> <el-input v-model="form.name"></el-input></el-col>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-col :span="11">
            <el-input-number
              v-model="form.price"
              label="请输入数量"
            ></el-input-number
          ></el-col>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="form.category" placeholder="请选择类别">
            <el-option label="新品专享" value="新品专享"></el-option>
            <el-option label="热销榜" value="热销榜"></el-option>
            <el-option
              label="收藏门店超值专享"
              value="收藏门店超值专享"
            ></el-option>
            <el-option label="鲜炒盖饭" value="鲜炒盖饭"></el-option>
            <el-option label="炒饭系列" value="炒饭系列"></el-option>
            <el-option label="千万销量" value="千万销量"></el-option>
            <el-option label="营养适配" value="营养适配"></el-option>
            <el-option label="满减专区" value="满减专区"></el-option>
            <el-option label="套餐自选区" value="套餐自选区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺图片" prop="imgs">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-col :span="11"> <el-input v-model="form.desc"></el-input></el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="11" style="margin-left: 80px">
            <el-button @click="handleAdd" type="primary">添加商品</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsAdd",
  data() {
    return {
      disabled: false,
      form: {
        name: "",
        price: 0,
        imgs: "",
        desc: "",
        category: "",
      },
      imgUrl: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let index = this.form.pics.indexOf(file.name);
      this.form.pics.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJpg = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("不能超过2MB");
      }
      // if (!isJpg) {
      //   this.$message.error("只能上传JPG图片");
      // }
      // return isJpg && isLt2M;
      return isLt10M;
    },
    handleAdd() {
      this.$axios
        .post("http://localhost:5000/goods/add", {
          name: this.form.name,
          category: this.form.category,
          price: this.form.price,
          imgUrl: this.imgUrl,
          goodsDesc: this.form.desc,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.push("/goodsList");
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
        display: flex;
      }
      [shopImg] {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
      .el-checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        justify-items: start;
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
