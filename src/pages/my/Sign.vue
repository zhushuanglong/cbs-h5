<template>
  <div >
    <topbar title="Sign In"></topbar>
    <div class="sign">
      <input type="text" class="input-control email" placeholder="Email">
      <input type="text" class="input-control" placeholder="Password">
      <div class="forget">
        <router-link  v-if="type === 'sign'" :to="{name: 'forgetpwd'}">Forgot password</router-link>
      </div>
      <div v-if="type === 'sign'">
        <div class="signin-btn" @click="sign(2)">Sign In</div>
        <div class="signin-btn signin-nocolor" @click="register(1)">Register</div>
      </div>
      <div v-if="type === 'register'">
        <div class="signin-btn" @click="register(2)">Register</div>
        <div class="signin-btn signin-nocolor" @click="sign(1)">Sign In</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 'sign'
    }
  },
  mounted() {

  },
  methods: {
    // 注册
    register(type) {
      if (type === 1) {
        this.type = 'register'
      } else {
        // 请求
      }
    },
    sign(type) {
      if (type === 1) {
        this.type = 'sign'
      } else {
        // 请求
      }
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
.sign{
  margin-top: 90/@rem;
  padding: 0 45/@rem;
  .input-control{
    width: 660/@rem;
    height: 88/@rem;
    padding: 0 34/@rem;
    background:rgba(255,255,255,1);
    border:1px solid rgba(225,225,225,1);
    border-radius:44/@rem;
  }
  .email{
    margin-top: 103/@rem;
    margin-bottom: 40/@rem;
  }
  .signin-btn{
    width:660/@rem;
    height:88/@rem;
    background:rgba(255,71,60,1);
    border-radius:44/@rem;
    color: #fff;
    font-size: 32/@rem;
    line-height: 88/@rem;
    text-align: center;
  }
  .signin-nocolor{
    margin-top: 50/@rem;
    background-color: #fff;
    color: #010101
  }
  .forget{
    height: 24/@rem;
    margin: 22/@rem 34/@rem 30/@rem;
    a{
      color: #939399;
    }
  }
}
</style>


