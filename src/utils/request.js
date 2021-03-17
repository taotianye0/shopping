import axios from "axios";
import qs from "qs";
import { errorAlert } from "./alert";
import store from "../store/index";
// 定于基础url
const baseUrl = "/api";

// 请求拦截 ==》 设置请求头
axios.interceptors.request.use(config => {
  console.log("本次请求的路径为：" + config.url);
  if (config.url !== baseUrl + "/api/userlogin") {
    config.headers.authorization = store.state.user.token;
  }
  return config;
});

// 响应拦截
axios.interceptors.response.use(res => {
  console.group("本次响应路径为:" + res.config.url);
  if(res.data.code !== 200){
    if(res.data.code == 403){
      router.push('/login');
      return;
    }
    errorAlert(res.data.msg);
    return;
  }
  console.log(res);
  console.log(res.data.code);
  return res;
});

// 请求添加菜单
export const reqAddMenu = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/menuadd",
    data: qs.stringify(data)
  });
};
// 请求 菜单列表
export const reqMenuList = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/menulist",
    params
  });
};

// 获取一条菜单数据  编辑列表
export const reqMuneinfo = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/menuinfo",
    params
  });
};
// 提交修改菜单数据
export const reqMenuedit = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/menuedit",
    data: qs.stringify(data)
  });
};
// 删除菜单数据
export const reqMenudelete = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/menudelete",
    data: qs.stringify(data)
  });
};
// 添加角色
export const reqRoleadd = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/roleadd",
    data: qs.stringify(data)
  });
};
// 获取角色列表
export const reqRolelist = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/rolelist",
    params
  });
};
// 获取一条角色列表
export const reqRoleinfo = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/roleinfo",
    params
  });
};
// 请求角色修改
export const reqRoleedit = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/roleedit",
    data: qs.stringify(data)
  });
};
// 请求删除角色
export const reqRoledelete = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/roledelete",
    data: qs.stringify(data)
  });
};
// 添加管理员
export const reqManagerAdd = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/useradd",
    data: qs.stringify(data)
  });
};
// 获取管理员总数
export const reqManagerCount = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/usercount",
    params
  });
};
// 请求管理员分页列表
export const reqPageList = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/userlist",
    params
  });
};
// 请求一条管理员列表
export const reqManagerList = params => {
  return axios({
    method: "get",
    url: baseUrl + "/api/userinfo",
    params
  });
};
// 请求修改管理员
export const reqEditManager = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/useredit",
    data: qs.stringify(data)
  });
};
// 删除管理员
export const reqDelManager = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/userdelete",
    data: qs.stringify(data)
  });
};
// 管理员登录
export const reqlogin = data => {
  return axios({
    method: "post",
    url: baseUrl + "/api/userlogin",
    data: qs.stringify(data)
  });
};
