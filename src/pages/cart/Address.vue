<template>
  <div class="address-main" ref="indexMain">
    <TopBar :title="'Add Address'" :backUrl="'secure'"></TopBar>

    <ul class="address-ul">
      <li>
        <div class="label">First Name*</div>
        <input type="text">
      </li>
      <li>
        <div class="label">Last Name*</div>
        <input type="text">
      </li>
      <li>
        <div class="label">Country*</div>
        <input type="text">
        <i class="iconfont gray2">&#xe62e;</i>
      </li>
      <li>
        <div class="label">State/Province*</div>
        <input type="text">
        <i class="iconfont gray2">&#xe62e;</i>
      </li>
      <li>
        <div class="label">City*</div>
        <input type="text">
      </li>
      <li>
        <div class="label">Address Line 1*</div>
        <input type="text" placeholder="Street，Address，Company Name，C/O">
      </li>
      <li>
        <div class="label">Address Line 2(Optional)</div>
        <input type="text" placeholder="Apartment，Suite，Unite，Builting，Floor，etc">
      </li>
      <li>
        <div class="label">ZIP/Post Code*</div>
        <input type="text">
      </li>
      <li>
        <div class="label">Phone Number*</div>
        <input type="text">
        <div class="phone-number-icon">
          <div class="img"></div>
          <div class="des">+001</div>
        </div>
      </li>
    </ul>

    <div class="set-defualt">
      Set as Default Shipping Address
      <mt-switch v-model="isSetDefault"></mt-switch>
    </div>

    <div class="global-fixed-btn">
      <div class="fixed-btn">SAVE</div>
    </div>
  </div>
</template>

<script>
import TopBar from 'common/TopBar.vue';
export default {
  components: {
    TopBar
  },
  data () {
    return {
      isSetDefault: false // 设置默认地址
    };
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {
    // 'isLogin': function () {
    //   this.pageInit();
    //   this.popupShow();
    // }
  },
  methods: {},
  beforeDestroy () {
    // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
.address-main {
  font-size: 28/@rem;
  padding-top: 92/@rem;
  padding-bottom: 98/@rem;

  .address-ul {
    margin-top: 20/@rem;
    padding: 30/@rem 0;
    display: block;
    width: 100%;
    background-color: #fff;
    li {
      position: relative;
      width: 100%;
      padding: 0 20/@rem;
      height: 130/@rem;
      margin-bottom: 20/@rem;
      .label {
        font-weight: 400;
        .height(40);
        margin-bottom: 10/@rem;
      }
      input {
        .whl(710,80);
        border:1px solid #c5c5c5;
        padding: 0 20/@rem;
      }
      i {
        position: absolute;
        top: 65/@rem;
        right: 20/@rem;
      }
    }
  }

  .set-defualt {
    margin: 20/@rem 0;
    padding: 0 20/@rem;
    width: 100%;
    .height(92);
    background-color: #fff;
    .clearfix();
    .mint-switch {
      margin-top: 20/@rem;
      float: right;
    }
  }
}
</style>
