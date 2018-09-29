<template>
  <div class="categories-main" ref="indexMain">
    <div class="global-topbar">
      <div class="global-center search">
        <input type="text" placeholder="What are you looking for?">
        <div class="btn-search">Search</div>
      </div>
    </div>
    <div class="categories-con">
      <div class="left">

      </div>
      <div class="detail">

      </div>
    </div>
    <bottombar></bottombar>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {};
  },
  computed: {},
  mounted () {},
  watch: {},
  methods: {},
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.categories-main {
  padding: 90/@rem 0;
  height: 100%;
  background-color: #fff;
  .search {
    background-color: #fff;
    padding: 0 20/@rem;
    .height(90);
    border-bottom: 1px solid @gray3;
    input {
      width: 600/@rem;
      height: 60/@rem;
      background-color: #EEF0EF;
      border-radius: 30/@rem;
      padding: 0 30/@rem;
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
      height: 100%;
      width: 190/@rem;
      background-color: #F2F2F2;
    }
  }
}
</style>
