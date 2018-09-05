<template>
  <div class="detail-main">商品详情</div>
</template>

<script>
export default {
  props: {},
  created () {
    this.$store.dispatch('setTopbarTitle', '详情页');
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.ndetail-main {
  // background-color: #fff;
  margin-top: 10 / @rem;
}
</style>
