<template>
<div>
  <div class="home-index">
    <div class="top-bar">
      <i class="iconfont search-icon fl" @click="goToSearch">&#xe620;</i>
      <img src="../../images/home/logo.png" class="logo" alt="">    
      <i class="share iconfont fr" @click="showCurrency">&#xe628;</i>
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
              <span class="price-now">{{symbol}}{{item.price}}</span>
              <!-- <span class="price-origin">$102</span> -->
              <!-- <span class="price-rebate">$102</span> -->
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="loading" v-show="recommends.length"><span>{{loadingContent}}</span></div>
  </div>
    <div class="back-background"></div>
    <transition name="right-slide" :duration="1000">
    <div class="showSelect" v-show="isShow">
         <div class="back"  @click="hiddeSelect"></div>
          <div class="left">
        <header class="head">
            <p class="head-title">My Settings</p>
        </header>
        <div class="content">
            <div class="language">
                <p class="content-title">Site/Language</p>
                <div >
                  
                </div>
            </div>
            <div class="currency">
                <p class="content-title">Currencies</p>
                <div>
                   <!-- <select id="currency-select" class="content-select" name="currency">
                    <option disabled value="" class="content-option">please select</option>
                    <option class="content-option"
                    v-for="(item, index) in currencyList" :value="item.flag"
                    :key="index">{{item.currency_code}}
                    </option>
                   </select> -->
                  <p class="content-option" id="selectedCurrency" @click="showSub">{{code}}</p>
                   <ul v-show="isShowSub">
                     <li class="content-option"
                    v-for="(item, index) in currencyList" :key="index"
                    @click="handleCurrency(item)">{{item.currency_code}}</li>
                   </ul>
                </div>
            </div>
        
        <div class="btn-wrapper" @click="hiddeSelect">
            <p class="btn">SAVE</p>
        </div>
        </div>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
import Banner from './Banner';
import Navs from './Navs'
import { setTimeout } from 'timers';
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      currencyList: [],//货币列表
      languageList: [
        {language:'english'},
        {language:'chinese'},
        {language:'french'}
      ],
      banners: [],
      recommends: [],
      navList: [],
      diypage:'',
      loadingContent:'', // 加载提示
      isFinishedLoading: false, // 是否完成loading
      requestParams: {
        page: 1,
        currency_code: 'USD'
      },
      isShow: false,
      isShowSub: false,
      code:'USD',
      symbol: ''
    }
  },
  components: {
    Banner,
    Navs
  },
  computed: {
    ...mapState(['currencyCode','currencySymbol'])
  },
  created(){
    this.getCurrency();
  },
  watch: {
    code() {
      this.getHomeData();//获取页面数据
      this.getRecommend(this.requestParams);//获取推荐数据
    }
  },
  mounted() {
    this.getHomeData();//获取页面数据
    this.getRecommend(this.requestParams);//获取推荐数据
    this.loadMore();
  },
  methods: {
    ...mapMutations(['changeCurrency']),
    // 获取货币列表
    getCurrency(){
      this.request('Currency',{}).then((res)=>{
        if (res.status === 200 && res.content) {
          this.currencyList = res.content.currency;
          // console.log("list",this.currencyList)
          var showItem = document.get
        }
      })
    },
    // 展示这个弹窗，有右滑的动画效果
    showCurrency(){
      this.isShow = true;
      var back = document.getElementsByClassName("back-background")[0];
      back.classList.add("actived");

    },
    // 隐藏这个弹出的面板
    hiddeSelect(){
      this.isShow = false;
      var back = document.getElementsByClassName("back-background")[0];
      back.classList.remove("actived")
    },
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
    // 展示下拉列表
    showSub(){
      this.isShowSub = true;
    },
    // 获取数据
    handleCurrency(item){
      this.code = item.currency_code;
      // console.log("code",this.code)
      this.isShowSub = false;
      var currencyCode = item.currency_code;
      // console.log("lc",currencyCode)
      var currencySymbol = item.currency_symbol;
      this.changeCurrency(currencyCode,currencySymbol);

    },
    // 获取推荐列表的数据
    getRecommend(params) {
      this.loadingContent = 'loading...'
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
       if (params.page === 1) {
         this.recommends = []
       }
       console.log("this.cure",this.currencyCode)
       let requestCode = this.currencyCode
        console.log("this.request",requestCode)
        this.code = requestCode;
      // this.code = this.currencyCode;
      this.request('Home', {
        page: params.page,
        currency_code: requestCode
      }).then((res)=>{
        if (res.status === 200 && res.content) {
          this.loadingContent = '';
          this.symbol = res.content.currency_symbol;
          console.log("symbol",this.symbol)
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
.back-background{
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  width: 100%;
  z-index: -99;
}
.actived{
  z-index: 999;
}
.showSelect{
      height: 800px;;
      width: 100%;
      z-index: 1000;
      position: absolute;
      left:0;
      top:0;
        .back {
          width: 146/@rem;
          height: 100%;
          position: absolute;
         
        }
        .left{
          width: 100%;
          height: 100%;
          margin-left: 146/@rem;
          background: #F1F3F2;
        .head{
          position: relative;
          height: 88/@rem;
          // border: 1px solid black;
          background: #fff;
          .head-title{
            position: absolute;
            left: 32/@rem;
            bottom: 27/@rem;
            font-size: 32/@rem;
          }
      }
      .content{
  
        .content-title{
          font-size: 32/@rem;
          padding: 40/@rem 0 12/@rem 32/@rem;
        }
        #selectedCurrency{
          border: 1px solid #979797;
          width: 536/@rem;
          height: 100/@rem;
          margin-left: 32/@rem;
          background: #fff;
          font-size: 32/@rem;
          position: relative;
          text-align: center;
          padding: 23/@rem 0;
        }
        .content-option{
          border: 1px solid #979797;
          width: 536/@rem;
          height: 100/@rem;
          margin-left: 32/@rem;
          background: #fff;
          font-size: 32/@rem;
          position: relative;
          text-align: center;
          padding: 23/@rem 0;
          &:hover{
            background: #ccc;
          }
        }
        
        .btn-wrapper{
          margin-top: 40/@rem;
          margin-left: 30/@rem;
          width: 544/@rem;
          height: 78/@rem;
          text-align: center;
          vertical-align: middle;
          background: #444;
          .btn{
            font-size: 32/@rem; 
            line-height: 32/@rem;
            padding: 23/@rem 0;         
            color:#fff;
          }
        }
      }
    }

}
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
.right-slide-enter,
.right-slide-leave-active {
  // transform: translate(-146/@rem);
  transform: translate(100%);
}
.right-slide-leave-active,
.right-slide-enter-active {
  transition: all .3s;
}
</style>


