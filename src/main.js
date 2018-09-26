import Vue from 'vue';

import App from './App';
import router from './router';
import store from './vuex/store';

import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';

Vue.use(VueCookie);
Vue.use(VueResource);

// vue-resource配置项
Vue.http.options.emulateJSON = true;

// rem 换算
import { remChange } from './components/basic/remChange';
remChange();

// switch 开关
import 'less/mint/switch.less';
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

