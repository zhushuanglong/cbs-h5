<template>
  <div class="goods-main">
    <div class="title">
      <h3>全部商品</h3>
      <p>PRODUCT SHOW</p>
    </div>
    <div class="goods-list" if="data.length">
      <router-link v-for="item in data" :to="{path: item.url}" class="goods-link fl" active-class="cur">
        <div class="goods-img">
          <img :src="item.good_image" />
        </div>
        <div class="goods-info">
          <p class="text">{{item.good_name}}</p>
          <p class="price">￥{{item.price}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.goods-main {
  background-color: #fff;
  margin-top: 10 / @rem;

  .title {
    text-align: center;
    padding: 15 / @rem 0;
    h3,
    p {
      height: 22 / @rem;
      line-height: 22 / @rem;
      text-align: center;
      font-size: 12 / @rem;
    }
    h3 {
      font-size: 14 / @rem;
    }
  }

  .goods-list {
    .clearfix();
    .goods-link {
      display: block;
      position: relative;
      width: 185 / @rem;
      height: 260 / @rem;
      margin-right: 5 / @rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    .goods-img {
      img {
        display: block;
        width: 185 / @rem;
        height: 185 / @rem;
      }
    }
  }
}
</style>
