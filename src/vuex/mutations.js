export default {
  // 设置topbar的title
  SET_TOPBARTITLE (state, platform) {
    state.topbarTitle = platform;
  },
  // 设置是否在加载
  SET_LOADING (state, platform) {
    state.isLoading = platform;
  },
  // 设置是否登录
  SET_LOGIN (state, platform) {
    state.isLogin = platform;
  },
  // 设置用户名
  SET_USERNAME (state, platform) {
    state.username = platform;
  },
  SET_LOGINOUT (state, self) {
    state.username = '';
    state.isLogin = false;
    state.isLoading = false;
    // state.avator = '';
    // self.$cookie.delete('_dragon_sea');
    // self.$cookie.delete('_coll_ci');
    // window.MailaApp && window.MailaApp.logout();
  },
  SET_USERTYPE (state, status) {
    state.isOldUser = status;
  }
};
