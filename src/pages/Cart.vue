<template>
  <div class="cart-main" ref="indexMain">
    <topbar :title="'Shopping Cart'" :backUrl="'home'"></topbar>
    <!-- 空 -->
    <template v-if="0">
      <div class="cart-empty">
        <div class="img"></div>
        <p>Your shopping cart is currently empty</p>
        <router-link :to="{path: '/home'}" class="btn">SHOP NOW</router-link>
      </div>
      <bottombar></bottombar>
    </template>
    <!-- 有 -->
    <template v-else>
      <div class="cart-have">
        <div class="cart-enjoy">
          <span class="img"></span>
          <span>Add $11.99 to enjoy</span>
          <span>【Buy $599.99 Get $59.99 Off】</span>
          <i class="iconfont">&#xe62e;</i>
        </div>
        <div class="cart-list">
          <div class="detail">
            <div class="img fl">
              <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            </div>
            <div class="info fl">
              <div class="title">Button Up Front Plugin Pace Bird LALA HAHAHHAAHAH</div>
              <div class="sku">White</div>
              <div class="sku mt">S (175/92A)</div>
              <div class="num">1 x $288.00</div>
              <div class="price">$684.00</div>
              <div class="reduce"><i class="iconfont">&#xe62a;</i></div>
              <div class="add"><i class="iconfont">&#xe66f;</i></div>
            </div>
          </div>
        </div>
        <div class="cart-discounts cart-rel">
          <div class="cart-label">Activity Discounts</div>
          <div class="cart-pos">-$200.00</div>
        </div>
        <div class="cart-coupon cart-rel">
          <div class="cart-label">Coupon <span class="gray2">( no coupons )</span></div>
          <div class="cart-pos">
            <i class="iconfont gray2">&#xe62e;</i>
          </div>
        </div>
        <div class="cart-points cart-rel">
          <div class="cart-label">Activity Discounts <span class="label-des">( 635 points to use )</span></div>
          <div class="cart-pos">-$6.35<mt-switch v-model="isDiscount"></mt-switch></div>
        </div>
      </div>
      <div class="global-fixed-btn">
        <router-link :to="{path: '/cart/secure'}" class="fixed-btn">CONTINUE CHECKOUT ( <span>$288.88</span> )</router-link>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'cart',
  components: {},
  data () {
    return {
      isDiscount: false //
    };
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {
    // 'isLogin': function () {
    //   this.pageInit();
    //   this.popupShow();
    // }
  },
  methods: {},
  beforeDestroy () {
    // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
.cart-main {
  color: #131313;
  .cart-have {
    padding-top: 92/@rem;
  }

  .cart-enjoy {
    position: relative;
    width: 100%;
    background: #ffffff;
    .height(70);
    margin: 1px 0 1px 0;
    .clearfix();
    span {
      float: left;
      display: inline-block;
      font-size: 24/@rem;
      &:nth-child(3) {
        color: @red;
      }
    }
    .img {
      .wh(60, 28);
      background: url('~img/detail/2.png');
      background-size: 100% auto;
      margin: 22/@rem;
      margin-right: 10/@rem;
    }
    i {
      position: absolute;
      top: 0;
      right: 10/@rem;
      color: @gray2;
      font-size: 32/@rem;
    }
  }

  .cart-list {
    margin-bottom:10/@rem;
    .detail {
      background-color: #fff;
      padding: 20/@rem;
      margin-bottom: 18/@rem;
      width: 100%;
      height: 220/@rem;
      .clearfix();
      .img, img {
        .wh(180, 180);
        background-size: 100%;
      }
      .img img {
        display: block;
        border: 1px solid @gray2;
      }
      .info {
        position: relative;
        margin-left: 20/@rem;
        width: 430/@rem;
        .title {
          font-size: 28/@rem;
          .height(50);
          .line1();
        }
        .sku {
          .height(40);
          color: @gray2;
        }
        .mt {
          margin-top: 50/@rem;
        }
        .price {
          position: absolute;
          top: 142/@rem;
          right: -80/@rem;
          text-algin: right;
          color: @red;
        }
        .num {
          position: absolute;
          top: 100/@rem;
          right: -80/@rem;
          text-algin: right;
          color: @gray2;
        }
        .reduce, .add {
          position: absolute;
          top: 0;
          right: -50/@rem;
          .wh(50, 50);
        }
        .add {
          position: absolute;
          top: -6/@rem;
          right: -95/@rem;
          i {
            font-size: 50/@rem;
          }
          .wh(50, 50);
        }
      }
    }
  }
  .cart-rel {
    position: relative;
    background: #ffffff;
    padding: 0 20/@rem;
    border-bottom: 1px solid @gray3;
    &:last-child {
      border-bottom: 1px solid #ececec;
    }
    .height(88);
    .cart-pos {
      position: absolute;
      top: 0;
      right: 20/@rem;
      .clearfix();
      .mint-switch {
        float: right;
        margin-top: 20/@rem;
        margin-left: 20/@rem;
      }
    }
  }

  .cart-discounts {}

  .cart-coupon {}

  .cart-points {}

  .cart-empty {
    padding-top: 92/@rem;
    text-align: center;
    .img {
      display: inline-block;
      margin-top: 209/@rem;
      .wh(315, 185);
      background: url('~img/cart/cart_empty.png') no-repeat;
      background-size: 100% auto;
      margin-left: 50/@rem;
      img {
        display: block;
      }
    }
    p {
      margin-top: 80/@rem;
      .height(40);
      font-size: 28/@rem;
      color: @gray2;
    }
    .btn {
      display: inline-block;
      .whl(540, 80);
      margin-top: 45/@rem;
      border: 1px solid @red;
      border-radius: 10/@rem;
      color: @red;
    }
  }
}
</style>
