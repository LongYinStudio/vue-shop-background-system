<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>店铺管理</span>
        <el-button type="primary">保存</el-button>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="80px"
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
        <el-form-item label="店铺头像" prop="avatar">
          <el-avatar shape="square" :size="148" :src="url"></el-avatar>
        </el-form-item>
        <el-form-item label="店铺图片" prop="imgs">
          <div shopImg>
            <el-avatar shape="square" :size="148" :src="url"></el-avatar>
            <el-avatar shape="square" :size="148" :src="url"></el-avatar>
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="form.imgs"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="配送费">
          <el-col :span="11">
            <el-input v-model="form.postageFee"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-col :span="11">
            <el-input v-model="form.postageDesc"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-col :span="11">
            <el-input v-model="form.score"></el-input
          ></el-col>
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
          <el-time-picker
            is-range
            v-model="form.scaleTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker
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
        imgs: "",
        postageFee: 0,
        postageDesc: "",
        score: 0,
        salesVolume: 0,
        activity: [],
        scaleTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      },
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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
</style>
