<template>
  <div>
    <topbar title="Order Details" backUrl="orderDetail"></topbar>
    <div class="order-detail">
      <div class="page-title">
        Order cancelled
      </div>
      <div class="address">
        <i class="iconfont address-icon">&#xe624;</i>
        <p class="user"><span class="name">CoCo</span><span>188****6729</span></p>
        <p class="adddress-detail">Ship to：1978 Stuart Street, Blairsville, PA, United States</p>
      </div>
      <order v-for="item in orders" :data="item" :operate="false"></order>
      <div>
        <p class="o-price"><span class="fl">Subtotal:</span><span class="fr">$599.00</span></p>
        <p class="o-price"><span class="fl">Shipping：Free</span><span class="fr">$ 0.00</span></p>
        <p class="o-price total"><span class="fl">All Total：</span><span class="fr">$599.00</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import order from './Order'
export default {
  components: { order },
  data() {
    return {
      orders: [],
      orderStatus: 0
    }
  },
  mounted() {
    this.orderStatus = this.$router.query.order_status;
    this.getOrderDetail();
  },
  computed: {
    'orderDesc': function() {
      let desc = '';
      return {

      }
    }
  },
  methods: {
    getOrderDetail() {
      this.$http.post('/order/orderDetail').then((res) => {
        res = res.data;
        if(res.status === 200 && res.data) {
          this.orders = res.data.orders;
        }
      }, err => {
      }).catch((err) => {
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.order-detail{
  margin-top: 100/@rem;
  .page-title{
    color: #fff;
    height: 128/@rem;
    line-height: 128/@rem;
    background-color: #FC5866;
    font-size: 36/@rem;
    text-align: left;
    padding-left: 50/@rem;
  }
  .o-price{
    width: 100%;
    height: 48/@rem;
    color: #939399;
    font-size: 24/@rem;
    line-height: 48/@rem;
    padding: 0 20/@rem;
    span{
      display: block;
    }
  }
  .total{
    span:nth-child(1){
      color: #050505;
    }
    span:nth-child(2){
      color: #FF473C;
    }
  }
  .address{
    position: relative;
    height: 117/@rem;
    padding: 0 20/@rem;
    padding-left: 60/@rem;
    box-shadow:0px 1px 0px 0px rgba(221,220,220,1);
    padding-top: 27/@rem;
    .address-icon{
      position: absolute;
      top: 43/@rem;
      left: 20/@rem;
      color: #939399;
      font-size: 33/@rem;
    }
    .user{
      color: #131313;
      font-size: 28/@rem;
      span{
        display: inline-block
      }
      .name{
        margin-right: 30/@rem; 
      }
    }
    .adddress-detail{
      margin-top: 6/@rem;
    }
  }
}
</style>

