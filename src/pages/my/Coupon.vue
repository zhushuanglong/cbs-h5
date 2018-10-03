<template>
  <div>
    <topbar title="My Coupons" backUrl="my"></topbar>
    <div class="my-coupon">
      <div class="c-search">
        <input type="text" v-model="redeemCode" class="s-input" placeholder="Enter promo code here"/>
        <div class="search-btn" @click="getCouponList">Applay</div>
      </div>
      <div class="coupon-list" v-if="couponList && couponList.length > 0">
        <!-- 优惠券状态 1-可用 2-未开始 3-已过期未使用 4-已使用 -->
        <div class="coupon-item" :class="item.datestatus === 1 ? 'able': 'disable'" v-for="item in couponList">
          <p class="title">${{item.use_price}} OFF</p>
          <p class="desc">{{item.text}}</p>
          <p class="use-time">{{item.startdate}} - {{item.enddate}}</p>
          <div class="use-flag-img" :class="{'expired': item.datestatus === 3, 'used': item.datestatus === 4}"></div>
        </div>
      </div>
      <pageempty v-if="couponList && couponList.length === 0" icon="&#xe691;" desc="You don‘t have any available coupons now!"></pageempty>
    </div>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      searchContent: '',
      couponList: [],
      redeemCode: ''
    }
  },
  mounted() {
    this.getCouponList();
  },
  methods: {
    getCouponList() {
      this.request('CouponList', {
        redeemCode: this.redeemCode
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.couponList = res.content || [];
        }
      }, err => {
        this.$Toast(err);
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.my-coupon{
  padding-top: 90/@rem;
  .c-search{
    position: relative;
    padding: 0 33/@rem;
    height: 80/@rem;
    line-break: 80/@rem;
  }
  .s-input{
    width: 684/@rem;
    height:100%;
    padding: 0 22/@rem;
    
  }
  .search-btn{
    position: absolute;
    right: 20/@rem;
    top: 0;
    width:140/@rem;
    height:80/@rem;
    line-height: 80/@rem;
    font-size: 28/@rem;
    text-align: center;
    background:rgba(216,216,219,1);
    border:1px solid rgba(240,240,243,1);
    background-color: #D8D8DB;
    color: #fff;
  }
  .coupon-list{
    padding: 0 34/@rem;
  }
  .coupon-item{
    height: 240/@rem;
    margin-top: 20/@rem;
    position: relative;
    .title{
      line-height:56/@rem;
      font-size:60/@rem;
      font-family:PingFangSC-Regular;
      font-weight:bold;
      font-style:italic;
      color:rgba(255,71,60,1);
      padding-top: 32/@rem;
    }
    .desc{
      color: #000000;
      font-size: 32/@rem;
      line-height:40/@rem;
      margin-top: 16/@rem;
      font-weight: 400
    }
    .use-time{
      color:#939399;
      font-size: 24/@rem;
      margin-top: 50/@rem;
    }
    &.disable{
      .title, .desc, .use-time{
        color: #939399 !important;
      }
    }
    .use-flag-img{
      position: absolute;
      right: 0;
      width: 147/@rem;
      height: 129/@rem;
      bottom: -10/@rem;
    }
    .used{
      background: url('../../images/my/coupon_used.png') no-repeat center center;
      background-size: cover;
    }
    .expired{
      background: url('../../images/my/coupon_expired.png') no-repeat center center;
      background-size: cover;
    }
  }
}
</style>