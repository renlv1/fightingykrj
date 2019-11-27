<template>
  <div class="home-w">
    <fixedTop :titleName="titleName" :isGoBack="false" :iconFlag="true"></fixedTop>
    <!--1 公告-->
    <div class="add-com">
      <div class="add-w" @click="gotoAdd">
        <div class="left">
          <div class="voice">
            <img src="../../assets/images/home/voice.png" alt="">
          </div>
          <span class="text-add">{{noticeData.title}}</span>
        </div>
        <div class="right">
          <div>{{noticeData.startTime}}</div>
          <div class="right-more">
            <img src="../../assets/images/home/right_more.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div v-if="notLogin">
      <!--2 tab操作栏-->
      <div class="home-tab-w">
        <div class="money-left-w">
          <!--pc 筛选-->
          <div class="money-left money-left-pc">
            <div class="current-money-w" @click="toggle(1)">
              <span class="money-text">{{activeCurrency}}</span>
              <div class="icon-row" :class="{'show-select': selectShow}">
                <img src="../../assets/images/home/arrow-bottom.png" alt="">
              </div>
            </div>
            <ul class="money-uls">
              <li v-for="(item, index) in moneyArr" :key="index"
                  class="money-list"
                  :class="{'current-money': currentMoney === index}"
                  @click="clickOne(item, index)">{{item.currencyAmount}}{{activeCurrency}} ({{item.canJoingHouseCount}})</li>
            </ul>
          </div>
          <!--mobile 筛选-->
          <div class="money-left money-left-m">
            <div class="current-money-w" @click="toggle(1)">
              <span class="money-text">{{activeCurrency}}</span>
              <div class="icon-row" :class="{'show-select': selectShow}">
                <img src="../../assets/images/home/arrow-bottom.png" alt="">
              </div>
            </div>
            <div class="current-box" @click="toggle(2)">
              <div class="currency">{{activeNum}}{{activeCurrency}}</div>
              <div class="icon-row" :class="{'show-select': selectShow2}">
                <img src="../../assets/images/home/arrow-bottom.png" alt="">
              </div>
            </div>
          </div>
          <!--投注币种-->
          <transition name="dialog">
            <div class="betting-currency-w" v-show="selectShow">
              <div class="group">
                <h3 class="currency-title">投注币种</h3>
                <ul class="currency-uls">
                  <li v-for="(item, index) in currencyArr" :key="index" class="currency-item" @click="checkOne(item.currencyCode, index, 1)" :class="{'active-currency': activeIndex === index}">{{item.currencyCode}}</li>
                </ul>
              </div>
            </div>
          </transition>
          <!--投注金额-->
          <transition name="dialog">
            <div class="betting-currency-w" v-show="selectShow2">
              <div class="group">
                <h3 class="currency-title">投注金额</h3>
                <ul class="currency-uls">
                  <li v-for="(item, index) in moneyArr" :key="index" class="currency-item" @click="checkOne(item.currencyAmount, index, 2)" :class="{'active-currency': activeIndex2 === index}">{{item.currencyAmount}} {{activeCurrency}}</li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
        <div class="create-play" @click="gotoCreate">创建游戏</div>
      </div>
      <!--3 游戏列表-->
      <ul class="play-uls">
        <li class="play-list" @click="gotoPlay(item)" v-for="(item, index) in playList" :key="index">
          <div class="bg-list" :class="{'bg3-list': playList && playList.length >= 5}"></div>
          <div class="list-c-w">
            <div class="one-t">
              <div class="left">
                <div class="star">
                  <img src="../../assets/images/home/star.png" alt="">
                </div>
                <div class="number-play">编号：{{item.id}}</div>
              </div>
              <div class="right">投注中： {{item.finishLastTime}} S</div>
            </div>
            <div class="t-2">累计奖金</div>
            <div class="t-3">{{item.totalJoinAmount}} {{item.joinCurrency}}</div>
            <div class="t-4">
              <div class="left">累计加入人数：{{item.totalJoinCount}}</div>
              <div class="right">
                <span>加入条件：</span>
                <div class="money-box">
                  <span class="moeny-t">{{item.joinAmount}} {{item.joinCurrency}}</span>
                </div>
              </div>
            </div>
            <div class="look-info">查看详情</div>
          </div>
        </li>
      </ul>
      <div class="turn-page-w">
        <v-turnPage :propsPage="totalPage" @orderLogTrunPage="toTurnPage"></v-turnPage>
      </div>
      <div class="no-result" v-if="noData">
        <img src="../../assets/images/common/no_data.png" alt="" class="img">
        <p class="text">暂无数据</p>
      </div>
    </div>
    <div class="not-login" v-else>
      <div class="pc-not">
        <img src="../../assets/images/common/not_login_pc.png" alt="">
        <p class="txt" @click="$router.push('/login')"><span class="login-t">登录</span>后查看游戏列表</p>
      </div>
      <div class="mobile-not">
        <img src="../../assets/images/common/not_login_mobile.png" alt="">
        <p class="txt">登录后查看游戏列表</p>
        <div class="btn-w">
          <button class="btn-login" @click="$router.push('/login')">登录</button>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      noticeData: '',
      notLogin: true,
      noData: false,
      toggIndex: 1,
      titleName: '游戏大厅',
      currentPage: 1,
      totalPage: 0,
      currentMoney: 0,
      activeIndex: 0,
      activeIndex2: 0,
      activeCurrency: '',
      selectShow: false,
      selectShow2: false,
      currencyArr: [],
      moneyArr: [],
      activeNum: '',
      playList: [],
      recordListId: '',
      timer3: null
    }
  },
  created () {
    this.getGameCurrency()
    this.getNotice()
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$route.path === '/home') {
        window.addEventListener('mousedown', (e) => {
          this.hideSelect(e)
          return false
        }, true)
      }
    })
  },
  methods: {
    // 点击其他区域弹窗消失
    hideSelect (e) {
      let pathArr = e.path || (e.composedPath && e.composedPath())
      if (!pathArr) {
        return
      }
      let mfind = 0
      for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i].className && pathArr[i].className.indexOf('betting-currency-w') > -1) {
          mfind = 1
        }
      }
      let mfind2 = 0
      for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i].className && pathArr[i].className.indexOf('current-money-w') > -1) {
          mfind2 = 1
        }
      }
      let mfind3 = 0
      for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i].className && pathArr[i].className.indexOf('current-box') > -1) {
          mfind3 = 1
        }
      }
      if (mfind === 0 && mfind2 === 0) {
        this.selectShow = false
      }
      if (mfind === 0 && mfind3 === 0) {
        this.selectShow2 = false
      }
    },
    // 公告列表
    getNotice () {
      this.$http.post(this.$api + '/version/noticeInfoList', {
        pageIndex: 1,
        pageSize: 10,
        category: 1
      }).then(res => {
        if (res.success === true) {
          if (res.data.length > 0) {
            this.noticeData = res.data[0]
          }
        }
      })
    },
    // 查询可参与的币种列表
    getGameCurrency () {
      this.$http.post(this.$api + '/game/queryGameCurrencyList').then(res => {
        if (res.success === true) {
          this.notLogin = true
          this.currencyArr = res.data
          this.currencyArr.forEach((item, index) => {
            if (item.currencyCode === 'USD') {
              this.activeCurrency = 'USD'
              this.getAmountList()
              this.activeIndex = index
            }
          })
          // this.activeCurrency = res.data[0].currencyCode
        } else {
          this.notLogin = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //  查询币种对应可投注金额列表
    getAmountList () {
      this.$http.post(this.$api + '/game/queryGameCurrencyOfAmountList', {
        currencyCode: this.activeCurrency
      }).then(res => {
        if (res.success === true) {
          this.moneyArr = res.data
          this.activeNum = res.data[0].currencyAmount
          this.recordListId = res.data[0].id
          this.getHouseList(1)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 游戏房间列表
    getHouseList (pageIndex) {
      this.$http.post(this.$api + '/game/gameHouseList', {
        platformCurrencyId: this.recordListId,
        pageIndex: pageIndex,
        pageSize: 8,
        status: 1
      }).then(res => {
        if (res.success === true) {
          clearInterval(this.timer3)
          if (res.data.length === 0) {
            this.noData = true
          } else {
            this.noData = false
            let playData = res.data
            // this.playList = playData
            this.timer3 = setInterval(() => {
              playData.forEach(item => {
                let times = Number(item.finishLastTime)
                if (times > 0) {
                  times--
                  item.finishLastTime = times
                } else {
                  item.finishLastTime = 0
                }
              })
              this.playList = playData
            }, 1000)
          }
          this.totalPage = res.mapData.totalPage
        }
      })
    },
    // 选择金额
    clickOne (item, index) {
      clearInterval(this.timer3)
      this.playList = []
      this.selectShow = false
      this.currentMoney = index
      this.recordListId = item.id
      this.getHouseList(1)
    },
    // 翻页
    toTurnPage (page) {
      this.currentPage = page
      this.getHouseList(page)
    },
    // 显示投注币种
    toggle (index) {
      this.toggIndex = index
      if (index === 1) {
        this.selectShow2 = false
        this.selectShow = !this.selectShow
      } else {
        this.selectShow = false
        this.selectShow2 = !this.selectShow2
      }
    },
    // 选择投注币种
    checkOne (item, index, currentIndex) {
      clearInterval(this.timer3)
      this.playList = []
      if (currentIndex === 1) {
        this.activeCurrency = item
        this.activeNum = this.moneyArr[0].currencyAmount
        this.activeIndex2 = 0
        this.activeIndex = index
        this.currentMoney = 0
        this.getAmountList()
      } else {
        this.activeNum = item
        this.activeIndex2 = index
      }
      this.selectShow = false
      this.selectShow2 = false
    },
    // 跳转到创建游戏
    gotoCreate () {
      this.$router.push('/home/createPlay')
    },
    // 跳转到公告
    gotoAdd () {
      this.$router.push('/notice')
    },
    // 跳转到游戏详情
    gotoPlay (item) {
      this.$router.push({
        path: '/ongoing',
        query: {
          gameId: item.id
        }
      })
    }
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
    fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve),
    tabBar: resolve => require(['@/components/tabBar.vue'], resolve)
  },
  beforeDestroy () {
    clearInterval(this.timer3)
  }
}
</script>

<style lang="less" scoped>
img{
  display: block;
  width: 100%;
}
.home-w{
  width: 1250px;
  margin: 0 auto;
  padding-bottom: 500px;
  @media screen and (max-width: 1500px) {
    width: 100%;
    padding: 0 80px 500px 80px;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 10px 200px 10px;
  }
  .add-com{
    @media screen and (max-width: 1200px) {
      padding-top: 50px;
    }
  }
  .add-w{
    margin: 42px auto 80px;
    width: 100%;
    height: 80px;
    border: 8px solid #ffc233;
    border-radius: 10px;
    background-color: #ffef94;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    @media screen and (max-width: 1200px) {
      border: 5px solid #ffc233;
      margin: 20px 0 30px;
      height: 50px;
      padding: 0 15px;
    }
    .left{
      display: flex;
      align-items: center;
      .voice{
        width: 36px;
        margin-right: 30px;
        @media screen and (max-width: 1200px) {
          width: 20px;
          margin-right: 14px;
        }
      }
      .text-add{
        font-size: 20px;
        color: #b05500;
        font-weight: bold;
        @media screen and (max-width: 1200px) {
          font-size: 14px;
        }
      }
    }
    .right{
      font-size: 20px;
      color: #b05500;
      display: flex;
      align-items: center;
      @media screen and (max-width: 1200px) {
        display: none;
      }
      .right-more{
        width: 20px;
        margin-left: 20px;
      }
    }
  }
  .home-tab-w{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1200px) {
      height: 50px;
    }
    .money-left-w{
      position: relative;
      .betting-currency-w{
        position: absolute;
        left: 0;
        top: 100%;
        width: 540px;
        z-index: 100;
        margin-top: 20px;
        @media screen and (max-width: 1200px) {
          width: 300px;
          margin-top: 10px;
        }
        &.dialog-enter,&.dialog-leave-to{
          opacity: 0;
          .group{
            transform: translate(0, -5%)
          }
        }
        &.dialog-enter-active{
          transition: .3s;
          .group{
            transition: .3s
          }
        }
        &.dialog-leave-active{
          transition: .1s;
          .group{
            transition: .1s
          }
        }
        .group{
          transform: translate(0, 0);
          width: 100%;
          height: auto;
          border: 8px solid #ffc233;
          border-radius: 20px;
          padding: 20px;
          background-color: #ffef94;
          box-shadow: 0 10px 10px rgba(252,83,76,.4);
          @media screen and (max-width: 1200px) {
            border: 5px solid #ffc233;
            border-radius: 10px;
            padding: 6px;
            height: auto;
            box-shadow: 0 5px 5px rgba(252,83,76,.4);
          }
        }
        .currency-title{
          font-size: 24px;
          color: #b05500;
          margin-bottom: 26px;
          @media screen and (max-width: 1200px) {
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
        .currency-uls{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .currency-item{
            width: 100px;
            height: 40px;
            background-color: #299c91;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            cursor: pointer;
            @media screen and (max-width: 1200px) {
              width: 60px;
              height: 30px;
              font-size: 12px;
              margin-bottom: 10px;
              margin-right: 10px;
            }
            &:nth-child(4n){
              margin-right: 0;
            }
            &.active-currency{
              background-color: #fc534c;
            }
          }
        }
      }
    }
    .money-left{
      width: 740px;
      height: 80px;
      border: 8px solid #ffc233;
      border-radius: 10px;
      background-color: #ffef94;
      display: flex;
      align-items: center;
      &.money-left-pc{
        @media screen and (max-width: 1200px){
          display: none;
        }
        @media screen and (min-width: 1200px){
          display: flex;
        }
      }
      &.money-left-m{
        border: 5px solid #ffc233;
        @media screen and (max-width: 1200px){
          display: flex;
          width: 200px;
        }
        @media screen and (min-width: 1200px){
          display: none;
        }
        .current-box{
          display: flex;
          align-items: center;
          border-left: 1px solid #ffc233;
          padding-left: 10px;
          cursor: pointer;
          .currency{
            width: 100px;
            font-size: 14px;
            font-weight: bold;
            background-color: #FC534C;
            color: #fff;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            margin-right: 6px;
            @media screen and (max-width: 1200px){
              width: 80px;
            }
          }
          .icon-row{
            width: 14px;
            transform: rotate(0);
            transition: all .3s linear;
            &.show-select{
              transform: rotate(180deg);
            }
          }
        }
      }
      @media screen and (max-width: 1200px) {
        height: 50px;
      }
      .current-money-w{
        width: 160px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        @media screen and (max-width: 1200px) {
          width: auto;
          padding: 0 10px;
        }
        .money-text{
          font-size: 24px;
          font-weight: bold;
          color: #b05500;
          margin-right: 10px;
          @media screen and (max-width: 1200px) {
            font-size: 14px;
            margin-right: 6px;
          }
        }
        .icon-row{
          width: 24px;
          transform: rotate(0);
          transition: all .3s linear;
          @media screen and (max-width: 1200px) {
            width: 16px;
          }
          &.show-select{
            transform: rotate(180deg);
          }
        }
      }
      .money-uls{
        display: flex;
        align-items: center;
        flex: 1;
        position: relative;
        padding-left: 20px;
        &::before{
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 26px;
          width: 1px;
          background-color: #ffc233;
        }
        .money-list{
          width: 120px;
          height: 40px;
          background-color: #299c91;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          color: #ffef94;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          &:last-child{
            margin-right: 0;
          }
          &.current-money{
            background-color: #fc534c;
            color: #fff;
          }
        }
      }
    }
    .create-play{
      width: 220px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fc534c;
      border-radius: 10px;
      color: #fff;
      font-weight: bold;
      font-size: 24px;
      box-shadow: 0 5px 0 #ffc233;
      cursor: pointer;
      @media screen and (max-width: 1200px) {
        width: 100px;
        height: 46px;
        font-size: 14px;
      }
      @media screen and (max-width: 340px) {
        flex: 1;
        margin-left: 15px;
      }
    }
  }
  .play-uls{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 60px;
    @media screen and (max-width: 1000px) {
      margin-top: 30px;
    }
    .play-list{
      width: 570px;
      height: 300px;
      color: #b05500;
      position: relative;
      margin-bottom: 85px;
      cursor: pointer;
      transition: all .3s linear;
      @media screen and (max-width: 1500px) {
        width: 48%;
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
        height: 180px;
        margin-bottom: 40px;
        .bg-list{
          display: none;
        }
      }
      &:hover{
        transform: translate(0,-8px);
      }
      &:nth-child(1){
        .bg-list{
          width: 96px;
          height: 96px;
          background: url("../../assets/images/home/bg-tag1.png") no-repeat center;
          position: absolute;
          left: 0;
          top: -50px;
          z-index: 10;
        }
      }
      &:nth-child(2){
        .bg-list{
          width: 111px;
          height: 84px;
          background: url("../../assets/images/home/bg-tag2.png") no-repeat center;
          position: absolute;
          right: 0;
          top: -53px;
          z-index: 10;
        }
      }
      &:nth-child(3){
        .bg-list.bg3-list{
          width: 64px;
          height: 138px;
          background: url("../../assets/images/home/bg-tag3.png") no-repeat center;
          position: absolute;
          left: 0;
          bottom: -117px;
          z-index: 10;
        }
      }
      &:nth-child(5){
        z-index: 100;
      }
      &:nth-child(6){
        .bg-list{
          width: 133px;
          height: 79px;
          background: url("../../assets/images/home/bg-tag4.png") no-repeat center;
          position: absolute;
          right: 18px;
          top: -58px;
          z-index: 10;
        }
      }
      &:nth-child(7){
        .bg-list{
          width: 127px;
          height: 113px;
          background: url("../../assets/images/home/bg-tag5.png") no-repeat center;
          position: absolute;
          right: 5px;
          top: -68px;
        }
      }
      .list-c-w{
        position: relative;
        width: 570px;
        height: 300px;
        border: 8px solid #ffc233;
        border-radius: 20px;
        background-color: #fff2b3;
        padding: 42px 32px 0;
        @media screen and (max-width: 1500px) {
          width: 100%;
        }
        @media screen and (max-width: 1000px) {
          height: 180px;
          width: 100%;
          border: 5px solid #ffc233;
          border-radius: 10px;
          padding: 20px 15px 0;
        }
      }
      .one-t{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          display: flex;
          align-items: center;
          .star{
            width: 26px;
            @media screen and (max-width: 1000px) {
              width: 16px;
            }
          }
          .number-play{
            font-size: 24px;
            font-weight: bold;
            margin-left: 6px;
            @media screen and (max-width: 1000px) {
              font-size: 14px;
            }
          }
        }
        .right{
          font-size: 20px;
          @media screen and (max-width: 1000px) {
            font-size: 12px;
          }
        }
      }
      .t-2{
        font-size: 20px;
        margin: 20px 0 12px;
        @media screen and (max-width: 1000px) {
          font-size: 12px;
          margin: 10px 0 8px;
        }
      }
      .t-3{
        font-size: 40px;
        font-weight: bold;
        @media screen and (max-width: 1000px) {
          font-size: 20px;
        }
      }
      .t-4{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        @media screen and (max-width: 1000px) {
          margin-top: 10px;
        }
        .left{
          font-size: 20px;
          @media screen and (max-width: 1000px) {
            font-size: 12px;
          }
        }
        .right{
          font-size: 20px;
          display: flex;
          align-items: center;
          @media screen and (max-width: 1000px) {
            font-size: 12px;
          }
          .money-box{
            width: 110px;
            height: 35px;
            border-radius: 35px;
            background-color: #299c91;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1000px) {
              width: auto;
              height: 28px;
              padding: 0 10px;
            }
            .moeny-t{
              font-size: 20px;
              color: #fff;
              font-weight: bold;
              @media screen and (max-width: 1000px) {
                font-size: 12px;
              }
            }
            .img-box{
              width: 16px;
            }
          }
        }
      }
      .look-info{
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        width: 240px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #299c91;
        box-shadow: 0 5px 0 #ffc233;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        @media screen and (max-width: 1000px) {
          width: 160px;
          height: 40px;
          border-radius: 20px;
          font-size: 16px;
        }
      }
    }
  }
  .turn-page-w{
    padding-bottom: 10px;
  }
  .not-login{
    .pc-not{
      box-shadow: 0 0 30px rgba(252,83,76,.8);
      width: 480px;
      height: 540px;
      border: 8px solid #ffc233;
      border-radius: 10px;
      background-color: #fff2b3;
      margin: 120px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      @media screen and (max-width: 1200px) {
        display: none;
      }
      @media screen and (min-width: 1200px) {
        display: flex;
      }
      img{
        width: 180px;
        margin-bottom: 40px;
      }
      .txt{
        font-size: 20px;
        font-weight: bold;
        color: #b05500;
        cursor: pointer;
        .login-t{
          color: #299c91;
          margin-right: 6px;
        }
      }
    }
    .mobile-not{
      box-shadow: 0 0 30px rgba(252,83,76,.8);
      max-width: 480px;
      border: 8px solid #ffc233;
      border-radius: 10px;
      background-color: #fff2b3;
      margin: 50px auto 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 60px 0 30px;
      @media screen and (max-width: 1200px) {
        display: flex;
      }
      @media screen and (max-width: 750px) {
        display: flex;
        width: 90%;
      }
      @media screen and (min-width: 1200px) {
        display: none;
      }
      img{
        width: 149px;
        @media screen and (max-width: 750px) {
          width: 100px;
        }
      }
      .txt{
        font-size: 20px;
        font-weight: bold;
        color: #b05500;
        margin: 20px 0;
        @media screen and (max-width: 750px) {
          font-size: 16px;
        }
      }
      .btn-w{
        width: 100%;
        padding: 0 30px;
        .btn-login{
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fc534c;
          border-radius: 10px;
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          box-shadow: 0 5px 0 #ffc233;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
