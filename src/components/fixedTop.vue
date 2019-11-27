<template>
  <div class="fixed-top">
    <div class="goback" v-show="isGoBack" @click="goBack">
      <div class="goback-icon">
        <img src="../assets/images/mobieBase/goback.png" alt="">
      </div>
    </div>
    <div class="name" :class="{'padding-left': !isGoBack}">{{titleName}}</div>
    <div class="info-btn" @click="$router.push('/fighting')" v-if="iconFlag"><img src="../assets/images/mobieBase/info-button.png" alt=""></div>
    <div class="message-box" v-show="messageShow" @click="gotoMsg">
      <img src="../assets/images/mobieBase/message.png" alt="">
      <div class="message-num" v-show="totalCount > 0">{{totalCount}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      totalCount: 0
    }
  },
  props: {
    iconFlag: false,
    titleName: '',
    messageShow: {
      type: Boolean,
      default: true
    },
    isGoBack: {
      type: Boolean,
      default: true
    },
    isGoNumber: false
  },
  created () {
    this.getGameMessage(1)
    // this.checkIcon()
  },
  methods: {
    goBack () {
      if (this.isGoBack === true && !this.isGoNumber) { // 返回上一页
        this.$router.go(-1)
      } else if (this.isGoBack === true && this.isGoNumber === true) { // 返回指定的页面
        this.$emit('goPath')
      }
    },
    // 查询参与游戏消息列表
    getGameMessage (pageIndex) {
      this.$http.post(this.$api + '/game/queryGameMessageList', {
        pageIndex: pageIndex,
        pageSize: 20
      }).then(res => {
        if (res.success === true) {
          this.totalCount = res.mapData.totalCount
        }
      })
    },
    // checkIcon () {
    //   if (this.$route.path.indexOf('home') !== -1) {
    //     this.iconFlag = true
    //   }
    // },
    gotoMsg () {
      if (this.loginFlag === true) {
        this.$router.push('/message')
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginFlag'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fixed-top
  position: fixed
  left: 0
  top: 0
  height: 50px
  width: 100%
  background-color: #125186
  display flex
  align-items center
  z-index: 200
  border-bottom: 4px solid #ff9933
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .goback
    width: 50px
    box-sizing border-box
    padding: 10px 10px 10px 20px
    .goback-icon
      width: 16px
      img
        display: block
        width 100%
  .name
    padding-right: 50px
    text-align: center
    font-size: 18px
    font-weight: bold
    color #fff
    flex 1
    &.padding-left
      padding-left: 50px
  .message-box
    width: 30px
    position: absolute
    right: 0
    top: 50%
    transform translateY(-50%)
    padding-right: 20px
    box-sizing content-box
    img
      display: block
      width 100%
    .message-num
      position: absolute
      right: 15px;
      top: -3px;
      padding: 2px 6px
      border-radius 8px
      font-size: 10px
      background-color: #FC534C
      line-height: 1
      color #fff
  .info-btn
    position: absolute
    right 70px
    top: 50%
    transform translateY(-50%)
    width 30px
    height 25px
    img
      display block
      width 100%
</style>
