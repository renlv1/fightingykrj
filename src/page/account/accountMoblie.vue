<template>
  <div class="web-mob">
    <div class="web-mob-account">
      <mobile-header :hasBackIcon="false" :hasMessageIcon="false" title="我的"></mobile-header>
      <div class="account-main">
        <!-- 用户信息 -->
        <div class="userInfo">
          <div class="left-avatar-userInfo">
          </div>
          <div class="right-userInfo">
            <p class="user-name">
              <span>用户名：</span>
              <span>张三</span>
            </p>
            <p class="user-email">
              <span>邮箱：</span>
              <span>123154658789@qq.com</span>
            </p>
          </div>
        </div>
        <!-- 账户预览 -->
        <div class="preview-account">
          <h5>账户预览</h5>
          <ul>
            <li v-for="item in currencyList" :key="item.index">
              <p class="assets-value">{{item.value}}</p>
              <p class="assets-type">{{item.currency}} 资产</p>
            </li>
          </ul>
        </div>
        <!-- 我的账单 -->
        <div class="my-bill" @click="$router.push('/mobileBillAccount')">
          <div class="icon-title-bill">
            <i class="icon"></i>
            <span class="title-bill">我的账单</span>
          </div>
          <div class="right-row">
            <img width="10" height="15" src="../../assets/mobile-images/account/right-row.png"/>
          </div>
        </div>
      </div>
      <bottom-tab></bottom-tab>
    </div>
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'
  import bottomTab from '../../components/bottomTab'

  export default {
    name: 'accountMoblie',
    data() {
      return {
        accountList: ['账户预览', '我的账单'],
        currencyList: [
          {value: 123.123645648798456789547897, currency: 'USD'},
          {value: 456789.012134, currency: 'SIE'},
          {value: 123, currency: 'USD'},
          {value: 123.123645648798456789547897, currency: 'USD'},
          {value: 456789.012134, currency: 'SIE'},
          {value: 123, currency: 'USD'}],
        currentIndex: 0
      }
    },
    created() {
      this.getUserBalance()
    },
    mounted() {
      this.getUserInfo()
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      getUserInfo() {
      },
      getUserBalance() {
        this.$http.post(this.$api + `/user/balance`).then((res) => {
          if (res.success) {
            let user = res.data.user
            let account = res.data.account
            this.userEmail = user.userEmail
            this.userName = user.userName
            this.avatar = user.userHeadImage
            this.currency = account.currency
            this.balance = account.balance
          }
        })
      },
      routeRedirect() {
        if (window.innerWidth > 1200 && this.$route.path === '/mobileAccount') {
          this.$router.push('/account')
        }
      }
    },
    components: {
      bottomTab,
      mobileHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .web-mob
    .web-mob-account
      background-image url("../../assets/mobile-images/account/BG.png")
      width 100%
      min-height 100vh
      background-size cover
      margin-bottom 50px
      .account-main
        display flex
        flex-direction column
        margin 0 15px
        .userInfo
          margin-top 30px
          padding 15px
          display flex
          flex-direction row
          background-color #fff2b3
          border 4px solid #ffc233
          border-radius 4px
          .left-avatar-userInfo
            width 50px
            height 50px
            background-color red
          .right-userInfo
            margin-left 10px
            height 50px
            flex 1
            display flex
            flex-direction column
            justify-content space-around
            .user-name
              font-size 14px
              color #b05500
              font-weight bold
            .user-email
              font-size 12px
              color #b05500
        .preview-account
          margin-top 10px
          padding 20px 15px
          background-color #fff2b3
          border 4px solid #ffc233
          border-radius 4px
          h5
            font-size 14px
            color #299C91
            font-weight bold
          ul
            display flex
            flex-direction row
            flex-wrap wrap
            li
              width 42%
              word-wrap: break-word
              font-size 13px
              color #b05500
              .assets-value
                font-weight bold
              &:nth-of-type(odd) {
                margin 20px 20px 0 0
              }
              &:nth-of-type(even) {
                margin 20px 0 0 20px
              }
        .my-bill
          margin-top 10px
          padding 20px 15px
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          background-color #fff2b3
          border 4px solid #ffc233
          border-radius 4px
          .icon-title-bill
            display flex
            flex-direction row
            align-items center
            .icon
              display block
              width 24px
              height 24px
              background-image url("../../assets/mobile-images/account/list.png")
              background-size cover
            .title-bill
              margin-left 10px
              font-size 14px
              color #b05500
              font-weight bold
</style>
