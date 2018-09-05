import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '*',
      redict: '/home/:storeid/:pagenum',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'home', // 为了点亮icon
      path: '/newlist/:storeid', // 店铺ID
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/NewList'));
        }, 'newlist');
      }
    },
    {
      name: 'detail', // 私有H5
      path: '/detail/:storeid/:id', // 店铺ID和商品ID
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
    }
  ]
});

