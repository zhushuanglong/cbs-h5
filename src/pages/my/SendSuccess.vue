<template>
  <div>
    <topbar title="Forgot Password" backUrl="my"></topbar>
    <div class="sendEmail-page">
      <p class="title">Successfully sent</p>
      <p class="desc">An email with the reset link has been sent to <span style="color: #000">{{email}}</span></p>
      <div class="submit-btn" @click="goToSignIn">Return to sign in</div>
      <div class="foot">
          Didn’t get the email? <a href="javascript:;" class="resend" 
          @click="resend">Resend</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: 'CoCo.c@136.com'
    }
  },
  methods: {
    // 重发
    resend() {

    },
    goToSignIn() {
      this.$router.push({
        name: 'sign'
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.sendEmail-page{
  padding: 100/@rem 45/@rem 0;
  .title{
    margin: 40/@rem 0;
    font-size: 28/@rem;
    color: #000;
    text-align: center;
  }
  .desc{
    width: 550/@rem;
    margin: 0 auto;
    color: #939399;
  }
  .submit-btn {
    width:660/@rem;
    height:88/@rem;
    margin-top: 76/@rem;
    background:rgba(255,71,60,1);
    border-radius:44px;
    font-size: 32/@rem;
    color: #fff;
    text-align: center;
    line-height: 88/@rem;
  }
  .foot{
    margin-top: 17/@rem;
    text-align: center;
    color: #939399;
  }
}
</style>

