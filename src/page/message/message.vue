<template>
  <transition name="move">
    <div class="message-w">
      <fixedTop :titleName="titleName" :messageShow="false"></fixedTop>
      <ul class="message-uls">
        <li class="message-list"  v-for="(item, index) in messageData" :key="index" @click="gotoGame(item)">
          <p class="text1">游戏提醒（{{item.showTime}}）</p>
          <p class="text2">{{item.message}}</p>
        </li>
      </ul>
      <div class="btn-read" @click="readAll">全部已读</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Dialog from '@/components/dialog2'
export default {
  data() {
    return {
      titleName: '消息',
      noMessage: false,
      messageData: []
    }
  },
  created () {
    this.getGameMessage(1)
  },
  mounted () {
    let self = this
    window.onresize = function () {
      if (self.$route.path === '/message' && window.innerWidth > 1200) {
        self.$router.push('/home')
      }
    }
  },
  methods: {
    // 查询参与游戏消息列表
    getGameMessage (pageIndex) {
      this.$http.post(this.$api + '/game/queryGameMessageList', {
        pageIndex: pageIndex,
        pageSize: 20
      }).then(res => {
        if (res.success === true) {
          this.messageData = res.data
          if (res.mapData.totalCount > 0) {
            this.noMessage = false
          } else {
            this.noMessage = true
          }
        } else {
          this.noMessage = true
        }
      })
    },
    // 标为已读
    readAll () {
      Dialog({
        type: 'confirm',
        title: '确认全部标记为已读？',
        okFn: () => {
          this.$http.post(this.$api + '/game/gameMessageRead').then(res => {
            if (res.success === true) {
              this.getGameMessage(1)
            } else {
              Dialog({
                title: res.msg
              })
            }
          })
        }
      })
    },
    // 跳转到游戏房间
    gotoGame (item) {
      this.sideBarBg()
      this.$router.push({
        path: '/ongoing',
        query: {
          gameId: item.gameHouseId
        }
      })
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve)
  }
}
</script>

<style lang="less" scoped>
.move-enter-active, .move-leave-active{
  transition: all .2s linear
}
.move-enter, .move-leave-to{
  transform: translate3d(100%, 0, 0);
}
.message-w{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background: url("../../assets/images/mobieBase/bg2.png") no-repeat center / cover;
  overflow: auto;
  .message-uls{
    padding: 70px 10px 50px;
    .message-list{
      width: 100%;
      border: 5px solid #ffc233;
      padding: 15px 10px;
      border-radius: 6px;
      background-color: #FFF2B3;
      margin-bottom: 10px;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        right: -8px;
        top: -8px;
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #FC534C;
      }
      .text1{
        font-size: 15px;
        color: #FC534C;
        font-weight: 900;
        &.current-text{
          color: #299c91;
        }
      }
      .text2{
        font-size: 15px;
        color: #1a1a1a;
        margin-top: 6px;
        font-weight: 500;
      }
    }
  }
  .btn-read{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #FFF2B3;
    font-size: 16px;
    font-weight: 900;
    color: #EFA800;
    border-top: 5px solid #ffc233;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
