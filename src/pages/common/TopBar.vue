<template>
  <div class="global-topbar">
    <div class="global-center">
      <router-link class="back" :to="{path: '/' + backUrl}"><i class="iconfont">&#xe62f;</i></router-link>
      <div class="title">{{title}}</div>
      <i v-if="$route.name === 'detail'" class="iconfont cart">&#xe624;</i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    title: {
      type: String,
      default: ''
    },
    // back url
    backUrl: {
      type: String,
      default: ''
    }
  }
};
</script>
