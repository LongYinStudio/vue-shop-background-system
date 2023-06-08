<template>
  <div class="container">
    <h3>卖家中心</h3>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/orders">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-shopping-bag-1"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/goodsList">商品列表</el-menu-item>
        <el-menu-item index="/goodsAdd">商品添加</el-menu-item>
        <el-menu-item index="/goodsClass">商品分类</el-menu-item>
      </el-submenu>
      <el-menu-item index="/shop">
        <i class="el-icon-s-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">账号管理</span>
        </template>
        <el-menu-item index="/accountList">账号列表</el-menu-item>
        <el-menu-item index="/accountAdd">添加账号</el-menu-item>
        <el-menu-item index="/accountModify">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">销售统计</span>
        </template>
        <el-menu-item index="/totalGoods">商品统计</el-menu-item>
        <el-menu-item index="/totalOrders">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  background: #304156;
  h3 {
    color: #fff;
    text-align: center;
    padding: 1rem;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
