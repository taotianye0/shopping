<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <!-- 要写router  -->
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 遍历用户的权限菜单 -->
        <template v-for="(item) in user.menus">
          <!-- 如果存在二级目录children -->
          <el-submenu :key="item.id" :index="''+item.id" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="i in item.children" :key="i.id" :index="'/' + i.url">{{ i.title }}</el-menu-item>
          </el-submenu>
          <!-- 如果只有二级目录 children-->
          <el-menu-item v-else :key="item.id" :index="'/' + item.url">{{ item.title }}</el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="exit">
          <span>{{ user.username }}</span>
          <el-button @click="exit" type="danger">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "resUser"
    })
  },
  methods: {
    ...mapActions({
      exitLogin: "userActions"
    }),
    exit() {
      this.$router.push("/login");
      this.exitLogin();
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #d3dce6;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* width: 100%;
  height: 150px;
  overflow: scroll; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.exit {
  position: absolute;
  right: 20px;
}
</style>
