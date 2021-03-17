<template>
  <el-table
    :data="menuList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}"
  >
    <el-table-column prop="id" label="菜单编号" sortable></el-table-column>
    <el-table-column prop="title" label="菜单名称"></el-table-column>
    <el-table-column prop="icon" label="菜单图标"></el-table-column>
    <el-table-column prop="url" label="菜单地址"></el-table-column>
    <el-table-column prop="status" label="状态">
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqMenudelete } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      menuList: "menuManage/resMenuList"
    })
  },
  methods: {
    // 请求菜单列表
    ...mapActions({
      requestMenuList: "menuManage/menuListActions"
    }),
    edit(id) {
      this.$router.push("/addMenu/?id=" + id);
    },
    // 删除一条数据
    del(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 请求删除数据
          reqMenudelete({ id: id }).then(res => {
            successAlert(res.data.msg);
            this.requestMenuList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.requestMenuList();
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
.el-table{
    width: 100%;
  height: 470px;
  overflow: scroll;
}
</style>
