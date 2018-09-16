<template>
  <div class="my-card-main">
    <router-link :to="{path: '/my/card'}" class="card-detail">
      <div class="img fl">
        <i class="iconfont">&#xe655;</i>
      </div>
      <div class="info fl">
        <div class="label fl">Balance: </div>
        <div class="price fl">$587.56</div>
      </div>
      <div class="btn">DETAILS</div>
      <i class="iconfont iright">&#xe62e;</i>
    </router-link>
    <div class="card-line"></div>
    <ul class="card-info">
      <li v-for="item in cardTabs">
        <router-link :to="{path: item.url}">
          <i class="iconfont" v-html="item.icon"></i>
          <div class="value">{{item.value}}</div>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      cardTabs: [{
        name: 'Accumulated Income',
        url: '/my/income',
        value: '$0',
        icon: '&#xe611;'
      },{
        name: 'Wait for an account',
        url: '/my/waitfor',
        value: '$0',
        icon: '&#xe611;'
      },{
        name: 'My fans',
        url: '/my/fans',
        value: '0',
        icon: '&#xe611;'
      }]
    }
  },
  created () {
    // this.$store.dispatch('setTopbarTitle', '店铺上新');
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.my-card-main {
  margin-top: 20/@rem;
  margin-left: 20/@rem;
  width: 710/@rem;
  background-color: #fff;
  border-radius: 20/@rem;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.16);

  .card-detail {
    position: relative;
    display: block;
    width: 710/@rem;
    height: 175/@rem;

    .clearfix();
    .img {
      margin-left: 30/@rem;
      margin-top: 50/@rem;
      width: 85/@rem;
      height: 85/@rem;
      text-align: center;
      border-radius: 50%;
      background-color: #ff473c;
      i {
        display: inline-block;
        color: #fff;
        font-size: 50/@rem;
        margin-top: 14/@rem;
      }
    }
    .info {
      margin-top: 55/@rem;
      height: 85/@rem;

      .clearfix();
      .label {
        margin-left: 20/@rem;
        line-height: 85/@rem;
        font-weight: bold;
        vertical-align: bottom;
      }
      .price {
        margin-top: 9/@rem;
        margin-left: 15/@rem;
        color: @red;
        font-size: 40/@rem;
      }
    }
    .btn, .iright {
      position: absolute;
      color: @gray2;
    }
    .btn {
      height: 30/@rem;
      top: 75/@rem;
      right: 80/@rem;
    }
    .iright {
      height: 40/@rem;
      top: 70/@rem;
      right: 30/@rem;
    }
  }
  .card-line {
    width: 680/@rem;
    height: 10/@rem;
    margin: 0 15/@rem;
    border-bottom: 1px solid rgba(225, 225, 225, 0.6);
  }
  .card-info {
    display: block;
    width: 100%;
    height: 185/@rem;
    .clearfix();
    li {
      float: left;
      width: 33.3%;
      a {
        display: block;
        text-align: center;
        margin-top: 25/@rem;
      }
      i {
        display: inline-block;
        color: #ff696d;
        font-size: 42/@rem;
      }
      .value {
        color: @red;
        font-size: 30/@rem;
      }
      p {
        width: 200/@rem;
        margin-left: 15/@rem;
        color: @gray2;
        text-align: center;
        line-height: 30/@rem;
      }
    }
  }
}
</style>
