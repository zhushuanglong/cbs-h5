<template>
  <div class="secure-main">
    <topbar title="Secure Checkout"></topbar>
    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <router-link :to="{path: '/cart/addAddress', query: {orderId: $route.query.orderId}}" class="empty" v-if="addressId === ''">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link>
        <router-link :to="{path: '/cart/shippingAddress', query: {orderId: $route.query.orderId}}" class="address-detail" v-else>
          <template v-if="addressData.id">
            <div class="info">
              <div class="fl">{{addressData.recipients}}</div>
              <div class="fr">+{{addressData.iphone}}</div>
            </div>
            <div class="address">{{addressData.address}}</div>
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
        <div class="pos-abs">${{returnFloat(data.price)}}</div>
      </li>
      <li>
        <div class="label">Express Delivery</div>
        <div class="pos-abs">{{+data.shipping > 0 ? ('$' + returnFloat(data.shipping)) : 'Free'}}</div>
      </li>
      <li>
        <div class="label">Available Balance</div>
        <div class="pos-abs red">
          ${{returnFloat(data.money)}}
          <mt-switch v-model="isBalance" @change="changeBalance"></mt-switch>
        </div>
      </li>
      <li>
        <div class="label">Order Subtotal</div>
        <div class="pos-abs red">${{returnFloat(totalPrice)}}</div>
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
        <div class="card-detail" v-for="(item, index) in cards">
          <div class="card-number">
            <div class="card-top">
              <router-link class="fl" :to="{path: '/cart/addCard', query: {orderId: $route.query.orderId || '', cardId: item.id}}">
                <span> * Card No. :</span>
                <span class="gray2">{{item.number}}</span>
              </router-link>
              <div class="fr" @click="clickCardDel(item.id)">
                <i class="iconfont">&#xe63d;</i>
                <!-- <i class="iconfont">&#xe611;</i> -->
              </div>
            </div>
            <div class="card-info" v-show="index == showCardNum">
             <div class="fl br">
              <p class="p1">EXPIRE</p>
              <p class="p2">
                <input class="gray2" type="text" placeholder="06/23" v-model="exp">
              </p>
            </div>
            <div class="fl">
              <p class="p1">CVC</p>
              <p class="p2">
                <input class="gray2" type="text" placeholder="000" v-model="cvc">
              </p>
            </div>
            </div>
          </div>
          <div class="pos-abs">
            <input type="radio" name="card" @click="radioClick(item.id, index)">
          </div>

        </div>
        <div class="card-new" @click="addNewCard">+ Add a new card</div>
      </li>
      <li>
        <div class="label">PayPal</div>
        <div class="pos-abs">
          <input type="radio" name="card" @click="radioClick('PayPal')">
        </div>
      </li>
    </ul>

    <div class="global-fixed-btn">
      <div class="fixed-btn" @click="orderPay">PLACE ORDER ( ${{returnFloat(totalPrice)}} )</div>
    </div>

    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBalance: false, // 余额
      totalPrice: 0, // 总价
      data: [],
      cards: [], // 银行卡列表
      addressId: '', // 地址ID
      cardId: '',
      payType: 0, // 支付方式  2-paypal 3-stripe
      confirmModal: {},
      addressData: {}, // 地址数据
      exp: '', // 卡日期
      cvc: '', // 卡到期
      showCardNum: null // 显示卡
    };
  },
  computed: {},
  created () {
    this.getOrdersData();
    this.getCardsData();
  },
  mounted () {},
  watch: {},
  methods: {
    // 获取订单信息
    getOrdersData () {
      this.request('OrdersPayment', {
        order_id: this.$route.query.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          // 计算总价
          this.computePice();
          // addressId
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].id == this.$route.query.addressId) {
              this.addressId = userAddress[i].id;
              this.addressData = userAddress[i];
              return false;
            } else if (userAddress[i].is_default == 1) {
              this.addressId = userAddress[i].id;
              this.addressData = userAddress[i];
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
    // 计算价格
    computePice () {
      this.totalPrice = 0;
      // 邮费
      this.totalPrice = this.accAdd(+this.data.price, this.data.shipping); // 加
      // 余额
      if (this.isBalance) {
        this.totalPrice = this.accSub(this.totalPrice, this.data.money); // 减
      }
    },
    // 获取银行卡信息
    getCardsData () {
      this.request('CardsList', {
        order_id: this.$route.query.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.cards = res.content.cards || [];
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 改变balance
    changeBalance () {
      // this.isBalance = !this.isBalance;
      this.computePice();
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
      if (this.addressId === '') {
        this.$Toast('Please add a shipping address');
      } else {
        this.$router.push({path: '/cart/addCard', query: {
          orderId: this.$route.query.orderId,
          addressId: +this.addressId,
          balance: this.isBalance,
          payType: this.payType || 3
        }});
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

      // 如果是卡支付
      if (this.payType === 3) {
        if (!this.exp) {
          this.$Toast('Please fill in expire');
          return;
        }
        if (!this.cvc) {
          this.$Toast('Please fill in cvc');
          return;
        }
      }
      // 若有卡或者使用Paypal支付，并选择了Credit／Debit card

      this.request('OrdersPay', {
        order_id: this.$route.query.orderId, // 订单号
        address_id:	this.addressId, // 地址id
        balance: this.isBalance, // 是否使用余额
        pay_type: this.payType, //	是	Number	支付方式 2-paypal 3-stripe
        source: this.cardId,
        exp: this.exp,
        cvc: this.cvc
      }).then((res) => {
        let self = this;
        if (res.status === 200) {
          if (self.payType === 2 && res.content) {
            self.$Toast({
              message: 'Payment Processing',
              duration: 3000
            });
            // 如果是PayPal去支付页面
            setTimeout(function() {
              window.location.href = res.content.payUrl;
            }, 1000);
          }
          if (self.payType === 3) {
            self.$Toast({
              message: 'Payment Processing',
              duration: 1200
            });
            setTimeout(function() {
              self.$router.push({path: '/cart/successful?orderId=' + self.$route.query.orderId});
            }, 1000);
          }
        } else {
          self.$Toast({
            message: res.msg || 'Payment Failure',
            duration: 1200
          });
          setTimeout(function() {
            self.$router.push({path: '/cart/failure?orderId=' + self.$route.query.orderId});
          }, 1000);
        }
      }, err => {
        this.$Toast(err);
        this.$router.push({path: '/cart/failure?orderId=' + self.$route.query.orderId});
      });
    },
    // radio click
    radioClick (value, index) {
      this.exp = '';
      this.cvc = '';
      // Paypal支付
      if (value === 'PayPal') {
        this.payType = 2;
        this.cardId = '';
        this.showCardNum = null;
        return;
      }
      this.showCardNum = index;
      // 银行支付卡号
      this.payType = 3;
      this.cardId = +value;

    },
    // 删除card
    clickCardDel (cardId) {
      let self = this;
      self.confirmModal = {
        show: true,
        title: 'Confirmed to delete?',
        onText: 'Yes',
        content: `Delete the card!`,
        action: function () {
          self.request('CardsDelete', {
            card_id: cardId
          }).then((res) => {
            if (res.status === 200 && res.content) {
              self.confirmModal.show = false;
              self.$Toast({
                message: 'Success',
                duration: 800
              });
              self.cards = res.content.cards;
              // 如果是选中的card 被删除
              if (self.cardId === +cardId) {
                self.cardId = '';
              }
            }
          }, err => {
            self.$Toast(err);
          });
        }
      }
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
        margin-bottom: 20/@rem;
      }
      .card-number {
        .whl(640, 100);
        height: auto;
        background: rgba(243,242,242,1);
        border-radius: 10/@rem;
        font-size: 28/@rem;

        .card-top {
          padding: 0 20/@rem;
          .clearfix();
          .fl {
            .height(100);
            i {
              vertical-align: middle;
            }
          }
          .fr {
            font-size: 24/@rem;
            color: @gray2;
            i {
              font-size: 34/@rem;
              margin-right: 5/@rem;
              vertical-align: middle;
            }
          }
        }
        .card-info {
          border-top: 1px solid @gray4;
          height: 146/@rem;
          .clearfix();
          .fl {
            width: 50%;
            height: 145/@rem;
            text-align: center;
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
              width: 200/@rem;
              .height(60);
              // background-color: #f3f2f0;
              border-radius: 5/@rem;
              padding: 0 20/@rem;
              text-align: center;
              color: #222;
            }
          }
        }
      }
      .card-new {
        display: block;
        border: 1px dashed @gray3;
        margin: 20/@rem 0;
        padding: 0 20/@rem;
        color: @gray2;
      }
    }
  }
}
</style>
