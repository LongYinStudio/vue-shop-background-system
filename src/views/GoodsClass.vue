<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>商品分类</span>
        <el-button type="primary">添加分类</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template>
            <el-button
              type="default"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="goodsClass.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  data() {
    return {
      goodsClass: [],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = this.goodsClass.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
    handleEdit(index, row) {
      row.edit = true;
    },
    save(row, index) {
      console.log(index);
    },
  },
  mounted() {
    for (let index = 0; index < 16; index++) {
      this.goodsClass.push({
        id: index + 1,
        name: `张三${index + 1}`,
        enable: true,
      });
    }
    this.tableData = this.goodsClass.slice(0, this.pageSize);
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
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
