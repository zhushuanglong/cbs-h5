<template>
  <div class="profile-main">
    <TopBar :title="`Profile`" :backUrl="`my`"></TopBar>
    <ul class="profile-ul">
      <li class="first">
        <img class="head-img" src="~img/my/head.png">
        <div class="info">Edit</div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Full Name</div>
        <div class="info"><input type="text" placeholder="Full Name"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Gender</div>
        <div class="info"><input type="text"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Date Of Birth</div>
        <div class="info"><input type="text"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Telephone</div>
        <div class="info"><input type="text"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Password</div>
        <div class="info"><input type="text" /></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Shipping Address</div>
        <div class="info"><input type="text" /></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Sign Out</div>
        <i class="iconfont">&#xe62e;</i>
      </li>
    </ul>
    <div class="btn">SAVE</div>
  </div>
</template>

<script>
import TopBar from 'common/TopBar.vue';
export default {
  name: 'cart',
  components: {
    TopBar
  },
  data () {
    return {};
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {},
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.profile-main {
  padding-top: 92/@rem;
  .profile-ul {
    background-color: #fff;
    display: block;
    li {
      .clearfix();
      position: relative;
      width: 100%;
      .height(86);
      padding: 0 20/@rem;
      border-bottom: 1px solid @gray3;
      font-size: 26/@rem;
    }
    .first {
      height: 152/@rem;
    }
    .head-img {
      margin-top: 20/@rem;
      .wh(110, 110);
      background-size: 100%;
    }
    .label {
      float: left;
      width: 250/@rem;
      text-align: left;
      color: @gray2;
    }
    .info, i {
      position: absolute;
      color: @gray2;
      input {
        color: @gray2;
        text-align: right;
        border: 0;
        box-shadow: none;
        outline: 0;
      }
    }
    .info {
      height: 88/@rem;
      line-height: 88/@rem;
      right: 60/@rem;
    }
    i {
      right: 15/@rem;
    }
    .first {
      .info {
        top: 45/@rem;
      }
      i {
        top: 45/@rem;
      }
    }
  }
  .btn {
    position: fixed;
    background-color: #fff;
    left: 60/@rem;
    bottom: 60/@rem;
    width: 630/@rem;
    border: 1px solid @red;
    border-radius: 5px;
    .height(98);
    font-size: 28/@rem;
    color: @red;
    text-align: center;
  }
}
</style>
