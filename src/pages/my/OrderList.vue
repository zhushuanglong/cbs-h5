<template>
  <div class="c-order">
    <topbar title="Orders List" backUrl="my"></topbar>
    <ul class="order-tabs">
      <li v-for="item in tabs" :key="item.type" @click="tabClick(item)">
        <a href="javascript:;" :class="{'active': item.active}">{{item.name}}</a>
      </li>
    </ul>
    <div class="order-list">
      <order v-for="item in orders" :data="item" :key="item.orderid"></order>
    </div>
  </div>
</template>
<script>
import order from './Order'
export default {
  data() {
    return {
      tabs: [
        {
          name: 'Unpaid',
          active: false,
          type: 1
        },
        {
          name: 'Shipping',
          active: false,
          type: 2
        },
        {
          name: 'All',
          active: true,
          type: 3
        }
      ],
      orders: [],
      params: {
        type: ''
      }
    }
  },
  mounted() {
    this.getOrderList();
  },
  components: { order },
  methods: {
    tabClick(item) {
      this.tabs.forEach(element => {
        element.active = false;
      });
      item.active = true;
      this.params.type = item.type;
      this.getOrderList();
    },
    getOrderList() {
      this.$http.post('/order/orderList').then((res) => {
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
.c-order{
  padding-top: 100/@rem;
  .order-tabs{
    padding: 0 5/@rem;
    height: 88/@rem;
    background:rgba(255,255,255,1);
    border: 1px solid rgba(240,240,243,1);
    li{
      width: 33%;
      height: 100%;
      float: left;
      text-align: center;
      font-size: 30/@rem;
      color: #131313;
      line-height: 88/@rem;
      .active{
        display: inline-block;
        padding: 0 15/@rem;
        color: #FF473C;
        height: 100%;
        border-bottom: 4/@rem solid #FF473C;
      }
    }
  }
}
</style>

