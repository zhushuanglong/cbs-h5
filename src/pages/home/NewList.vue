
<template>
  <div class="new-list-main">店铺上新列表页面</div>
</template>

<script>
export default {
  props: {},
  created () {
    this.$store.dispatch('setTopbarTitle', '店铺上新');
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.new-list-main {
  // background-color: #fff;
  margin-top: 10 / @rem;
}
</style>
