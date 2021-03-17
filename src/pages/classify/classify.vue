<template>
  <div>
    <!-- 商品分类列表页面 -->
    <div v-if="info.showAdd == false">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="add">
        <el-button type="danger" @click="addClassify">添 加</el-button>
      </div>
      <!-- 列表组件 -->
      <v-list></v-list>
    </div>
    <div v-else>
      <!-- 商品分类添加页面 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
      <v-add></v-add>
    </div>
  </div>
</template>

<script>
import vAdd from "../classify/components/add.vue";
import vList from "../classify/components/list.vue";
export default {
  data() {
    return {
      info: {
        showAdd: false
      }
    };
  },
  methods: {
    addClassify() {
      this.info.showAdd = true;
    },
    goBack(){
      this.info.showAdd = false;
    }
  },
  components: {
    vAdd,
    vList
  }
};
</script>

<style>
</style>