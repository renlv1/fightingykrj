<template>
  <div class="betting">
    <div class="betting-web">
      <div class="wrap-box">
      <div class="main-box">
        <div class="status-box">
          <div class="status">投注中</div><div class="number">(编号: {{gameHouse.id}})</div>
        </div>
        <div class="bonus-box" style="display: flex;align-items: center;justify-content: center">
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
        <div class="jackpot">累计奖金</div>
        <div class="jackpot-img">
          <!--<div class="box-bg"><img src="../../assets/images/betting/box.png"></div>-->
          <div class="money-box">
            <div class="box-bg" v-if="true">
              <img src="../../assets/images/betting/open_box.png" alt="">
            </div>
            <div class="close-box" v-if="false">
              <img src="../../assets/images/betting/box.png" class="close-box">
            </div>
            <div class="box-2">
              <img src="../../assets/images/betting/golden_light.png" alt="">
            </div>
            <div class="box-3" v-if="true">
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
          <div class="game-box-panel">
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
        </div>
        <div class="bet-btn" v-if="userHaveOperate === 1" @click="btnConfirm()">
          <div class="bet-text">投注{{defaultMoney}}{{defaultCurrent}}</div>
        </div>
        <div class="bet-finish" v-else-if="userHaveOperate === 2">
          <div class="bet-text">已投注</div>
        </div>
        <div class="join-user">参与玩家：{{gameHouse.totalJoinCount}}</div>
        <div class="bar">
          <div class="progress">
            <div class="all"><img src="../../assets/images/betting/green.png" class="green-bg"></div>
            <div class="already" :style="styleObject"><img src="../../assets/images/betting/red.png"></div>
          </div>
          <div class="left-time"><span>剩余时间</span> <span class="percentage">{{lastTime}}</span></div>
        </div>
        <div class="join-record">
          <div class="record-tab">参与记录</div>
          <ul>
            <li v-for="(item,index) in gameJoinDetailList" :key="index">
              <div class="info-box">
                <div class="icon-box"><img src="../../assets/images/betting/icon.png"></div>
                <div class="user-box">
                  <div class="user-name">{{item.userNickName}}</div>
                  <div class="user-money">{{joinType(item.joinType)}}游戏，奖金增加 <span>{{item.amount}} {{item.currency}}</span></div>
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
          <v-turnPage v-show="gameJoinDetailList.length !== 0" :propsPage="totalPage" @bettingTrunPage="toTurnPage"></v-turnPage>
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
            <div class="status">投注中</div><div class="number">(编号: {{gameHouse.id}})</div>
          </div>
          <!--<div class="app-bonus">-->
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
          <div class="app-bonus" style="display: flex;align-items: center;justify-content: center">
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
          <div class="app-current">累计奖金({{gameHouse.joinCurrency}})</div>
          <div class="app-jackpot-img" v-if="false">
            <!--<div class="box-bg"><img src="../../assets/images/betting/box.png"></div>-->
            <div class="box-tree">
              <img src="../../assets/images/betting/bg.png"  class="tree-bg">
              <div class="close-bg">
                <div class="close-box">
                  <img src="../../assets/images/betting/box.png">
                </div>
              </div>
              <!--<img src="../../assets/images/betting/bg.png" class="tree-bg">-->
            </div>
          </div>
          <div class="app-bubbling" v-if="true">
            <!--<img src="../../assets/images/going/app-money.png" v-show="status === 1">-->
            <div class="money-box">
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
          </div>
          <div class="app-game">
            <div class="game-box-panel">
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
          </div>
          <div class="app-LoginOut">
            <div class="left-bonus"><span>剩余时间</span> <span class="percentage">{{lastTime}}</span></div>
            <div class="btn-box">
              <div class="bet-btn" v-if="userHaveOperate === 1">
                <div class="bet-text" @click="btnConfirm()">投注{{defaultMoney}} {{defaultCurrent}}</div>
              </div>
              <div class="outGame" v-else-if="userHaveOperate === 2">
                <div class="bet-text">已投注</div>
              </div>
            </div>
            <div class="left-box">
              <i>参与玩家：</i><span>{{gameHouse.totalJoinCount}}</span>
            </div>
          </div>
          <div class="record-box">
            <div class="record-tab">
              <ul class="record-title">
                <li>
                  <div class="join-record">参与记录</div>
                </li>
              </ul>
              <div class="tabs-content">
                <ul>
                  <li v-for="(item,index) in gameJoinDetailList" :key="index">
                    <div class="info-box">
                      <div class="icon-box"><img src="../../assets/images/betting/icon.png"></div>
                      <div class="user-box">
                        <div class="user-name" >{{item.userNickName}}</div>
                        <div class="user-money">{{joinType(item.joinType)}}游戏，奖金增加 <span>{{item.amount}} {{item.currency}}</span></div>
                      </div>
                    </div>
                    <div class="date-box">{{$changeDate(item.updateTime, '.', 9)}}</div>
                  </li>
                </ul>
                <v-turnPage v-show="gameJoinDetailList.length !== 0" :propsPage="totalPage" @bettingTrunPage="toTurnPage"></v-turnPage>
              </div>
            </div>
            <div class="load-more-box" v-show="gameJoinDetailList.length === 0">
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
    <!--投注弹窗-->
    <!--<transition name="dialog">-->
      <!--<div class="myPopup" v-show="payPopupShow">-->
        <!--<div class="myPopup-box">-->
          <!--<div class="formDiv">-->
            <!--<div class="title">{{gameHouse.joinAmount}} {{gameHouse.joinCurrency}}</div>-->
            <!--<input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword"  value="" placeholder="输入安全密码">-->
            <!--&lt;!&ndash;谷歌&ndash;&gt;-->
            <!--<div class="shortMsg">-->
              <!--<div class="payMsg-box">-->
                <!--<input class="payMsg tradingCenter-input" v-model.trim="payCode"   placeholder="输入谷歌验证码" type="number" value="">-->
                <!--<div class="errmsg-tips">{{payFailTip}}</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="pay-box">-->
              <!--<button class="tradingCenter-btn" @click="confirmPay()">确认</button>-->
              <!--<button class=" pay-btn" @click="payPopupShow = false">取消</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
    <!--投注失败弹窗-->
    <!--<transition name="dialog">-->
      <!--<div class="myPopup" v-show="failPopupShow">-->
        <!--<div class="myPopup-box">-->
          <!--<div class="formDiv">-->
            <!--<div class="title">{{failedTip}}</div>-->
            <!--<div class="pay-box">-->
              <!--<button class="failed-btn" @click="failPopupShow = false">确认</button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
    <!--完成弹窗-->
    <!--<transition name="dialog">-->
      <!--<div class="myPopup" v-show="confirmShow">-->
        <!--<div class="myPopup-box">-->
          <!--&lt;!&ndash;支付成功弹窗&ndash;&gt;-->
          <!--<div v-show="isSuccess" class="success-box">-->
            <!--<div class="title-status">投注成功</div>-->
            <!--<button class="success-btn" @click="confirmShow = false">关闭 ( {{sendBtnValue}} S )</button>-->
          <!--</div>-->
          <!--&lt;!&ndash;支付失败弹窗&ndash;&gt;-->
          <!--<div v-show="!isSuccess" class="success-box">-->
            <!--<span class="title-status">投注失败:</span>-->
            <!--<span class="failed-errinMsg">{{errinMsgText}}</span>-->
            <!--<button class="success-btn" @click="confirmShow = false">关闭 ( {{sendBtnValue}} S )</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
    <v-dialog :title="dialogTitle" @cancelDialog="cancelDialog" v-if="veriDialog" @successDialog="successDialog"></v-dialog>
    <!-- 未设置验证码-->
    <!--<transition name="dialog">-->
      <!--<div class="myPopup" v-if="setSafeVerific">-->
        <!--<div class="myPopup-box" >-->
          <!--<p class="title-status">请先开启谷歌验证码</p>-->
          <!--<div class="success-box">-->
            <!--<button class="success-btn" @click="setSafeVerific = false">确定</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
  </div>
