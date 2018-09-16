<template>
  <div class="my-order-main">
    <div class="no-order" v-if="0">
      <div class="i-bg">
        <i class="iconfont">&#xe637;</i>
      </div>
      <p>You have no orders yet!</p>
    </div>
    <div class="my-order-list" v-else>
      <div class="top">
        <div class="time">08/26/2018 18:33</div>
        <div class="status">Shipped</div>
      </div>
      <div class="detail">
        <div class="img fl">
          <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
        </div>
        <div class="info fl">
          <div class="title">Button Up Front Plugin Pace Bird LALA HAHAHHAAHAH</div>
          <div class="sku">Color: White</div>
          <div class="sku">Size: S (175/92A)</div>
          <div class="price">$299.00</div>
          <div class="num">x 1</div>
        </div>
      </div>
      <div class="operate">
        <div class="operate-one">Order Status</div>
        <!-- TODO 代付款  按钮是红色   其他时候都是正常颜色 -->
        <div class="operate-two">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  created () {}
};
</script>

<style lang="less">
@import "~less/tool.less";
.my-order-main {
  padding-bottom: 1px;
  margin-bottom: 18/@rem;
  .no-order {
    padding-top: 45/@rem;
    text-align: center;
    .i-bg {
      margin: 0 auto;
      width: 185/@rem;
      height: 185/@rem;
      background-color: #dedede;
      border-radius: 100%;
      i {
        .whl(160, 180);
        color: #fff;
        font-size: 120/@rem;
      }
    }
    p {
      margin-top: 25/@rem;
      font-size: 32/@rem;
      color: @gray2;
    }
  }
  .my-order-list {
    background-color: #fff;
  }
  .top {
    position: relative;
    width: 100%;
    .height(60);
    padding: 0 20/@rem;
    color: @gray2;
    .time {}
    .status {
      position: absolute;
      top: 0;
      right: 20/@rem;
    }
  }

  .detail {
    padding: 0 20/@rem;
    margin-bottom: 18/@rem;
    .clearfix();
    .img, img {
      .wh(148, 148);
      background-size: 100%;
    }
    .info {
      position: relative;
      margin-left: 20/@rem;
      width: 540/@rem;
      .title {
        .height(50);
        .line1();
      }
      .sku {
        .height(45);
        color: @gray2;
      }
      .price {
        position: absolute;
        top: 55/@rem;
        right: 0;
      }
      .num {
        position: absolute;
        top: 95/@rem;
        right: 0;
        color: @gray2;
      }
    }
  }

  .operate {
    position: relative;
    width: 100%;
    height: 100/@rem;
    border-top: 1px solid #f0f0f3;
    & > div {
      position: absolute;
      top: 20/@rem;
      .whl(162, 60);
      border-radius: 50/@rem;
      border: 1px solid @gray2;
      color: @gray2;
      text-align: center;
    }
    .operate-one {
      right: 200/@rem;
    }
    .operate-two {
      right: 20/@rem;
    }
  }

}
</style>
