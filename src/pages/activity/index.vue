<template>
  <div class="activity" >
    <topbar title="Halloween sale"></topbar>
    <div class="activity-header" :style="{'background-color': bgColor}">
      <p class="title">{{promotions.promotion_msg}}</p>
      <div class="activity-countdown">{{startEndDesc}} <countdown v-if="promotions.promotion_end" :color="bgColor" :start-time="promotions.promotion_start" :end-time="promotions.promotion_end"></countdown></div>
    </div>
    <div class="activity-content">
      <goods-list :list="goodsList" v-if="goodsList.length"></goods-list>
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
      startEndDesc: ''
    }
  },
  components: {
    Countdown,
    GoodsList
  },
  mounted() {
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
    promotionsInfo() {
      let nowTime = new Date().getTime();
      let pTime = new Date(this.promotions.promotion_start).getTime();
      if(pTime > nowTime) {
        this.startEndDesc = 'Start at';
        this.bgColor = '#32B16C';
      } else {
        this.startEndDesc = 'End in';
        this.bgColor = '#FD386B';
      }
    },
    // 促销列表
    getPromotion() {
      this.request('PromotionsList', {
        page: this.page
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.goodsList = res.content.goods || [];
          this.activityType = res.content.activityType;
          this.promotions = res.content.promotions || '';
          this.promotionsInfo();
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
 
}
</style>


