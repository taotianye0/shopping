<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manager' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id">用户修改</el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{this.$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :v-model="form" label-width="80px">
      <el-form-item label="所属角色" required>
        <el-select v-model="form.roleid" placeholder="--请选择--">
          <el-option
            v-for="item of roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" required>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editManager" v-if="this.$route.query.id">修 改</el-button>
        <el-button type="primary" @click="addManager" v-else>添 加</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqManagerAdd,
  reqEditManager,
  reqManagerList
} from "../../../utils/request";
export default {
  data() {
    return {
      form: {
        roleid: "", // 角色编号number
        username: "", //管理员名称string
        password: "", //密码string
        status: 1 //状态  1正常2禁用number
      }
    };
  },
  computed: {
    // 获取角色列表
    ...mapGetters({
      roleList: "roleManage/resRolelist"
    })
  },
  methods: {
    ...mapActions({
      requestRloeList: "roleManage/roleListActions" // 发起请求角色列表
    }),
    // 重置按钮
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
      this.$router.push("/manager");
    },
    // 添加管理员用户
    addManager() {
      console.log(this.form);
      //   axios请求添加管理员
      reqManagerAdd(this.form).then(res => {
        successAlert(res.data.msg);
      });
      this.reset();
    },
    // 修改管理员信息
    editManager() {
    //   console.log(this.form);
      reqEditManager(this.form).then(res => {
        successAlert(res.data.msg);
      });
      this.reset();
    },
    // 删除管理员信息
    
  },
  mounted() {
    //  请求角色列表的方法
    this.requestRloeList();
    if (this.$route.query.id) {
      //  请求一条管理员列表
      reqManagerList({ uid: this.$route.query.id }).then(res => {
        this.form = res.data.list;
        this.form.password = "";
      });
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin: 10px 0;
}
</style>