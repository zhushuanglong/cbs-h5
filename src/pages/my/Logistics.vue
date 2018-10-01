<template>
  <div>
    <topbar title="Logistics Details" backUrl="orderDetail"></topbar>
    <div class="logistics">
      <div class="order-info clearfix">
        <img src="" alt="" class="img fl">
        <div class="content fl">
          <p class="title">Logistics status:</p>
          <p>Type of logistics：Express</p>
          <p>Tracking number：3900271506000<span class="copy">COPY</span></p>
          <p>Official TEL：88675</p>
        </div>
      </div>
      <div class="logistics-list">
        <p class="l-title">Logistics info</p>
        <ul>
          <li class="l-detail">
            <span class="icon"></span>
            <div class="info">
              <p>已签收，签收人是同事或邮箱</p>
              <p>2017-07-03 12:45:43</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
@import "~less/tool.less";
.logistics{
  .order-info{
    padding: 30/@rem 20/@rem;
    height: 210/@rem;
    margin-top: 90/@rem;
    .img{
      width: 148/@rem;
      height: 148/@rem;
      float: left;
    }
    .content{
      margin-left: 17/@rem;
      position: relative;
      width: 500/@rem;
      .title{
        color: #131313;
        font-size: 28/@rem;
        line-height: 42/@rem;
      }
      p{
        color: #939399;
        font-size: 20/@rem;
        line-height: 40/@rem;
      }
      .copy{
        // position: absolute;
        // right: 55/@rem;
        // top: 0;
        float: right;
        display: block;
        width:72/@rem;
        height:40/@rem;
        line-height: 40/@rem;
        font-size: 22/@rem;
        border:1px solid rgba(147,147,153,1);
        border-radius:22/@rem;
      }
    }
  }
  .logistics-list{
    margin-top: 10/@rem;
    padding: 33/@rem 20/@rem;
    .l-title{
      color: #040404;
      font-size: 28/@rem;
    }
    .l-detail{
      position: relative;
      padding-left: 77/@rem;
      .icon{
        position: absolute;
        left: 40/@rem;
        top: 50%;
        width: 12/@rem;
        height: 12/@rem;
        border-radius: 50%;
        background-color: #3F966A;
      }
      .info{
        padding: 26/@rem 0;
        p:nth-child(2) {
          margin-top: 12/@rem;
        }
        border-bottom: 1px solid #E4E4E4;
      }
    }
  }
}
</style>


