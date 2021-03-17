import { successAlert } from "../../utils/alert";
import {reqRolelist,reqRoleinfo} from "../../utils/request";

// vuex
const state = {
    roleList:[]
};
const mutations = {
    changeRoleList(state,data){
        state.roleList = data;
    }
};
const actions = {
    roleListActions(context){
        // axios请求角色列表
        reqRolelist().then(res=>{
            context.commit("changeRoleList",res.data.list);
        });
    },
};
const getters = {
    resRolelist(state){
        return state.roleList;
    },

};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
};