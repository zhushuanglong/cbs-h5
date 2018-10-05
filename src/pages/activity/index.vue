<template>
  <div class="activity" :style="{'background-color': bgColor}">
    <topbar title="Halloween sale"></topbar>
    <div class="activity-header">
      <!-- <p class="title">{{promotions.promotion_msg}}</p> -->
      <!-- <div class="activity-countdown">Start at<countdown :color="bgColor" :start-time="promotion.promotion_start" :end-time="promotion.promotion_end"></countdown></div> -->
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
      title: '$ 5.00 OFF $39.99++, $10.00 OFF $69.99',
      endTime: new Date().getTime() + 60 * 1000 * 24,
      bgColor: '#32B16C',
      goodsList: [],
      promotions: {
        promotion_start: '',
        promotion_end: '',
      }
    }
  },
  components: {
    Countdown,
    GoodsList
  },
  mounted() {
    this.getPromotion();
  },
  methods: {
    // 促销列表
    getPromotion() {
      this.request('PromotionsList', {
        page: this.page
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.goodsList = res.content.goods || [];
          // this.promotions = res.content.promotions ||;
          // this.promotions.promotion_start = new Date(this.promotions.promotion_start).getTime()
          // this.promotions.promotion_end = new Date(this.promotions.promotion_end).getTime();
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
  margin-top: 100/@rem;
  height:120/@rem;
  text-align: center;
  color: #fff;
  background-color: #32B16C;
  .activity-header{
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


