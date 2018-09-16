<template>
  <div id="app">
    <div class="global-topbar">
      <div class="global-center">
        <i class="iconfont back">&#xe62f;</i>
        <div class="title">{{$store.getters.getTopbarTitle}}</div>
        <i v-if="$route.name === 'detail'" class="iconfont cart">&#xe624;</i>
      </div>
    </div>
    <div class="global-main">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="global-bottombar" v-if="$route.name !== 'detail'">
      <ul class="global-center">
        <li v-for="(item, index) in tabs">
          <router-link :to="{path: item.url}" active-class="cur">
            <i class="iconfont" v-html="highlight(index, item)"></i>
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data () {
    return {
      tabs: [{
        name: 'Home',
        url: '/home',
        icon: '&#xe618;',
        aicon: '&#xe617;'
      }, {
        name: 'Cart',
        url: '/cart',
        icon: '&#xe624;',
        aicon: '&#xe626;'
      }, {
        name: 'Account',
        url: '/my',
        icon: '&#xe62b;',
        aicon: '&#xe627;'
      }]
    };
  },
  computed: {
    ...mapGetters([
      'topbarTitle'
    ])
  },
  methods: {
    // bottombar icon高亮
    highlight (index, item) {
      return ['home', 'cart', 'my'][index] === this.$route.name ? item.aicon : item.icon;
    }
  }
};
</script>

<style lang="less">
@import "~less/base";
@import "~less/animate";
@import "~less/font";
</style>
