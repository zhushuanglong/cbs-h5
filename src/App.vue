<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  created() {
   this.setLocalCoin();
  },
  methods: {
    // 设置本地货币
    setLocalCoin() {
      // 判断本地是否有设置货币
      if(!localStorage.currencyCode) {
        localStorage.currencyCode = 'USD'
        localStorage.currencySymbol = '$'
      }
    }
  }
}
</script>

<style lang="less">
@import "~less/base";
@import "~less/mint";
@import "~less/animate";
@import "~less/font";
</style>
