export const state = {
  // sessionStorage来做用户信息存储
//   如果sessionStorage里有用户信息，就不用再次存储，直接使用
  user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem('user')): null
};
export const mutations = {
  changeUser(state, data) {
    state.user = data;
    if(data){
        sessionStorage.setItem("user",JSON.stringify(data))
    }else{
        sessionStorage.removeItem("user")
    }
  }
};
export const getters = {
  resUser(state){
    return state.user;
  }
};
