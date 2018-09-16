export default {
  // 改变topbar的title
  setTopbarTitle ({commit}, platform) {
    commit('SET_TOPBARTITLE', platform);
  },
  // 改变是否正在加载状态
  setLoading ({commit}, platform) {
    commit('SET_LOADING', platform);
  },
  // 改变是否登录状态
  setLogin ({commit}, platform) {
    commit('SET_LOGIN', platform);
  },
  // 改变用户名
  setUsername ({commit}, platform) {
    commit('SET_USERNAME', platform);
  },
  // 改变当前页
  setLoginOut ({commit}, self) {
    commit('SET_LOGINOUT', self);
  }
};
