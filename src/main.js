import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueCookie from 'vue-cookie';
import initComponents from './initComponents';
import Http from './libs/http';
Vue.use(VueCookie);
Vue.use(VueResource);
initComponents(Vue);
// vue-resource配置项
Vue.http.options.emulateJSON = true;
Vue.use(Http);
// rem 换算
import { remChange } from './components/basic/remChange';
remChange();

import 'less/mint/switch.less';
import { Switch, MessageBox, Toast, Indicator } from 'mint-ui';
Vue.component(Switch.name, Switch);
Vue.component(MessageBox.name, MessageBox);
// Vue.component(Indicator.name, Indicator);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Indicator = Indicator;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

