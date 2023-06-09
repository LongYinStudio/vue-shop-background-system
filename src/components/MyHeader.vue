/** * 头部菜单 */
<template>
  <div class="main">
    <div class="left">
      <span v-for="(item, index) in title" :key="index">
        <img v-if="index > 0" src="@/assets/img/right.png" alt="" />
        <span>{{ item }}</span>
      </span>
    </div>
    <div class="right">
      <span>欢迎你 {{ $store.state.user.name }}</span>
      <el-avatar :src="require('@/assets/logo.png')"></el-avatar>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHeader",
  data() {
    return {
      title: ["首页"],
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.title = to.meta.title.split("/");
      },
      deep: true,
    },
  },
  mounted() {
    this.title = this.$route.meta.title.split("/");
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background: #008c8c; */
  padding: 10px;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      --size: 16px;
      width: var(--size);
      height: var(--size);
      margin: 0px 2px;
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    * {
      padding: 0px 6px;
    }
  }
}
</style>
