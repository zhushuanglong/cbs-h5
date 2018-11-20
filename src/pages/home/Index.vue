<template>
  <div>
    <div class="home-index">
      <div class="top-bar">
        <i class="iconfont search-icon fl" @click="goToSearch">&#xe620;</i>
        <img src="../../images/home/logo.png" class="logo" alt="">
        <i class="share iconfont" @mouseover="showShare" @mouseout="mouseoutShare">&#xe658;</i>
        <i class="currency iconfont fr" @click="() => {this.isShow = true}">&#xe628;</i>
      </div>
      <Banner :list="banners" v-if="banners && banners.length"></Banner>
      <Navs :list="navList" v-if="navList && navList.length"></Navs>
      <div class="belt" v-html="diypage" v-if="diypage">
      </div>
      <div class="home-recommend">
        <p class="home-recommend-title">Recommended</p>
        <ul class="home-recommend-goods clearfix">
          <li class="recommend-goods" v-for="item in recommends">
            <router-link :to="{path: '/detail?id=' + item.id}">
              <img v-lazy="item.img && item.img.ossimg()" class="goods-img" alt="">
              <p class="goods-title">{{item.name}}</p>
              <p class="goods-price">
                <span class="price-now">{{returnFloat(item.price || 0) | price}}</span>
                <span class="rebate" v-show="rebate(item.rebate)">Rebate {{currencySymbol}}{{item.rebate}}</span>
                <!-- <span class="price-rebate">$102</span> -->
              </p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="loading" v-show="recommends.length"><span>{{loadingContent}}</span></div>
      <FloatTop :show="isShowFloatTop"></FloatTop>
    </div>
    <!-- 展示分享弹窗 -->
    <div v-show="isShowShare">
      <div class="share-back"></div>
      <div class="rect"></div>
      <div class="share-wrapper">
        <div class="share-container">
          <div class="share-head">
            <i class="iconfont share-link">&#xe654;</i>
            <p class="share-title">Public sharing</p>
          </div>
          <div class="copy-text">
            <input type="text" class="url-text" placeholder="url" id="url" readonly="readonly">
            <input class="btn-copy" type="button" @click="copyLink" ref="btnCopy" data-clipboard-target="#url" value="Copy">
          </div>
          <p class="share-intro">Inviting links to people who need to know, you will get rebates when they buy</p>
          <p class="share-others-title">Or click the bottons blow to share</p>
          <div class="share-others">
            <!-- <div class="fb others" @click="toFacebook"><span class="share-others-text">share</span><i class="iconfont others-fb">&#xe652;</i></div> -->
            <div class="tw others" @click="toTwitter"><span class="share-others-text">share</span><i class="iconfont others-tw">&#xe656;</i></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShow">
      <div class="back-background" :class="{'actived': isShow}"></div>
      <transition name="right-slide" :duration="1000">
        <div class="showSelect">
          <div class="back" @click="() => {this.isShow = false}"></div>
          <div class="left">
            <header class="head">
              <p class="head-title">My Settings</p>
            </header>
            <div class="content">
              <div class="language">
                <p class="content-title">Site/Language</p>
                <div>
                </div>
              </div>
              <div class="currency">
                <p class="content-title">Currencies</p>
                <div>
                  <p class="content-option" id="selectedCurrency" @click="showSub">{{currencyCode}}<i class="iconfont" id="icon">&#xe62e;</i></p>
                  <ul v-show="isShowSub" id='content-sub'>
                    <li class="content-option" v-for="(item, index) in newList" :key="index" @click="handleCurrency(item)">{{item.currency_code}}</li>
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
  </div>
