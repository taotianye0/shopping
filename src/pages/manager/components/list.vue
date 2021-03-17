<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column  label="状态" style="width:50px">
        <template v-slot="p">
          <span type="success" class="green" v-if="p.row.status" @click="pp(p)">启 用</span>
          <span type="danger" class="red" v-else>禁 用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="p">
          <el-button type="success" @click="edit(p.row.uid)">编 辑</el-button>
          <el-button type="danger" @click="del(p.row.uid)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="pages.size"
      :current-page="pages.page"
      @current-change="getPage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqDelManager } from "../../../utils/request";
export default {
  data() {
    return {
      page: 0
    };
  },
  computed: {
    ...mapGetters({
      count: "manager/resCount",
      pages: "manager/resPages",
      tableData: "manager/resManagrList"
    })
  },
  methods: {
    ...mapActions({
      reqManagerCount: "manager/countActions",
      reqPageList: "manager/pageListActions",
      reqPage: "manager/pageActions"
    }),
    // 点击页码 获取当前页
    getPage(page) {
      //   console.log(page);
      this.page = page; //点击的页码
      console.log("页码");
      console.log(this.page);
      this.reqPage(page);
      this.reqPageList(); //分页列表
    },
    // 编辑
    edit(id) {
      this.$router.push("/addManager?id=" + id);
    },
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(11111);
          // 请求删除数据
          reqDelManager({ uid: id }).then(res => {
            successAlert(res.data.msg);
            this.reqManagerCount(); // 重新获取总数
             this.reqPageList(); //分页列表
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pp(p){
      console.log(p);
    }
  },
  mounted() {
    this.reqManagerCount();
    this.reqPageList();
  }
};
</script>

<style scoped>
.green {
  color: #67c23a;
}
.red {
  color: #f56c6c;
}
</style>