import { reqManagerCount, reqPageList } from "../../utils/request";

const state = {
  pages: {
    page: 1, //当前页码
    size: 3 //一页显示的条数
  },
  count: 0,
  pageList: []
};
const mutations = {
  changeCount(state, data) {
    state.count = data;
  },
  changePage(state, data) {
    state.pages.page = data;
  },
  changeManagerList(state, data) {
    state.pageList = data;
  }
};
const actions = {
  countActions(context) {
    // 请求管理员总数
    reqManagerCount().then(res => {
      context.commit("changeCount", res.data.list[0].total);
    });
  },
  //  改变页码
  pageActions(context, data) {
    // console.log("当前页码");
    // console.log(data);
    context.commit("changePage", data);
  },
  pageListActions(context) {
    //   请求管理员分页列表
    reqPageList(context.state.pages).then(res => {
      console.log(111111);
    console.log(res);
      if((res.data.list == null ||res.data.list.length == 0)&& context.state.pages.page >1){
        let p = context.state.pages.page -1
        context.commit("changePage",p);
          // 自调
          context.dispatch('pageListActions');
      }
      context.commit("changeManagerList", res.data.list);
    });
  }
};
const getters = {
  resCount(state) {
    return state.count;
  },
  resPages(state) {
    return state.pages;
  },
  resManagrList(state) {
    return state.pageList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
