<template>
  <div class="global-float-top" v-show="show" @click="clickBackTop">
    <i class="iconfont">&#xe63a;</i>
    <p>Top</p>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    clickBackTop () {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="less">
@import "~less/tool.less";
.global-float-top {
  position: fixed;
  z-index: 101;
  right: 30/@rem;
  bottom: 200/@rem;
  width: 88/@rem;
  height: 88/@rem;
  border: 1px solid @gray3;
  border-radius: 50%;
  background-color: #FFF;
  text-align: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  i {
    color: @gray2;
  }
  p {
    .height(20);
    font-size: 26/@rem;
  }
}
</style>


