c<template>
  <div class="home_main" ref="indexMain">
    CART
  </div>
</template>

<script>
// import { loginHandler } from '../components/basic/loginHandler';
// import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {},
  data () {
    return {};
  },
  computed: {},
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
