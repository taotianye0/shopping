<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menuManage' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.id">菜单修改</el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{ this.$route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form-item label="菜单名称" required>
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单" required>
      <el-select v-model="form.pid" placeholder="--请选择--">
        <el-option label="顶级菜单" :value="0"></el-option>
        <!-- 遍历菜单列表 -->
        <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单类型" required>
      <el-radio-group v-model.number="form.type">
        <el-radio :label="1">目录</el-radio>
        <el-radio :label="2">菜单</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单图标" v-if="form.type == 1">
      <el-select v-model.number="form.icon" placeholder="--请选择--">
        <el-option v-for="item in icons" :key="item" :label="item" :value="item">
          <i :class="item"></i>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单地址" v-else>
      <el-select v-model="form.url" placeholder="--请选择--">
        <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单状态">
      <el-switch
        v-model.number="form.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="2"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="editMenu()" v-if="this.$route.query.id">修 改</el-button>
      <el-button type="primary" @click="subMenu()" v-else>添 加</el-button>
      <el-button @click="reset">取 消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reqAddMenu, reqMuneinfo, reqMenuedit } from "../../../utils/request";
import { mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      form: {
        pid: "", //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        type: 1, //类型 1目录2菜单
        status: 1, //状态   1正常2禁用   number类型
        icon: "",
        url: ""
      },
      // 所有图标
      icons: [
        "el-icon-setting",
        "el-icon-help",
        "el-icon-menu",
        "el-icon-edit"
      ],
      // 所有菜单地址
      urls: [
        "menuManage",
        "roleManage",
        "member",
        "manager",
        "secKill",
        "banner",
        "shopManage",
        "shopSize",
        "classify",
        "home"
      ]
    };
  },
  methods: {
    reset() {
      this.$router.push("/menuManage");
      this.form = {
        pid: "", //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        type: 1, //类型 1目录2菜单
        status: 1, //状态   1正常2禁用   number类型
        icon: "",
        url: ""
      };
    },
    // 提交添加菜单数据
    subMenu() {
      // console.log(this.form);
      reqAddMenu(this.form).then(res => {
        successAlert(res.data.msg);
      });
      this.reset();
    },
    // 提交修改菜单数据
    editMenu() {
      console.log(this.form);
      this.form.id = this.$route.query.id;
      if(this.form.type == 1){
        this.form.url = "";
      }else{
        this.form.icon = "";
      }
      reqMenuedit(this.form).then(res => {
        successAlert(res.data.msg);
        this.reset();
      });
    }
  },
  computed: {
    // 获取菜单整个列表
    ...mapGetters({
      "menuList": "menuManage/resMenuList"
    })
  },

  mounted() {
    // 判断是否是点击了编辑按钮跳转过来的
    if (this.$route.query.id) {
      let id = this.$route.query.id;
      // 获取一条菜单列表
      reqMuneinfo({ id: id }).then(res => {
        // console.log(res);
        this.form = res.data.list;
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
