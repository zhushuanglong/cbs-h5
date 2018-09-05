<template>
  <div class="home_main" ref="indexMain">
    MY
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {},
  data () {
    return {};
  },
  computed: {},
  created () {
    this.$store.dispatch('setTopbarTitle', '个人中心');
  },
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
