<template>
  <div class="coupon-modal" v-show="showCoupon">
    <div class="coupon-info a-fadeinT">
      <p class="detail">Receive Coupons</p>
      <span class="close" @click="clickCouponClose"><i class="iconfont">&#xe63f;</i></span>
      <ul>
        <li v-for="item in coupons" :key="item.id" class="coupon-item">
          <p class="price">${{item.price}} OFF</p>
          <p class="desc">For a purchase over ${{item.use_price}}</p>
          <p class="time">{{item.grant_startdate}} - {{item.grant_enddate}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showCoupon: {
      type: Boolean,
      default: false
    },
    coupons: {
      type: Array,
      default: []
    }
  },
  created () {},
  mounted () {},
  methods: {
    clickCouponClose () {
      this.$emit('update:showCoupon', false);
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.coupon-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2222;
  .coupon-info{
    position: absolute;
    bottom: 0;
    width: 100%;
    background:rgba(246,247,246,1);
    height: 897/@rem;
    text-align: left;
    ul {
      padding: 0 20/@rem;
      margin-top: 20/@rem;
    }
    .coupon-item {
      background-color: #fff;
      height: 240/@rem;
      padding: 30/@rem 40/@rem;
    }
    .detail{
      color: #020100;
      font-size: 30/@rem;
      font-weight: bold;
      padding: 20/@rem  0 20/@rem 0;
      text-align: center;
      border-bottom: 1px solid @gray3;
    }
    .price{
      color: #FF473C;
      font-size: 50/@rem;
      font-family:PingFangSC-Regular;
      font-weight:bold;
      font-style:italic;
    }
    .desc{
      font-size: 32/@rem;
      color: #000000;
      margin: 12/@rem 0 40/@rem;
    }
    .time{
      color: #939399;
      font-size: 24/@rem;
    }
    .close{
      position: absolute;
      right: 23/@rem;
      top: 23/@rem;
      i {
        color: #939399;
        font-size: 32/@rem;
      }
    }
  }
}
</style>

