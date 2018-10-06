<template>
  <div class="categories-main">
    <div class="global-topbar">
      <router-link :to="{path: '/categories/search/fromcate'}" class="global-center search-bar">
        <div class="input fl">
          <i class="iconfont">&#xe66e;</i>
          <input ref="inputSearchRef" type="text" placeholder="What are you looking for?">
        </div>
        <div class="btn-search">Search</div>
      </router-link>
    </div>
    <div class="categories-con" v-show="!isSearchBlur">
      <div class="left">
        <ul>
          <li>Women’s Clothing</li>
          <li class="cur">Men</li>
          <li>Kid & Toys</li>
          <li>Baby & Mom</li>
          <li>Bag</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing</li>
          <li>Women’s Clothing1</li>
          <li>Women’s Clothing2</li>
          <li>Women’s Clothing3</li>
          <li>Women’s Clothing4</li>
        </ul>
      </div>
      <div class="detail">
        <div class="title">
          <div class="label">Clothing</div>
          <div class="pos">All<i class="iconfont">&#xe62e;</i></div>
        </div>
        <ul>
          <li>
            <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            <p>T-shirts</p>
          </li>
          <li>
            <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            <p>T-shirts</p>
          </li>
          <li>
            <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            <p>T-shirts</p>
          </li>
          <li>
            <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            <p>T-shirts</p>
          </li>
          <li>
            <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
            <p>T-shirts</p>
          </li>
        </ul>
      </div>
    </div>
    <bottombar></bottombar>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      isSearchBlur: false, // 搜索框失去焦点
      dataGoods: []
    };
  },
  computed: {},
  mounted () {},
  watch: {},
  methods: {
    searchResult () {
      // input失去焦点
      this.$refs.inputSearchRef.blur();
      this.isSearchBlur = true;
      // 获取商品数据
      this.dataGoods = [];
    },
    inputClick () {
      this.isSearchBlur = false;
    },
    backUrl () {

    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.categories-main {
  padding: 90/@rem 0;
  height: 100%;
  background-color: #fff;
  .search-bar {
    display: block;
    background-color: #fff;
    padding: 0 20/@rem;
    .height(90);
    .clearfix();

    border-bottom: 1px solid @gray3;
    .input {
      position: relative;
      input {
        font-size: 28/@rem;
        width: 600/@rem;
        height: 60/@rem;
        background-color: #EEF0EF;
        border-radius: 30/@rem;
        padding: 0 30/@rem 0 55/@rem;
      }
      i {
        position: absolute;
        top: 0;
        left: 18/@rem;
        font-size: 28/@rem;
        color: @gray2;
      }
    }
    .btn-search {
      position: absolute;
      top: 0;
      right: 20/@rem;
      width: 110/@rem;
      text-align: right;
      .height(88);
      font-size: 32/@rem;
    }
  }
  .categories-con {
    height: 100%;
    .clearfix();
    .left {
      float: left;
      height: 100%;
      overflow-y: scroll;
      width: 190/@rem;
      background-color: #F2F2F2;
      ul {
        display: block;
        li {
          padding: 25/@rem;
          line-height: 35/@rem;

          &.cur {
            background-color: #fff;
            border-left: 6/@rem solid @red;
          }
        }
      }
    }

    .detail {
      width: 560/@rem;
      height: 100%;
      overflow-y: scroll;
      margin-left: 190/@rem;
      padding: 30/@rem 0;
      .title {
        position: relative;
        .height(50);
        margin-bottom: 25/@rem;
        padding-left: 28/@rem;
        font-size: 24/@rem;
        .pos {
          position: absolute;
          right: 20/@rem;
          top: 0;
          color: @gray2;
          i {
            vertical-align: middle;
          }
        }
      }
      ul {
        display: block;
        font-size: 24/@rem;
        .clearfix();
        li {
          float: left;
          width: 180/@rem;
          height: 180/@rem;
          text-align: center;
          margin-left: 6/@rem;
          margin-bottom: 30/@rem;
          img {
            display: block;
            width: auto;
            height: 140/@rem;
            margin-left: 20/@rem;
            background: auto 100%;
          }
          p {
            margin-top: 10/@rem;
            .height(35);
          }
        }
      }
    }
  }
}
</style>
