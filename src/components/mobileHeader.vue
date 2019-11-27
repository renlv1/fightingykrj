<template>
  <div class="mobile-header">
    <div class="back-icon" @click="$router.go(-1)" v-if="hasBackIcon">
      <img width="10" height="15" src="../assets/mobile-images/back.png"/>
    </div>
    <p class="title-header" v-html="title"></p>
    <div class="message-icon" v-if="hasMessageIcon">
      <img v-if="hasMsg" width="21" height="16" src="../assets/mobile-images/no-massage.png"/>
      <img v-if="!hasMsg" width="21" height="16" src="../assets/mobile-images/has-massage.png"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mobileHeader',
    data() {
      return {
        hasMsg: true
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      hasBackIcon: {
        type: Boolean
        // required: true
      },
      hasMessageIcon: {
        type: Boolean
        // required: true
      }
    },
    methods: {
      cheackHasNewMessage () { // 检测是否有新消息
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mobile-header
    position relative
    width 100%
    height 60px
    background #125186
    align-items center
    border-bottom 3px solid #ffc233
    .back-icon
      position absolute
      left 15px
      width 15px
      height 15px
      line-height 60px
    .title-header
      font-size 16px
      color #fff
      font-weight bold
      text-align center
      line-height 60px
    .message-icon
      position absolute
      right 15px
      margin-top -40px
      width 21px
      height 16px
</style>