</template>
<script>
  import Banner from './Banner';
  import Navs from './Navs'
  // import { setTimeout } from 'timers';
  // import { mapState, mapMutations } from 'vuex'
  import FloatTop from 'common/FloatTop';
  import {
    setTimeout
  } from 'timers';
  export default {
    data() {
      return {
        currencyList: [], //货币列表
        languageList: [],
        banners: [],
        recommends: [],
        navList: [],
        diypage: '',
        loadingContent: '', // 加载提示
        isFinishedLoading: false, // 是否完成loading
        params: {
          page: 1
        },
        isShow: false,
        isShowSub: false,
        currencyCode: localStorage.currencyCode,
        currencySymbol: localStorage.currencySymbol,
        symbol: '',
        newList: [],
        isShowShare: false,
        inviteCode: '', //邀请码
        shareUrl: '', //传递的参数
        shortUrl: '' //短链接
      }
    },
    components: {
      Banner,
      Navs,
      FloatTop
    },
    computed: {
      // ...mapState(['currencyCode','currencySymbol'])
    },
    created() {
      this.getCurrency();
    },
    watch: {
      code() {
        this.getHomeData(); //获取页面数据
      }
    },
    mounted() {
      this.getHomeData(); //获取页面数据
      this.getUrl(); //获取页面链接
      this.getShortenUrl(); //获取短链接
      this.loadMore();
      this.btnCopy = new this.clipboard(this.$refs.btnCopy);
    },
    computed: {
      'isShowFloatTop': function() {
        if (this.params.page > 1) {
          return true;
        } else {
          return false
        }
      }
    },
    methods: {
      mouseoutShare() {
        this.isShowShare = false;
      },
      getShortenUrl() {
        let self = this;
        this.request('ShortUrl', {
          url: self.shareUrl
        }).then((res) => {
          if (res.status === 200) {
            this.shortUrl = res.content.shortUrl;
          }else{
            this.shortUrl = self.shareUrl;
          }
        })
      },
      // 获得shareUrl
      getUrl() {
        let Base64 = require('js-base64').Base64;
        var value = window.location.href; //获取当前页面url
        if (!localStorage.userInfo) {
          this.inviteCode = '';
          this.shareUrl = value;
        } else {
          this.inviteCode = JSON.parse(localStorage.userInfo).inviteCode // 邀请码
          let baseURL = Base64.encode(this.inviteCode);
          this.shareUrl = value + '&inviteCode=' + baseURL; //拼接邀请码
        }
      },
      // 发布到facebook
      // toFacebook() {
      //   // let redirectUrl = window.location.href; //分享后要跳转的链接，跳转回当前页面
      //   let shareUrl = this.shortUrl; // 分享的链接
      //   let app_id = '883175368431883';
      //   let url = "https://www.facebook.com/dialog/share?display=popup&" + 'app_id=' + app_id + '&href=' + shareUrl;
      //   window.open(url, '_blank');
      // },
      //发布到twitter
      toTwitter() {
        let shareUrl = this.shortUrl; // 分享的链接
        let title = 'WaiWaiMall'
        let url = "https://twitter.com/share?" + 'text=' + title + '&url=' + shareUrl;
        window.open(url, '_blank');
      },
      // 展示分享弹窗
      showShare() {
        var inputEle = document.getElementById('url')
        inputEle.value = this.shortUrl;
        this.isShowShare = !this.isShowShare;
      },
      // 复制链接
      copyLink() {
        // // 判断有没有登录，没有登录的话，不可以分享
        // if (!localStorage.userToken) {
        //   this.$Toast('please log in!');
        //   let btn = document.getElementsByClassName('btn-copy');
        //   btn.disabled = true;
        //   return;
        // } else {
        //   let self = this;
        //   this.inviteCode = JSON.parse(localStorage.userInfo).inviteCode // 邀请码
        //   this.btnCopy = new this.clipboard(this.$refs.btnCopy);
        //   this.$nextTick(function() {
        //     let clipboard = self.btnCopy;
        //     clipboard.on('success', function() {
        //       self.$Toast('copy finished');
        //     });
        //     clipboard.on('error', function() {
        //       self.$Toast('copy failed, please copy by hand');
        //     })
        //   })
        // }
        //不管有没有登录，都可以分享
        let self = this;
        let clipboard = self.btnCopy;
        clipboard.on('success', function() {
          self.$Toast('copy finished');
        });
        clipboard.on('error', function() {
          self.$Toast('copy failed, please copy by hand');
        })
      },
      rebate(rebatePrice) {
        let value = parseFloat(rebatePrice);
        if (value > 0) {
          return true;
        } else {
          return false;
        }
      },
      // 获取货币列表
      getCurrency() {
        this.request('Currency', {}).then((res) => {
          if (res.status === 200 && res.content) {
            this.currencyList = res.content.currency;
          }
        })
      },
      // 展示这个弹窗，有右滑的动画效果
      // 隐藏这个弹出的面板
      hiddeSelect() {
        localStorage.currencyCode = this.currencyCode;
        localStorage.currencySymbol = this.currencySymbol;
        this.isShow = false;
        this.params.page = 1;
        this.getHomeData();
      },
      // 获取页面除推荐列表外的数据
      getHomeData() {
        this.loadingContent = 'Loading...';
        this.isFinishedLoading = false;
        this.loadingEmpty = false;
        if (this.params.page === 1) {
          this.recommends = [];
        }
        this.request('Home', this.params).then((res) => {
          if (res.status === 200 && res.content) {
            if (this.params.page === 1) {
              this.navList = res.content.icons;
              this.banners = res.content.banners;
              this.diypage = res.content.diypage;
            }
            this.recommends = this.recommends.concat(res.content.goods);
            if (this.params.page < res.content.total_page) {
              this.loadingEmpty = false;
            } else {
              this.loadingContent = 'No More';
              this.loadingEmpty = true;
            }
            this.isFinishedLoading = true;
          }
        }, err => {
          this.$Toast(err);
        });
      },
      // 展示下拉列表
      showSub() {
        this.isShowSub = true;
        this.newList = []
        this.currencyList.forEach((item, index) => {
          if (item.currency_code != this.currencyCode) {
            this.newList.push(item);
          }
        })
        var arrowEle = document.getElementById("icon");
        arrowEle.classList.add('icon-trans');
      },
      // 获取数据
      handleCurrency(item) {
        this.code = item.currency_code;
        this.isShowSub = false;
        this.currencyCode = item.currency_code;
        this.currencySymbol = item.currency_symbol;
        var arrowEle = document.getElementById("icon");
        var subEle = document.getElementById("content-sub");
      },
      // 去搜索
      goToSearch() {
        this.$router.push({
          name: 'search'
        })
      },
      // 加载更多
      loadMore() {
        let self = this;
        window.onscroll = function() {
          var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
          var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
          var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
          if (a + b >= c - 200 && self.isFinishedLoading && !self.loadingEmpty) {
            self.params.page = self.params.page + 1
            self.getHomeData();
          }
        }
      },
    }
  }
