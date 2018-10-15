<template>
  <div class="secure-main">
    <topbar :title="`Secure Checkout`" :backUrl="`cart`"></topbar>

    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <router-link :to="{path: '/cart/addAddress/' + $route.params.orderId}" class="empty" v-if="0">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link>
        <router-link :to="{path: '/cart/shippingAddress/' + $route.params.orderId}" class="address-detail" v-else>
          <template v-for="item in data.user_address">
            <div class="info" v-if="item.is_default === 1">
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
        <div class="label"><i class="iconfont">&#xe60a;</i>Payment Method</div>
      </li>
      <li>
        <div class="label">Credit／Debit card</div>
        <div class="pos-abs">
          <input type="radio" name="card" value="1">
        </div>
      </li>
      <li>
        <div class="label">PayPal</div>
        <div class="pos-abs">
          <input type="radio" name="card" value="2">
        </div>
      </li>
    </ul>

    <div class="global-fixed-btn">
      <div class="fixed-btn">PLACE ORDER ( ${{totalPrice}} )</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBalance: true, // 余额
      totalPrice: 0, // 总价
      data: []
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
    getOrdersData() {
      this.request('OrdersPayment', {
        token: localStorage.userToken || '',
        orderId: this.$route.params.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          this.totalPrice = window.returnFloat(+this.data.price - +this.data.money);
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
@import "~less/tool.less";
.secure-main {
  padding-top: 92/@rem;
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
  }
}
</style>
