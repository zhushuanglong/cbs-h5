<template>
  <div class="global-topbar">
    <div class="global-center">
      <template v-if="close">
        <a class="back" href="javascript:;" @click="pageBack"><i class="iconfont">&#xe63f;</i></a>
      </template>
      <template v-else>
        <router-link class="back" v-if="backUrl" :to="{path: '/' + backUrl}">
          <i class="iconfont">&#xe62f;</i>
        </router-link>
        <a class="back" href="javascript:;" v-else @click="pageBack"><i class="iconfont" id="icon-back">&#xe62f;</i></a>
      </template>
      <div class="title">{{title}}</div>
      <i class="share iconfont" @click="showShare" v-show="showIcon">&#xe658;</i>

      <router-link :to="{path: '/cart?id=' + detailId}" v-if="$route.name === 'detail'">
        <i class="iconfont cart">&#xe624;</i>
        <div class="cart-number" v-if="cartNumber">{{cartNumber}}</div>
      </router-link>
    </div>
    <!-- 展示分享弹窗 -->
    <div  v-show="isShowShare">
      <div class="rect"></div>
      <div class="share-wrapper">
        <div class="share-container">
          <div class="share-head">
            <i class="iconfont share-link">&#xe654;</i>
              <p class="share-title">Public sharing</p>
          </div>
          <div class="copy-text">
            <input type="text" class="url-text" placeholder="url" id="url">
            <div class="btn-copy" @click="copyLink" ref="btnCopy" data-clipboard-target="#url">Copy</div>
          </div>
          <p class="share-intro">Inviting links to people who need to know, you will get rebates when they buy</p>
          <p class="share-others-title">Or clivk the bottons blow to share</p>
          <div class="share-others">
            <div class="fb others"><span class="share-others-text">share</span><i class="iconfont others-fb">&#xe652;</i></div>
            <div class="tw others"><span class="share-others-text">share</span><i class="iconfont others-tw">&#xe656;</i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 数据
      title: {
        type: String,
        default: ''
      },
      // back url
      backUrl: {
        type: String,
        default: ''
      },
      // detail id
      detailId: {
        type: String,
        default: ''
      },
      close: {
        type: Boolean,
        default: false
      },
      urlValue: ''
    },
    data() {
      return {
        isShowShare: false,
        showIcon: false,
        cartNumber: 0, // 购物车数量
        inviteCode: '' //邀请码
      }
    },
    watch: {},
    mounted() {
      // 详情页
      if (this.$route.name === 'detail') {
        this.getCartData();
      }

      this.btnCopy = new this.clipboard(this.$refs.btnCopy);
      // 是否展示分享图标
      // console.log(this.title != "Product Details")
      if (this.title === "Product Details") {
        this.showIcon = true;
      }else{
        this.showIcon = false;
      }
    },
    methods: {
      pageBack() {
        this.$router.go(-1);
      },
      // 购物车数量
      // 获取购物车数据
      getCartData() {
        this.request('Carts', {}).then((res) => {
          if (res.status === 200 && res.content && res.content.goods && res.content.goods.length) {
            this.cartNumber = res.content.goods.length;
            localStorage.yym_cartNumber = this.cartNumber;
          } else {
            this.cartNumber = 0;
            localStorage.yym_cartNumber = 0;
          }
        }, err => {});
      },
      // 点击展示分享弹窗
      showShare() {
        let Base64 = require('js-base64').Base64;
        var value = this.urlValue //获取当前页面url
        var inputEle = document.getElementById('url')
        if (!localStorage.userToken) {
          inputEle.value = value;
        } else {
          this.inviteCode = JSON.parse(localStorage.userInfo).inviteCode // 邀请码
          let baseURL = Base64.encode(this.inviteCode);
          let url = value + '%inviteCode=' + baseURL; //拼接邀请码
          inputEle.value = url;
        }
        this.isShowShare = !this.isShowShare;
        this.$emit('showBack', this.isShowShare);
      },
      // 复制链接
      copyLink() {
        // 判断有没有登录，没有登录的话，不可以分享
        if (!localStorage.userToken) {
          this.$Toast('please log in!');
          let btn = document.getElementsByClassName('btn-copy');
          btn.disabled = true;
          return;
        } else {
          let self = this;
          this.inviteCode = JSON.parse(localStorage.userInfo).inviteCode // 邀请码
          this.btnCopy = new this.clipboard(this.$refs.btnCopy);
          this.$nextTick(function() {
            let clipboard = self.btnCopy;
            clipboard.on('success', function() {
              self.$Toast('copy finished');
            });
            clipboard.on('error', function() {
              self.$Toast('copy failed, please copy by hand');
            })
          })
        }
      },
    }
  };
</script>
<style lang="less" scoped>
  @import '~less/tool.less';
  .global-topbar {
    .share {
      font-size: 48/@rem;
      color: #000;
      position: absolute;
      right: 95/@rem;
      top: 20/@rem;
      padding: 0 5/@rem;
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
      font-size: 12/@rem;
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
          .share-link {
            display: inline-block;
            width: 38/@rem;
            height: 38/@rem;
            text-align: center;
            color: #fff;
            background: @orange;
            font-size: 12/@rem;
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
          }
        }
        .share-intro {
          margin-top: 12/@rem;
        }
        .share-others-title {
          font-size: 10/@rem;
          margin-top: 18/@rem;
          white-space: nowrap;
          font-weight: bold;
        }
        .share-others {
          border: 1px solid;
          display: flex;
          color: #fff;
          margin-top: 6/@rem;
          .others {
            width: 126/@rem;
            padding: 8/@rem 0;
            text-align: right;
            border-radius: 6/@rem;
          }
          .fb {
            background: #4E6CAA;
            .share-others-text {
              margin-right: 12@rem;
            }
            .others-fb {
              font-size: 12/@rem;
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
              font-size: 12/@rem;
              padding: 8/@rem 10/@rem;
              background: #38A1F3;
              border-radius: 6/@rem;
            }
          }
        }
      }
    }

    .cart-number {
      position: absolute;
      z-index: 96;
      right: 7/@rem;
      top: 10/@rem;
      .whl(32, 32);
      border-radius: 50%;
      background-color: @orange;
      color: #fff;
      font-size: 12/@rem;
      text-align: center;
      transform: scale(.7);
    }
  }
</style>