</script>
<style lang="less">
  @import '~less/tool.less'; // 分享链接
  .rebate {
    height: 32/@rem;
    background: @orange;
    color: #fff;
    padding: 5/@rem 10/@rem;
    border-radius: 3/@rem;
  }
  .share-back {
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 88/@rem;
    left: 0;
  }
  .rect {
    border-bottom: 15/@rem solid #fff;
    border-top: 15/@rem solid transparent;
    border-left: 15/@rem solid transparent;
    border-right: 15/@rem solid transparent;
    position: absolute;
    right: 100/@rem;
    top: 65/@rem;
    z-index: 999;
  }
  .share-wrapper {
    z-index: 999;
    position: absolute;
    top: 95/@rem;
    right: 62/@rem;
    width: 500/@rem;
    height: 298/@rem;
    font-size: 25/@rem;
    padding: 0!important;
    text-align: left;
    background: #fff;
    line-height: 25/@rem;
    border-radius: 5/@rem;
    .share-wrapper>div,
    p {
      margin: 0;
      padding: 0;
    }
    .share-container {
      padding: 15/@rem 0;
      .share-head {
        display: flex;
        padding-left: 20/@rem;
        .share-link {
          display: inline-block;
          width: 38/@rem;
          height: 38/@rem;
          text-align: center;
          color: #fff;
          background: @orange;
          font-size: 18/@rem;
          padding: 8/@rem 2/@rem 8/@rem 0/@rem;
          border-radius: 19/@rem;
          margin-top: 5/@rem;
        }
        .share-title {
          padding-top: 10/@rem;
          margin-left: 10/@rem;
          font-weight: bold;
          text-align: center;
        }
      }
      .copy-text {
        border: 1px solid #EFEFEF;
        width: 90%;
        height: 53/@rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 6/@rem;
        margin-left: 20/@rem;
        margin-top: 12/@rem;
        .url-text {
          width: 180px;
        }
        .btn-copy {
          border: 1px solid #EFEFEF;
          height: 100%;
          width: 86/@rem;
          background: #FDFDFD;
          padding: 10/@rem 16/@rem;
          font-weight: bold;
        }
      }
      .share-intro {
        margin-top: 12/@rem;
        color: #BCBCBC;
        padding: 0 20/@rem;
      }
      .share-others-title {
        font-size: 25/@rem;
        margin-top: 25/@rem;
        padding: 0 20/@rem;
        white-space: nowrap;
        font-weight: bold;
      }
      .share-others {
        border: 1px solid;
        display: flex;
        color: #fff;
        margin-top: 6/@rem;
        padding-left: 20/@rem;
        .others {
          width: 126/@rem;
          padding: 8/@rem 0;
          text-align: right;
          border-radius: 6/@rem;
        }
        .fb {
          background: #4E6CAA;
          .share-others-text {
            margin-right: 12/@rem;
          }
          .others-fb {
            font-size: 24/@rem;
            padding: 8/@rem 10/@rem;
            background: #3B5999;
            border-radius: 6/@rem;
          }
        }
        .tw {
          background: #61BBF7;
          margin-left: 22/@rem;
          .share-others-text {
            margin-right: 12/@rem;
          }
          .others-tw {
            font-size: 24/@rem;
            padding: 8/@rem 10/@rem;
            background: #38A1F3;
            border-radius: 6/@rem;
          }
        }
      }
    }
  }
  .back-background {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    z-index: -99;
  }
  .actived {
    z-index: 999;
  }
  .showSelect {
    height: 800px;
    ;
    width: 100%;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    .back {
      width: 146/@rem;
      height: 100%;
      position: absolute;
    }
    .left {
      width: 100%;
      height: 100%;
      margin-left: 146/@rem;
      background: #F1F3F2;
      .head {
        position: relative;
        height: 88/@rem; // border: 1px solid black;
        background: #fff;
        .head-title {
          position: absolute;
          left: 32/@rem;
          bottom: 27/@rem;
          font-size: 32/@rem;
        }
      }
      .content {
        .content-title {
          font-size: 32/@rem;
          padding: 40/@rem 0 12/@rem 32/@rem;
        }
        #selectedCurrency {
          border: 1px solid #979797;
          width: 536/@rem;
          height: 100/@rem;
          margin-left: 32/@rem;
          background: #fff;
          font-size: 32/@rem;
          position: relative;
          padding: 23/@rem 36/@rem;
        }
        .content-option {
          border: 1px solid #979797;
          border-top: none;
          width: 536/@rem;
          height: 100/@rem;
          margin-left: 32/@rem;
          background: #fff;
          font-size: 32/@rem;
          position: relative;
          padding: 23/@rem 36/@rem;
          &:hover {
            background: #ccc;
          }
          .iconfont {
            position: absolute;
            right: 26/@rem;
          }
          .icon-trans {
            position: absolute;
            right: 26/@rem;
            transform: rotate(90deg);
            transition: all .3s;
          }
        }
        .btn-wrapper {
          margin-top: 40/@rem;
          margin-left: 30/@rem;
          width: 544/@rem;
          height: 78/@rem;
          text-align: center;
          vertical-align: middle;
          background: #444;
          .btn {
            font-size: 32/@rem;
            line-height: 32/@rem;
            padding: 23/@rem 0;
            color: #fff;
          }
        }
      }
    }
  }
  .home-index {
    margin-bottom: 100/@rem;
    .top-bar {
      height: 88/@rem;
      padding: 0 20/@rem;
      background-color: #fff;
      line-height: 88/@rem;
      text-align: center;
      background-color: #fff;
      position: relative;
      .search-icon {
        font-size: 40/@rem;
      }
      .share {
        position: absolute;
        right: 80/@rem;
        top: 0;
        padding: 0 5/@rem;
      }
      .logo {
        width: 268/@rem;
        height: 50/@rem;
        margin-top: 19/@rem;
      }
    }
    .belt {
      margin-top: 20/@rem;
    }
    .home-recommend {
      margin-top: 20/@rem;
      background-color: #fff;
      .home-recommend-title {
        height: 146/@rem;
        font-size: 36/@rem;
        color: #333;
        line-height: 146/@rem;
        text-align: center;
      }
      .recommend-goods {
        height: 515/@rem;
        float: left;
        margin-right: 20/@rem;
        &:nth-child(even) {
          margin-right: 0;
        }
        .goods-img {
          width: 365/@rem;
          height: 365/@rem;
          display: block;
        }
        .goods-title {
          margin: 0 auto;
          width: 310/@rem;
          font-weight: bold;
          font-size: 24/@rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 30/@rem;
        }
        .goods-price {
          text-align: center;
          margin-top: 20/@rem;
        }
        .price-now {
          color: #FF473C;
          font-size: 28/@rem;
          margin-right: 5/@rem;
        }
        .price-origin {
          color: #DDDCDC;
          font-size: 20/@rem;
          vertical-align: text-bottom;
          text-decoration: line-through;
        }
        .price-rebate {
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


