<template>
  <div v-show="$route.path !== '/login'" class="sidebar-w">
    <div class="sidebar" :class="{'translate-con': sideBarShow}">
      <!--1 侧边栏tab-->
      <ul class="sidebar-tab">
        <li class="user-tab list-tab" :class="{'current-tab': currentIndex === 0}" ref="listTab">
          <div class="bg-wrapper bg-wrapper-user" @click="showContainer(0)">
            <div class="bg-user">
              <img src="../assets/images/sidebar/user.png" alt="">
              <div class="count" v-if="totalCount > 0">{{totalCount}}</div>
            </div>
            <div class="tab-tip tab-tip-user">我的账户<div class="icon-tip"></div></div>
          </div>
        </li>
        <li class="message-tab list-tab" :class="{'current-tab': currentIndex === 1}" ref="listTab2">
          <div class="bg-wrapper bg-wrapper-message" @click="showContainer(1)">
            <div class="bg-message">
              <img src="../assets/images/sidebar/messages.png" alt="">
            </div>
            <div class="tab-tip tab-tip-message">消息<div class="icon-tip"></div></div>
          </div>
          <div class="backtop" v-show="scrollShow" @click="scrollToTop">
            <div class="sanjiao"></div>
            <span>TOP</span>
            <div class="tab-tip-top">返回顶部<div class="icon-tip"></div></div>
          </div>
        </li>
      </ul>
      <!--2 内容-->
      <div class="sidebar-container">
        <!--我的账户内容-->
        <div class="user-container side-m" v-if="currentIndex === 0">
          <div class="cont-header">
            <div class="left">
              <div class="close" @click="sideBarBg">
                <img src="../assets/images/sidebar/close.png" alt="">
              </div>
              <h3 class="text">我的账户</h3>
            </div>
            <div class="right" @click="logOut">退出登录</div>
          </div>
          <div class="userinfo-w" @click="toUser">
            <div class="nickname">用户名：{{userInfo.userName}}</div>
            <div class="username">邮箱：{{userInfo.userEmail}}</div>
            <div class="text">查看详情</div>
          </div>
          <h3 class="tab-item-title">我的参与</h3>
          <div class="no-result no-result-sidebar" v-if="noData">
            <img src="../assets/images/common/no_data.png" alt="" class="img">
            <p class="text">暂无数据</p>
          </div>
          <GeminiScrollbar v-if="!noData">
            <ul class="amount-uls">
              <li class="amount-list" v-for="(item, index) in gameList" :key="index">
                <div class="list1">
                  <div class="time">剩余时间：{{item.finishLastTime}} S</div>
                  <div class="number">编号：{{item.id}}</div>
                </div>
                <div class="money">{{item.totalJoinAmount}} {{item.joinCurrency}}</div>
                <p class="text2">当前奖金</p>
                <div class="people">
                  <div>剩余人数（{{item.nowCount}}）</div>
                  <div class="right-join">
                    <span>加入条件：</span>
                    <div class="join-money">
                      <span class="nums">{{item.joinAmount}} {{item.joinCurrency}}</span>
                    </div>
                  </div>
                </div>
                <div class="btn-w">
                  <div class="btn-item" @click="exitGame(item)">立即退出</div>
                  <div class="btn-item" @click="toplay(item)">详情</div>
                </div>
              </li>
            </ul>
          </GeminiScrollbar>
        </div>
        <!--消息内容-->
        <div class="msg-container side-m" v-if="currentIndex === 1">
          <div class="cont-header">
            <div class="left">
              <div class="close" @click="sideBarBg">
                <img src="../assets/images/sidebar/close.png" alt="">
              </div>
              <h3 class="text">消息（{{msgTotalCount}}）</h3>
            </div>
            <div class="right" @click="readAll" v-show="msgTotalCount > 0">全部已读</div>
          </div>
          <div class="no-result no-result-sidebar" v-if="noMessage">
            <img src="../assets/images/common/no_data.png" alt="" class="img">
            <p class="text">暂无数据</p>
          </div>
          <GeminiScrollbar v-else>
            <ul class="message-uls">
              <li class="message-list" v-for="(item, index) in messageData" :key="index" @click="gotoGame(item)">
                <div class="tips">
                  <span class="text1">消息提醒</span>
                  <span class="text2">({{item.showTime}})</span>
                </div>
                <p class="info-p">{{item.message}}</p>
              </li>
            </ul>
          </GeminiScrollbar>
        </div>
      </div>
    </div>
    <div class="bg-c" @click="sideBarBg" v-show="sideBarShow"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Dialog from '@/components/dialog2'
