<template>
  <div id="app">
    <div class="global-topbar">
      <div class="global-center">
        <i class="iconfont back">&#xe602;</i>
        <div class="title">东京</div>
      </div>
    </div>
    <div class="global-main">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="global-bottombar">
      <ul class="global-center">
        <li v-for="(item, index) in tabs">
          <router-link :to="{path: item.url}" active-class="cur">
            <i class="iconfont" v-html="highlight(index, item)"></i>
            <p>{{ item.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      tabs: [{
        name: '首页',
        url: '/home',
        icon: '&#xe618;',
        aicon: '&#xe617;'
      }, {
        name: '购物车',
        url: '/cart',
        icon: '&#xe624;',
        aicon: '&#xe626;'
      }, {
        name: '我',
        url: '/my',
        icon: '&#xe62b;',
        aicon: '&#xe627;'
      }]
    };
  },
  methods: {
    // bottombar icon高亮
    highlight (index, item) {
      let arr = ['home', 'cart', 'my'];
      return arr[index] === this.$route.name ? item.aicon : item.icon;
    }
  }
};
</script>

<style lang="less">
@import "~less/base";
@import "~less/animate";
@import "~less/font";
</style>
