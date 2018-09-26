<template>
  <div style="background-color:  #F6F7F6">
    <topbar :title="pageTitle" backUrl="my"></topbar>
    <div class="my-income">
      <div class="title">Detail</div>
      <ul class="income-list">
        <li v-for="item in incomes" class="income">
          <img :src="item.avator" alt="" class="avator">
          <div class="content fl">
            <p class="name ">{{item.name}}</p>
            <p class="detail ">{{item.detail}}</p>
            <p class="time ">{{item.time}}</p>
          </div>
          <div class="price fr">{{item.price > 0 ? '+ $' + item.price : '- $' + item.price}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      incomes: [{
        avator: 'http://www.qqzhi.com/uploadpic/2014-10-14/112402345.jpg',
        name: 'Shopping Reward',
        detail: 'You have placed an order for $123',
        time: '2017-01-01 11:07:49',
        price: '40'
      }]
    }
  },
  mounted() {
    
  },
  computed: {
    pageTitle: function() {
      if(+this.$route.query.type === 1) {
        return 'Accumulated Income'
      } else {
        return 'Wait for an account'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.my-income {
  background-color: #fff;
  margin-top: 110/@rem;
  padding: 0 20/@rem;
  .title{
    height:92/@rem;
    line-height: 92/@rem;
    background:rgba(254,254,254,1);
    box-shadow:1px 0px 0px rgba(240,240,243,1);
  }
  .income{
    box-sizing: border-box;
    height: 150/@rem;
    padding: 24/@rem 0/@rem;
  }
  .avator{
    width: 100/@rem;
    height: 100/@rem;
    border-radius: 50%;
    float: left;
  }
  .content{
    margin-left: 10/@rem;
  }
  .name{
    color: #302F2F;
    font-size: 28/@rem;
  }
  .detail{
    color: #939399;
    font-size: 22/@rem;
    margin: 10/@rem 0 15/@rem;
  }
  .time{
    color: #939399;
    font-size: 22/@rem;
  }
  .price{
    color: #FF0000;
    font-size: 28/@rem;
    line-height: 100/@rem;
    font-weight: 400
  }

}
</style>


