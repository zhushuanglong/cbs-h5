<template>
<div class="detail-main">
  <div class="detail-swipe">
    <div class="big-img-list">
      <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
    </div>
    <div class="small-img-list">
      <i class="iconfont left">&#xe62f;</i>
      <div class="list">
        <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
        <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
        <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
        <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
      </div>
      <i class="iconfont right">&#xe62e;</i>
      <div class="des">
        <p>{{data.name}}</p>
        <p>{{data.style[0].name}}</p>
      </div>
    </div>
  </div>
  <div class="detail-sku">
    <div class="sku-label fl">请选择：</div>
    <div class="sku-info fl">红</div>
    <i class="iconfont">&#xe62e;</i>
  </div>
  <div class="detail-info">
    <div class="title">商品详情</div>
    <ul class="info-main">
      <li>
        <div class="label fl">洗涤说明</div>
        <div class="des fl">不能用热水洗</div>
      </li>
      <li>
        <div class="label fl">洗涤说明</div>
        <div class="des fl">不能用热水洗</div>
      </li>
    </ul>
  </div>
  <div class="detail-imglist">
    <img src="http://img.alicdn.com/imgextra/i1/792382564/TB2cX1GoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x640q85s150_.webp">
    <img src="https://img.alicdn.com/imgextra/i4/792382564/TB263aGoRHH8KJjy0FbXXcqlpXa_!!792382564.jpg_640x0q85s150_.webp">
    <img src="https://img.alicdn.com/imgextra/i1/792382564/TB2HK5JoJrJ8KJjSspaXXXuKpXa_!!792382564.jpg_640x0q85s150_.webp">
    <img src="https://img.alicdn.com/imgextra/i2/792382564/TB27rsfnz3z9KJjy0FmXXXiwXXa_!!792382564.jpg_640x0q85s150_.webp">
  </div>
  <div class="detail-foot">
    <div class="pos-rel">
      <div class="price">￥199</div>
      <i class="iconfont">&#xe624;</i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.$store.dispatch('setTopbarTitle', '商品详情');
  },
  mounted () {
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      this.$http.post('/detail', {}).then((res) => {
        if (res && res.data && res.data.status) {
          let {data} = res.data;
          this.data = data;
        } else {
          // @TODO 数据错误
        }
      }, () => {
        // @TODO 网络错误
      });
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.detail-main {
  .detail-swipe {
    .big-img-list {
      img {
        width: 750/@rem;
        height: 750/@rem;
      }
    }
    .small-img-list {
      position: relative;
      background-color: #fff;
      width: 750/@rem;
      padding: 20/@rem 0;
      height: 260/@rem;
      margin-top: 20/@rem;
      i {
        position: absolute;
        z-index: 1;
        top: 30/@rem;
        width: 90/@rem;
        font-size: 90/@rem;
        color: #dfe0e4;
      }
      i.left {
        left: 0;
      }
      i.right {
        right: 0;
      }
      .list {
        margin-left: 90/@rem;
        .clearfix();
        img {
          float: left;
          width: 128/@rem;
          height: 128/@rem;
          margin-right: 20/@rem;
        }
      }
      .des {
        margin-top: 20/@rem;
        p {
          width: 100%;
          height: 40/@rem;
          line-height: 40/@rem;
          text-align: center;
          font-size: 26/@rem;
        }
      }
    }
  }

  .detail-sku {
    position: relative;
    padding: 0 20/@rem;
    margin-top: 20/@rem;
    width: 750/@rem;
    height: 84/@rem;
    background-color: #fff;
    line-height: 84/@rem;
    .sku-label {}
    i {
      position: absolute;
      z-index: 1;
      right: 20/@rem;
      color: @gray2;
    }
  }

  .detail-info {
    margin-top: 20/@rem;
    background-color: #fff;
    .title {
      padding-left: 20/@rem;
      line-height: 84/@rem;
      height: 84/@rem;
      border-bottom: 1px solid @bordercolor;
    }
    .info-main {
      display: block;
      width: 750/@rem;
      padding: 10/@rem 20/@rem;
      li {
        width: 100%;
        .clearfix();
        height: 44/@rem;
        line-height: 44/@rem;
        .label {
          width: 155/@rem;
          color: @gray1;
        }
        .des {
          width: 555/@rem;
          color: @gray2;
        }
      }
    }
  }

  .detail-imglist {
    img {
      width: 750/@rem;
      height: auto;
      display: block;
    }
  }

  .detail-foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 750/@rem;
    height: 96/@rem;
    padding: 0 20/@rem;
    background-color: @red;
    color: #fff;
    .pos-rel {
      position: relative;
      .price {
        font-size: 36/@rem;
        line-height: 96/@rem;
      }
      i {
        position: absolute;
        top: 20/@rem;
        right: 20/@rem;
        font-size: 50/@rem;
      }
    }
  }
}
</style>
