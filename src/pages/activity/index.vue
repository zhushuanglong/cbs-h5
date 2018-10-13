<template>
  <div class="activity" >
    <topbar title="Halloween sale"></topbar>
    <div class="activity-header" :style="{'background-color': bgColor}">
      <p class="title">{{promotions.promotion_msg}}<a href="javascript:;" class="title" @click="getCoupon"> CHECK IT</a></p>
      <div class="activity-countdown">{{startEndDesc}} <countdown v-if="promotions.promotion_end" :color="bgColor" :start-time="promotions.promotion_start" :end-time="!this.isEnd ? promotions.promotion_end : ''"></countdown></div>
    </div>
    <div class="activity-content">
      <goods-list :list="goodsList" v-if="goodsList.length"></goods-list>
    </div>
    <div class="mengcheng" v-if="couponShow">
      <div class="coupon-info" >
        <p class="detail">detail</p>
        <p class="promotion-msg">{{this.promotions.promotion_msg}}</p>
        <span class="close" @click="couponClose"><i class="iconfont">&#xe63f;</i></span>
        <ul>
          <li v-for="item in coupons" :key="item.id" class="coupon-item">
            <p class="price">${{item.price}} OFF</p>
            <p class="desc">For a purchase over ${{item.use_price}}</p>
            <p class="time">{{item.start_at}} - {{item.end_at}}</p>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
import Countdown from 'common/Countdown';
import GoodsList from 'common/GoodsList'
export default {
  data() {
    return {
      bgColor: '#32B16C',
      goodsList: [],
      promotions: {
        promotion_start: '',
        promotion_end: '',
        promotion_msg: ''
      },
      activityType: '', //活动类型
      startEndDesc: '',
      isEnd: false,
      couponShow: false,
      coupons: [],
      activityId: 0,
    }
  },
  components: {
    Countdown,
    GoodsList
  },
  mounted() {
    this.activityId = this.$route.query.activity_id || 0
    this.getPromotion();
  },
  conputed: {
    title: function() {
      let desc = '';
      let activityType = this.activityType
      if(activityType === 'reduce') {
        // 满减
        desc = ''
      } else if (activityType === 'return') {
        // 满返
      } else if(activityType === 'discount') {
        // 多件多折 
      } else if(activityType === 'wholesale') {
        // X元n件 
      } else if(activityType === 'limit') {
        // 限时特价 
      } else if(activityType === 'quantity') {
        // 限量秒杀 
      } else if(activityType === 'give') {
        // 买n免1 
      }
    }
  },
  methods: {
    // 获取优惠券信息
    getCoupon() {
      this.couponShow = true;
    },
    promotionsInfo() {
      const nowTime = new Date().getTime();
      const pTime = new Date(this.promotions.promotion_start).getTime(); 
      let eTime = new Date(this.promotions.promotion_end).getTime(); 
      // 开始时间大于现在时间 未开始
      if(pTime > nowTime) {
        this.startEndDesc = 'Start at';
        this.bgColor = '#32B16C';
      // 结束时间小于现在时间 已经结束
      } else if (eTime < nowTime){
        this.startEndDesc = 'End in';
        this.bgColor = '#292929';
        this.isEnd = true;
      } else {
        this.startEndDesc = 'End in';
        this.bgColor = '#FD386B';
      }
    },
    // 促销列表
    getPromotion() {
      this.request('PromotionsList', {
        page: this.page,
        promotion_id: this.activityId
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.goodsList = res.content.goods || [];
          this.activityType = res.content.activityType;
          this.promotions = res.content.promotions || '';
          this.coupons = res.content.coupons || [];
          this.promotionsInfo();
        }
      }, err => {
        this.$Toast(err);
      })
    },
    // 关闭优惠券
    couponClose() {
      this.couponShow = false;
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.activity{
  margin-top: 90/@rem;
  text-align: center;
  .activity-header{
     height:120/@rem;
     color: #fff;
    .title {
      font-size: 28/@rem;
      color: #FAFAFA;
      padding-top: 16/@rem;
    }
    .activity-countdown{
      margin-top: 18/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
    }
  }
  .mengcheng {
    background-color: rgba(0, 0, 0, 0.57);
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
      padding: 0 38/@rem;
      text-align: left;
      .coupon-item{
        height: 240/@rem;
        padding: 30/@rem 40/@rem;
      }
      .detail{
        color: #020100;
        font-size: 30/@rem;
        font-weight: bold;
        margin-top: 23/@rem;
        margin-bottom: 42/@rem;
        text-align: center;
      }
      .promotion-msg{
        text-align: left;
        font-size: 28/@rem;
        color: #000000;
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
      }
    }
  }
 
}
</style>


