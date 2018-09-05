<template>
  <div class="home_main" ref="indexMain">
    <New :data="new_goods"></New>
    <Goods :data="store_goods"></Goods>
  </div>
</template>

<script>
import Goods from './home/Goods.vue';
import New from './home/New.vue';

export default {
  name: 'home',
  components: {
    Goods,
    New
  },
  data () {
    return {
      store_goods: [], // 商品数据
      new_goods: [] // 上新
    };
  },
  computed: {},
  mounted () {
    this.getHomeData();
  },
  watch: {},
  methods: {
    getHomeData () {
      this.$http.post('/home', {}).then((res) => {
        if (res && res.data && res.data.status) {
          let {data} = res.data;
          this.store_goods = data.store_goods; // 商品数据
          this.new_goods = data.new_goods;
          this.$store.dispatch('setTopbarTitle', data.brand_name);
        } else {
          // @TODO 数据错误
        }
      }, () => {
        // @TODO 网络错误
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.goods-info {
  padding: 10/@rem 10/@rem 20/@rem;
  .text {
    .line1();
    text-align: center;
    font-size: 14/@rem;
    height: 25/@rem;
    line-height: 25/@rem;
  }
  .price {
    text-align: center;
    display: block;
    height: 20/@rem;
    line-height: 20/@rem;
    font-size: 14/@rem;
    color: @red;
    padding-right: 5/@rem;
  }
}
</style>
