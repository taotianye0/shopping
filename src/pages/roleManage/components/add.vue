<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roleManage' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id">角色修改</el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{this.$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称"  required>
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" v-model="form.menus"  required>
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1, 2]"
          :default-checked-keys="defaultKey"
          :props="defaultProps"
          ref="tree"
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model.number="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editRole" v-if="this.$route.query.id">修 改</el-button>
        <el-button type="primary" @click="addRole" v-else>添 加</el-button>
        <el-button @click="reset">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleadd, reqRoleinfo, reqRoleedit } from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      form: {
        rolename: "",
        status: 1,
        menus: ""
      },
      defaultProps: {
        children: "children",
        label: "title" //指定节点标签为节点对象的某个属性值
      },
      defaultKey: [] //默认选中的权限
    };
  },
  computed: {
    // 获取菜单列表
    ...mapGetters({
      menuList: "menuManage/resMenuList"
    })
  },
  methods: {
    ...mapActions({
      // 请求菜单列表
      requestMenuList: "menuManage/menuListActions",
      // 请求添加列表
      requestAddRolt: "roleManage/roleListActions"
    }),
    // 重置表单
    reset() {
      this.form = {
        rolename: "",
        status: 1,
        menus: []
      };
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
      this.$router.push("/roleManage");
    },
    // 请求 添加角色
    addRole() {
      //通过getCheckedKeys方法获取menus角色权限:id数组
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form);
      reqRoleadd(this.form).then(res => {
        successAlert(res.data.msg);
      });
      this.reset();
    },
    // 请求 修改数据
    editRole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form);
      reqRoleedit(this.form).then(res => {
        successAlert(res.data.msg);
      this.reset();
      });
    }
  },
  mounted() {
    // 请求菜单列表
    this.requestMenuList();
    // 请求添加角色
    this.requestAddRolt();
    // 请求一条角色列表
    if (this.$route.query.id) {
      let id = Number(this.$route.query.id);
      reqRoleinfo({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
        this.form.menus = this.defaultKey;
      });
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>