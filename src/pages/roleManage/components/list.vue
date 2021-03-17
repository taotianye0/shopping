<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="用户名" width="180"></el-table-column>
      <el-table-column prop="menus" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态" style="width:50px">
        <template v-slot="p">
          <span type="success" class="green" v-if="p.row.status">启 用</span>
          <span type="danger" class="red" v-else>禁 用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="p">
          <el-button type="success" @click="edit(p.row.id)">编 辑</el-button>
          <el-button type="danger" @click="del(p.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqRoledelete } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  computed: {
    // 获取角色列表
    ...mapGetters({
      tableData: "roleManage/resRolelist"
    })
  },
  methods: {
    // 发起请求角色列表
    ...mapActions({
      requestRloeList: "roleManage/roleListActions"
    }),
    // 修改
    edit(id) {
      this.$router.push("/addRole?id=" + id);
    },
    // 删除
    del(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 请求删除数据
          reqRoledelete({ id: id }).then(res => {
            successAlert(res.data.msg);
          });
          this.requestRloeList();
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.requestRloeList();
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
.el-table {
  width: 100%;
  height: 470px;
  overflow: scroll;
}
</style>