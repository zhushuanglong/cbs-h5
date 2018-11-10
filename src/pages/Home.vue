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
  },
  watch: {},
  methods: {
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
    color: @orange;
    padding-right: 10/@rem;
  }
}
</style>
