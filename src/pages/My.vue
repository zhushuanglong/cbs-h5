<template>
  <div class="my-main">
    <router-link :to="{path: '/my/sign'}" v-if="!isLogin" class="isNotLogin"></router-link>
    <div class="my-top">
      <div class="my-top-info"  @click="userLogin">
        <a class="img fl" href="javascript:;">
          <img class="head" :src="avator" v-if="avator">
          <img class="head" src="~img/my/head.png" v-if="!avator">
        </a>
        <div class="nickname fl">{{name}}</div>
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
      <Order :handle-cb="getPersonalIndex" v-for="item in orders" :key="item.id" :data="item" v-if="orders && orders.length"></Order>
      <div class="loading" v-show="orders.length">{{loadingContent}}</div>
      <pageempty icon="&#xe693;" :margin-top="50" desc="You have no orders yet!" v-if="orders.length === 0"></pageempty>
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
        money: '0',
        income: '0',
        wait_account: '0',
        funs: '0'
      },
      orders: [],
      name: '',
      isLogin: false,
      loadingContent:'',
      isFinishedLoading: false,
      pageParams: {
        page: 1
      },
      username: ''
    };
  },
  computed: {},
  mounted () {
    this.getPersonalIndex();//获取主页数据
    this.getOrderList(this.pageParams); //获取订单列表数据
    this.getName(); //获取用户名字，无名字就用email代替
    this.loadMore();
  },
  watch: {},
  methods: {
    getName(){
      let userToken = window.localStorage.getItem('userToken');
      if(!userToken){
        this.name = 'Sign In / Register'
      }else if(this.username === ''){
        let email = JSON.parse(window.localStorage.userInfo).email;
        let emailName = email.split('@')
        this.name = emailName[0];
      }else{
        this.name = this.username;
      }
    },
    userLogin() {
      if (!this.isLogin) {
        this.$router.push({
          path: '/my/sign',
        })
      } else {
        this.$router.push({
          path: '/my/profile',
        })
      }
    },
    // 个人主页,获取除orderList之外的数据。
    getPersonalIndex() {
      this.request('PersonalIndex').then((res) => {
        if(res.status === 200 && res.content) {
          this.avator = res.content.img; //头像
          this.cardData.money = res.content.money; // 用户余额
          this.cardData.integral = res.content.integral; // 积分
          this.cardData.wait_account=  res.content.wait_account; // 待入账
          this.cardData.income = res.content.income; // 收入
          this.cardData.funs = res.content.funs;
          this.username = res.content.username;
          this.isLogin = true;
        } else{
          this.username = 'Sign In / Register';
          this.isLogin = false;
        }
      })
    },
    // getOrderList(page) {
    //   this.$http.post('/order/orderList').then((res) => {
    //     res = res.data;
    //     if(res.status === 200 && res.data) {
    //       this.orders = res.data.order.orders;
    //     }
    //   }, err => {
        
    //   }).catch((err) => {
    //   })
    // },
    getOrderList(pageParams) {
      this.loadingContent = 'loading'
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (pageParams.page === 1) {
         this.orders = []
       }
       this.request('OrdersList',{ page: pageParams.page }).then((res) => {
        if(res.status === 200 && res.content) {
          this.loadingContent = '';
           // 滚动加载
          //  console.log("res.content.total_page",res.content.total_page)
          if(pageParams.page < res.content.total_page) {
            this.loadingEmpty = false;
          }else{
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
          }
          this.orders = this.orders.concat(res.content.orderData);
          // console.log("orders",this.orders.length)
        } else{
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
        }
        this.isFinishedLoading = true
      },err => {
        this.$Toast(err)
        this.isFinishedLoading = true;
      })

    },
    // 上拉刷新
    loadMore() {
      let self = this;
      window.onscroll = function() {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >=  c - 200  && self.isFinishedLoading && !self.loadingEmpty) {
          let page = self.pageParams.page + 1;
          Object.assign(self.pageParams, {
            page: page
          })   
          self.getOrderList(self.pageParams);
        }
      }
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.my-main {
  position: relative;
  .isNotLogin {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
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
  .loading {
   .height(80);
    text-align: center;
  }
  }
}
</style>