export default {
  data () {
    return {
      noMessage: false,
      messageData: [],
      noData: false,
      scrollShow: false,
      currentIndex: -1,
      sideBarShow: false,
      gameList: [],
      timer: null,
      totalCount: 0,
      msgTotalCount: 0,
      timer2: null
    }
  },
  created () {
    this.getGameMessage(1)
    if (this.$route.path !== '/login') {
      this.$store.dispatch('balanceAction')
      if (this.loginFlag === true) {
        this.getMyJoinGameList(1)
      }
    }
    this.timer2 = setInterval(() => {
      this.getGameMessage(1)
    }, 3000)
    // this.getMyJoinGameList(1)
  },
  mounted () {
    window.addEventListener('scroll', this.scrollB)
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
          this.msgTotalCount = res.mapData.totalCount
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
              this.sideBarBg()
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
    },
    // 我的参与列表
    getMyJoinGameList (pageIndex) {
      this.$http.post(this.$api + '/game/myJoinGameList', {
        gameStatus: 1, // 游戏状态 1投注未开始 2投注已开始未结束
        pageIndex: pageIndex,
        pageSize: 10
      }).then(res => {
        if (res.success === true) {
          this.gameList = []
          this.totalCount = res.mapData.totalCount
          let playData = res.data
          if (res.data && res.data.length > 0) {
            this.noData = false
            this.timer = setInterval(() => {
              playData.forEach(item => {
                let times = Number(item.finishLastTime)
                if (times > 0) {
                  times--
                  item.finishLastTime = times
                } else {
                  item.finishLastTime = 0
                }
              })
              this.gameList = playData
            }, 1000)
          } else {
            this.gameList = []
            this.noData = true
          }
        }
      })
    },
    // 退出游戏
    exitGame (item) {
      Dialog({
        title: '退出游戏',
        okFn: () => {
          this.$http.post(this.$api + '/game/exitGame', {
            gameHouseId: item.id
          }).then(res => {
            if (res.success === true) {
              this.getMyJoinGameList(1)
            } else {
              Dialog({
                title: res.msg
              })
            }
          })
        }
      })
    },
    // 跳转到游戏详情
    toplay (item) {
      this.sideBarBg()
      this.$router.push({
        path: '/ongoing',
        query: {
          gameId: item.id
        }
      })
    },
    // 跳转到账户预览
    toUser () {
      this.sideBarBg()
      this.$router.push('/account')
    },
    scrollB () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      if (sTop > 0) {
        this.scrollShow = true
      } else {
        this.scrollShow = false
      }
    },
    showContainer (index) {
      if (this.loginFlag === false) {
        this.$router.push('/login')
        return
      }
      if (index === 0) {
        if (this.$refs.listTab.className.indexOf('current-tab') > -1) {
          this.sideBarShow = false
          this.currentIndex = -1
        } else {
          this.currentIndex = 0
          this.sideBarShow = true
        }
      } else {
        if (this.$refs.listTab2.className.indexOf('current-tab') > -1) {
          this.sideBarShow = false
          this.currentIndex = -1
        } else {
          this.currentIndex = 1
          this.sideBarShow = true
        }
      }
    },
    sideBarBg () {
      this.sideBarShow = false
      this.currentIndex = -1
    },
    // 退出登录
    logOut () {
      Dialog({
        title: '退出登录',
        type: 'confirm',
        okFn: () => {
          // user/logout
          this.$http.post(this.$api + '/user/logout').then(res => {
            this.sideBarBg()
            this.totalCount = 0
            this.$store.dispatch('balanceAction')
            this.$router.push('/login')
          })
        }
      })
    },
    // 返回顶部
    scrollToTop () {
      let disTop = document.documentElement.scrollTop || document.body.scrollTop
      let timer = setInterval(function () {
        disTop = disTop - 60
        document.documentElement.scrollTop = disTop
        document.body.scrollTop = disTop
        if (disTop < 1) {
          clearInterval(timer)
        }
      }, 10)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  watch: {
    loginFlag (newFlag) {
      if (newFlag === true) {
        this.getMyJoinGameList(1)
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'loginFlag'
    ])
  }
}
</script>

