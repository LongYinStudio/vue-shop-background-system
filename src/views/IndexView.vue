<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
      <SideNav></SideNav>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <NavCon></NavCon>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavCon from "@/components/nav-con.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  name: "HomeView",
  data() {
    return {
      showclass: "asideshow",
      showtype: false,
    };
  },
  components: {
    NavCon,
    SideNav,
  },
};
</script>

<style lang="scss">
.index-con {
  .main-con {
    .index-header {
    }
    .index-main {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
