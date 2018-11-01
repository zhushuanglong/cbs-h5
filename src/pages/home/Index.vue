<template>
  <div class="home-index">
    <div class="top-bar">
      <i class="iconfont search-icon fl" @click="goToSearch">&#xe620;</i>
      <img src="../../images/home/logo.png" class="logo" alt="">
      <i class="share iconfont fr">&#xe628;</i>
    </div>
    <Banner :list="banners" v-if="banners && banners.length"></Banner>
    <Navs :list="navList"  v-if="navList && navList.length"></Navs>
    <div class="belt" v-html="diypage" v-if="diypage">
    </div>
    <div class="home-recommend">
      <p class="home-recommend-title">Recommended</p>
      <ul class="home-recommend-goods clearfix">
        <li class="recommend-goods" v-for="item in recommends" >
          <router-link :to="{path: '/detail?id=' + item.id}">
            <img v-lazy="item.img && item.img.ossimg()" class="goods-img" alt="">
            <p class="goods-title">{{item.name}}</p>
            <p class="goods-price">
              <span class="price-now">${{item.price}}</span>
              <!-- <span class="price-origin">$102</span> -->
              <!-- <span class="price-rebate">$102</span> -->
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="loading" v-show="recommends.length"><span>{{loadingContent}}</span></div>
  </div>
</template>
<script>
import Banner from './Banner';
import Navs from './Navs'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      navList: [],
      diypage:'',
      loadingContent:'', // 加载提示
      isFinishedLoading: false, // 是否完成loading
      requestParams: {
        page: 1
      }
    }
  },
  components: {
    Banner,
    Navs
  },
  mounted() {
    this.getHomeData();//获取页面数据
    this.getRecommend(this.requestParams);//获取推荐数据
    this.loadMore();
  },
  methods: {
    // 获取页面除推荐列表外的数据
    getHomeData () {
      this.request('Home', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.navList = res.content.icons;
          this.banners = res.content.banners;
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 获取推荐列表的数据
    getRecommend(params) {
      this.loadingContent = 'loading...'
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
       if (params.page === 1) {
         this.recommends = []
       }

      this.request('Home', {
        page: params.page
      }).then((res)=>{
        if (res.status === 200 && res.content) {
          this.loadingContent = '';
          // 滚动加载
          if(params.page < res.content.total_page) {
            this.loadingEmpty = false;
          }else{
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
          }
          this.recommends = this.recommends.concat(res.content.goods)
        }else{
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
        }
        this.isFinishedLoading = true
      },err => {
        this.$Toast(err)
        this.isFinishedLoading = true;
      })
    },
    // 上拉刷新
    loadMore() {
      let self = this;
      window.onscroll = function() {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >=  c - 220  && self.isFinishedLoading && !self.loadingEmpty) {
          let page = self.requestParams.page + 1;
          Object.assign(self.requestParams, {
            page: page
          })
          // console.log("page",page)
          self.getRecommend(self.requestParams);
        }
      }
    },
    // 去搜索
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
.home-index{
  margin-bottom: 100/@rem;
  .top-bar{
    height: 88/@rem;
    padding: 0 20/@rem;
    background-color: #fff;
    line-height: 88/@rem;
    text-align: center;
    background-color: #fff;
    .search-icon{
      font-size: 40/@rem;
    }
    .logo{
      width: 268/@rem;
      height: 50/@rem;
      margin-top: 19/@rem;
    }
  }
  .belt{
    margin-top: 20/@rem;
  }
  .home-recommend{
    margin-top: 20/@rem;
    background-color: #fff;
    .home-recommend-title{
      height: 146/@rem;
      font-size: 36/@rem;
      color: #000000;
      line-height: 146/@rem;
      text-align: center;
    }
    .recommend-goods{
      height: 515/@rem;
      float: left;
      margin-right: 20/@rem;
      &:nth-child(even) {
        margin-right: 0;
      }
      .goods-img{
        width: 365/@rem;
        height: 365/@rem;
        display: block;
      }
      .goods-title{
        margin: 0 auto;
        width: 310/@rem;
        font-weight: bold;
        font-size: 24/@rem;
        color: #000;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 30/@rem;
      }
      .goods-price {
        text-align: center;
        margin-top: 20/@rem;
      }
      .price-now{
        color: #FF473C;
        font-size: 28/@rem;
        margin-right: 5/@rem;
      }
      .price-origin{
        color: #DDDCDC;
        font-size: 20/@rem;
        vertical-align: text-bottom;
        text-decoration: line-through;
      }
      .price-rebate{
        background-color: #FF473C;
        height: 32/@rem;
        line-height: 40/@rem;
        color: #fff;
        padding: 0 10/@rem;
        margin-left: 20/@rem;
      }
    }
  }
  .loading {
   .height(80);
    text-align: center;
  }
}
</style>


