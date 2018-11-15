<template>
  <div class="cart-main">
    <topbar title="Shopping Cart"></topbar>
    <!-- 空 -->
    <template v-if="cartEmpty">
        <div class="cart-empty">
          <div class="img"></div>
          <p>Your shopping cart is currently empty</p>
          <router-link :to="{path: '/home'}" class="btn">SHOP NOW</router-link>
        </div>
        <bottombar></bottombar>
</template>
    <!-- 有 -->
<template v-if="cartsData && cartsData.goods && cartsData.goods.length">
  <div class="cart-have">
    <router-link :to="{path: '/activity?activity_id=' + cartsData.promotion_id}" class="cart-enjoy">
      <span class="img"></span>
      <span>{{cartsData.promotion_msg}}</span>
      <i class="iconfont">&#xe62e;</i>
    </router-link>
    <div class="cart-list">
      <div class="detail" v-for="item in cartsData.goods">
        <router-link :to="{path: '/detail?id=' + item.id}" class="img fl">
          <img v-lazy="item.img && item.img.ossimg()">
        </router-link>
        <div class="info fl">
          <div class="title">{{item.name}}</div>
          <div class="sku" v-for="(prop, key, index) in item.props" :class="{'mt': index === 1}">{{prop}}</div>
          <div class="num">{{item.num}} x {{item.price | price}}</div>
          <div class="price">{{returnFloat(accMul(item.num, item.price) || 0) | price}}</div>
          <div class="reduce" @click="reduce(item)" :class="{'ban': item.num <= 1}"><i class="iconfont">&#xe62a;</i></div>
          <div class="add" @click="add(item)"><i class="iconfont">&#xe66f;</i></div>
        </div>
        <!-- delete -->
        <div class="btn-delete" @click.sync="removeGoods(item)">Remove</div>
      </div>
    </div>
    <div class="cart-discounts cart-rel">
      <div class="cart-label">Activity Discounts</div>
      <div class="cart-pos">{{cartsData.specialoffer}}</div>
    </div>
    <div class="cart-coupon cart-rel" @click="clickShowCoupon">
      <div class="cart-label">
        Coupon<span v-if="cartsData.coupon">（Rewards {{cartsData.coupon.length}})</span>
        <span v-else class="gray2">( no coupons )</span>
      </div>
      <div class="cart-pos">
        <span v-if="this.couponPrice">-{{this.couponPrice}}</span>
        <i class="iconfont gray2">&#xe62e;</i>
      </div>
    </div>
    <div class="cart-points cart-rel">
      <div class="cart-label">Activity Discounts <span class="label-des">( {{cartsData.integral}} points to use )</span></div>
      <div class="cart-pos">-{{accDiv(cartsData.integral, 100) | price}}
        <mt-switch v-model="isUsePoint"></mt-switch>
      </div>
    </div>
  </div>
  <div class="global-fixed-btn">
    <div @click="submitCart()" class="fixed-btn">CONTINUE CHECKOUT ( <span>{{returnFloat(totalPrice) | price}}</span> )</div>
  </div>
  <confirm :show.sync="confirmModal.show" :title="confirmModal.title" :content="confirmModal.content" :on-ok="confirmModal.action" okText="Yes"></confirm>
  <Coupon :show.sync="isShowCoupon" :coupons="cartsData.coupon || []" :isClick="true" :clickCallback="clickCoupon" :isCart="true"></Coupon>
</template>
  </div>
</template>

