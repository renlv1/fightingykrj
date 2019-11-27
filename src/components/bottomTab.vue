<template>
  <div class="bottom-tabs">
    <router-link class="home" tag="li" to="/home">
      <i></i>
      <span>首页</span>
    </router-link>
    <router-link class="join" tag="li" to="/join">
      <i></i>
      <span>我的参与</span>
    </router-link>
    <router-link class="account" tag="li" to="/account/previewAccount">
      <i></i>
      <span>我的</span>
    </router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'bottomTab'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bottom-tabs
    width 100%
    position fixed
    bottom 0
    display flex
    flex-direction row
    justify-content space-between
    height 60px
    align-items center
    background-color #fff2b3
    border-top 3px solid #ffc233
    li
      font-size 0
      width 33%
      display flex
      flex-direction column
      justify-items flex-end
      align-items center
      font-weight bold
      color #efa800
      span
        margin-top 5px
        font-size 12px
        display inline
    .home
      i
        background-image url("../assets/mobile-images/bottomTabs/home.png")
        width 18px
        height 18px
        background-size cover
      &.is-active
        i
          background-image url("../assets/mobile-images/bottomTabs/activeHome.png")
        span
          color #b05500
    .join
      i
        background-image url("../assets/mobile-images/bottomTabs/join.png")
        width 18px
        height 18px
        background-size cover
      &.is-active
        i
          background-image url("../assets/mobile-images/bottomTabs/activeJoin.png")
        span
          color #b05500
    .account
      i
        background-image url("../assets/mobile-images/bottomTabs/account.png")
        width 18px
        height 18px
        background-size cover
      &.is-active
        i
          background-image url("../assets/mobile-images/bottomTabs/activeAccount.png")
        span
          color #b05500
</style>
