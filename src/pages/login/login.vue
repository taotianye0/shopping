<template>
  <div class="body">
    <div class="box">
      <h2>欢迎登录</h2>
      <el-input placeholder="请输入账号" v-model="user.username" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" clearable></el-input>
      <div>
        <el-button @click="sub">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqlogin } from "../../utils/request";
import { mapActions } from "vuex";
import { successAlert } from '../../utils/alert';
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      requestLogin: "userActions"
    }),
    // vuex 加 sessionStorage来做用户信息存储
    sub() {
      reqlogin(this.user).then(res => {
        this.requestLogin(res.data.list); //使用vuex传参
        successAlert(res.data.msg);
        this.$router.push("/");
      });
    }

    // localStorage 进行登录
  }
};
</script>

<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to right,
    #e94e65,
    #15a892 20%,
    #a89215 80%,
    #1574a8
  );
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #fff;
  width: 400px;
  height: 250px;
}
.el-input {
  margin-bottom: 10px;
  width: 300px;
}
h2 {
  margin: 20px;
  font-family: "Courier New", Courier, monospace;
}
.el-button {
  background-color: rgb(85, 229, 240);
  color: #007c6a;
}
</style>