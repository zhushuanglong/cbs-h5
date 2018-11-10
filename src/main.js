import Vue from "vue";
import App from "./App";
import router from "./router";
import initComponents from "./initComponents";
import Http from "./libs/http";
// import store from './store'
Vue.filter('price', function(value) {
  const currencySymbol = localStorage.currencySymbol;
  return currencySymbol + value;
});
initComponents(Vue);
Vue.use(Http);
// rem 换算
import { remChange } from "./components/basic/remChange";
remChange();

// checkwebp
import "./components/basic/checkwebp";

// 科学计算法 - 加减乘除
import "./components/basic/math";
import { returnFloat, accAdd, accSub, accDiv, accMul } from "./components/basic/math";
Vue.prototype.returnFloat = returnFloat;
Vue.prototype.accAdd = accAdd;
Vue.prototype.accSub = accSub;
Vue.prototype.accDiv = accDiv;
Vue.prototype.accMul = accMul;

// 组件库
import { Switch, Toast, Indicator, Lazyload, Picker } from "mint-ui";
Vue.component(Switch.name, Switch);
Vue.component(Picker.name, Picker);
Vue.use(Lazyload);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Indicator = Indicator;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  template: "<App/>",
  components: { App }
});
