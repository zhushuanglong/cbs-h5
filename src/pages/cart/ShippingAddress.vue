<template>
  <div class="shipping-address-main">
    <topbar title="Shipping Address" :backUrl="'cart/secure/' + $route.params.orderId"></topbar>
    <div class="address-con" v-for="item in data">
      <div class="address-detail">
        <div class="info">
          <div class="fl">{{item.recipients}}</div>
          <div class="fr">{{item.iphone}}</div>
        </div>
        <div class="address">{{item.address}}</div>
        <div class="pos">
          <i class="iconfont gray2">&#xe62e;</i>
        </div>
      </div>
      <div class="operate">
        <div class="fl">
          <input type="radio" name="radio" v-if="item.is_default === 1" checked>
          <input type="radio" name="radio" v-else>
          Set as Default Shipping Address
        </div>
        <div class="fr">
          <div class="edit" @click="edit(item.id)">
            <i class="iconfont">&#xe621;</i>Edit
          </div>
          <div class="delete" @click="del(item.id)">
            <i class="iconfont">&#xe63d;</i>Delete
          </div>
        </div>
      </div>
    </div>
    <div class="global-fixed-btn">
      <router-link :to="{'path': '/cart/addAddress/' + $route.params.orderId}" class="fixed-btn">+ ADD NEW ADDRESS</router-link>
    </div>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      confirmModal: {}
    }
  },
  computed: {},
  created () {
    this.getAddressList();
  },
  mounted () {},
  watch: {},
  methods: {
    getAddressList () {
      this.$http.post('/address/list', {
        token: localStorage.userToken || '',
        page: 1
      }).then((res) => {
        if (res && res.data && res.data.status) {
          this.data = res.data.content;
        } else {
          // @TODO 数据错误
        }
      }, () => {
        // @TODO 网络错误
      });
    },
    edit (addressId) {
      this.$router.push({path: '/cart/addAddress/' + this.$route.params.orderId + '?addressId=' + addressId});
    },
    del (addressId) {
      let self = this;
      self.confirmModal = {
        show: true,
        title: 'Do you confirm delete?',
        onText: 'Yes',
        content: `Delete the Address!`,
        action: function () {
          self.$http.post('/address/delete', {
            token: localStorage.userToken || '',
            addressId: self.addressId
          }).then((res) => {
            if (res && res.data && res.data.status) {
              self.confirmModal.show = false;
              self.$Toast('success');
            } else {
              // @TODO 数据错误
            }
          }, () => {
            // @TODO 网络错误
          });
        }
      }
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
      margin-left: 20/@rem;
      vertical-align: top;
      margin-top: 18/@rem;
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
        vertical-align: top;
        margin-right: 5/@rem;
      }
    }
  }
}
</style>
