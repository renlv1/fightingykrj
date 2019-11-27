<template>
  <div class="preview-wrapper">
    <div class="web-pc">
      <div class="preview-account">
        <div class="preview-account-top">
          <h3>账户预览</h3>
          <ul>
            <li v-for="item in accountList" :key="item.index">
              <span class="item-account-value">{{item.balance}}</span>
              <span class="item-account-currency">{{item.currency}} 资产</span>
            </li>
          </ul>
        </div>
        <!-- 我的参与 -->
        <div class="preview-account-bottom">
          <h3>我的参与</h3>
          <ul>
            <li v-for="item in joinList" :key="item.index">
              <div class="time-num-item">
                <div class="time">
                  <img width="26" height="26" src="../../assets/images/account/xing.png"/>
                  <span>剩余时间：</span>
                  <span style="margin-top: 4px">{{item.finishLastTime}} S</span>
                </div>
                <div class="num">
                  <span>编号:</span>
                  <span>{{item.id}}</span>
                </div>
              </div>
              <div class="bonus-item">
                <span class="value-bonus-item">{{item.totalJoinAmount}} {{item.joinCurrency}}</span>
                <span class="title-bonus-item">当前奖金</span>
              </div>
              <div class="num-people-conditions-item">
                <div class="num-people">
                  <span>剩余人数({{item.totalJoinCount}})</span>
                </div>
                <div class="conditions">
                  <span class="conditions-title">加入条件</span>
                  <div class="conditions-btn-wrapper">
                    <span class="value-btn">{{item.joinAmount}} {{item.joinCurrency}}</span>
                  </div>
                </div>
              </div>
              <div class="btn-wrapper-item">
                <div class="login-out-btn" @click="exitGame(item)">立即退出</div>
                <div class="detail-btn" @click="toPlay(item)">详情</div>
              </div>
            </li>
          </ul>
        </div>
        <turn-page :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></turn-page>
      </div>
    </div>
  </div>
</template>

<script>
  import turnPage from '../../components/turnPage'
  import Dialog from '@/components/dialog2'
  export default {
    name: 'previewAccount',
    data() {
      return {
        currency: '',
        balance: '',
        joinList: [],
        timeObj: '',
        timer: null,
        accountList: [],
        pageIndex: 1,
        pageSize: 4,
        totalPage: 0,
        currentPage: 1 // 默认当前页为1
      }
    },
    created() {
    },
    mounted() {
      this.getUserBalance()
      this.getMyJoinList(1)
    },
    methods: {
      changeObjDate(start, finish) {
        var startTime = new Date(start)
        var finishTime = new Date(finish)
        var date = finishTime - startTime
        this.countDown(date)
      },
      countDown(times) {
        var timer = null
        timer = setInterval(() => {
          var day = 0
          var hour = 0
          var minute = 0
          var second = 0 // 时间默认值
          if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24))
            hour = Math.floor(times / (60 * 60)) - (day * 24)
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60)
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
          }
          if (day <= 9) day = '0' + day
          if (hour <= 9) hour = '0' + hour
          if (minute <= 9) minute = '0' + minute
          if (second <= 9) second = '0' + second
          this.timeObj = day + '天' + hour + '小时' + minute + '分钟' + second + '秒'
          // this.timeObj = day + '天' + hour + '小时'
          this.joinList.forEach((item) => {
            item.objTime = this.timeObj
          })
          times--
        }, 1000)
        if (times <= 0) {
          clearInterval(timer)
        }
      },
      getMyJoinList(pageIndex) {
        this.$http.post(this.$api + `/game/myJoinGameList`, {
          pageIndex: pageIndex,
          pageSize: this.pageSize
        }).then((res) => {
          clearInterval(this.timer)
          this.totalPage = res.mapData.totalPage
          // var timeArr = []
          if (res.success === true) {
            let playData = res.data
            if (res.data && res.data.length > 0) {
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
                this.joinList = playData
              }, 1000)
            } else {
              this.joinList = []
            }
          }
        })
      },
      getUserBalance() {
        this.$http.post(this.$api + `/user/balance`).then((res) => {
          if (res.success) {
            this.accountList = res.data.account
          }
        })
      },
      parentTurnPage(page) {
        this.currentPage = page
        this.getMyJoinList(page)
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
                this.getMyJoinList(1)
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
      toPlay (item) {
        this.$router.push({
          path: '/ongoing',
          query: {
            gameId: item.id
          }
        })
      }
    },
    components: {
      turnPage
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .preview-wrapper
    .web-pc
      .preview-account
        width 1060px
        @media screen and (max-width: 1400px) {
          width 800px
        }
        .preview-account-top
          padding 40px 0 0 40px
          border 8px solid #ffc233
          border-radius 10px
          background-color #fff2b3
          h3
            font-size 24px
            font-weight bold
            color #299c91
          ul
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content flex-start
            li
              width 33%
              display flex
              flex-direction column
              padding 30px 0
              color #b05500
              .item-account-value
                font-size 20px
                font-weight bold
              .item-account-currency
                font-size 16px
        .preview-account-bottom
          h3
            padding 40px 0 0 40px
            margin-bottom 40px
            font-size 24px
            font-weight bold
            color #299c91
          ul
            display flex
            flex-direction row
            flex-wrap wrap
            justify-content space-between
            li
              position relative
              margin-bottom 67px
              width 48%
              padding 20px 40px 50px 40px
              border 8px solid #ffc233
              border-radius 10px
              color #b05500
              background-color #fff2b3
              @media screen and (max-width: 1400px) {
                width auto
              }
              &:nth-child(odd) {
                margin-right 20px
              }
              &:nth-child(even) {
                margin-left 20px
              }
              .time-num-item
                display flex
                flex-direction row
                justify-content space-between
                align-items center
                font-weight bold
                margin-bottom 20px
                .time
                  display flex
                  align-items center
                  img
                    margin-right 10px
                  span
                    display inline-block
              .bonus-item
                span
                  display block
                .value-bonus-item
                  font-size 24px
                  font-weight bold
                .title-bonus-item
                  margin 12px 0 15px 0
              .num-people-conditions-item
                display flex
                flex-direction row
                justify-content space-between
                align-items center
                .conditions
                  display flex
                  flex-direction row
                  align-items center
                  .conditions-title
                    margin-right 10px
                  .conditions-btn-wrapper
                    width 110px
                    height 36px
                    line-height 36px
                    background-color #299c91
                    border-radius 20px
                    display flex
                    justify-content center
                    .value-btn
                      color #fff
              .btn-wrapper-item
                width 100%
                position absolute
                left 0
                display flex
                flex-direction row
                justify-content space-between
                text-align center
                line-height 54px
                color #fff
                font-size 20px
                cursor pointer
                user-select none
                @media screen and (max-width: 1400px) {
                  font-size 16px
                }
                .login-out-btn
                  position absolute
                  margin-top 20px
                  left 30px
                  width 180px
                  height 54px
                  background-image url("../../assets/images/account/login-out-btn.png")
                  background-size cover
                  @media screen and (max-width: 1400px) {
                    margin-top 36px
                    height 35px
                    width 120px
                    line-height 35px
                  }
                .detail-btn
                  position absolute
                  margin-top 20px
                  right 30px
                  width 180px
                  height 54px
                  background-image url("../../assets/images/account/detail-btn.png")
                  background-size cover
                  @media screen and (max-width: 1400px) {
                    margin-top 36px
                    height 35px
                    width 120px
                    line-height 35px
                  }
</style>
