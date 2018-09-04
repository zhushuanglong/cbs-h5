import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '*',
      redict: '/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
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

