<template>
  <div class="main">
    <el-card>
      <el-form :inline="true" :model="ordersForm" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="ordersForm.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="ordersForm.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersForm: {
        region: "",
        user: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
}
</style>
