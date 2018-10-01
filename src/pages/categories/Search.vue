<template>
  <div class="search-main">
    <div class="global-topbar">
      <div class="global-center search-bar">
        <i class="iconfont fl" v-show="isSearchBlur" @click="backUrl">&#xe62f;</i>
        <form action="" class="input fl">
          <i class="iconfont">&#xe66e;</i>
          <input ref="inputSearchRef" class="t3s" :class="{'w660': isSearchBlur }" type="text" name="search" placeholder="What are you looking for?" @focus="inputFocus"  @blur="inputBlur">
        </form>
        <div class="btn-search" v-show="!isSearchBlur" @click="searchResult">Search</div>
      </div>
    </div>
    <div class="search-sort-pos">
      <div class="global-center search-sort">
        <div class="sort" @click="clickConditions('sort')" :class="{'cur': conditionsName === 'sort', 'show-sort-con': isShowSortCon}">
          <i class="iconfont i1">&#xe615;</i>
          <span>Sort</span>
          <i class="iconfont i2 t3s">&#xe60d;</i>
          <!-- sort内容 -->
          <ul class="sort-con a-fadeinTX">
            <li class="cur">
              <p>Best Match</p>
              <i class="iconfont">&#xe625;</i>
            </li>
            <li>
              <p>Best Selling</p>
              <i class="iconfont">&#xe625;</i>
            </li>
            <li>
              <p>Newest</p>
              <i class="iconfont">&#xe625;</i>
            </li>
            <li>
              <p>Price: High to Low</p>
              <i class="iconfont">&#xe625;</i>
            </li>
            <li>
              <p>Price: Low to High</p>
              <i class="iconfont">&#xe625;</i>
            </li>
          </ul>
        </div>
        <div class="sort" @click="clickConditions('filter')" :class="{'cur': conditionsName === 'filter', 'show-filter-con': isShowFilterCon}">
          <i class="iconfont i3">&#xe64e;</i>
          <span>Filter</span>
          <i class="iconfont i2 t3s">&#xe60d;</i>
          <div class="filter-con">
            <div class="title"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-con" v-show="!dataSearch.length">
      <ul>
        <li>
          <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
          <p class="p1">Sheer Lace Yoke Tee Ifree Ifree La</p>
          <p class="p2">$100</p>
        </li>
        <li>
          <img src="https://gw3.alicdn.com/bao/uploaded/i1/1825922675/TB1l4q4wYwrBKNjSZPcXXXpapXa_!!0-item_pic.jpg_.webp">
          <p class="p1">Sheer Lace Yoke Tee Ifree La</p>
          <p class="p2">$102</p>
        </li>
      </ul>
    </div>
    <div class="search-empty" v-show="dataSearch.length">
      <img src="~img/categories/no_match.png">
      <p class="gray2">No Match Results</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      isSearchBlur: false, // 搜索框失去焦点
      dataSearch: [],
      conditionsName: 'sort', // 条件
      isShowSortCon: false, // 显示sort内容
      isShowFilterCon: false // 显示filter内容
    };
  },
  computed: {},
  mounted () {
    this.$refs.inputSearchRef.focus();
  },
  watch: {},
  methods: {
    searchResult () {
      let inputSearchRef = this.$refs.inputSearchRef;
      if (inputSearchRef.value.trim() === '') return;

      // input失去焦点
      inputSearchRef.blur();
      this.isSearchBlur = true;
      // 获取商品数据
      this.dataSearch = [];
    },
    inputFocus () {
      this.isSearchBlur = false;
    },
    inputBlur () {
      this.isSearchBlur = true;
    },
    // 点击条件
    clickConditions (status) {
      this.conditionsName = status;
      if (status === 'sort') {
        this.isShowFilterCon = false;
        this.isShowSortCon = !this.isShowSortCon;
      }
      if (status === 'filter') {
        this.isShowSortCon = false;
        this.isShowFilterCon = !this.isShowFilterCon;
      }
    },
    backUrl () {},
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.search-main {
  padding: 180/@rem 0 90/@rem 0;
  height: 100%;
  font-size: 28/@rem;
  .search-bar {
    background-color: #fff;
    padding: 0 20/@rem;
    .height(90);
    .clearfix();

    .input {
      position: relative;
      input {
        // font-size: 28/@rem;
        width: 600/@rem;
        height: 60/@rem;
        background-color: #EEF0EF;
        border-radius: 30/@rem;
        padding: 0 30/@rem 0 55/@rem;
      }
      .w660 {
        width: 660/@rem;
      }
      i {
        position: absolute;
        top: 0;
        left: 18/@rem;
        color: @gray2;
        font-size: 28/@rem;
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
  .search-sort-pos {
    position: fixed;
    left: 0;
    top: 90/@rem;
    z-index: 99;
    width: 100%;
    height: 90/@rem;
  }
  .search-sort {
    position: relative;
    display: block;
    background-color: #FFF;
    border-bottom: 1px solid @gray3;
    .clearfix();
    .sort {
      position: relative;
      float: left;
      width: 50%;
      .height(40);
      margin: 25/@rem 0;
      text-align: center;
      color: @gray2;
      border-right: 1px solid #D3D3DB;
      &:nth-child(2) {
        border-right: 0;
      }
      &.cur {
        color: @red;
      }
      i {
        font-size: 32/@rem;
        vertical-align: middle;
      }
      .i1 {
        font-size: 28/@rem;
      }
      .i2 {
        display: inline-block;
        font-size: 36/@rem;
        margin-left: -5/@rem;
      }
      .i3 {
        font-size: 34/@rem;
      }
    }
    .sort-con {
      display: none;
      position: absolute;
      left: 0;
      top: 65/@rem;
      background-color: #fff;
      width: 750/@rem;
      height: 460/@rem;
      border-top: 1px solid @gray3;
      border-bottom: 1px solid @gray3;
      li {
        position: relative;
        .height(90);
        color: #3d3d3d;
        text-align: center;
        i {
          position: absolute;
          top: 0;
          right: 20/@rem;
          font-size: 36/@rem;
          display: none;
        }
        &.cur {
          color: @red;
          i {
            display: block;
          }
        }
      }
    }
    .show-sort-con {
      .sort-con {
        display: block;
      }
      .i2 {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    }
    .filter-con {

    }
    .show-filter-con {
      .filter-con {
        display: block;
      }
      .i2 {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    }
  }
  .search-con {
    display: block;
    background-color: #fff;
    .clearfix();
    li {
      .wh(365, 550);
      margin-right: 20/@rem;
      float: left;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    p {
      .line1();
      .height(50);
      text-align: center;
    }
    .p1 {
      margin-top: 30/@rem;
      padding: 0 10/@rem;
    }
    .p2 {
      color: @red;
    }
    img {
      display: block;
      .wh(365,365);
      background-size: 100% auto;
    }
  }
  .search-empty {
    padding-top: 290/@rem;
    text-align: center;
    img {
      .wh(195, 200);
      margin-bottom: 40/@rem;
      background-size: 100% auto;
    }
    p {
      .height(50);
    }
  }
}
</style>
