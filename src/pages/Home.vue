<template>
  <div class="home-main" ref="indexMain">
    <!-- <New :data="new_goods"></New> -->
    <Goods :data="store_goods"></Goods>
    <bottombar></bottombar>
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
