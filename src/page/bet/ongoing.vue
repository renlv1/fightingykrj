<template>
  <div class="betting">
    <div class="ongoing" v-if="status === 2 || status === 3" >
      <div class="betting-web">
        <div class="wrap-box">
          <div class="main-box">
            <div class="status-box">
              <div class="status" v-if="status === 2">进行中</div><div class="number">(编号: {{gameHouse.id}})</div>
              <div class="status" v-if="status === 3">已结束</div><div class="number">(编号: {{gameHouse.id}})</div>
            </div>
            <!--<div class="bonus-box" v-show="status === 1">-->
              <!--<img src="../../assets/images/number/$.png">-->
              <!--<img src="../../assets/images/number/9.png">-->
              <!--<img src="../../assets/images/number/8.png">-->
              <!--<img src="../../assets/images/number/6.png">-->
              <!--<img src="../../assets/images/number/2.png">-->
              <!--<img src="../../assets/images/number/9.png">-->
            <!--</div>-->
            <div class="bonus-box" v-if="status === 2" style="display: flex;align-items: center;justify-content: center">
              <img src="../../assets/images/number/$.png">
              <div class="number-wrap">
                <div
                  v-for="(item, index) in numberList"
                  :key="index"
                  class="number-item"
                  :class="{active: item.active, add: item.add, init: item.initAdd}"
                >
                  <div class="number cur">
                    <img :src="imgList[item.cur]">
                  </div>
                  <div class="number prev">
                    <img :src="imgList[item.prev]">
                  </div>
                  <div class="number next">
                    <img :src="imgList[item.next]">
                  </div>
                </div>
              </div>
            </div>
            <div class="bonus-box" v-if="status === 3">
              <img src="../../assets/images/number/$.png">
              <img src="../../assets/images/number/0.png">
            </div>
            <div class="current">当前奖金</div>
            <div class="jackpot-img">
              <div class="box-money" v-show="status === 3"><img src="../../assets/images/finish/finish.png"></div>
              <!--<div class="box-money" v-show="status === 1"><img src="../../assets/images/going/money.png"></div>-->
              <div class="money-box" v-show="status === 2">
                <div class="box-bg">
                  <img src="../../assets/images/going/money.png">
                </div>
                <div class="box-2">
                  <img src="../../assets/images/betting/golden_light.png" alt="">
                </div>
                <div class="box-3">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                </div>
              </div>
              <div class="box-tree"><img src="../../assets/images/betting/bg.png"></div>
            </div>
            <div class="game-box">
              <div class="game-box-panel" v-if="status === 2">
                <vue-seamless-scroll :data="gameJoinDetailList" :class-option="classOption" class="warp" v-if="gameJoinDetailList.length !== 0">
                  <ul class="item">
                    <li v-for="item in gameJoinDetailList" :key="item.index">
                      <div class="user">{{item.userNickName}}</div>
                      <div class="join user">{{joinType(item.joinType)}}了游戏，奖金增加</div>
                      <div class="money">{{item.amount}} {{item.currency}}</div>
                    </li>
                  </ul>
                </vue-seamless-scroll>
                <div class="no-people"  v-else>暂时无人参与游戏</div>
              </div>
              <div class="finish-box" v-if="status === 3">
                <div class="finish-top"><span>当前游戏已结束，请您</span><i @click="$router.push('/home')">返回游戏大厅</i></div>
                <div class="finish-bottom">参与其他场次的活动</div>
              </div>
            </div>
            <div class="content-two" v-if="status === 2">
              <div class="bet-btn" v-if="userHaveOperate === 1" @click="loginOutGame()">
                <div class="bet-text">退出游戏</div>
              </div>
              <div class="outGame" v-else-if="userHaveOperate === 2">
                <div class="bet-text">已退出</div>
              </div>
              <div class="join-user">剩余玩家：<span>{{gameHouse.nowCount}}</span>/<i>{{gameHouse.totalJoinCount}}</i>人</div>
              <div class="bar">
                <div class="progress">
                  <!--<div class="all"><img src="../../assets/images/betting/green.png" class="green-bg"></div>-->
                  <div class="progress-box">
                    <div class="progress-one">
                      <div class="already" :style="bonusPaid" :class="{activeAlready1: allAlready1}"></div>
                      <div class="already2" :style="currentBonus" :class="{activeAlready2: allAlready2}"></div>
                    </div>
                  </div>
                </div>
                <div class="left-time"><span>剩余奖金</span> <span class="percentage">{{remainingBonus}}{{gameHouse.joinCurrency}}</span></div>
              </div>
            </div>
          </div>
          <div class="bottom-ongoing">
            <div class="tabs">
              <div class="left-tabs">
                <span @click="btnLoginOut(2)" :class="{tabActive: orderTab === 2}">退出登录</span>
                <i></i>
                <span @click="btnLoginOut(1)" :class="{tabActive: orderTab === 1}">参与记录</span>
              </div>
              <div class="choose-right-tabs" v-if="orderTab === 2">
                <span @click="chooseStatus(0)" :class="{statusActive: statusNum === 0}">全部</span>
                <i></i>
                <span @click="chooseStatus(1)" :class="{statusActive: statusNum === 1}">已获奖</span>
                <i></i>
                <span @click="chooseStatus(2)" :class="{statusActive: statusNum === 2}">未获奖</span>
              </div>
            </div>
            <div class="tabs-content" v-if="orderTab === 2">
              <ul>
                <li v-for="(item,index) in gameJoinDetailList" :key="index" :class="{activeLi: item.amount}">
                  <div class="info-box">
                    <div class="icon-box" v-if="item.amount"><img src="../../assets/images/going/champion.png"></div>
                    <div class="icon-box" v-else><img src="../../assets/images/going/door.png"></div>
                    <div class="user-box">
                      <div class="user-name">{{item.userNickName}}</div>
                      <div class="user-money" v-if="item.amount">退出游戏，获得奖金 <span>{{item.amount}} {{item.currency}}</span></div>
                      <div class="user-money" v-else>退出游戏，未获得奖金</div>
                    </div>
                  </div>
                  <div class="date-box">{{$changeDate(item.updateTime, '.', 9)}}</div>
                </li>
              </ul>
              <div class="load-more-box" v-show="gameJoinDetailList.length === 0">
                <div class="noData-box">
                  <div class="loading-img">
                    <img src="../../assets/images/notice/noData.png">
                  </div>
                  <p class="desc">暂无数据</p>
                </div>
              </div>
              <v-turnPage v-show="gameJoinDetailList.length !== 0" :propsPage="loginOutTotal" @ongoingTrunPage="loginOutTurnPage" ref="turnPage1"></v-turnPage>
            </div>
            <div class="tabs-content" v-if="orderTab === 1">
              <ul>
                <li v-for="(item,index) in recordList" :key="index">
                  <div class="info-box">
                    <div class="icon-box" ><img src="../../assets/images/betting/icon.png"></div>
                      <div class="user-box">
                      <div class="user-name" >{{item.userNickName}}</div>
                      <div class="user-money" >加入游戏，奖金增加 <i>{{item.amount}} {{item.currency}}</i></div>
                    </div>
                  </div>
                  <div class="date-box">{{$changeDate(item.updateTime, '.', 9)}}</div>
                </li>
              </ul>
              <div class="load-more-box" v-show="recordList.length === 0">
                <div class="noData-box">
                  <div class="loading-img">
                    <img src="../../assets/images/notice/noData.png">
                  </div>
                  <p class="desc">暂无数据</p>
                </div>
              </div>
              <v-turnPage v-show="recordList.length !== 0" :propsPage="joinTotal" @ongoingTrunPage="recordTurnPage" ref="turnPage1"></v-turnPage>
            </div>
          </div>
        </div>
      </div>
      <!--移动端-->
      <div class="betting-app">
        <fixedTop :titleName="titleName" :isGoBack="true"></fixedTop>
        <div class="app-wrap">
          <div class="main-box">
            <div class="status-box">
              <div class="status" v-if="status === 2">进行中</div><div class="number">(编号: {{gameHouse.id}})</div>
              <div class="status" v-if="status === 3">已结束</div><div class="number">(编号: {{gameHouse.id}})</div>
            </div>
            <!--<div class="app-bonus" v-show="status === 1">-->
              <!--<div class="number-box">-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/9.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/8.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/9.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/9.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/5.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/9.png"></div>-->
                <!--<div class="icon-one"><img src="../../assets/images/app-number/0.png"></div>-->
              <!--</div>-->
            <!--</div>-->
            <div class="app-bonus" v-if="status === 2" style="display: flex;align-items: center;justify-content: center">
              <!--<img src="../../assets/images/number/$.png">-->
              <div class="number-wrap">
                <div
                  v-for="(item, index) in numberList"
                  :key="index"
                  class="number-item"
                  :class="{active: item.active, add: item.add, init: item.initAdd}"
                >
                  <div class="number cur">
                    <img :src="appImgList[item.cur]">
                  </div>
                  <div class="number prev">
                    <img :src="appImgList[item.prev]">
                  </div>
                  <div class="number next">
                    <img :src="appImgList[item.next]">
                  </div>
                </div>
              </div>
            </div>
            <div class="app-bonus" v-if="status === 3">
              <div class="number-box">
                <div class="icon-two"><img src="../../assets/images/app-number/0.png"></div>
              </div>
            </div>
            <div class="app-current">当前奖金({{gameHouse.joinCurrency}})</div>
            <div class="app-jackpot-img">
              <!--<img src="../../assets/images/going/app-money.png" v-show="status === 1">-->
              <div class="money-box" v-if="status === 2">
                <div class="box-bg">
                  <img src="../../assets/images/going/app-money.png">
                  <div class="box-2">
                    <img src="../../assets/images/betting/golden_light.png" alt="">
                  </div>
                </div>
                <div class="box-3">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                  <img src="../../assets/images/betting/money.png" alt="">
                </div>
              </div>
              <img src="../../assets/images/app-finish/finish-app.png" v-if="status === 3">
            </div>
            <div class="app-game">
              <div class="game-box-panel" v-if="status === 2">
                <vue-seamless-scroll :data="gameJoinDetailList" :class-option="classOption" class="warp" v-if="gameJoinDetailList.length !== 0">
                  <ul class="item">
                    <li v-for="item in gameJoinDetailList" :key="item.index">
                      <div class="user">{{item.userNickName}}</div>
                      <div class="join user">{{joinType(item.joinType)}}了游戏，奖金增加</div>
                      <div class="money">{{item.amount}} {{item.currency}}</div>
                    </li>
                  </ul>
                </vue-seamless-scroll>
                <div class="no-people"  v-else>暂时无人参与游戏</div>
              </div>
              <div class="finish-box" v-if="status === 3">
                <div class="finish-top"><span>当前游戏已结束，请您</span><i @click="$router.push('/home')">返回游戏大厅</i></div>
                <div class="finish-bottom">参与其他场次的活动</div>
              </div>
            </div>
            <div class="app-LoginOut" v-if="status === 2">
              <div class="left-bonus"><i>剩余奖金</i> <span>{{remainingBonus}}{{gameHouse.joinCurrency}}</span></div>
              <div class="btn-box">
                <div class="bet-btn" v-if="userHaveOperate === 1" @click="loginOutGame()">
                  <div class="bet-text">退出游戏</div>
                </div>
                <div class="outGame" v-else-if="userHaveOperate === 2">
                  <div class="bet-text">已退出</div>
                </div>
              </div>
              <div class="left-box">
                <i>剩余玩家：</i><span><i class="left-player">{{gameHouse.nowCount}}/</i><i>{{gameHouse.totalJoinCount}}</i></span>
              </div>
            </div>
            <div class="record-box">
              <div class="record-tab">
                <ul class="record-title">
                  <li>
                    <div class="loginOut-record" @click="btnLoginOut(2)" :class="{tabActive: orderTab === 2}">退出记录</div>
                    <div class="join-record" @click="btnLoginOut(1)" :class="{tabActive: orderTab === 1}">参与记录</div>
                  </li>
                  <li class="record-li" @click="isSelectShow = !isSelectShow" v-if="orderTab === 2">
                    <div class="choose-record">
                      <div class="all-record">{{currentOrder}}</div>
                      <div class="choose-icon"><img src="../../assets/images/going/row.png" alt="" :class="{'rotate-img': isSelectShow}"></div>
                    </div>
                    <ul class="select-uls" :class="{'maxheigt': isSelectShow}" @click.stop v-show="isSelectShow">
                      <li v-for="(item, index) in orderChange" :key="index" class="select-list" @click="selectOne(item, index)">{{item}}</li>
                    </ul>
                  </li>
                </ul>
                <div class="tabs-content" v-if="orderTab === 2">
                  <ul>
                    <li v-for="(item,index) in gameJoinDetailList" :key="index" :class="{activeLi: item.amount}">
                      <div class="info-box">
                        <div class="icon-box" v-if="item.amount"><img src="../../assets/images/going/champion.png"></div>
                        <div class="icon-box" v-else><img src="../../assets/images/going/door.png"></div>
                        <div class="user-box">
                          <div class="user-name">{{item.userNickName}}</div>
                          <div class="user-money" v-if="item.amount">退出游戏，获得奖金 <span>{{item.amount}} {{item.currency}}</span></div>
                          <div class="user-money" v-else>退出游戏，未获得奖金</div>
                        </div>
                      </div>
                      <div class="date-box">{{$changeDate(item.updateTime, '.', 9)}}</div>
                    </li>
                  </ul>
                  <v-turnPage v-show="gameJoinDetailList.length !== 0" :propsPage="loginOutTotal" @ongoingTrunPage="loginOutTurnPage" ref="turnPage1"></v-turnPage>
                </div>
                <div class="tabs-content" v-if="orderTab === 1">
                  <ul>
                    <li v-for="(item,index) in recordList" :key="index">
                      <div class="info-box">
                        <div class="icon-box" ><img src="../../assets/images/betting/icon.png"></div>
                        <div class="user-box">
                          <div class="user-name" >{{item.userNickName}}</div>
                          <div class="user-money" >加入游戏，奖金增加 <i >{{item.amount}} {{item.currency}}</i></div>
                        </div>
                      </div>
                      <div class="date-box">{{$changeDate(item.updateTime, '.', 9)}}</div>
                    </li>
                  </ul>
                  <v-turnPage v-show="recordList.length !== 0" :propsPage="joinTotal" @ongoingTrunPage="recordTurnPage" ref="turnPage1"></v-turnPage>
                </div>
              </div>
              <div class="load-more-box" v-show="gameJoinDetailList.length === 0 && orderTab === 2">
                <div class="noData-box">
                  <div class="loading-img">
                    <img src="../../assets/images/notice/noData.png">
                  </div>
                  <p class="desc">暂无数据</p>
                </div>
              </div>
              <div class="load-more-box" v-show="recordList.length === 0 && orderTab === 1">
                <div class="noData-box">
                  <div class="loading-img">
                    <img src="../../assets/images/notice/noData.png">
                  </div>
                  <p class="desc">暂无数据</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="dialog">
        <div class="myPopupBonus" v-show="payPopupShow">
          <div class="win-img"><img src="../../assets/images/dialog/money.png"></div>
          <div class="app-popup">
            <div class="app-win"><img src="../../assets/images/dialog/money.png"></div>
            <div class="myPopup-box">
              <div class="formDiv">
                <h3 class="title">获得奖金</h3>
                <div class="title-money">{{willRewardAmount}} {{gameHouse.joinCurrency}}</div>
                <div class="pay-box">
                  <button class="tradingCenter-btn" @click="$router.push('/home')">前往大厅</button>
                  <button class=" pay-btn" @click="payPopupShow = false">关闭</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="dialog">
        <div class="myPopupBonus" v-show="sorryShow">
          <div class="sorry-img"><img src="../../assets/images/dialog/box.png"></div>
          <div class="app-popup">
            <div class="app-sorry"><img src="../../assets/images/dialog/box.png"></div>
            <div class="sorry-box">
              <div class="formDiv">
                <div class="title-money no-bonus">未获得奖金</div>
                <div class="pay-box">
                  <button class="tradingCenter-btn" @click="$router.push('/home')">前往大厅</button>
                  <button class=" pay-btn" @click="sorryShow = false">关闭</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <v-betting v-if="status === 1"></v-betting>
  </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll'

  export default {
    data() {
      return {
        listData: [
          {user: '基督教的', money: '100USD'},
          {user: '基督教的', money: '100USD'},
          {user: '基督教的', money: '100USD'}
        ],
        recordList: [],
        bonusPaid: {
          height: '29px',
          width: 0
        },
        currentBonus: {
          height: '29px',
          width: 0
        },
        allAlready2: false,
        allAlready1: false,
        orderChange: ['全部', '已获奖', '未获奖'],
        currentOrder: '全部',
        flagIndex: 0,
        pageSize: 10,
        queryType: 2, // 1参与记录 2退出记录
        exitQueryType: '', //  1已获奖 2未获奖
        loginOutTotal: 1, // 退出记录页数
        loginOutPage: '', // 退出记录分页
        joinTotal: 1, // 参与记录页数
        joinPage: '', // 参与记录分页
        payPopupShow: false, // 奖金池弹窗
        sorryShow: false, // 未获得奖金弹窗
        isLoginOut: true, // 显示按钮
        orderTab: 2, // 默认是退出记录高亮
        statusNum: 0, // 默认是全部高亮
        isSelectShow: false, // 下拉框
        imgList: [ // 图片数组
          require('../../assets/images/number/0.png'),
          require('../../assets/images/number/1.png'),
          require('../../assets/images/number/2.png'),
          require('../../assets/images/number/3.png'),
          require('../../assets/images/number/4.png'),
          require('../../assets/images/number/5.png'),
          require('../../assets/images/number/6.png'),
          require('../../assets/images/number/7.png'),
          require('../../assets/images/number/8.png'),
          require('../../assets/images/number/9.png')
        ],
        appImgList: [ // 图片数组
          require('../../assets/images/app-number/0.png'),
          require('../../assets/images/app-number/1.png'),
          require('../../assets/images/app-number/2.png'),
          require('../../assets/images/app-number/3.png'),
          require('../../assets/images/app-number/4.png'),
          require('../../assets/images/app-number/5.png'),
          require('../../assets/images/app-number/6.png'),
          require('../../assets/images/app-number/7.png'),
          require('../../assets/images/app-number/8.png'),
          require('../../assets/images/app-number/9.png')
        ],
        numberList: [],
        mockData: [0], // 模拟数据
        gameHouse: '', // 房间详情
        status: '', // 状态 1投注中 2进行中 3已结束
        totalJoinAmount: '', // 总累计金额
        poolAmount: '', // 当前资金池金额
        assignAmount: '', // 已分配金额
        remainingBonus: '', // 剩余奖金
        userHaveOperate: '', // 用户是否有加入游戏或有退出游戏标识 1未加入或未退出 2已加入或已退出
        willRewardAmount: '', // 个人预计可获得金额
        gameJoinDetailList: [], // 加入游戏列表
        timerPoll: null,
        titleName: '游戏详情'
      }
    },
    created () {
      // this.getLogin()
      this.getGameHouseDetail(1)
      setTimeout(() => {
        if (this.status === 2) {
          this.timerPoll = setInterval(() => {
            this.getGameHouseDetail(1)
          }, 3000)
        }
      }, 500)
    },
    mounted () {
      // 模拟接口返回数据
      let index = 0
      this.animateNum(this.mockData[index])
      setInterval(() => {
        if (index >= this.mockData.length - 1) {
          index = -1
        }
        index++
        this.animateNum(this.mockData[index])
      }, 1500)
    },
    methods: {
      // 数字动画
      animateNum (updateNum) {
        const oldLen = this.numberList.length
        const updateLen = String(updateNum).length
        const oldArr = [...this.numberList].reverse() // 翻转老数组数字
        const upDateArr = String(updateNum).split('').reverse() // 翻转新数组数字
        const newArr = []
        if (oldLen) {
          // 取最大长度
          let len = oldLen > updateLen ? oldLen : updateLen
          for (let i = 0; i < len; i++) {
            let obj = {}
            let oldItem = oldArr[i] ? oldArr[i].cur : '' // 当前老的数字
            let updateItem = upDateArr[i] // 当前新的数字

            // 如果老的数字存在并且新的数字不存在，则长度减少，直接跳出
            if (oldItem && !updateItem) {
              continue
            }
            if (oldItem && updateItem) {
              if (oldItem !== updateItem) { // 如果新老数字不一样，则要变换
                obj = {
                  cur: oldItem,
                  prev: oldItem,
                  next: updateItem,
                  active: false
                }
              } else { // 如果新老数字一样，则不动
                obj = {
                  cur: oldItem,
                  prev: oldItem,
                  next: oldItem
                }
              }
            } else if (!oldItem && updateItem) { // 如果老数字不存在并且新数字存在，则长度增加
              obj = {
                cur: updateItem,
                prev: updateItem,
                next: updateItem,
                initAdd: true,
                add: false
              }
            }
            newArr.push(obj) // push到新数组
          }
          this.numberList = newArr.reverse() // 将新数组翻转然后赋值

          // 新添加的dom需要延时增加class才有动画效果
          setTimeout(() => {
            this.numberList.forEach(item => {
              if (item.active === false) {
                item.active = true
              }
              if (item.add === false) {
                item.add = true
              }
            })
          }, 20)

          // 0.6S(动画时间)后，去除激活样式，准备下一次的动画， 并且将cur的值变为next
          setTimeout(() => {
            this.numberList.forEach(item => {
              item.cur = item.next
              item.active = false
            })
          }, 600)
        } else {
          // 如果没有老数组，直接添加
          Array.from(String(updateNum)).forEach(item => {
            this.numberList.push({
              cur: item,
              prev: item,
              next: item
            })
          })
        }
      },
      // 退出游戏
      loginOutGame() {
        let url = `${this.$api}/game/exitGame?gameHouseId=${this.$route.query.gameId}`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            this.userHaveOperate = 2
          }
        }).catch(err => {
            console.log(err)
          })
      },
      btnLoginOut(index) {
        this.orderTab = index
        this.queryType = index
        this.statusNum = 0
        this.exitQueryType = ''
        if (index === 1) {
          if (this.$refs.turnPage1) {
            this.$refs.turnPage1.resetPage(1)
          }
          this.getJoinList(1)
        } else {
          if (this.$refs.turnPage1) {
            this.$refs.turnPage1.resetPage(1)
          }
          this.getGameHouseDetail(1)
        }
      },
      chooseStatus(num) {
        this.queryType = 2
        if (num === 0) {
          this.exitQueryType = ''
        } else if (num === 1) {
          this.exitQueryType = 1
        } else {
          this.exitQueryType = 2
        }
        this.statusNum = num
        this.getGameHouseDetail(1)
      },
      selectOne(item, index) {
        this.isSelectShow = false
        this.currentOrder = item
        if (index === 0) {
          this.exitQueryType = ''
        } else if (index === 1) {
          this.exitQueryType = 1
        } else {
          this.exitQueryType = 2
        }
        this.getGameHouseDetail(1)
      },
      // getLogin () {
      //   this.$http.post(`${this.$api}/user/userlogin?userName=game05&password=123123Aa&platformId=-1`).then((res) => {
      //     console.log(res)
      //   })
      // },
      //  1.4 游戏房间详情
      // 接口URL: webapi.banghongda88.com/game/gameHouseDetail
      getGameHouseDetail (page) {
        let url = `${this.$api}/game/gameHouseDetail?gameHouseId=${this.$route.query.gameId}&pageIndex=${page}&pageSize=${this.pageSize}&queryType=${this.queryType}&exitQueryType=${this.exitQueryType}`
        this.$http.post(url).then(res => {
            if (res.status === 'success') {
              this.gameHouse = res.data.gameHouse
              this.status = res.data.gameHouse.status
              this.userHaveOperate = res.data.userHaveOperate
              this.willRewardAmount = res.data.willRewardAmount
              this.totalJoinAmount = res.data.gameHouse.totalJoinAmount // 总累计金额
              this.poolAmount = res.data.gameHouse.poolAmount // 当前资金池金额
              this.assignAmount = res.data.gameHouse.assignAmount // 已分配金额
              this.gameJoinDetailList = res.data.gameJoinDetailList
              this.mockData.push(this.poolAmount)
              this.mockData.shift()
              let bonusPaid = (this.assignAmount / this.totalJoinAmount) * 100 // 灰色：已发放奖金/总奖金
              this.bonusPaid.width = bonusPaid + '%'
              let currentBonus = (this.poolAmount / this.totalJoinAmount) * 100 // 红色：当前奖金/总奖金
              this.currentBonus.width = currentBonus + '%'
              if (Number(currentBonus) === 0) {
                this.allAlready1 = true
              } else {
                this.allAlready2 = false
              }
              if (Number(bonusPaid) === 0) {
                this.allAlready2 = true
              } else {
                this.allAlready1 = false
              }
              this.remainingBonus = res.data.gameHouse.totalJoinAmount - res.data.gameHouse.assignAmount // 剩余奖金=总奖金-已发放奖金
            }
        }).catch(err => {
          console.log(err)
        })
      },
      // 参与记录数据
      getJoinList (page) {
        let url = `${this.$api}/game/gameHouseDetail?gameHouseId=${this.$route.query.gameId}&pageIndex=${page}&pageSize=${this.pageSize}&queryType=${this.queryType}&exitQueryType=`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            this.recordList = res.data.gameJoinDetailList
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 加入状态
      joinType (type) {
        if (type === 1) {
          return '加入'
        } else if (type === 2) {
          return '退出'
        }
      },
      // 退出记录分页
      loginOutTurnPage (page) {
        this.loginOutPage = page
        this.getLoginOutList(page)
      },
      // 参与记录分页
      recordTurnPage (page) {
        this.joinPage = page
        this.getJoinList(page)
      }
    },
    computed: {
      classOption() {
        return {
          step: 0.5,
          limitMoveNum: 2,
          waitTime: 1000,
          openTouch: false
        }
      }
    },
    components: {
      vueSeamless,
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      vBetting: resolve => require(['@/page/bet/betting.vue'], resolve),
      fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve),
      tabBar: resolve => require(['@/components/tabBar.vue'], resolve)
    },
    beforeDestroy () {
      clearInterval(this.timerPoll)
    }
  }
