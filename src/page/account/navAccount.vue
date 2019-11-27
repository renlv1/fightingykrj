<template>
  <div class="account">
    <div class="web-pc">
      <div class="nav-account">
        <div class="tabs">
          <router-link tag="li" to="/account/previewAccount">
            <i><img width="12" height="20" src="../../assets/images/account/left_row.png"/></i>
            <span>账户预览</span>
          </router-link>
          <router-link tag="li" to="/account/myBill">
            <i><img width="12" height="20" src="../../assets/images/account/left_row.png"/></i>
            <span>我的账单</span>
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <div class="web-mob">
      <div class="web-mob-account">
        <mobile-header :hasBackIcon='false' :hasMessageIcon="true" title="我的"></mobile-header>
        <div class="account-main">
          <!-- 用户信息 -->
          <div class="userInfo">
            <div class="left-avatar-userInfo">
              <img :src="avatar"/>
            </div>
            <div class="right-userInfo">
              <p class="user-name">
                <span>用户名：</span>
                <span>{{userName}}</span>
              </p>
              <p class="user-email">
                <span>邮箱：</span>
                <span>{{userEmail}}</span>
              </p>
            </div>
          </div>
          <!-- 账户预览 -->
          <div class="preview-account">
            <h5>账户预览</h5>
            <ul>
              <li v-for="item in accountDataList" :key="item.index">
                <p class="assets-value">{{item.balance}}</p>
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
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'
  import bottomTab from '../../components/bottomTab'

  export default {
    data() {
      return {
        userName: '',
        userEmail: '',
        avatar: '',
        currency: '',
        balance: '',
        accountList: ['账户预览', '我的账单'],
        currentIndex: 0,
        accountDataList: []
      }
    },
    mounted() {
      this.getUserInfo()
      this.getUserBalance()
    },
    methods: {
      getUserInfo() {
      },
      getUserBalance() {
        this.$http.post(this.$api + `/user/balance`).then((res) => {
          if (res.success) {
            let user = res.data.user
            this.accountDataList = res.data.account
            this.userEmail = user.userEmail
            this.userName = user.userName
            // this.avatar = user.userHeadImage
          }
        })
      }
    },
    components: {
      bottomTab,
      mobileHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .account
    .web-pc
      width 100%
      position absolute
      top 0
      background-image url("../../assets/images/common/BG2.jpg")
      background-size cover
      background-position center
      .nav-account
        margin 0 auto
        padding-top 170px
        width 1320px
        min-height 1700px
        display flex
        flex-direction row
        justify-content start
        @media screen and (max-width: 1400px) {
          padding: 180px 80px 0
          justify-content center
          width auto
        }
        .tabs
          margin-right 20px
          width 240px
          height 190px
          border 8px solid #ffc233
          border-radius 10px
          background-color #fff2b3
          li
            display flex
            align-items center
            margin 0 35px
            padding 30px 0
            border-bottom 2px solid #ffc233
            cursor pointer
            user-select none
            i
              display flex
              align-items center
              margin-right 30px
            span
              font-size 20px
              font-weight bold
              color #ffc233
            &.is-active
              span
                color #b05500
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
