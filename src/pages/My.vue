<template>
  <div class="my-main" ref="indexMain">
    <div class="my-top">
      <div class="my-top-info">
        <router-link :to="{path: '/my/profile'}" class="img fl"><img class="head" :src="avator"></router-link>
        <div class="nickname fl" @click="userLogin">{{username}}</div>
      </div>
      <ul class="my-top-des">
        <li v-for="item in tabs">
          <router-link :to="{path: item.url}">
            <i class="iconfont" v-html="item.icon"></i>
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <Card :data="cardData"></Card>
    <div class="my-order-title">
      <router-link :to="{path: '/my/orderList'}">
        <div class="label">Order List</div>
        <div class="btn">All</div>
        <i class="iconfont">&#xe62e;</i>
      </router-link>
    </div>
    <div class="index-order">
      <Order v-for="item in orders" :data="item"></Order>
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import BottomBar from './common/BottomBar.vue';
import Card from './my/Card.vue';
import Order from './my/Order.vue';
export default {
  name: 'my',
  components: {
    BottomBar,
    Card,
    Order
  },
  data () {
    return {
      tabs: [{
        name: 'Points',
        url: '/my/points',
        icon: '&#xe64a;'
      }, {
        name: 'Coupons',
        url: '/my/coupons',
        icon: '&#xe691;'
      }, {
        name: 'History View',
        url: '/my/historyview',
        icon: '&#xe693;'
      }],
      avator: '', //头像
      cardData: {
        money: 0,
        integral: 0,
      },
      orders: [],
      username: ''
    };
  },
  computed: {},
  mounted () {
    this.getPersonalIndex();
  },
  watch: {
    // 'isLogin': function () {
    //   this.pageInit();
    //   this.popupShow();
    // }
  },
  methods: {
    userLogin() {
      this.$router.push({
        path: '/my/sign',
      })
    },
    // 个人主页
    getPersonalIndex() {
      this.request('PersonalIndex').then((res) => {
        if(res.status === 200) {
          this.avator = res.content.img; //头像
          this.cardData.money = res.content.money; // 用户余额
          this.cardData.integral = res.content.integral; // 积分
          this.cardData.wait_account=  res.content.wait_account; // 待入账
          this.cardData.income = res.content.income; // 收入
          this.cardData.funs = res.content.funs;
          this.order = res.content.order;
          this.username = res.content.username;
          this.orders = res.content.orders;
        }
      })
    },
    getOrderList() {
      this.$http.post('/order/orderList').then((res) => {
        res = res.data;
        if(res.status === 200 && res.data) {
          this.orders = res.data.order.orders;
        }
      }, err => {

      }).catch((err) => {
      })
    }
  },
  
  beforeDestroy () {
    // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
.my-main {
  .my-top {
    width: 100%;
    // height: 400/@rem;
    height: 350/@rem;
    background-color: #fe4c45;
    background: url('~img/my/my_topbg.png') no-repeat;
    background-size: 100%;
    padding-top: 75/@rem;
    padding-bottom: 20/@rem;
    .my-top-info {
      padding-left: 28/@rem;
      .clearfix();
      .img {
        background-color: #fff;
        width: 120/@rem;
        height: 120/@rem;
        border-radius: 50%;
        background-attachment: fixed;
        .head {
          margin: 2/@rem;
          width: 116/@rem;
          height: 116/@rem;
          background-size: 100% auto;
        }
      }
      .nickname {
        height: 60/@rem;
        line-height: 60/@rem;
        margin-left: 20/@rem;
        margin-top: 30/@rem;
        font-size: 32/@rem;
        color: #fff;
      }
    }
    .my-top-des {
      width: 100%;
      margin-top: 45/@rem;
      display: block;
      .clearfix();
      li {
        float: left;
        width: 250/@rem;
        height: 85/@rem;
        text-align: center;
        a {
          display: block;
          color: #fff;
        }
        i {
          font-size: 45/@rem;
          display: block;
        }
        p {
          font-size: 28/@rem;
        }
      }
    }
  }
  .my-order-title {
    margin-top: 20/@rem;
    width: 100%;
    height: 88/@rem;
    background-color: #fff;
    padding: 0 20/@rem;
    margin-bottom: 1px;

    .label {
      line-height: 88/@rem;
    }
    a {
      position: relative;
      display: block;
    }
    .btn, i {
      position: absolute;
      color: @gray2;
    }
    .btn {
      height: 88/@rem;
      line-height: 88/@rem;
      top: 0;
      right: 35/@rem;
    }
    i {
      top: 22/@rem;
      right: -10/@rem;
    }
  }
  .index-order{
    margin-bottom: 100/@rem;
  }
}
</style>
