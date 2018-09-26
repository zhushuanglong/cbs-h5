<template>
  <div class="secure-main">
    <topbar :title="`Secure Checkout`" :backUrl="`cart`"></topbar>

    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <router-link :to="{path: '/cart/addAddress'}" class="empty" v-if="0">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link>
        <router-link :to="{path: '/cart/shippingAddress'}" class="address-detail" v-else>
          <div class="info">
            <div class="fl">QIAN.XIAO</div>
            <div class="fr">+001123455534545</div>
          </div>
          <div class="address">608 kingsley st，apt 10，nomal，lllinois，United St-ates, 61761</div>
          <div class="pos">
            <i class="iconfont gray2">&#xe62e;</i>
          </div>
        </router-link>
      </div>
    </div>

    <ul class="secure-ul">
      <li>
        <div class="label"><i class="iconfont title-order">&#xe649;</i> Order</div>
      </li>
      <li>
        <div class="label">Products Price</div>
        <div class="pos-abs">$299.99</div>
      </li>
      <li>
        <div class="label">Express Delivery</div>
        <div class="pos-abs">Free</div>
      </li>
      <li>
        <div class="label">Available Balance</div>
        <div class="pos-abs red">
          $28.6
          <mt-switch v-model="isBalance"></mt-switch>
        </div>
      </li>
      <li>
        <div class="label">Order Subtotal</div>
        <div class="pos-abs red">$299.99</div>
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
      <div class="fixed-btn">PLACE ORDER ( $299.99 )</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBalance: true
    };
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {},
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
          letter-spacing: -.5px;
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
