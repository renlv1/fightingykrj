<template>
  <transition name="dialog">
    <div class="g-dialog">
      <div class="g-dialog-mask"></div>
      <div class="g-dialog-wrap border-bg" v-if="userInfo.openTradePassword === 2 && (userInfo.openGoogleCode === 2 || this.userInfo.openEmailCode === 2)">
        <div class="g-dialog-title title-m" v-show="title" v-html="title"></div>
        <div class="input">
          <input type="password" placeholder="请输入安全密码" v-model.trim="password">
        </div>
        <div class="input" v-if="userInfo.openGoogleCode === 2">
          <input type="text" placeholder="请输入谷歌验证码" v-model.trim="verifiCode">
        </div>
        <div class="input" v-else>
          <input type="text" placeholder="请输入邮箱验证码" v-model.trim="verifiCode">
          <div class="send" @click="sendCode" :class="{'disable-send':isDisabled}">{{sendBtnValue}}</div>
        </div>
        <div class="err-msg" v-show="sendErrMsg">{{sendErrMsg}}</div>
        <div class="g-dialog-btn-wrap">
          <button class="g-dialog-btn g-dialog-ok"  @click="okCallback">确认</button>
          <button class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">取消</button>
        </div>
      </div>
      <div class="g-dialog-wrap border-bg" v-if="errMsgShow">
        <div class="g-dialog-title title-m">{{codeMsg}}</div>
        <div class="g-dialog-btn-wrap btn-w-i">
          <button class="g-dialog-btn g-dialog-ok"  @click="cancelCallback">确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      sendBtnTimes: 60,
      sendErrMsg: '',
      sendBtnValue: '发送',
      errMsgShow: '',
      codeMsg: '',
      msg: '',
      password: '',
      verifiCode: '',
      timer5: null,
      isDisabled: false
    }
  },
  props: {
    type: String,
    title: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  mounted () {
    if (this.userInfo.openTradePassword !== 2) {
      this.errMsgShow = true
      this.codeMsg = '您先设置安全密码'
    }
    if (this.userInfo.openGoogleCode !== 2 && this.userInfo.openEmailCode !== 2) {
      this.errMsgShow = true
      this.codeMsg = '您先设置验证码'
    }
  },
  methods: {
    // 发送邮箱验证码
    sendCode () {
      if (this.sendBtnValue === '发送') {
        this.isDisabled = true
        this.$http.post(this.$api + '/user/sendverifycode', {
          email: this.userInfo.userEmail,
          sendType: 2
        }).then(res => {
          if (res.success === true) {
            this.countDown()
            this.sendErrMsg = '发送成功'
          } else {
            this.isDisabled = false
            this.sendErrMsg = res.msg
          }
          setTimeout(() => {
            this.sendErrMsg = ''
          }, 3500)
        })
      }
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.sendBtnValue = '发送'
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer5)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer5 = setTimeout(() => this.countDown(), 1000)
      }
    },
    // 确定
    okCallback () {
      this.sendErrMsg = ''
      let codeType
      if (this.userInfo.openGoogleCode === 2) {
        codeType = 1
      } else {
        codeType = 2
      }
      if (this.password === '') {
        this.sendErrMsg = '请输入安全密码'
        return
      }
      if (this.verifiCode === '') {
        this.sendErrMsg = '请输入验证码'
        return
      }
      this.$http.post(this.$api + '/security/safetyValidate', {
        tradePwd: this.password,
        code: this.verifiCode,
        codeType: codeType
      }).then(res => {
        if (res.resultCode === '') {
          // 支付验证成功
          this.$emit('successDialog')
        } else {
          this.sendErrMsg = res.msg
        }
      }).catch(err => {
        console.log(err)
        this.sendErrMsg = '系统错误'
      })
    },
    // 取消
    cancelCallback () {
      this.sendErrMsg = ''
      this.verifiCode = ''
      this.password = ''
      this.msg = ''
      this.$emit('cancelDialog')
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  beforeDestroy () {
    clearTimeout(this.timer5)
  }
}
</script>
