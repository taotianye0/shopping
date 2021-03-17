
import {reqMenuList} from "../../utils/request";

const state = {
    menuList:[],
};
const mutations = {
    changeMenuList (state,data){
        state.menuList = data;
    },
};
const actions = {
    // 获取菜单列表
   menuListActions(context){
        // 请求数据
        reqMenuList({istree:true}).then(res=>{
            context.commit("changeMenuList",res.data.list);
        });
    },

};
const getters = {
    resMenuList(state){
        return state.menuList;
    },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
