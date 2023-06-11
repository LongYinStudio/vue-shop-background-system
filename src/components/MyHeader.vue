/** * 头部菜单 */
<template>
  <div class="main">
    <el-breadcrumb class="left" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in title"
        :to="{ path: $route.path }"
        :key="index"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="right">
      <span
        >欢迎你,
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ $store.state.user.name
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided @click.native="exit()"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <el-avatar :src="avatar"></el-avatar>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHeader",
  props: ["avatar"],
  data() {
    return {
      title: ["首页"],
    };
  },
  watch: {
    $route: {
      handler(to) {
        // console.log("路由");
        // console.log(to);
        this.title = to.meta.title.split("/");
      },
      deep: true,
    },
  },
  methods: {
    exit() {
      this.$message("exit");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push("/");
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
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    * {
      padding: 0px 6px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
