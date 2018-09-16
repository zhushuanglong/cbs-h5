<template>
  <div id="app">
    <div class="global-main">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<style lang="less">
@import "~less/base";
@import "~less/animate";
@import "~less/font";
</style>
