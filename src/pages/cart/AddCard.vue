<template>
  <div class="add-card-main">
    <topbar :title="topbarTitle"></topbar>
    <div class="card-con">
      <div class="card-img"><div class="img"></div></div>
      <div class="card-num">
        <p>CARD NUMBER</p>
        <p class="gray2 mt">
          <input class="gray2" type="text" placeholder="0000 0000 0000" v-model="data.number" @keyup="handleInputNumber">
        </p>
      </div>
      <div class="card-info">
        <div class="fl br">
          <p class="p1">EXPIRE</p>
          <p class="p2">
            <input class="gray2" type="text" placeholder="06/23" v-model="data.exp" @keyup="handleInputExp" maxlength="5">
          </p>
        </div>
        <div class="fl pl">
          <p class="p1">CVC</p>
          <p class="p2">
            <input class="gray2" type="text" placeholder="000" v-model="data.cvc" @keyup="handleInputCvc" maxlength="3">
          </p>
        </div>
      </div>
      <div class="card-remeber">
        <p>Remember this card for future use</p>
        <div class="pos" v-show="isShowLockedDom"></div>
        <mt-switch v-model="isSetDefault"></mt-switch>
      </div>
    </div>

    <div class="secure-shipping" v-if="JSON.stringify(address).length > 2">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <div class="address-detail">
          <div class="info">
            <div class="fl" v-if="!$route.query.cardId">{{address.recipients}}</div>
            <div class="fl" v-else>{{address.firstname}}&nbsp;{{address.lastname}}</div>
            <div class="fr">+{{address.iphone}}</div>
          </div>
          <div class="address" v-if="!$route.query.cardId">{{address.address}}</div>
          <div class="address" v-else>{{address.country}}&nbsp;{{address.state}}&nbsp;{{address.city}}&nbsp;{{address.street}}&nbsp;{{address.suburb}}</div>
        </div>
      </div>
    </div>
    <div class="global-fixed-btn">
      <div class="fixed-btn" v-if="!$route.query.cardId" @click="orderPay">PURCHASE</div>
      <div class="fixed-btn" v-else @click="save">SAVE</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSetDefault: false,
      addressId: '',
      topbarTitle: 'Add a credit/debit card',
      data: {},
      address: {},
      isEdit: false,
      isShowLockedDom: false,
      addSlash: null
    };
  },
  computed: {},
  created () {
    if (this.$route.query.cardId) {
      this.topbarTitle = 'Edit card';
      this.isEdit = true;
      this.getEditOrdersData();
    } else {
      this.getAddOrdersData();
    }
  },
  mounted () {},
  watch: {
    'isSetDefault': function (value) {
      // 加一个蒙层锁
      if (this.isShowLockedDom) {
        return;
      }
      if (this.isEdit) {
        this.isShowLockedDom = true;
        this.request('CardsDefault', {
          card_id: this.$route.query.cardId || ''
        }).then((res) => {
          if (res.status === 200) {
            this.isShowLockedDom = false;
          }
        }, err => {
          this.$Toast(err);
        });
      }
    }
  },
  methods: {
    // 银行卡信息 - 新增
    getAddOrdersData () {
      this.request('OrdersPayment', {
        order_id: this.$route.query.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].is_default === 1) {
              this.address = userAddress[i];
            }
          }
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 银行卡信息 - 编辑
    getEditOrdersData () {
      this.request('CardsInfo', {
        card_id: this.$route.query.cardId || ''
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content.card || {};
          this.address = res.content.address || {};
          this.isSetDefault = res.content.card.is_default || false;
        }
      }, err => {
        this.$Toast(err);
      });
    },
    orderPay () {
      let payData = {
        number: this.data.number,	// 否	string	银行卡号
        exp: this.data.exp,	// 否	string	银行卡到期月份
        cvc: this.data.cvc 	// 否	string	银行卡安全码
      };

      // 如果是编辑 - 需要传用户的地址信息
      // if (this.isEdit) {
      //   Object.assign(payData, {
      //     order_id: this.$route.query.orderId,
      //     address_id:this.$route.query.addressId,
      //     balance: this.$route.query.balance,
      //     pay_type: this.$route.query.payType,
      //   });
      // }
      Object.assign(payData, {
        order_id: this.$route.query.orderId,
        coupon_id: this.$route.query.coupon_id,
        integral: this.$route.query.integral,
        address_id:this.$route.query.addressId,
        balance: this.$route.query.balance,
        pay_type: this.$route.query.payType,
      });
      if (!payData.number) {
        this.$Toast('Card Number can not be empty');
        return;
      }

      if (!payData.exp) {
        this.$Toast('Expire Year must be more than 2 letters');
        return;
      }
      if (!payData.cvc) {
        this.$Toast('CVC can not be empty');
        return;
      }
      let url = 'CartsPay';
      if(this.$route.query.orderId) {
        url = 'OrdersPay';
      }
      this.request(url, payData).then((res) => {
        let self = this;
        let order_id = '';
        if(res.content) {
          order_id = res.content.orderId;
        }
        if (res.status === 200) {
          self.$Toast({
            message: 'Payment Success',
            duration: 1200
          });
          setTimeout(function() {
            self.$router.push({path: '/cart/successful?orderId=' + order_id});
          }, 1000);
        } else {
          self.$Toast({
            message: res.msg || 'Payment Failure',
            duration: 1200
          });
          if (order_id) {
            setTimeout(function() {
              self.$router.push({path: '/cart/failure?orderId=' + order_id});
            }, 1000);
          }
          // 清空购物车数量
          // localStorage.yym_cartNumber = 0;
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 保存修改
    save () {
      let data = {};
      let self = this;
      if (!this.data.number) {
        this.$Toast('number');
        return;
      }
      if (!this.data.exp) {
        this.$Toast('exp');
        return;
      }
      if (!this.data.cvc) {
        this.$Toast('cvc');
        return;
      }
      Object.assign(data, this.data);
      this.request('CardsEdit', data).then((res) => {
        if (res.status === 200) {
          self.$Toast({
            message: 'Save Success',
            duration: 1200
          });
          setTimeout(function() {
            self.$router.push({path: '/cart/secure', query: {orderId: self.$route.query.orderId}});
          }, 1000);
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // number
    handleInputNumber (e) {
      this.data.number = e.target.value.replace(/[^\d]/g,'');
    },
    // Exp助手
    handleInputExp (e) {
      let self = this;
      self.data.exp = e.target.value.replace(/[^(\/)\d]/g,'');
      clearTimeout(self.addSlash);
      self.addSlash = setTimeout(function() {
        if (self.data.exp > 2 && self.data.exp.indexOf('/') === -1) {
          self.data.exp = self.data.exp.substring(0,2) + '/' + self.data.exp.substring(2, 4);
        }
      }, 800);
    },
    // cvc助手
    handleInputCvc (e) {
      this.data.cvc = e.target.value.replace(/[^\d]/g,'');
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
    height: 460/@rem;
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
          width: 260/@rem;
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
      .pos {
        position: absolute;
        top: 0/@rem;
        right: 0;
        width: 100/@rem;
        height: 90/@rem;
        z-index: 2;
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
