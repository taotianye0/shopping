import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const login = () => import("../pages/login/login");
const index = () => import("../pages/index/index");
const home = () => import("../pages/home/home");
const menuManage = () => import("../pages/menuManage/menuManage");
const addMenu = () => import("../pages/menuManage/components/add");
const roleManage = () => import("../pages/roleManage/roleManage");
const addRole = () => import("../pages/roleManage/components/add");
const manager = () => import("../pages/manager/manager");
const addManager = () => import ("../pages/manager/components/add");
const classify = () =>import ("../pages/classify/classify");
export default new Router({
  routes: [
    {
      path: "/login",
      alias: "/l",
      name: "登录",
      component: login
    },
    {
      path: "/",
      component: index,
      children: [
        {
          path: "home",
          name: "首页",
          component: home
        },
        {
          path: "addMenu",
          name: "菜单添加",
          component: addMenu
        },
        {
          path: "menuManage",
          name: "菜单列表",
          component: menuManage
        },
        {
          path: "roleManage",
          name: "角色列表",
          component: roleManage
        },
        {
          path:"addRole",
          name:"角色添加",
          component:addRole
        },
        {
          path:"manager",
          name:"管理员列表",
          component:manager

        },
        {
          path:"/addManager",
          name:"用户添加",
          component:addManager
        },
        {
          path:"/classify",
          name:"商品列表",
          component:classify
        },
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
