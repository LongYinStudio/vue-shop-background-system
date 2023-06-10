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
        <el-form-item label="商品分类">
          <el-select v-model="form.class" placeholder="请选择商品分类">
            <el-option label="食品" value="food"></el-option>
            <el-option label="科技" value="tech"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺图片" prop="imgs">
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
        </el-form-item>
        <el-form-item label="商品描述">
          <el-col :span="11"> <el-input v-model="form.desc"></el-input></el-col>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="11" style="margin-left: 80px">
            <el-button type="primary">添加商品</el-button>
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
      form: {
        name: "",
        price: 0,
        imgs: "",
        desc: "",
        class: "",
      },
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
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
</style>
