<template>
  <div class="c-goods-list">
    <ul v-if="list.length">
      <li v-for="item in list" class="goods-item" :key="item.id">
       <a :href="item.stock > 0 ? 'detail/' + item.id : 'javascript:;'">
         <img :src="item.img" alt="" class="img">
         <p class="title">{{item.name}}</p>
         <p class="price">${{item.price}}</p>
       </a>
       <div class="solt-out" v-if="item.stock === 0">
         <img src="../../images/my/soltout.png" alt="">
       </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less">
@import "~less/tool.less";
.c-goods-list{
  .goods-item{
    width: 365/@rem;
    float: left;
    position: relative;
    a{
      display: block;
    }
    .img{
      width: 365/@rem;
      height: 365/@rem;
      display: block;
    }
    .title{
      padding: 0 11/@rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-top: 42/@rem;
      color: #000000;
      font-size: 28/@rem;
      font-weight: bold;
    }
    .price{
      color: #FF473C;
      font-size: 28/@rem;
      margin-top: 32/@rem;
      margin-bottom: 60/@rem;
      width: 100%;
      text-align: center
    }
    .solt-out{
      position: absolute;
      top: 0;
      background-color: rgba(100, 100, 100, 0.1);
      width: 365/@rem;
      height: 365/@rem;
      img{
        margin-top: 100/@rem;
        width: 160/@rem;
        height: 160/@rem;
      }
    }
  }
  li:nth-child(odd){
    margin-right: 20/@rem;
  }
}
</style>