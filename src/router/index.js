import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'detail', // 私有H5
      path: '/detail/:id', // 商品ID
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/Detail'));
        }, 'detail');
      }
    },
    {
      name: 'cart',
      path: '/cart',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Cart'));
        }, 'cart');
      }
    },
    {
      name: 'my',
      path: '/my',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/My'));
        }, 'my');
      }
    },
    {
      name: 'profile',
      path: '/my/profile',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Profile'));
        }, 'my');
      }
    }
  ]
});