<style lang="less" scoped>
.sidebar-w{
  @media screen and (max-width: 1200px) {
    display: none;
  }
  @media screen and (min-width: 1200px) {
    display: block;
  }
}
.icon-tip{
  position: absolute;
  width:0;
  height:0;
  line-height: 16px;
  text-align: center;
  top: 10px;
  right: -8px;
  border-width:8px 0 8px 8px;
  border-style:solid;
  border-color:transparent transparent transparent rgba(0,0,0,.6);/*透明 透明 透明 灰*/
}
img{
  width: 100%;
  display: block;
}
.bg-c{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.sidebar{
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 420px;
  z-index: 100;
  transform: translate(360px, 0);
  transition: all .3s linear;
  &.translate-con{
    transform: translate(0, 0);
  }
  .sidebar-tab{
    height: 100%;
    width: 60px;
    .list-tab{
      width: 100%;
      height: 50%;
      background-color: rgba(0,0,0,.4);
      &.current-tab{
        background-color: rgba(0,0,0,.6);
      }
      .bg-wrapper{
        padding: 16px;
        height: 30px;
        box-sizing: content-box;
        cursor: pointer;
        position: relative;
      }
      .bg-wrapper-user{
        align-self: flex-end;
        &:hover{
          .tab-tip{
            display: flex;
          }
        }
      }
      .bg-wrapper-message:hover{
        .tab-tip{
          display: flex;
        }
      }
      .tab-tip-user{
        bottom: 16px;
      }
      .tab-tip-message{
        top: 16px;
      }
      .tab-tip{
        display: none;
        position: absolute;
        left: -118px;
        width: 110px;
        height: 40px;
        background-color: rgba(0,0,0,.6);
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
      }
    }
    .user-tab{
      display: flex;
      justify-content: center;
      .bg-user{
        align-self: flex-end;
        width: 28px;
        position: relative;
        .count{
          position: absolute;
          top: -10px;
          right: -7px;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          padding: 2px 4px;
          background-color: #fc534c;
        }
      }
    }
    .message-tab{
      display: flex;
      justify-content: center;
      .bg-message{
        width: 30px;
      }
    }
    .backtop{
      position: absolute;
      bottom: 0;
      right: 360px;
      width: 60px;
      height: 60px;
      box-sizing: content-box;
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      &:hover{
        .tab-tip-top{
          display: flex;
        }
      }
      .sanjiao{
        width:0;
        height:0;
        border-width:0 6px 6px 6px;
        border-style:solid;
        border-color: transparent transparent #fff transparent;/*透明 透明 透明 灰*/
        margin-bottom: 4px;
      }
      .tab-tip-top{
        display: none;
        position: absolute;
        left: -118px;
        width: 110px;
        height: 40px;
        background-color: rgba(0,0,0,.6);
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .sidebar-container{
    position: absolute;
    left: 60px;
    top: 0;
    width: 360px;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    .side-m{
      width: 320px;
      height: 100%;
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      /deep/ .gm-scrollbar{
        .thumb{
          width: 8px;
          border-radius: 4px;
          background-color: #ffc233;
        }
        &.-horizontal{
          display: none;
        }
      }
      .cont-header{
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        min-height: 80px;
        .left{
          display: flex;
          align-items: center;
          .close{
            width: 20px;
            cursor: pointer;
          }
          .text{
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            margin-left: 30px;
          }
        }
        .right{
          font-size: 18px;
          color: #ffcc00;
          cursor: pointer;
        }
      }
      .userinfo-w{
        width: 300px;
        height: 160px;
        background-color: #008bff;
        border-radius: 10px;
        padding: 30px;
        color: #fff;
        cursor: pointer;
        .nickname{
          font-size: 20px;
          margin-bottom: 18px;
        }
        .username{
          font-size: 16px;
        }
        .text{
          font-weight: bold;
          font-size: 16px;
          margin-top: 18px;
          text-align: center;
        }
      }
      .tab-item-title{
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        margin: 30px 0 20px;
      }
      .amount-uls{
        flex: 1;
        .amount-list{
          width: 300px;
          background-color: #FFF2B3;
          border: 8px solid #ffc233;
          border-radius: 10px;
          padding: 16px 16px 36px 16px;
          color: #b05500;
          position: relative;
          margin-bottom: 36px;
          .list1{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .time, .number{
              font-size: 12px;
              font-weight: 900;
            }
          }
          .money{
            margin: 20px 0 10px;
            font-size: 16px;
            font-weight: bold;
          }
          .text2{
            font-size: 12px;
            margin-bottom: 20px;
          }
          .people{
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .right-join{
              display: flex;
              align-items: center;
              .join-money{
                width: 66px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px;
                background-color: #299c91;
                .nums{
                  font-size: 12px;
                  color: #fff;
                  margin-right: 4px;
                }
                .money-icon{
                  width: 16px;
                }
              }
            }
          }
          .btn-w{
            position: absolute;
            bottom: -21px;
            left: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            .btn-item{
              width: 110px;
              height: 34px;
              color: #fff;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 34px;
              box-shadow: 0 5px 0 #ffc233;
              cursor: pointer;
              &:nth-child(1){
                background-color: #fc534c;
              }
              &:nth-child(2){
                background-color: #299c91;
              }
            }
          }
        }
      }
    }
    .msg-container{
      .message-uls{
        width: 320px;
        height: auto;
        flex: 1;
        .message-list{
          width: 300px;
          background-color: #FFF2B3;
          border: 8px solid #ffc233;
          border-radius: 10px;
          padding: 16px 12px 26px;
          margin-bottom: 20px;
          cursor: pointer;
          .tips{
            .text1{
              font-size: 16px;
              font-weight: 900;
              color: #fc534c;
            }
            .text2{
              font-weight: 900;
              color: #299c91;
            }
          }
          .info-p{
            font-size: 16px;
            color: #1a1a1a;
            line-height: 1.5;
            margin-top: 18px;
          }
        }
      }
    }
  }
}
</style>
