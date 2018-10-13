<template>
  <div class="shipping-address-main">
    <topbar title="Shipping Address" :backUrl="'cart/secure/' + $route.params.orderId"></topbar>
    <div class="address-con">
      <div class="address-detail">
        <div class="info">
          <div class="fl">QIAN.XIAO</div>
          <div class="fr">+001123455534545</div>
        </div>
        <div class="address">608 kingsley st，apt 10，nomal，lllinois，United States 61761</div>
        <div class="pos">
          <i class="iconfont gray2">&#xe62e;</i>
        </div>
      </div>
      <div class="operate">
        <div class="fl">
          <input type="radio" name="radio">
          Set as Default Shipping Address
        </div>
        <div class="fr">
          <div class="edit" @click="edit()">
            <i class="iconfont">&#xe621;</i>Edit
          </div>
          <div class="delete" @click="del()">
            <i class="iconfont">&#xe63d;</i>Delete
          </div>
        </div>
      </div>
    </div>
    <div class="address-con">
      <div class="address-detail">
        <div class="info">
          <div class="fl">QIAN.XIAO</div>
          <div class="fr">+001123455534545</div>
        </div>
        <div class="address">608 kingsley st，apt 10，nomal，lllinois，United States 61761</div>
        <div class="pos">
          <i class="iconfont gray2">&#xe62e;</i>
        </div>
      </div>
      <div class="operate">
        <div class="fl">
          <input type="radio" name="radio">
          Set as Default Shipping Address
        </div>
        <div class="fr">
          <div class="edit">
            <i class="iconfont">&#xe621;</i>Edit
          </div>
          <div class="delete">
            <i class="iconfont">&#xe63d;</i>Delete
          </div>
        </div>
      </div>
    </div>
    <div class="global-fixed-btn">
      <router-link :to="{'path': '/cart/addAddress'}" class="fixed-btn">+ ADD NEW ADDRESS</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  watch: {},
  methods: {
    edit (addressId) {
      this.$router.push({path: '/cart/editAddress/' + addressId}); // TODO 去编辑
    },
    del () {
      console.log(12);
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.shipping-address-main {
  padding-top: 92/@rem;

  .address-con {
    font-size: 28/@rem;
    margin-top: 20/@rem;
    background-color: #fff;
  }
  .address-detail {
    position: relative;
    display: block;
    padding: 20/@rem;
    position: relative;
    color: #535353;
    border-bottom: 1px solid @gray3;

    .info {
      .height(40);
      .clearfix();
    }
    .address {
      word-break: break-all;
      line-height: 40/@rem;
    }

    .pos {
      position: absolute;
      top: 30/@rem;
      right: -40/@rem;
    }
  }
  .operate {
    .height(70);
    .clearfix();
    .fl input {
      margin-left: 15/@rem;
      margin-top: 0;
      .wh(34, 34);
    }
    .fr {
      font-size: 24/@rem;
      margin-right: 20/@rem;
    }
    .edit, .delete {
      display: inline-block;
      i {
        color: #929299;
        font-size: 32/@rem;
        vertical-align: middle;
        margin-right: 5/@rem;
      }
    }
  }
}
</style>
