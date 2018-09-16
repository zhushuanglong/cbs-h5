c<template>
  <div class="cart-main" ref="indexMain">
    <TopBar :title="'购物车'"></TopBar>
    CART
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import TopBar from './common/TopBar.vue';
import BottomBar from './common/BottomBar.vue';
export default {
  name: 'cart',
  components: {
    TopBar,
    BottomBar
  },
  data () {
    return {};
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {
    // 'isLogin': function () {
    //   this.pageInit();
    //   this.popupShow();
    // }
  },
  methods: {},
  beforeDestroy () {
    // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
</style>
