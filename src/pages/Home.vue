<template>
  <div class="home-main" ref="indexMain">
    <homeindex></homeindex>
    <bottombar></bottombar>
    <FloatTop :show="isShowFloatTop"></FloatTop>
  </div>
</template>

<script>
import homeindex from './home/Index';
import FloatTop from 'common/FloatTop';
export default {
  name: 'home',
  components: {
    homeindex,
    FloatTop
  },
  data () {
    return {
      store_goods: [], // 商品数据
      isShowFloatTop: false
    };
  },
  computed: {},
  mounted () {
    this.getHomeData();
    // 滚动事件
    let self = this;
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    window.onscroll = function () {
      t = document.documentElement.scrollTop || document.body.scrollTop;
      self.isShowFloatTop = t >= h * 1.5;
    }
    self.isShowFloatTop = t >= h * 1.5;
  },
  watch: {},
  methods: {
    getHomeData () {
      this.request('Home', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.store_goods = res.content.store_goods; // 商品数据
        }
      }, err => {
        this.$Toast(err);
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.goods-info {
  padding: 20/@rem 20/@rem 40/@rem;
  .text {
    .line1();
    text-align: center;
    font-size: 28/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
  }
  .price {
    text-align: center;
    display: block;
    height: 40/@rem;
    line-height: 40/@rem;
    font-size: 28/@rem;
    color: @red;
    padding-right: 10/@rem;
  }
}
</style>