</script>

<style lang="less" scoped>
  .number-wrap{
    display: inline-block;
    vertical-align: top;
    .number-item{
      display: inline-block;
      position: relative;
      width: 130px;
      height: 205px;
      text-align: center;
      @media screen and (max-width: 1200px) {
        width: 60px;
        height: 95px;
      }
      .number{
        position: absolute;
        left: 0;
        top: 0;
        @media screen and (max-width: 1200px) {
        img{
          width: 70px;
          }
        }
      }
      &.init .cur{
        transform: translateY(-20%);
        opacity: 0;
      }
      .prev,.next{
        visibility: hidden;
      }
      .next{
        transform: rotateX(90deg);
      }
      &.active{
        .cur{
          visibility: hidden;
        }
        .prev, .next{
          visibility: visible;
        }
        .prev{
          transform: rotateX(-90deg);
          transition: transform .3s linear;
        }
        .next{
          transform: rotateX(0);
          transition: transform .3s .3s;
        }
      }
      &.add{
        .cur{
          opacity: 1;
          transform: translateY(0);
          transition: .5s;
        }
      }
    }
  }
  @keyframes opcityBox2 {
    0%{
      opacity: 1;
    }
    50%{
      opacity: 0.3;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes money1 {
    0%{
      top: 85px;
      transform: rotateY(0deg);
    }
    50%{
      top: -150px;
      display: none;
      visibility: hidden;
      transform: rotateY(180deg);
    }
    70%{
      top: 85px;
      display: none;
      visibility: hidden;
      transform: rotateY(360deg);
    }
    80%{
      top: 85px;
      opacity: 1;
      display: block;
      visibility: inherit;
      transform: rotateY(180deg);
    }
    100%{
      top: 85px;
      transform: rotateY(0deg);
    }
  }
  @keyframes money2 {
    0%{
      top: 45px;
      transform: rotateY(0deg);
    }
    50%{
      top: -70px;
      display: none;
      visibility: hidden;
      transform: rotateY(180deg);
    }
    70%{
      top: 45px;
      display: none;
      visibility: hidden;
      transform: rotateY(360deg);
    }
    80%{
      top: 45px;
      opacity: 1;
      display: block;
      visibility: inherit;
      transform: rotateY(180deg);
    }
    100%{
      top: 45px;
      transform: rotateY(0deg);
    }
  }
  .money-box{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 84px;
    width: 314px;
    height: 349px;
    @media screen and (max-width: 1200px) {
      /*bottom: 122px;*/
      width: 683px;
      height: 470px;
      z-index: 2;
    }
    @media screen and (max-width: 683px) {
      /*bottom: 122px;*/
      height: 200px;
      z-index: 2;
    }
    @media screen and (max-width: 683px) {
      /*bottom: 122px;*/
      width: 100%;
      z-index: 2;
    }
    @media screen and (max-width: 440px){
      position: relative;
    }
    .box-bg{
      position: absolute;
      bottom: 0;
      left: 0;
      @media screen and (max-width: 683px) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      img{
        width: 314px;
        display: block;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }
    }
    .box-2{
      position: absolute;
      top: -81px;
      left: 50%;
      transform: translateX(-50%);
      animation: opcityBox2 1s linear infinite;
      z-index: 100;
      @media screen and (max-width: 1200px) {
        top: 0;
      }
      img{
        width: 286px;
        display: block;
      }
    }
    .box-3{
      img{
        width: 48px;
        position: absolute;
        z-index: 200;
        top: 85px;
        @media screen and (max-width: 440px){
          width: 35px;
          top: 45px;
        }
        &:nth-child(1) {
          left: 80px;
          animation: money1 2s linear infinite;
          @media screen and (max-width: 1200px) {
            left: 37%;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s linear infinite;
          }
        }
        &:nth-child(2) {
          left: 110px;
          animation: money1 2s .5s linear infinite;
          @media screen and (max-width: 1200px) {
            left: 40%;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s .5s linear infinite;
          }
        }
        &:nth-child(3) {
          left: 140px;
          animation: money1 2s 1s linear infinite;
          @media screen and (max-width: 1200px) {
            left: 45%;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s linear infinite;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s 1s linear infinite;
          }
        }
        &:nth-child(4) {
          left: 170px;
          animation: money1 2s .7s linear infinite;
          @media screen and (max-width: 1200px) {
            left: 48%;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s .7s linear infinite;
          }
        }
        &:nth-child(5) {
          left: 200px;
          animation: money1 2s 1.8s linear infinite;
          @media screen and (max-width: 1200px) {
            left: 51%;
          }
          @media screen and (max-width: 440px){
            animation: money2 2s 1.8s linear infinite;
          }
        }
      }
    }
  }
  .betting-web {
    position: absolute;
    top: 0;
    padding-top: 120px;
    width: 100%;
    height: 3000px;
    background-image: url("../../assets/images/common/BG.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media screen and (max-width: 1200px) {
     display: none;
    }
    .bonus-box{
      display: flex;
      img{
        display: block;
        width: 136px;
        height: 248px;
      }
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }
    .content-two{
      display: flex;
      flex-direction: column;
      align-items: center;
      .bet-btn {
        width: 516px;
        height: 116px;
        background: url("../../assets/images/going/loginOut.png");
        position: relative;
        cursor: pointer;
        user-select: none;
        .bet-text {
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          font-size: 32px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
        }
      }
      .outGame{
        width: 516px;
        height: 116px;
        background: url("../../assets/images/going/grey.png");
        position: relative;
        cursor: pointer;
        user-select: none;
        .bet-text {
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          font-size: 32px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
        }
      }
      .join-user {
        margin: 40px 0 60px;
        text-shadow: 0px 4px rgba(0, 0, 0, .2);
        color: #fff;
        font-size: 24px;
        font-weight: bold;
      }
      .bar{
        display: flex;
        flex-direction: column;
        align-items: center;
        .progress{
          position: relative;
          background: url("../../assets/images/betting/green.png");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 480px;
          height: 44px;
          display: flex;
          align-items: center;
          .all{
            width: 480px;
            height: 100%;
            position: absolute;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .progress-box{
            display: flex;
            padding: 0 8px;
            .progress-one{
              width: 464px;
              height: 29px;
              display: flex;
            }
            .already{
              background-color: #E6E6E7;
              height: 100%;
              border-radius: 22px 0 0 22px;
              img{
                border-radius: 14px;
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .activeAlready1{
              border-radius: 22px;
            }
            .already2{
              border-radius: 0 22px 22px 0;
              transition: 0.2s;
              background-color: #FF5F6C;
              height: 29px;
            }
            .activeAlready2{
              border-radius: 22px;
            }
          }
        }
        .left-time{
          margin-top: 30px;
          text-shadow: 0px 4px rgba(0,0,0, .2);
          color: #fff;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
    .bottom-ongoing {
      .tabs {
        height: 80px;
        line-height: 80px;
        margin-top: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 8px solid #ffc233;
        border-radius: 10px;
        color: #b05500;
        background-color: #fff2b3;
        i{
          height: 24px;
          width: 2px;
          background-color: #ffc233;
          border: 1px;
        }
        .left-tabs {
          display: flex;
          align-items: center;
          span {
            width: 200px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #efa800;
            cursor: pointer;
            user-select: none;
          }
          .tabActive{
            color: #b05500;
          }
        }
        .choose-right-tabs {
          display: flex;
          align-items: center;
          span {
            width: 140px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #efa800;
            cursor: pointer;
            user-select: none;
          }
          .statusActive{
            color: #b05500;
          }
        }
      }
      .tabs-content {
        margin-top: 20px;
        ul{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 420px;
            height: 120px;
            border: 8px solid #ffc233;
            border-radius: 10px;
            background-color: #ffef94;
            margin-right: 30px;
            margin-bottom: 10px;
            padding: 0 30px 0 10px;
            &:nth-child(3n){
              margin-right: 0;
              @media screen and (max-width: 1350px) {
                &:nth-child(3n){
                  margin-right: 30px;
                }
              }
            }
            .info-box{
              display: flex;
              .icon-box{
                width: 80px;
                height: 80px;
                margin-right: 10px;
                img{
                  display: block;
                  width: 100%;
                }
              }
            }
            .user-box{
              display: flex;
              flex-direction: column;
              justify-content: center;
              position: relative;
              .user-name{
                font-size: 20px;
                color: #b05500;
                font-weight: bold;
                margin-bottom: 30px;
              }
              .user-money{
                font-size: 16px;
                color: #b05500;
                white-space: nowrap;
                position: absolute;
                top: 53px;
                span{
                  font-size: 16px;
                  color: #ffd900;
                  font-weight: bold;
                }
                i{
                  font-size: 16px;
                  color: #299C91;
                  font-weight: bold;
                }
              }
            }
            .date-box{
              font-size: 16px;
              color: #b05500;
              white-space: nowrap;
              margin-bottom: 30px;
            }
          }
          .activeLi{
            border:none;
            background-color: #fc534c;
            .user-box{
              display: flex;
              flex-direction: column;
              justify-content: center;
              .user-name{
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                margin-bottom: 30px;
              }
              .user-money{
                font-size: 16px;
                color: #fff;
                white-space: nowrap;
                span{
                  font-size: 16px;
                  color: #febb2e;
                  font-weight: bold;
                }
              }
            }
            .date-box{
              font-size: 16px;
              color: #fff;
              white-space: nowrap;
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }
  .betting-app{
    position: absolute;
    top: 0;
    padding-top: 60px;
    width: 100%;
    height: 3000px;
    background-image: url("../../assets/images/going/app-BG.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: none;
    @media screen and (max-width: 1200px) {
      display: block;
    }
    .app-wrap{
      width: 100%;
      .main-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        .status-box{
          margin: 70px 0 40px;
          display: flex;
          align-items: center;
          .status{
            font-size: 24px;
            color: #fff;
            font-weight: bold;
            margin-right: 10px;
          }
          .number{
            font-size: 16px;
            color: #fff;
          }
        }
        .app-bonus{
          width: 711px;
          height: 135px;
          background-image: url("../../assets/images/going/rail-bg.png");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          display: none;
          @media screen and (max-width: 1200px) {
            display: flex;
          }
          @media screen and (max-width: 711px) {
            width: 100%;
            height: 100px;
          }
          @media screen and (max-width: 484px) {
            width: 100%;
            height: 90px;
          }
          .number-box{
            display: flex;
            width: 711px;
            @media screen and (max-width: 711px) {
              width: 95%;
            }
            .icon-one{
              width: 98px;
              height: 149px;
              @media screen and (max-width: 711px) {
                width: 100%;
              }
              img{
                display: block;
                width: 100%;
              }
            }
            .icon-two{
              margin: 0 auto;
              width: 98px;
              height: 149px;
            }
          }
        }
        .app-current{
          margin: 80px 0 50px;
          font-size: 48px;
          color: #fff;
          font-weight: bold;
          @media screen and (max-width: 450px) {
            font-size: 30px;
            margin: 20px 0 50px;
          }
        }
        .app-jackpot-img{
          width: 683px;
          height: 470px;
          padding: 0 10px;
          position: relative;
          margin-top: 100px;
          @media screen and (max-width: 683px) {
            margin-top: 150px;
          }
          @media screen and (max-width: 683px) {
            width: 100%;
            height: 200px;
            margin-bottom: 120px;
          }
          @media screen and (max-width: 500px) {
            margin-top: 100px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 400px) {
            width: 100%;
            height: 200px;
            margin-top: 80px;
            margin-bottom: 0;
          }
          @media screen and (max-width: 500px) {
            width: 100%;
            height: 200px;
          }
          .box-bg{
            position: relative;
            img{
              display: block;
              width: 100%;
            }
          }
        }
        .app-game{
          width: 800px;
          height: 80px;
          margin: 30px 10px 60px;
          @media screen and (max-width: 800px) {
            width: 100%;
          }
          .game-box-panel{
            width: 800px;
            height: 80px;
            background: url("../../assets/images/going/going.png");
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 800px) {
              width: 100%;
            }
            .warp{
              height: 80px;
              width: 800px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              @media screen and (max-width: 800px) {
                width: 100%;
              }
              ul{
                list-style: none;
                padding: 0;
                margin: 0 auto;
                li{
                  display: flex;
                  line-height: 80px;
                  font-weight: bold;
                  list-style-position: inside;
                  .user{
                    font-size: 20px;
                    color: #fff;
                    @media screen and (max-width: 450px) {
                      font-size: 18px;
                    }
                    @media screen and (max-width: 414px) {
                      font-size: 16px;
                    }
                  }
                  .money{
                    font-size: 20px;
                    color: #febb2e;
                    @media screen and (max-width: 450px) {
                      font-size: 18px;
                    }
                    @media screen and (max-width: 414px) {
                      font-size: 16px;
                    }
                  }
                }
              }
            }
            .no-people{
              font-weight: bold;
              color: #fff;
              font-size: 16px;
            }
          }
          .finish-box{
            background-image: url("../../assets/images/finish/bg.png");
            width: 800px;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 50px;
            @media screen and (max-width: 1200px) {
              width: 100%;
              margin-bottom: 50px;
            }
            .finish-top{
              font-weight: bold;
              font-size: 24px;
              @media screen and (max-width: 1200px) {
                font-size: 18px;
              }
              span{
                color: #fff;
              }
              i{
                color: #ffcc00;
                border-bottom: 2px solid #FFCC00;
                outline: none;
                cursor: pointer;
                user-select: none;
              }
            }
            .finish-bottom{
              margin-top: 10px;
              font-weight: bold;
              font-size: 24px;
              color: #fff;
              @media screen and (max-width: 1200px) {
                font-size: 18px;
              }
            }
          }
        }
        .app-LoginOut{
          display: flex;
          flex-direction: column;
          align-items: center;
          .left-bonus{
            font-size: 32px;
            color: #fff;
            font-weight: bold;
            margin-bottom: 50px;
          }
          .btn-box{
            width: 100%;
            .bet-btn {
              width: 600px;
              height: 80px;
              line-height: 80px;
              text-align: center;
              border-radius: 10px;
              background: #FC534C;
              box-shadow: 0 5px 0px #ffc233;
              position: relative;
              cursor: pointer;
              user-select: none;
              @media screen and (max-width: 640px) {
                width: 100%;
                padding: 0 100px;
              }
              @media screen and (max-width: 320px) {
                width: 100%;
                padding: 0 50px;
              }
              .bet-text {
                width: 100%;
                font-size: 32px;
                color: #fff;
                font-weight: bold;
                @media screen and (max-width: 350px) {
                  font-size: 24px;
                }
              }
            }
            .outGame{
              width: 600px;
              height: 80px;
              line-height: 80px;
              text-align: center;
              border-radius: 10px;
              background: #D5D5D5;
              box-shadow: 0 5px 0px #BDBDBD;
              position: relative;
              cursor: pointer;
              user-select: none;
              @media screen and (max-width: 640px) {
                width: 100%;
                padding: 0 100px;
              }
              @media screen and (max-width: 320px) {
                width: 100%;
                padding: 0 50px;
              }
              .bet-text {
                width: 100%;
                font-size: 32px;
                color: #fff;
                font-weight: bold;
                @media screen and (max-width: 350px) {
                  font-size: 24px;
                }
              }
            }
          }
          .left-box{
            font-size: 24px;
            color: #fff;
            font-weight: bold;
            margin: 40px 0 60px;
            .left-player{
              color: #ffda73;
            }
          }
        }
        .record-box{
          width: 100%;
          padding: 0 10px;
          margin-top: 50px;
          .record-tab{
            border: 8px solid #ffc233;
            border-radius: 10px;
            width: 100%;
            height: auto;
            background-color: #ffef94;
            position: relative;
            .record-title{
              height: 80px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 10px;
              li{
                display: flex;
                .loginOut-record{
                  margin-right: 15px;
                  font-size: 18px;
                  color: #efa800;
                  font-weight: bold;
                }
                .join-record{
                  font-size: 18px;
                  color: #efa800;
                  font-weight: bold;
                }
                .tabActive{
                  font-size: 18px;
                  color: #299c91;
                  font-weight: bold;
                }
                .choose-record{
                  display: flex;
                  align-items: center;
                  .all-record{
                    font-size: 16px;
                    color: #efa800;
                    font-weight: bold;
                  }
                  .choose-icon{
                    vertical-align: middle;
                    margin-left: 5px;
                    width: 20px;
                    height: 12px;
                    margin-top: 5px;
                    img{
                      width: 100%;
                      height: 100%;
                      display: block;
                      transition: transform .3s linear;
                      &.rotate-img{
                        transform: rotate(-180deg);
                      }
                    }
                  }
                }
                .select-uls{
                  cursor: pointer;
                  position: absolute;
                  top: 60px;
                  right: -8px;
                  max-height: 0;
                  overflow: hidden;
                  transition: max-height .3s linear;
                  background-color: #ffef94;
                  width: 160px;
                  border-radius: 10px;
                  z-index: 10;
                  &.maxheigt{
                    border: 4px solid #ffc233;
                    max-height: 160px;
                  }
                  .select-list{
                    height: 50px;
                    border-bottom: 1px solid #ffc233;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    color: #efa800;
                    font-weight: bold;
                    &:last-child{
                      height: 60px;
                    }
                  }
                }
              }
            }
            .tabs-content{
              ul{
                li {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 120px;
                  margin: 0 10px;
                  border-bottom: 1px solid #ffd87c;
                  .info-box{
                    display: flex;
                    .icon-box{
                      width: 80px;
                      height: 80px;
                      margin-right: 10px;
                      @media screen and (max-width: 500px) {
                        width: 60px;
                        height: 60px
                      }
                      img{
                        display: block;
                        width: 100%;
                      }
                    }
                  }
                  .user-box{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    .user-name{
                      font-size: 18px;
                      color: #b05500;
                      font-weight: bold;
                      margin-bottom: 14px;
                      @media screen and (max-width: 320px) {
                        font-size: 14px;
                      }
                      @media screen and (max-width: 500px) {
                        margin-bottom: 10px;
                      }
                    }
                    .user-money{
                      font-size: 16px;
                      color: #b05500;
                      white-space: nowrap;
                      position: absolute;
                      top: 40px;
                      @media screen and (max-width: 320px) {
                        font-size: 12px;
                      }
                      @media screen and (min-width: 504px) and (max-width: 1200px) {
                        top: 46px;
                      }
                      span{
                        font-size: 16px;
                        color: #ffd900;
                        font-weight: bold;
                        @media screen and (max-width: 320px) {
                          font-size: 12px;
                        }
                      }
                      i{
                        font-size: 16px;
                        color: #299C91;
                        font-weight: bold;
                        @media screen and (max-width: 320px) {
                          font-size: 12px;
                        }
                      }
                    }
                  }
                  .date-box{
                    font-size: 16px;
                    color: #b05500;
                    white-space: nowrap;
                    margin-bottom: 10px;
                    @media screen and (max-width: 320px) {
                      font-size: 12px;
                    }
                  }
                }
                .activeLi{
                  padding: 0 10px;
                  margin: 0;
                  border:none;
                  background-color: #fc534c;
                  border-bottom: 1px solid #ffd87c;
                  .user-box{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .user-name{
                      font-size: 18px;
                      color: #fff;
                      font-weight: bold;
                      margin-bottom: 14px;
                      @media screen and (max-width: 320px) {
                        font-size: 14px;
                      }
                    }
                    .user-money{
                      font-size: 16px;
                      color: #fff;
                      white-space: nowrap;
                      @media screen and (max-width: 320px) {
                        font-size: 12px;
                      }
                      span{
                        font-size: 16px;
                        color: #febb2e;
                        font-weight: bold;
                        @media screen and (max-width: 320px) {
                          font-size: 12px;
                        }
                      }
                    }
                  }
                  .date-box{
                    font-size: 16px;
                    color: #fff;
                    white-space: nowrap;
                    margin-bottom: 30px;
                    @media screen and (max-width: 320px) {
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