<script>
  import Coupon from 'common/Coupon.vue';
  export default {
    name: 'cart',
    components: {
      Coupon
    },
    data() {
      return {
        cartsData: [],
        isShowCoupon: false, // 显示优惠券
        couponId: '', // 优惠券ID
        isUsePoint: false, // 是否使用积分
        totalPrice: 0,
        confirmModal: {},
        cartEmpty: false,
        couponPrice: 0, // 券价
        touchEvent: {}, // touch事件
        addReduceSt: null, // 函数节流
        rate: 1 // 汇率
      };
    },
    computed: {},
    mounted() {
      this.getCartData();
    },
    watch: {
      'isUsePoint': function(value) {
        // 积分的使用
        if (value) {
          this.totalPrice = this.accSub(this.totalPrice, (this.cartsData.integral / 100 * this.rate)); // 减
        } else {
          this.totalPrice = this.accAdd(this.totalPrice, (this.cartsData.integral / 100 * this.rate)); // 加
        }
      }
    },
    methods: {
      // 获取购物车数据
      getCartData() {
        this.request('Carts', {}).then((res) => {
          if (res.status === 200 && res.content) {
            this.cartsData = res.content;
            this.rate = res.content.currency_rate || 1; //获取汇率
            if (!localStorage.userToken) {
              // 认定是游客访问
              localStorage.setItem('userToken', res.content.token);
            }
            if (this.cartsData && this.cartsData.goods && this.cartsData.goods.length) {
              this.cartEmpty = false;
              this.computeTotalPrice();
            } else {
              this.cartEmpty = true;
            }
            // 绑定remove
            let self = this;
            setTimeout(function() {
              self.removeGoodsHandler();
            }, 300);
          } else {
            this.cartEmpty = true;
            // this.$router.push({name: 'sign'})
          }
        }, err => {
          // this.$Toast(err);
        });
      },
      // 计算总价格
      computeTotalPrice() {
        // 初始化
        this.totalPrice = 0;
        let goods = this.cartsData.goods;
        let len = goods.length;
        for (let i = 0; i < len; i++) {
          this.totalPrice += this.accMul(goods[i].num, goods[i].price);
        }
        // 浮点数处理
        this.totalPrice = this.accSub(this.totalPrice, this.cartsData.specialoffer); // 减
        // 处理券价格
        this.totalPrice = this.accSub(this.totalPrice, (this.couponPrice + '').replace(/[^0-9]/ig, '')); // 减
        if (this.totalPrice < 0) {
          this.totalPrice = 0;
        }
      },
      // 增加 - 登录后
      add(item) {
        let self = this;
        if (item.num >= item.stock) {
          return false;
        }
        item.num++;
        this.totalPrice = this.accAdd(this.totalPrice, item.price); // 加
        // 函数节流
        self.addReduceCompute(item);
      },
      // 减少 - 登录后
      reduce(item) {
        let self = this;
        if (item.num <= 1) {
          return;
        }
        item.num--;
        self.totalPrice = this.accSub(self.totalPrice, item.price); // 减
        // 函数节流
        self.addReduceCompute(item);
      },
      // 加减 计算
      addReduceCompute(item) {
        let self = this;
        clearTimeout(self.addReduceSt);
        self.addReduceSt = setTimeout(function() {
          self.request('CartsUpdate', {
            good_id: item.id,
            sku_id: item.sku_id,
            num: item.num
          }).then((res) => {
            if (res.status === 200) {
              self.cartsData = res.content;
              self.computeTotalPrice();
            }
          }, err => {
            self.$Toast(err);
          });
        }, 1000);
      },
      // 删除
      removeGoods(item) {
        let self = this;
        item.num = 0;
        self.confirmModal = {
          show: true,
          title: 'Confirmed to delete?',
          onText: 'Yes',
          content: `Delete the product!`,
          // desc: '',
          action: function() {
            self.confirmModal.show = false;
            self.reduceSt = setTimeout(function() {
              self.request('CartsDelete', {
                // cart_id: item.cart_id,
                good_id: item.id,
                sku_id: item.sku_id,
                num: item.num
              }).then((res) => {
                if (res.status === 200) {
                  if (res.content && res.content.goods && res.content.goods.length) {
                    self.cartsData = res.content;
                    // 重新计算价格
                    self.computeTotalPrice();
                  } else {
                    self.cartEmpty = true;
                    window.location.reload();
                  }
                }
              }, err => {
                self.$Messagebox({
                  title: err || 'system error',
                  type: 'error'
                });
              });
            }, 1000);
          }
        }
      },
      // 删除助手 - 手势
      removeGoodsHandler() {
        let self = this;
        //返回角度
        function GetSlideAngle(dx, dy) {
          return (Math.atan2(dy, dx) * 180) / Math.PI;
        }
        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        function GetSlideDirection(startX, startY, endX, endY) {
          var dy = startY - endY;
          var dx = endX - startX;
          var result = 0;
          //如果滑动距离太短
          if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return result;
          }
          var angle = GetSlideAngle(dx, dy);
          if (angle >= -45 && angle < 45) {
            result = 4;
          } else if (angle >= 45 && angle < 135) {
            result = 1;
          } else if (angle >= -135 && angle < -45) {
            result = 2;
          } else if (
            (angle >= 135 && angle <= 180) ||
            (angle >= -180 && angle < -135)
          ) {
            result = 3;
          }
          return result;
        }
        //滑动处理
        let goodsList = document.getElementsByClassName("detail");
        let len = goodsList.length;
        for (let i = 0; i < len; i++) {
          (function(num) {
            goodsList[num].addEventListener("touchstart", function(ev) {
              // ev.preventDefault();
              self.touchEvent.startX = ev.touches[0].pageX;
              self.touchEvent.startY = ev.touches[0].pageY;
            }, false);
            goodsList[num].addEventListener("touchmove", function(ev) {
              // ev.preventDefault();
              self.touchEvent.endX = ev.changedTouches[0].pageX;
              self.touchEvent.endY = ev.changedTouches[0].pageY;
              var direction = GetSlideDirection(self.touchEvent.startX, self.touchEvent.startY, self.touchEvent.endX, self.touchEvent.endY);
              switch (direction) {
                case 0:
                  // 没滑动
                  break;
                case 1:
                  // 向上
                  break;
                case 2:
                  // 向下
                  break;
                case 3:
                  // 向左
                  if (goodsList[num] && goodsList[num].className.indexOf('a-fadeinMr') === -1) {
                    goodsList[num].className = 'detail a-fadeinMr';
                  }
                  break;
                case 4:
                  // 向右
                  // to do sth
                  if (goodsList[num].className.indexOf('a-fadeinMr') !== -1) {
                    goodsList[num].className = 'detail';
                  }
                  break;
                default:
              }
            }, false);
            goodsList[num].addEventListener("touchend", function(ev) {
              // ev.preventDefault();
              self.touchEvent = {};
            }, false);
          })(i);
        }
      },
      // 弹出券
      clickShowCoupon() {
        this.isShowCoupon = true;
      },
      // 点击购物券
      clickCoupon(item) {
        this.couponPrice = item.price;
        this.isShowCoupon = false;
        this.couponId = item.id;
        // 计算券
        this.computeTotalPrice();
      },
      // 提交购物车
      submitCart() {
        // 判定是否有登录token
        
        if (!localStorage.userToken) {
          // 去登录页面
          console.log("localStorage.userToken");
          this.$router.push({
            path: '/my/sign'
          });
          return;
        }
        this.request('OrdersCheckout', {
          type: 2, // 是	Number	单订来源(1：PC端，2：H5，4：APP)
          coupon_id: this.couponId, // 是	String或者null	优惠券id 没有则为空
          integral: this.isUsePoint, // 是	Boolean	积分是否选择 ture或者false
          date: Date.parse(new Date()) // 否	string	用户本地时间
        }).then((res) => {
          if (res.status === 200 && res.content) {
            this.$router.push({
              path: '/cart/secure?orderId=' + res.content
            });
          } else if (res.status === 403 || res.status === 402) {
            this.$router.push({
              name: 'sign'
            })
          } else {
            this.$Toast(res.msg)
          }
        }, err => {
          this.$Toast(err);
        });
      }
    },
    beforeDestroy() {
      // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
    }
  };
