<template>
  <div class="c-order">
    <topbar title="Orders List" backUrl="my" class="orderlist"></topbar>
    <ul class="order-tabs">
      <li v-for="item in tabs" :key="item.type" @click="tabClick(item)">
        <a href="javascript:;" :class="{'active': item.active}">{{item.name}}</a>
      </li>
    </ul>
    <div class="order-list">
      <order :handle-cb="getOrderList" v-for="(item, index) in orders" :data="item" :key="index" v-if="orders.length"></order>
      <pageempty icon="&#xe637;" :margin-top="200" desc="You have no related orders yet!" v-if="orders.length === 0" ></pageempty>
    </div>
    <div class="loading" v-show="orders.length"><span>{{loadingContent}}</span></div>

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
          type: 4
        },
        {
          name: 'All',
          active: true,
          type: 0
        }
      ],
      orders: [],
      params: {
        type: '',
        page: 1
      },
      loadingContent: '',
      isFinishedLoading: false      
    }
  },
  mounted() {
    this.getOrderList(this.params);
    this.loadMore();
  },
  components: { order },
  methods: {
    tabClick(item) {
      this.tabs.forEach(element => {
        element.active = false;
      });
      item.active = true;
      this.params.type = item.type;
      this.params.page = 1;
      this.getOrderList(this.params);
    },
    getOrderList(params) {
      this.loadingContent = 'loading'
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (params.page === 1) {
         this.orders = []
       }
      // console.log("page",params.page)
     
      this.request('OrdersList', this.params).then((res) => {
        if(res.status === 200 && res.content) {
          this.loadingContent = '';  
          // 滚动加载
          // console.log("res.content.total_page",res.content.total_page)
          if (params.page < res.content.total_page){
            this.loadingEmpty = false;
          }else {
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
          }
          //  console.log("this.orders.len",this.orders)
          this.orders = this.orders.concat(res.content.orderData);
        } else {
          this.loadingContent = 'No More';
          this.loadingEmpty = true;
        }
        this.isFinishedLoading = true
      }, err => {
        this.$Toast(err.data.msg);
        this.isFinishedLoading = true;
      })
    },
    loadMore() {
      let self = this;
      window.onscroll = function() {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >=  c - 200  && self.isFinishedLoading && !self.loadingEmpty) {   
           let page = self.params.page + 1;
           Object.assign(self.params, {
            page: page
          })
          self.getOrderList(self.params);
        }
      }
    }
  }
}
</script>

<style lang="less">
@import "~less/tool.less";
.c-order{
  padding-top: 90/@rem;
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
  .loading {
   .height(80);
    text-align: center;
  }
}
</style>

