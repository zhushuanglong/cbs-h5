import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import initComponents from './initComponents';
import Http from './libs/http';
Vue.use(VueCookie);
initComponents(Vue);
// vue-resource配置项
Vue.http.options.emulateJSON = true;
Vue.use(Http);
// rem 换算
import { remChange } from './components/basic/remChange';
remChange();

import 'less/mint/switch.less';
import { Switch, MessageBox, Toast, Indicator, Lazyload } from 'mint-ui';
Vue.component(Switch.name, Switch);
Vue.component(MessageBox.name, MessageBox);
Vue.use(Lazyload);
// Vue.component(Indicator.name, Indicator);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$MessageBox = MessageBox;

// 自动补0
window.returnFloat = function (value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length === 1) {
    value = value.toString() + '.00';
    return value;
  }
  if (xsd.length > 1 ) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0';
    }
    return value;
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

