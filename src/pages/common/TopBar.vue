<template>
  <div class="global-topbar">
    <div class="global-center">
      <template v-if="close">
                <a class="back" href="javascript:;" @click="pageBack"><i class="iconfont">&#xe63f;</i></a>
</template>
<template v-else>
  <router-link class="back" v-if="backUrl" :to="{path: '/' + backUrl}">
    <i class="iconfont">&#xe62f;</i></router-link>
  <a class="back" href="javascript:;" v-else @click="pageBack"><i class="iconfont" id="icon-back">&#xe62f;</i></a>
</template>
      <div class="title">{{title}}</div>
      <i class="share iconfont" v-show="showIcon" @mouseover="showShare" @mouseout="()=>{this.isShowShare = false}">&#xe658;</i>

      <router-link :to="{path: '/cart?id=' + detailId}" v-if="$route.name === 'detail'">
        <i class="iconfont cart">&#xe624;</i>
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
          <p class="share-others-title">Or click the bottons blow to share</p>
          <div class="share-others">
            <div class="fb others" @click="toFacebook"><span class="share-others-text">share</span><i class="iconfont others-fb">&#xe652;</i></div>
            <div class="tw others" @click="toTwitter"><span class="share-others-text">share</span><i class="iconfont others-tw">&#xe656;</i></div>
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
    },
    data() {
      return {
        isShowShare: false,
        showIcon: false,
        inviteCode: '', //邀请码
        shareUrl: '',
        shortUrl: '' //短链接
      }
    },
    mounted() {
      this.getUrl();
      this.getShortenUrl();
      this.btnCopy = new this.clipboard(this.$refs.btnCopy);
      // 是否展示分享图标
      if (this.title === "Product Details") {
        this.showIcon = true;
        // console.log('show')
      } else {
        this.showIcon = false;
        // console.log('no show')
      }
    },
    methods: {
      mouseoutShare() {
        this.isShowShare = false;
        this.$emit('showBack', this.isShowShare);
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
      pageBack() {
        this.$router.go(-1);
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
      // 点击展示分享弹窗
      showShare() {
        var inputEle = document.getElementById('url')
        inputEle.value = this.shortUrl;
        this.isShowShare = !this.isShowShare;
        this.$emit('showBack', this.isShowShare);
      },
      // 复制链接
      copyLink() {
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
      // 发布到facebook
      toFacebook() {
        let shareUrl = this.shortUrl; // 分享的链接
        let app_id = '883175368431883';
        let url = "https://www.facebook.com/share?display=popup&" + 'app_id=' + app_id + '&url=' + this.shortUrl;
        window.open(url, '_blank');
      },
      //发布到twitter
      toTwitter() {
        let shareUrl = this.shortUrl; // 分享的链接
        let title = 'WaiWaiMall'
        let url = "https://twitter.com/share?" + 'text=' + title + '&url=' + shareUrl;
        window.open(url, '_blank');
      }
    }
  };
</script>
<style lang="less" scoped>
  @import '~less/tool.less';
  .share {
    font-size: 48/@rem;
    color: #000;
    position: absolute;
    right: 95/@rem;
    top: 16/@rem;
    padding: 0 5/@rem;
  }
  .rect {
    border-bottom: 15/@rem solid #eee;
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
    text-align: left;
    background: #fff;
    line-height: 25/@rem;
    border-radius: 5/@rem;
    padding: 0 10/@rem;
    border: 1px solid #eee;
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
        margin-left: 10/@rem;
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
        padding-left: 10/@rem;
      }
      .share-others-title {
        font-size: 10/@rem;
        margin-top: 18/@rem;
        white-space: nowrap;
        font-weight: bold;
        padding-left: 10/@rem;
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
</style>

