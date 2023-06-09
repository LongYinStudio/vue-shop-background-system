<template>
  <div>
    <el-card>
      <div class="el-card__body">
        <img :src="icon" alt="" />
        <div class="right">
          <div class="title">{{ title }}</div>
          <div class="num">{{ num }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["icon", "title", "num"],
};
</script>

<style lang="scss" scoped>
.el-card {
  .el-card__body {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between;
    padding: 6px 16px;
    img {
      --size: 56px;
      width: var(--size);
      height: var(--size);
    }

    .right {
      .title {
        color: #d7d7d7;
        font-size: 18px;
      }
      .num {
        font-weight: 600;
        padding-top: 16px;
      }
    }
  }
}
</style>
