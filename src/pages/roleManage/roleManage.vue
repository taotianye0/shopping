<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="add">
      <el-button type="danger" @click="addRole">添 加</el-button>
    </div>
    <!-- 列表组件 -->
    <v-list></v-list>
  </div>
</template>

<script>
import vList from "./components/list.vue"
export default {
  components:{
    vList,
  },
    methods:{
        addRole(){
            this.$router.push("/addRole")
        }
    }
};
</script>

<style scoped>
.add {
  text-align: left;
  margin-bottom: 10px;
}
.el-breadcrumb {
  margin: 10px 0;
}
</style>