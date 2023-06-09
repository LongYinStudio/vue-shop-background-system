<template>
  <el-container class="index-con">
    <el-aside class="nav">
      <SideNav></SideNav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <MyHeader></MyHeader>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  name: "IndexView",
  data() {
    return {};
  },
  components: {
    MyHeader,
    SideNav,
  },
};
</script>

<style lang="scss">
.index-con {
  height: 100%;
  .nav {
    width: 200px !important;
  }
  .main-con {
    .index-header {
      padding: 0;
    }
    .index-main {
      background: red !important;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
