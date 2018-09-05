
<template>
  <div class="new-main">
    <div class="title">
      <i class="iconfont">&#xe619;</i>
      <p>店铺上新！</p>
      <a href="/newlist/129">查看全部</a>
    </div>
    <div class="new-list" if="data.length">
      <router-link v-for="item in data" :to="{path: item.url}" class="new-link" active-class="cur">
        <div class="new-img">
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
.new-main {
  background-color: #fff;
  margin-top: 10 / @rem;
  .title {
    position: relative;
    height: 44/@rem;
    line-height: 44/@rem;
    padding: 0 10/@rem;
    i {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 10/@rem;
      font-size: 30/@rem;
      color: @red;
    }
    a {
      display: inline-block;
      position: absolute;
      right: 10/@rem;
      top: 0;
      font-size: 12/@rem;
      color: @gray2;
    }
    p {
      font-size: 14/@rem;
      padding-left: 30/@rem;
    }
  }
  .new-list {
    .clearfix();
    .new-link {
      width: 100%;
      display: block;
    }
    .new-img, img {
      display: block;
      width: 100%;
      background-size: 100% auto;
    }
    .new-info {
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
  }
}
</style>
