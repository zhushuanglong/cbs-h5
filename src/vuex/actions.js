export default {
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
  // 改变头像
  setAvator ({commit}, url) {
    commit('SET_Avator', url);
  },
  // 改变当前页
  setWhichpage ({commit}, platform) {
    commit('SET_WHICHPAGE', platform);
  },
  // 改变当前页
  loginOut ({commit}, self) {
    commit('SET_LOGINOUT', self);
  },
  // 改变当前页
  UserType ({commit}, status) {
    commit('SET_USERTYPE', status);
  }
};
