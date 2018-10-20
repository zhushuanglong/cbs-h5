<template>
  <div class="successful-main">
    <topbar title="Successful Payment" backUrl="my/orderList"></topbar>
    <div class="successful-con">
      <div class="title">
        <i class="iconfont">&#xe602;</i>
        Successful Payment
      </div>
      <p class="f32">Order amount: $888</p>
      <p>Thank you for your order, we will deliver the goods soon</p>
    </div>
    <router-link :to="{path: '/my/orderDetail?orderid=' + $route.query.orderId}" class="btn-order">VIEW THE ORDER</router-link>
    <router-link :to="{path: '/home'}" class="btn-shopping">GO SHOPPING</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
@import '~less/tool.less';
.successful-main {
  padding-top: 92/@rem;
  font-size: 28/@rem;
  .successful-con {
    background-color: #fff;
    border-top: 1px solid @gray3;
    padding: 20/@rem;
    text-align: center;
    padding-bottom: 50/@rem;
    font-weight: bold;
    .title {
      margin-top: 60/@rem;
      margin-bottom: 25/@rem;
      height: 100/@rem;
      font-size: 30/@rem;
      i {
        color: #46C33B;
        font-size: 80/@rem;
        vertical-align: middle;
        margin-right: 10/@rem;
      }
    }
    p {
      .height(45);
    }
    .f32 {
      font-size: 32/@rem;
    }
  }

  .btn-order {
    display: block;
    .whl(710, 88);
    margin: 0 auto;
    background-color: @red;
    border-radius: 8/@rem;
    color: #fff;
    text-align: center;
    margin-top: 43/@rem;
  }
  .btn-shopping {
    display: block;
    .whl(710, 88);
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8/@rem;
    border: 1px solid @red;
    color: @red;
    text-align: center;
    margin-top: 20/@rem;
  }
}
</style>