</template>

<script>
  import Dialog from '@/components/dialog2'
  import vueSeamless from 'vue-seamless-scroll'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        isMoneyChange: false,
        listData: [
          {user: '基督教的', money: '100USD'},
          {user: '基督教的', money: '100USD'}
        ],
        dialogTitle: '',
        visible: false,
        veriDialog: false,
        defaultCurrent: '',
        defaultMoney: '',
        recordList: [],
        pageSize: 10,
        queryType: 1, // 1参与记录 2退出记录
        exitQueryType: '', //  1已获奖 2未获奖
        totalPage: 1, // 参与记录页数
        ongoingPage: '', // 参与记录分页
        betShow: true, // 判断是否投注
        payPopupShow: false, // 投注弹窗
        failPopupShow: false, // 投注失败弹窗
        failedTip: '', // 投注失败提示
        payPassword: '', // 安全码
        payCode: '', // 验证码
        payFailTip: '', // 确认支付错误提示
        confirmShow: false, // 支付完成弹窗
        isSuccess: true, // 支付成功或者失败弹窗
        errinMsgText: '', // 支付失败提示
        setSafeVerific: false, // 未设置安全验证弹窗
        timer: null, // 3s倒计时
        leftTime: null, // 剩余时间
        countdownTime: null, // 剩余时间倒计时
        sendBtnValue: 3,
        sendBtnTimes: 3,
        timerPoll: null,
        titleName: '游戏详情',
        gameHouse: '', // 房间详情
        status: '', // 状态 1投注中 2进行中 3已结束
        userHaveOperate: '', // 用户是否有加入游戏或有退出游戏标识 1未加入或未退出 2已加入或已退出
        totalJoinAmount: '', // 总累计金额
        gameJoinDetailList: [], // 加入游戏列表
        totalTime: '', // 投注总时间（秒数）
        finishLastTime: '', // 剩余投注结束时间（秒数）
        lastTime: '',
        progressCountdown: '', // 进度条倒计时
        hour: '',
        minute: '',
        second: '',
        styleObject: {
          height: '29px',
          width: 0
        },
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
        mockData: [0] // 模拟数据
      }
    },
    created () {
      this.getRecordList(1)
      this.getGameHouseDetail(1)
      setTimeout(() => {
        if (this.status === 1) {
          this.timerPoll = setInterval(() => {
            this.getGameHouseDetail(1)
          }, 3000)
        }
      }, 500)
    },
    mounted() {
      // console.log('mounted')
      // var a = 100
      // this.leftTime = setInterval(() => {
      //   // a = this.processbar()
      //   // console.log('a is' + a + typeof a)
      //   // if (a === 0) {
      //   //   clearInterval(this.leftTime)
      //   //   console.log('执行了clearInterval函数')
      //   // }
      //   if (this.lastTime > 0) {
      //     this.processbar()
      //   } else {
      //     clearInterval(this.leftTime)
      //     // console.log('执行了clearInterval函数')
      //   }
      // }, 1000)

      // 模拟接口返回数据
      let index = 0
      this.animateNum(this.mockData[index])
      setInterval(() => {
        if (index >= this.mockData.length - 1) {
          index = -1
        }
        index++
        this.animateNum(this.mockData[index])
      }, 1000)
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
      // processbar () {
      //   this.lastTime--
      //   this.styleObject.width = this.lastTime + '%'
      //   // console.log(this.styleObject.width)
      //   if (this.lastTime < 0) {
      //     this.lastTime = 0
      //   }
      //   // console.log('this.num is' + typeof this.num)
      //   return this.lastTime
      // },
      // 确定投注
      btnConfirm () {
        this.payPassword = ''
        this.payCode = ''
        this.payFailTip = ''
        this.veriDialog = true
        this.dialogTitle = `${this.defaultMoney} ${this.defaultCurrent}`
      },
      successDialog () {
        this.veriDialog = false
        let url = `${this.$api}/game/joinGame?gameHouseId=${this.$route.query.gameId}`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            this.getGameHouseDetail(1)
            this.userHaveOperate = 2
            Dialog({
              title: '投注成功'
            })
          } else {
            Dialog({
              title: res.msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //  1.4 游戏房间详情
      // 接口URL: webapi.banghongda88.com/game/gameHouseDetail
      getGameHouseDetail (page) {
        let url = `${this.$api}/game/gameHouseDetail?gameHouseId=${this.$route.query.gameId}&pageIndex=${page}&pageSize=${this.pageSize}&queryType=${this.queryType}&exitQueryType=`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            // console.log(res.data)
            this.gameHouse = res.data.gameHouse
            this.userHaveOperate = res.data.userHaveOperate
            this.defaultMoney = res.data.gameHouse.joinAmount
            this.defaultCurrent = res.data.gameHouse.joinCurrency
            this.totalJoinAmount = res.data.gameHouse.totalJoinAmount
            this.gameJoinDetailList = res.data.gameJoinDetailList
            // console.log(res.data.gameJoinDetailList)
            this.mockData.push(this.totalJoinAmount)
            this.mockData.shift()
            this.status = res.data.gameHouse.status
            this.totalTime = res.data.gameHouse.totalTime
            this.finishLastTime = res.data.gameHouse.finishLastTime
            this.countdownTime = setInterval(() => {
              this.finishLastTime--
              this.progressCountdown = (this.finishLastTime / this.totalTime) * 100
              this.styleObject.width = (this.progressCountdown) + '%'
              // console.log('this.num is' + typeof this.lastTime)
              if (this.finishLastTime <= 0) {
                this.lastTime = '00:00:00'
                clearInterval(this.countdownTime)
              } else {
                let hour = parseInt(Number(this.finishLastTime) / 60 / 60 % 24)
                let minute = parseInt(Number(this.finishLastTime) / 60 % 60)
                let second = parseInt(Number(this.finishLastTime) % 60)
                this.hour = this.checkTime(hour)
                this.minute = this.checkTime(minute)
                this.second = this.checkTime(second)
                this.lastTime = `${this.hour}:${this.minute}:${this.second}`
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      checkTime(i) {
        if (i < 10) {
          i = '0' + i
        }
        return i
      },
      // 参与记录列表
      getRecordList (page) {
      },
      // 确定支付
      // confirmPay () {
      //   if (this.payPassword === '') {
      //     this.payFailTip = '请输入安全密码'
      //     return
      //   }
      //   if (this.payCode === '') {
      //     this.payFailTip = '请输入谷歌验证码'
      //     return
      //   }
      //   this.payPopupShow = false
      //   this.confirmShow = true
      //   this.betShow = false
      //   this.countDown()
      // },
      // 3s倒计时
      countDown () {
        if (this.sendBtnValue === 0) {
          this.confirmShow = false
          this.sendBtnTimes = 3
          clearTimeout(this.timer)
        } else {
          this.sendBtnValue = this.sendBtnTimes
          this.sendBtnTimes--
          this.timer = setTimeout(() => this.countDown(), 1000)
        }
      },
      // 加入状态
      joinType (type) {
        if (type === 1) {
          return '加入'
        } else if (type === 2) {
          return '退出'
        }
      },
      cancelDialog () {
        this.veriDialog = false
      },
      toTurnPage (page) {
        this.ongoingPage = page
        this.getRecordList(page)
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer) // 清除3S的计时器timerPoll
      clearInterval(this.countdownTime)
    },
    computed: {
      classOption() {
        return {
          step: 0.5,
          limitMoveNum: 2,
          waitTime: 1000,
          openTouch: false
        }
      },
      ...mapGetters([
        'userInfo'
      ])
    },
    components: {
      vueSeamless,
      vDialog: resolve => require(['@/components/dialog/index.vue'], resolve),
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve),
      tabBar: resolve => require(['@/components/tabBar.vue'], resolve)
    }
  }
</script>

<style lang="less" scoped>
.bonus-box{
  // img{
  //   width: 136px;
  //   transform: rotateX(0deg);
  //   transition: all .3s linear;
  // }
}
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
          height: 100px;
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
.betting-web{
  width: 100%;
  height: 3000px;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 120px;
  background-image: url("../../assets/images/common/BG.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /*@media screen and (max-width: 1200px) {*/
    /*display: none;*/
  /*}*/
  .bet-btn{
    width: 516px;
    height: 116px;
    background: url("../../assets/images/betting/start.png");
    position: relative;
    cursor: pointer;
    user-select: none;
    .bet-text{
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: #fff;
      font-weight: bold;
    }
  }
  .bet-finish{
    width: 516px;
    height: 116px;
    background: url("../../assets/images/betting/end.png");
    position: relative;
    cursor: not-allowed;
    user-select: none;
    .bet-text{
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: #fff;
      font-weight: bold;
    }
  }
  .join-user{
    margin: 40px 0 60px;
    text-shadow: 0px 4px rgba(0,0,0, .2);
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
      /*background: url("../../assets/images/betting/green.png");*/
      /*background-position: center;*/
      /*background-size: cover;*/
      /*background-repeat: no-repeat;*/
      width: 464px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      .already{
        transition: 0.2s;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        max-width: 464px;
        height: 29px;
        img{
          border-radius: 14px;
          display: block;
          width: 100%;
          height: 100%;
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
  .join-record{
    width: 1320px;
    margin: 60px 0 40px;
    @media screen and (max-width: 1350px) {
      width: 90%;
    }
    .record-tab{
      width: 100%;
      border: 8px solid #ffc233;
      border-radius: 10px;
      background-color: #ffef94;
      height: 80px;
      padding-left: 56px;
      color: #b05500;
      font-weight: bold;
      font-size: 24px;
      line-height: 65px;
      margin-bottom: 20px;
    }
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
        padding: 0 10px;
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
              color: #299c91;
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
        height: 368px;
        position: relative;
        margin-top: 116px;
        @media screen and (max-width: 683px) {
          width: 100%;
          height: 300px;
        }
        .close-bg {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 84px;
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
        }
        .box-tree{
          /*width: 100%;*/
          /*height: 368px;*/
          /*position: relative;*/
          /*background-image: url("../../assets/images/betting/bg.png");*/
          /*background-position: center;*/
          /*background-size: cover;*/
          /*background-repeat: no-repeat;*/
          @media screen and (max-width: 683px) {
            .tree-bg{
              width: 100%;
              height: auto;
            }
          }
          /*@media screen and (max-width: 683px) {*/
            /*width: 100%;*/
            /*height: 335px;*/
          /*}*/
          /*@media screen and (max-width: 580px) {*/
            /*width: 100%;*/
            /*height: 280px;*/
          /*}*/
          /*@media screen and (max-width: 528px) {*/
            /*width: 100%;*/
            /*height: 250px;*/
          /*}*/
          /*@media screen and (max-width: 462px) {*/
            /*width: 100%;*/
            /*height: 225px;*/
          /*}*/
          /*@media screen and (max-width: 375px) {*/
            /*width: 100%;*/
            /*height: 202px;*/
          /*}*/
          /*@media screen and (max-width: 320px) {*/
            /*width: 100%;*/
            /*height: 170px;*/
          /*}*/
          .close-box{
            position: absolute;
            left: 50%;
            top: 29%;
            transform: translate(-50%);
            @media screen and (max-width: 682px) {
              top: -34%;
            }
            @media screen and (max-width: 414px) {
              top: -26%;
            }
            @media screen and (max-width: 320px) {
              top: -24%;
            }
            img{
              display: block;
              width: 100%;
            }
          }
        }
      }
      .app-bubbling{
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
            background: #FFCC00;
            box-shadow: 0 5px 0px #FFAA33;
            position: relative;
            cursor: pointer;
            user-select: none;
            @media screen and (max-width: 640px) {
              width: 100%;
              padding: 0 80px;
            }
            @media screen and (max-width: 320px) {
              width: 100%;
              padding: 0 30px;
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
            user-select: none;
            cursor: not-allowed;
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
                color: #299c91;
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
                      color: #299c91;
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
.myPopup{
  input::-webkit-input-placeholder { /* WebKit browsers */
    color: #b05500;
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #b05500;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #b05500;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #b05500;
  }
}
</style>
