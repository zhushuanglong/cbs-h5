import TopBar from 'common/TopBar.vue';
import PageEmpty from 'common/PageEmpty.vue';

const Components = {
  TopBar,
  PageEmpty
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let component = Components[key];
    Vue.component(component.name || key.toLowerCase(), Components[key]);
  }
}
