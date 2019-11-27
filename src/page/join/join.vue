<template>
  <div class="join-w">
    <fixedTop :titleName="titleName" :messageShow="true" :isGoBack="false"></fixedTop>
    <ul class="amount-uls">
      <div class="no-result" v-if="noData">
        <img src="../../assets/images/common/no_data.png" alt="" class="img">
        <p class="text">暂无数据</p>
      </div>
      <li class="amount-list" v-for="(item, index) in gameList" :key="index">
        <div class="list1">
          <div class="left-time">
            <div class="star-img">
              <img src="../../assets/images/home/star.png" alt="">
            </div>
            <div class="time">剩余时间：<span>{{item.finishLastTime}} S</span></div>
          </div>
          <div class="number">编号：{{item.id}}</div>
        </div>
        <div class="money">{{item.totalJoinAmount}} {{item.joinCurrency}}</div>
        <p class="text2">当前奖金</p>
        <div class="people">
          <div>剩余人数：{{item.nowCount}}</div>
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
    <tab-bar></tab-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import Dialog from '@/components/dialog2'
export default {
  data() {
    return {
      noData: false,
      gameList: [],
      titleName: '我的参与'
    }
  },
  mounted () {
    let self = this
    window.onresize = function () {
      if (self.$route.path === '/join' && window.innerWidth > 1200) {
        self.$router.push('/home')
      }
    }
  },
  created () {
    this.getMyJoinGameList(1)
  },
  methods: {
    // 我的参与列表
    getMyJoinGameList (pageIndex) {
      this.$http.post(this.$api + '/game/myJoinGameList', {
        gameStatus: 1, // 游戏状态 1投注未开始 2投注已开始未结束
        pageIndex: pageIndex,
        pageSize: 10
      }).then(res => {
        if (res.success === true) {
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
            this.noData = true
            this.gameList = []
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
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve),
    tabBar: resolve => require(['@/components/tabBar.vue'], resolve)
  }
}
</script>

<style lang="less" scoped>
.join-w{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background: url("../../assets/images/mobieBase/bg2.png") no-repeat center / cover;
  overflow: auto;
  .amount-uls{
    padding: 70px 10px 100px;
    .amount-list{
      width: 100%;
      background-color: #FFF2B3;
      border: 8px solid #ffc233;
      border-radius: 10px;
      padding: 16px 16px 28px 16px;
      color: #b05500;
      position: relative;
      margin-bottom: 36px;
      .list1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-time{
          display: flex;
          align-items: center;
          .star-img{
            width: 20px;
            margin-right: 5px;
            img{
              width: 100%;
              display: block;
            }
          }
        }
        .time, .number{
          font-size: 14px;
          font-weight: 900;
        }
        .time{
          color: #b05500;
          span{
            color: #299c91;
          }
        }
      }
      .money{
        margin: 20px 0 10px;
        font-size: 18px;
        font-weight: bold;
      }
      .text2{
        font-size: 14px;
        margin-bottom: 10px;
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
            padding: 0 15px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            background-color: #299c91;
            .nums{
              font-size: 12px;
              color: #fff;
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
          font-size: 14px;
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
</style>
