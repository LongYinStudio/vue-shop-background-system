<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>商品列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.imgUrl"
              fit="fill"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div btn_page>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 100, 150]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="ruleForm.category" placeholder="请选择类别">
            <el-option label="新品专享" value="新品专享"></el-option>
            <el-option label="热销榜" value="热销榜"></el-option>
            <el-option
              label="收藏门店超值专享"
              value="收藏门店超值专享"
            ></el-option>
            <el-option label="鲜炒盖饭" value="鲜炒盖饭"></el-option>
            <el-option label="炒饭系列" value="炒饭系列"></el-option>
            <el-option label="千万销量" value="千万销量"></el-option>
            <el-option label="营养适配" value="营养适配"></el-option>
            <el-option label="满减专区" value="满减专区"></el-option>
            <el-option label="套餐自选区" value="套餐自选区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input
            type="text"
            v-model="ruleForm.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input
            type="text"
            v-model="ruleForm.goodsDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="id">
          <el-input
            type="number"
            v-model="ruleForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleForm)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkPrimaryPassword = (rule, value, callback) => {
      // 验证原始密码是否正确匹配
      if (!value) {
        return callback(new Error("不能为空"));
      }
    };
    return {
      total: 0,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        category: "",
        price: -1,
        imgUrl: "",
        goodsDesc: "",
        id: -1,
        ctime: "",
      },
      rules: {
        primaryPassword: [{ validator: checkPrimaryPassword, trigger: "blur" }],
      },
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.category = row.category;
      this.ruleForm.price = row.price;
      this.ruleForm.imgUrl = row.imgUrl;
      this.ruleForm.goodsDesc = row.goodsDesc;
      this.ruleForm.id = row.id;
      this.ruleForm.ctime = row.ctime;
    },
    handleSubmit() {
      this.editGoods(
        this.ruleForm.name,
        this.ruleForm.category,
        this.ruleForm.price,
        this.ruleForm.imgUrl,
        this.ruleForm.goodsDesc,
        this.ruleForm.id,
        this.ruleForm.ctime
      );
      this.dialogVisible = false;
      console.log(this.dialogVisible);
    },
    handleDelete(index, row) {
      this.delGoods(row.id);
      // console.log(row.id);
      this.getGoods();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    multipleDel() {
      this.multipleSelection.forEach((item) => {
        this.delGoods(item.id);
      });
      this.getGoods();
    },
    getGoods() {
      this.$axios
        .get(
          "http://localhost:5000/goods/list?currentPage=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          this.total = res.data.total;
          this.tableData = [];
          res.data.data.forEach((element) => {
            this.tableData.push({
              name: element.name,
              category: element.category,
              price: element.price,
              imgUrl: element.imgUrl,
              goodsDesc: element.goodsDesc,
              id: element.id,
              ctime: element.ctime,
              sellCount: element.sellCount,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editGoods(name, category, price, imgUrl, goodsDesc, id, ctime) {
      this.$axios
        .post("http://localhost:5000/goods/edit", {
          name: name,
          category: category,
          price: price,
          imgUrl: imgUrl,
          goodsDesc: goodsDesc,
          id: id,
          ctime: ctime,
        })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "修改成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
      this.getGoods();
    },
    delGoods(id) {
      this.$axios
        .get("http://localhost:5000/goods/del?id=" + id)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
          if (res.data.code === 1) {
            this.$message({
              message: "删除失败",
              type: "error",
            });
          }
          if (res.data.code === 5001) {
            this.$message({
              message: "参数错误",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "删除失败",
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.getGoods();
  },
};
</script>

<style lang="scss" scoped>
.main {
  .header {
    display: flex;
  }
  [btn_page] {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
  }
  .el-table {
    .demo-table-expand {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 0px 56px;
    }
  }
}
</style>