</script>

<style lang="less">
  @import '~less/tool.less';
  .cart-main {
    color: #131313;
    .cart-have {
      padding-top: 92/@rem;
    }
    .cart-enjoy {
      display: block;
      position: relative;
      width: 100%;
      background: #ffffff;
      .height(70);
      margin: 1px 0 1px 0;
      .clearfix();
      span {
        float: left;
        display: inline-block;
        font-size: 24/@rem;
        color: @orange;
      }
      .img {
        .wh(86, 30);
        background: url('~img/detail/s2.png');
        background-size: 100% auto;
        margin: 22/@rem;
        margin-right: 10/@rem;
      }
      i {
        position: absolute;
        top: 0;
        right: 10/@rem;
        color: @gray2;
        font-size: 32/@rem;
      }
    }
    .cart-list {
      margin-bottom: 10/@rem;
      .detail {
        position: relative;
        background-color: #fff;
        padding: 20/@rem; // margin-bottom: 18/@rem;
        border-bottom: 1px solid @gray3;
        width: 100%;
        height: 220/@rem;
        .clearfix();
        .img,
        img {
          .wh(180,
          180);
          background-size: 100%;
        }
        .img img {
          display: block;
          border: 1px solid @gray2;
        }
        .info {
          position: relative;
          margin-left: 20/@rem;
          width: 430/@rem;
          .title {
            font-size: 28/@rem;
            .height(50);
            .line1();
          }
          .sku {
            .height(40);
            color: @gray2;
          }
          .mt {
            margin-top: 50/@rem;
          }
          .price {
            position: absolute;
            top: 142/@rem;
            right: -80/@rem;
            text-algin: right;
            color: @fred;
          }
          .num {
            position: absolute;
            top: 100/@rem;
            right: -80/@rem;
            text-algin: right;
            color: @gray2;
          }
          .reduce,
          .add {
            position: absolute;
            z-index: 2;
            top: 0;
            right: -50/@rem;
            .wh(50,
            50);
          }
          .reduce {
            &.ban {
              color: #c7c7c7;
            }
          }
          .add {
            position: absolute;
            top: -6/@rem;
            right: -95/@rem;
            i {
              font-size: 50/@rem;
            }
            .wh(50,
            50);
          }
        }
      }
      .btn-delete {
        position: absolute;
        top: 0;
        right: -150/@rem;
        .whl(150,
        220);
        text-align: center;
        color: #fff;
        font-size: 24/@rem;
        background-color: @orange;
      }
    }
    .cart-rel {
      position: relative;
      background: #ffffff;
      padding: 0 20/@rem;
      border-bottom: 1px solid @gray3;
      &:last-child {
        border-bottom: 1px solid #ececec;
      }
      .height(88);
      .cart-pos {
        position: absolute;
        top: 0;
        right: 20/@rem;
        .height(88);
        .clearfix();
        span {
          display: inline-block;
          text-align: right;
          vertical-align: top;
        }
        .mint-switch {
          float: right;
          margin-top: 20/@rem;
          margin-left: 20/@rem;
        }
      }
    }
    .cart-discounts {}
    .cart-coupon {}
    .cart-points {}
    .cart-empty {
      padding-top: 92/@rem;
      text-align: center;
      .img {
        display: inline-block;
        margin-top: 209/@rem;
        .wh(315,
        185);
        background: url('~img/cart/cart_empty.png') no-repeat;
        background-size: 100% auto;
        margin-left: 50/@rem;
        img {
          display: block;
        }
      }
      p {
        margin-top: 80/@rem;
        .height(40);
        font-size: 28/@rem;
        color: @gray2;
      }
      .btn {
        display: inline-block;
        .whl(540,
        80);
        margin-top: 45/@rem;
        border: 1px solid @orange;
        border-radius: 10/@rem;
        color: @orange;
      }
    }
  }
</style>
