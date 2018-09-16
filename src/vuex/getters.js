export default {
  // 得到topbar的title
  getTopbarTitle: (state) => state.topbarTitle,
  // 得到是否登录
  getLogin: (state) => state.isLogin,
  // 得到假用户名
  getUsername: (state) => state.username,
  // 得到是否加载中
  getLoading: (state) => state.isLoading,
  // 得到退出状态
  getLoginout: (state) => state.isLoginOut
};
