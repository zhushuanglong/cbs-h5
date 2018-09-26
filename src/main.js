import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueCookie from 'vue-cookie';
import initComponents from './initComponents';
Vue.use(VueCookie);
Vue.use(VueResource);
initComponents(Vue);
// vue-resource配置项
Vue.http.options.emulateJSON = true;

// rem 换算
import { remChange } from './components/basic/remChange';
remChange();

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

