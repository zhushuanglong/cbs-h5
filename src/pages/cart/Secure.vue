<template>
  <div class="secure-main">
    <topbar title="Secure Checkout"></topbar>
    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <router-link :to="{path: '/cart/addAddress', query: {orderId: $route.params.orderId}}" class="empty" v-if="addressId === ''">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link>
        <router-link :to="{path: '/cart/shippingAddress', query: {orderId: $route.params.orderId}}" class="address-detail" v-else>
          <template v-for="item in data.user_address" v-if="item.is_default === 1">
            <div class="info">
              <div class="fl">{{item.recipients}}</div>
              <div class="fr">+{{item.iphone}}</div>
            </div>
            <div class="address">{{item.address}}</div>
            <div class="pos">
              <i class="iconfont gray2">&#xe62e;</i>
            </div>
          </template>
        </router-link>
      </div>
    </div>

    <ul class="secure-ul">
      <li>
        <div class="label"><i class="iconfont title-order">&#xe649;</i> Order</div>
      </li>
      <li>
        <div class="label">Products Price</div>
        <div class="pos-abs">${{data.price}}</div>
      </li>
      <li>
        <div class="label">Express Delivery</div>
        <div class="pos-abs">{{+data.delivery || 'Free'}}</div>
      </li>
      <li>
        <div class="label">Available Balance</div>
        <div class="pos-abs red">
          {{data.money}}
          <mt-switch v-model="isBalance"></mt-switch>
        </div>
      </li>
      <li>
        <div class="label">Order Subtotal</div>
        <div class="pos-abs red">${{totalPrice}}</div>
      </li>
    </ul>

    <ul class="secure-ul">
      <li>
        <div class="label"><i class="iconfont">&#xe60a;</i>&nbsp;Payment Method</div>
      </li>
      <li class="spe">
        <div class="label">Credit／Debit card</div>
        <!-- <div class="pos">
          <i class="iconfont gray2">&#xe62e;</i>
        </div> -->
        <div class="card-detail" v-for="item in data.cards">
          <div class="card-number">{{item.number}}</div>
          <div class="pos-abs">
            <input type="radio" name="card" @click="radioClick(item.number)">
          </div>
        </div>
        <div class="card-new" @click="addNewCard">
          + ADD NEW CARD
        </div>
      </li>
      <li>
        <div class="label">PayPal</div>
        <div class="pos-abs">
          <input type="radio" name="card" @click="radioClick('PayPal')">
        </div>
      </li>
    </ul>

    <div class="global-fixed-btn">
      <div class="fixed-btn" @click="orderPay">PLACE ORDER ( ${{totalPrice}} )</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBalance: true, // 余额
      totalPrice: 0, // 总价
      data: [],
      addressId: '', // 地址ID
      cardNumber: '', // 卡号
      payType: 0 // 支付方式  2-paypal 3-stripe
    };
  },
  computed: {},
  created () {
    this.getOrdersData();
  },
  mounted () {},
  watch: {
    'isBalance': function (value) {
      if (value) {
        this.totalPrice = window.returnFloat(+this.data.price - +this.data.money);
      } else {
        this.totalPrice = window.returnFloat(+this.data.price + +this.data.money);
      }
    }
  },
  methods: {
    // 获取订单信息
    getOrdersData () {
      this.request('OrdersPayment', {
        token: localStorage.userToken || '',
        order_id: this.$route.params.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          this.totalPrice = window.returnFloat(+this.data.price - +this.data.money);
          // addressId
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].is_default === 1) {
              this.addressId = userAddress[i].id;
            }
          }
        } else {
          this.errJump ();
        }
      }, err => {
        this.$Toast(err);
        this.errJump ();
      });
    },
    // 错误ID跳转
    errJump () {
      let self = this;
      self.$Toast({
        message: 'Error Order Id',
        duration: 1000
      });
      setTimeout(function() {
        self.$router.push({path: '/cart'});
      }, 1000);
    },
    // 添加新卡
    addNewCard () {
      window.yyPayData = {};
      if (this.addressId === '') {
        this.$Toast('Please add a shipping address');
      } else {
        window.yyPayData = {
          token: localStorage.userToken || '',
          order_id: +this.$route.params.orderId, // 订单号
          address_id:	+this.addressId, // 地址id
          balance: this.isBalance, // 是否使用余额
          pay_type: this.payType
        };
        this.$router.push({path: '/cart/addCard/' + this.$route.params.orderId});
      }
    },
    // 订单支付
    orderPay () {
      if (this.addressId === '') {
        this.$Toast('Please add a shipping address');
        return;
      }
      if (!this.payType) {
        this.$Toast('Please select payment method');
        return;
      }
      // 若有卡或者使用Paypal支付，并选择了Credit／Debit card
      this.request('OrdersPay', {
        token: localStorage.userToken || '',
        order_id: +this.$route.params.orderId, // 订单号
        address_id:	+this.addressId, // 地址id
        balance: this.isBalance, // 是否使用余额
        pay_type: this.payType, //	是	Number	支付方式 2-paypal 3-stripe
        source: this.cardNumber
      }).then((res) => {
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
            }, 1000);
          }
        } else {
          self.$Toast({
            message: res.msg || 'Payment Failure',
            duration: 1200
          });
          setTimeout(function() {
            self.$router.push({path: '/cart/failure/' + self.$route.params.orderId});
          }, 1000);
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // radio click
    radioClick (value) {
      // Paypal支付
      if (value === 'PayPal') {
        this.payType = 2;
        this.cardNumber = '';
        return;
      }
      // 银行支付卡号
      this.payType = 3;
      this.cardNumber = +value;
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import "~less/tool.less";
.secure-main {
  padding-top: 92/@rem;
  padding-bottom: 90/@rem;
  .secure-shipping {
    position: relative;
    margin: 20/@rem 0;
    background-color: #fff;
    padding: 0 20/@rem;
    font-size: 28/@rem;
    .title {
      .height(90);
      font-weight: bold;
      border-bottom: 1px solid @gray3;
      i {
        font-weight: normal;
      }
    }
    .shipping-con {
      position: relative;
      line-height: 90/@rem;
      padding-bottom: 20/@rem;
      .empty {
        display: block;
        color: @gray2;
        i {
          position: absolute;
          top: 0;
          right: -10/@rem;
        }
      }
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
  .secure-ul {
    display: block;
    background-color: #fff;
    margin-bottom: 20/@rem;
    padding: 0 20/@rem;

    li {
      position: relative;
      .height(90);
      border-bottom: 1px solid @gray4;
      &:last-child {
        border-bottom: none;
      }
      .label {
        font-size: 28/@rem;
        font-weight: bold;
        i {
          font-weight: normal;
          &.title-order {
            vertical-align: middle;
            font-size: 36/@rem;
          }
        }
      }
      .pos {
        position: absolute;
        right: 0;
        top: 0;
      }
      .pos-abs {
        position: absolute;
        top: 0;
        right: 0;
        .clearfix();
        .mint-switch {
          float: right;
          margin-top: 20/@rem;
          margin-left: 20/@rem;
        }
      }
    }
    .spe {
      height: auto;
      .card-detail {
        position: relative;
        .height(90);
      }
      .card-new {
        display: block;
        border: 1px dashed @gray3;
        margin: 20/@rem 0;
        padding: 0 10/@rem;
      }
    }
  }
}
</style>
