export default {
    userActions(context,data){
        // console.log(data);
        context.commit("changeUser",data);//把请求头放在vuex状态管理中
    },
};