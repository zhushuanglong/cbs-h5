<template>
  <div class="add-card-main">
    <topbar :title="'Add a credit/debit card'" :backUrl="'cart/secure/' + $route.params.orderId"></topbar>
    <div class="card-con">
      <div class="card-img"><div class="img"></div></div>
      <div class="card-num">
        <p>CARD NUMBER</p>
        <p class="gray2 mt"><input class="gray2" type="text" placeholder="0000 0000 0000"  v-model="data.number"></p>
      </div>
      <div class="card-info">
        <div class="fl br">
          <p class="p1">EXPIRE</p>
          <p class="p2">
            <input class="gray2" type="text" placeholder="moth" v-model="data.moth">
            <input class="gray2" type="text" placeholder="year" v-model="data.year">
          </p>
        </div>
        <div class="fl pl">
          <p class="p1">CVV</p>
          <p class="p2">
            <input class="gray2" type="text" placeholder="000" v-model="data.cvv">
          </p>
        </div>
      </div>
      <!-- <div class="card-remeber">
        <p>Remember this card for future use</p>
        <mt-switch v-model="isSetDefault"></mt-switch>
      </div> -->
    </div>

    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <!-- <router-link :to="{path: '/cart/addAddress/' + $route.params.orderId + '?from=addCard'}" class="empty" v-if="1">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link> -->
        <router-link :to="{path: '/cart/shippingAddress', query: {orderId: $route.params.orderId}}" class="address-detail">
          <template v-for="item in data.user_address" v-if="item.is_default === 1">
            <div class="info">
              <div class="fl">{{item.recipients}}</div>
              <div class="fr">+{{item.iphone}}</div>
            </div>
            <div class="address">{{item.address}}</div>
            <!-- <div class="pos">
              <i class="iconfont gray2">&#xe62e;</i>
            </div> -->
          </template>
        </router-link>
      </div>
    </div>
    <div class="global-fixed-btn">
      <div class="fixed-btn" @click="orderPay">PURCHASE</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // isSetDefault: false,
      addressId: '',
      data: []
    };
  },
  computed: {},
  created () {
    this.getOrdersData();
  },
  mounted () {},
  watch: {},
  methods: {
    // 获取订单信息 - 获取地址信息
    getOrdersData () {
      this.request('OrdersPayment', {
        token: localStorage.userToken || '',
        order_id: this.$route.params.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].is_default === 1) {
              this.addressId = userAddress[i].id;
            }
          }
        }
      }, err => {
        this.$Toast(err);
      });
    },
    orderPay () {
      let payData = Object.assign({}, window.yyPayData || {}, {
        number: this.data.number,	// 否	string	银行卡号
        expm: this.data.moth,	// 否	string	银行卡到期月份
        expy: this.data.year,	// 否	string	银行卡到期年
        cvc: this.data.cvv 	// 否	string	银行卡安全码
      });

      if (!payData.number) {
        this.$Toast('Please Fill In Card Number');
        return;
      }

      if (!payData.moth) {
        this.$Toast('Please Fill In Expire Moth');
        return;
      }

      if (!payData.year) {
        this.$Toast('Please Fill In Expire Year');
        return;
      }
      if (!payData.cvv) {
        this.$Toast('Please Fill In Cvv');
        return;
      }
      this.request('OrdersPay', payData).then((res) => {
        let self = this;
        if (res.status === 200) {
          if (self.payType === 2 && res.content) {
            self.$Toast({
              message: 'Payment Processing',
              duration: 5000
            });
            // 如果是PayPal去支付页面
            setTimeout(function() {
              window.location.href = res.content.payUrl;
            }, 1000);
          }
          if (self.payType === 3) {
            self.$Toast({
              message: 'Payment Success',
              duration: 1200
            });
            setTimeout(function() {
              self.$router.push({path: '/cart/successful/' + self.$route.params.orderId});
              window.yyPayData = {};
            }, 1000);
          }
        } else {
          self.$Toast({
            message: res.msg || 'Payment Failure',
            duration: 1200
          });
          setTimeout(function() {
            self.$router.push({path: '/cart/failure/' + self.$route.params.orderId});
            window.yyPayData = {};
          }, 1000);
        }
      }, err => {
        this.$Toast(err);
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.add-card-main {
  font-size: 28/@rem;
  padding-top: 92/@rem;
  padding-bottom: 98/@rem;
  .card-con {
    width: 100%;
    padding: 20/@rem;
    // height: 458/@rem;
    height: 375/@rem;
    background-color: #fff;
    margin-top: 20/@rem;
    .card-img {
      padding-bottom: 20/@rem;
      border-bottom: 1px solid @gray4;
      .img {
        margin: 0 auto;
        .wh(506, 56);
        background: url('~img/cart/card.png') no-repeat;
        background-size: 100% auto;
      }
    }
    .card-num {
      padding: 20/@rem 0;
      border-bottom: 1px solid @gray4;
      p {
        .height(40);
      }
      .mt {
        margin-top: 10/@rem;
      }
    }
    .card-info {
      height: 135/@rem;
      .clearfix();
      .fl {
        .wh(355, 135);
      }
      .pl {
        padding-left: 20/@rem;
      }
      .br {
        border-right: 1px solid @gray4;
      }
      p {
        margin-bottom: 10/@rem;
        .height(40);
      }
      .p1 {
        margin-top: 20/@rem;
      }
      .p2 {
        input {
          width: 120/@rem;
          margin-right: 30/@rem;
          .height(60);
        }
      }
    }
    .card-remeber {
      position: relative;
      border-top: 1px solid @gray4;
      p {
        .height(88);
      }
      .mint-switch {
        position: absolute;
        top: 20/@rem;
        right: 0;
      }
    }
  }
  .secure-shipping {
    position: relative;
    margin: 20/@rem 0;
    background-color: #fff;
    padding: 0 20/@rem;
    font-size: 28/@rem;
    .title {
      .height(90);
      font-weight: bold;
      border-bottom: 1px solid @gray4;
      i {
        font-weight: normal;
      }
    }
    .shipping-con {
      position: relative;
      line-height: 90/@rem;
      padding-bottom: 20/@rem;
      // .empty {
      //   display: block;
      //   color: @gray2;
      //   i {
      //     position: absolute;
      //     top: 0;
      //     right: -10/@rem;
      //   }
      // }
      .address-detail {
        position: relative;
        display: block;
        width: 680/@rem;
        padding: 20/@rem;
        position: relative;
        color: #535353;

        .info {
          .height(40);
          .clearfix();
        }
        .address {
          word-break: break-all;
          line-height: 40/@rem;
        }

        .pos {
          position: absolute;
          top: 30/@rem;
          right: -40/@rem;
        }
      }
    }
    .line {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8/@rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAIBAMAAAClhdRfAAAAD1BMVEX///+PyfX1iYnH5Pr6xMRR3CN5AAAAJklEQVQY02MAAhYlOFBhgAJDQTgwgIk5IdQ5QIWYEcqEQfwRZxwAKvUUdRO2lFcAAAAASUVORK5CYII=') repeat-x;
      background-size: 78/@rem;
    }
  }
}
</style>
