<template>
  <div class="add-card-main">
    <topbar :title="'Add a credit/debit card'" :backUrl="'cart/secureCheckout'"></topbar>
    <div class="card-con">
      <div class="card-img"><div class="img"></div></div>
      <div class="card-num">
        <p>CARD NUMBER</p>
        <p class="gray2 mt">0000 0000 0000</p>
      </div>
      <div class="card-info">
        <div class="fl br">
          <p class="p1">EXPIRE</p>
          <p class="p2"></p>
        </div>
        <div class="fl pl">
          <p class="p1">CVV</p>
          <p class="gray2 p2">000</p>
        </div>
      </div>
      <div class="card-remeber">
        <p>Remember this card for future use</p>
        <mt-switch v-model="isSetDefault"></mt-switch>
      </div>
    </div>

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
        </router-link>
      </div>
    </div>
    <div class="global-fixed-btn">
      <div class="fixed-btn">PURCHASE</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSetDefault: false
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
.add-card-main {
  font-size: 28/@rem;
  padding-top: 92/@rem;
  padding-bottom: 98/@rem;
  .card-con {
    width: 100%;
    padding: 20/@rem;
    height: 458/@rem;
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
}
</style>
