/** * 头部菜单 */
<template>
  <div class="main">
    <div class="left">首页>账号管理>添加账号</div>
    <div class="right">2</div>
  </div>
</template>
<script>
export default {
  name: "MyHeader",
};
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #008c8c;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
</style>
