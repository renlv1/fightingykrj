<template>
  <div class="login">
    <div class="web-mob">
      <mobile-header :hasBackIcon="false" :hasMessageIcon="false" title="登录"></mobile-header>
    </div>
    <div class="login-popup">
      <div class="web-pc">
        <div class="loginDescription"></div>
      </div>
      <div class="web-mob">
        <div class="loginDescription"></div>
      </div>
      <div class="left-img-box"></div>
      <div class="right-img-box"></div>
      <div class="input-group">
        <div class="input-child-group">
          <input type="text" @keyup.enter="login" @input="errMsg = ''" v-model.trim="loginUserName" placeholder="输入登录用户名"/>
        </div>
        <div class="input-child-group">
          <input type="password" @keyup.enter="login" @input="errMsg = ''" v-model.trim="loginPassword" placeholder="输入登录密码"/>
        </div>
        <p class="errMsg">{{errMsg}}</p>
      </div>
      <div class="btn-wrapper">
        <img v-show="isLoading" class="login-img" width="40" height="40" src="../../assets/images/login/loading.gif"/>
        <p v-show="!isLoading" class="btn-sure" @click="login">登录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'

  export default {
    name: 'login',
    data() {
      return {
        isLoading: false,
        loginUserName: '',
        loginPassword: '',
        errMsg: ''
      }
    },
    components: {
      mobileHeader
    },
    created() {
      this.getLoginList()
    },
    methods: {
      getLoginList() {
        this.$http.post(this.$api + `/platformaccount/platformAccountList`).then((res) => {
          if (res.success) {
            console.log(res)
          }
        })
      },
      login() {
        this.errMsg = ''
        if (this.loginUserName && this.loginPassword) {
          this.isLoading = true
          this.$http.post(this.$api + `/user/userlogin?userName=${this.loginUserName}&password=${this.loginPassword}&platformId=-1`).then((res) => {
            if (res.success) {
              this.$router.push('/home')
              this.$store.dispatch('balanceAction')
            } else {
              this.errMsg = res.msg
              console.log(this.errMsg)
            }
            this.isLoading = false
          })
        } else {
          this.errMsg = '登录用户名或登录密码不为空！'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login
    position absolute
    top 0
    bottom 0
    width 100%
    background-repeat no-repeat
    background-position center
    @media screen and (min-width: 1200px) {
      padding-top 300px
      height 1600px
      background-image url("../../assets/images/common/BG2.jpg")
      background-size: cover
    }
    @media screen and (max-width: 1200px) {
      min-height 100vh
      background-image url("../../assets/mobile-images/login/BG.png")
      background-size cover
    }
    .login-popup
      position relative
      display flex
      flex-direction column
      align-items center
      margin 0 auto
      @media screen and (min-width: 1200px) {
        background-image url("../../assets/images/login/loginTitle.png")
        width 600px
        height 732px
      }
      @media screen and (max-width: 1200px) {
        margin-top 75px
        background-image url("../../assets/images/login/loginTitle.png")
        width 270px
        height 330px
        background-size cover
      }
      .left-img-box
        position absolute
        left -20px
        background-size cover
        @media screen and (min-width: 1200px) {
          background-image url("../../assets/images/login/login-left.png")
          width 92px
          height 96px
        }
        @media screen and (max-width: 1200px) {
          background-image url("../../assets/mobile-images/login/login-left.png")
          width 46px
          height 48px
        }
      .right-img-box
        position absolute
        right 0
        width 127px
        height 113px
        background-size cover
        // z-index -999
        @media screen and (min-width: 1200px) {
          background-image url("../../assets/images/login/login-right.png")
          width 127px
          height 113px
          top: -30px
        }
        @media screen and (max-width: 1200px) {
          background-image url("../../assets/mobile-images/login/login-right.png")
          width 63px
          height 56px
          top: -20px
        }
      .web-pc
        .loginDescription
          margin-top 150px
          width 248px
          height 187px
          background-image url("../../assets/images/login/loginDescription.png")
      .web-mob
        .loginDescription
          margin-top 35px
          width 128px
          height 100px
          background-image url("../../assets/mobile-images/login/loginDescription.png")
          background-size cover
          background-position 30% -10%
      .input-group
        position relative
        width 100%
        .input-child-group
          background-size cover
          @media screen and (min-width: 1200px) {
            margin 50px auto 40px
            width 480px
            height 65px
            background-image url("../../assets/images/login/input.png")
          }
          @media screen and (max-width: 1200px) {
            margin 20px auto
            width 240px
            height 38px
            background-image url("../../assets/mobile-images/login/input.png")
          }
          input
            width 100%
            height 100%
            padding-left 30px
            font-size 20px
            color #b05500
            @media screen and (min-width: 1200px) {
              font-size 20px
            }
            @media screen and (max-width: 1200px) {
              font-size 14px
            }
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color #b05500
            @media screen and (min-width: 1200px) {
              font-size 20px
            }
            @media screen and (max-width: 1200px) {
              font-size 14px
            }
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color #b05500
            @media screen and (min-width: 1200px) {
              font-size 20px
            }
            @media screen and (max-width: 1200px) {
              font-size 14px
            }
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color #b05500
            @media screen and (min-width: 1200px) {
              font-size 20px
            }
            @media screen and (max-width: 1200px) {
              font-size 14px
            }
          }
          :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color #b05500
            @media screen and (min-width: 1200px) {
              font-size 20px
            }
            @media screen and (max-width: 1200px) {
              font-size 14px
            }
          }
        .errMsg
          width 100%
          text-align center
          position absolute
          bottom 0
          color #b05500
          @media screen and (max-width: 1200px) {
            font-size 12px
          }
      .btn-wrapper
        position relative
        display flex
        justify-content center
        margin-top 20px
        background-size cover
        cursor pointer
        user-select none
        align-items center
        @media screen and (max-width: 1200px) {
          margin-top 5px
        }
        &:hover, &:active
          @media screen and (min-width: 1200px) {
            width 480px
            height 65px
            background-image url("../../assets/images/login/activeLoginBtn.png")
            background-size cover
          }
        @media screen and (min-width: 1200px) {
          width 480px
          height 65px
          background-image url("../../assets/images/login/loginBtn.png")
        }
        @media screen and (max-width: 1200px) {
          width 240px
          height 38px
          background-image url("../../assets/mobile-images/login/loginBtn.png")
        }
        .login-img
          display block
          margin 0 auto
        .btn-sure
          position absolute
          font-size 24px
          color #fff
          text-align center
          @media screen and (min-width: 1200px) {
            line-height 65px
            font-size 24px
          }
          @media screen and (max-width: 1200px) {
            line-height 38px
            font-size 14px
          }
</style>
