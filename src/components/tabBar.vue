<template>
  <div class="nav-wrapper">
    <ul class="uls">
      <router-link to="/home" class="list" tag="li">
        <div class="icon"></div>
        <span class="name">首页</span>
      </router-link>
      <li class="list ai-list" @click="toPath(2)" :class="{'router-link-exact-active': currentIndex === 2}">
        <div class="icon"></div>
        <span class="name">我的参与</span>
      </li>
      <li class="list" @click="toPath(3)" :class="{'router-link-exact-active': currentIndex === 3}">
        <div class="icon"></div>
        <span class="name">我的</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      isLogin: false,
      currentIndex: -1
    }
  },
  mounted () {
    this.getPath()
  },
  methods: {
    toPath (index) {
      this.currentIndex = index
      if (this.loginFlag === false) {
        this.$router.push('/login')
        return
      }
      if (index === 2) {
        this.$router.push('/join')
      } else if (index === 3) {
        this.$router.push('/account')
      }
    },
    getPath () {
      if (this.$route.path === '/join') {
        this.currentIndex = 2
      } else if (this.$route.path === '/account') {
        this.currentIndex = 3
      } else {
        this.currentIndex = -1
      }
    }
  },
  watch: {
    '$route': 'getPath'
  },
  computed: {
    ...mapGetters([
      'loginFlag'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nav-wrapper
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px
    z-index: 100
    background-color: #fff2b3
    border-top: 4px solid #ffc233
    @media screen and (max-width: 1200px)
      display: block
    @media screen and (min-width: 1200px)
      display: none
    .uls
      display flex
      height: 100%
      .list
        cursor pointer
        flex 1
        display flex
        flex-direction column
        align-items center
        justify-content center
        &.ai-list
          position: relative
        .name
          line-height: 1
          font-size: 14px
          color #efa800
          transition all .3s linear
        .icon
          display block
          width: 18px
          height 18px
          margin-bottom: 4px
          transition all .3s linear
        &:nth-child(1)
          .icon
            background: url("../assets/images/mobileTabBar/home_no_check.png") no-repeat center / cover
          &.router-link-exact-active
            .icon
              background: url("../assets/images/mobileTabBar/home_checked.png") no-repeat center / cover
        &:nth-child(2)
          .icon
            background: url("../assets/images/mobileTabBar/join_no_check.png") no-repeat center / cover
          &.router-link-exact-active
            .icon
              background: url("../assets/images/mobileTabBar/join_checked.png") no-repeat center / cover
        &:nth-child(3)
          .icon
            background: url("../assets/images/mobileTabBar/my_no_checke.png") no-repeat center / cover
          &.router-link-exact-active
            .icon
              background: url("../assets/images/mobileTabBar/my_checked.png") no-repeat center / cover
        &.router-link-exact-active
          .name
            color #b05500
</style>
