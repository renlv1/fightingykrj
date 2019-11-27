<template>
  <div id="app">
    <input type="text" name="username" style="display:none;">
    <input type="checkbox" style="display:none;">
    <input type="password" name="password" style="display:none;">
    <v-header class="web-pc"></v-header>
    <router-view class="main-container"/>
    <sidebar></sidebar>
    <v-footer class="footer"></v-footer>
  </div>
</template>

<script>
export default {
  components: {
    vHeader: resolve => require(['./components/header.vue'], resolve),
    vFooter: resolve => require(['./components/footer.vue'], resolve),
    sidebar: resolve => require(['./components/sidebar.vue'], resolve)
  }
}
</script>

<style lang="less">
@import "assets/css/reset.css";
@import "assets/css/common";
@import "assets/css/ongoing";
@import "assets/css/dialog";
#app{
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: url("assets/images/common/BG2.jpg") no-repeat bottom / cover;
  @media screen and (max-width: 1200px) {
    background: url("assets/images/mobieBase/bg.png") no-repeat bottom / cover;
  }
}
</style>
