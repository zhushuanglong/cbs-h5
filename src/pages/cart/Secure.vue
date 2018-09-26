<template>
  <div class="secure-main">
    <TopBar :title="`Secure Checkout`" :backUrl="`cart`"></TopBar>

    <div class="secure-shipping">
      <div class="title"><i class="iconfont">&#xe61e;</i>Shipping Address</div>
      <div class="line"></div>
      <div class="shipping-con">
        <router-link :to="{path: '/cart/address'}" class="empty">
          + Add a shipping address
          <i class="iconfont gray2">&#xe62e;</i>
        </router-link>
        <!-- TODO -->
        <div class="list"></div>
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
import TopBar from 'common/TopBar.vue';
export default {
  components: {
    TopBar
  },
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
      border-bottom: 1px solid @gray3;
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
