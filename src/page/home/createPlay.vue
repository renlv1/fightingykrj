<template>
  <div class="createPlay-w">
    <fixedTop :titleName="titleName" :messageShow="false"></fixedTop>
    <div class="createPlay">
      <div class="left">
        <img src="../../assets/images/home/create_play.png" alt="">
      </div>
      <div class="right-content">
        <h3 class="title">创建游戏</h3>
        <p class="label">投注币种</p>
        <ul class="uls">
          <li v-for="(item, index) in currencyArr" :key="index" class="list" :class="{'active-list': currentIndex1 === index}" @click="clickOne1(index, item.currencyCode)">{{item.currencyCode}}</li>
        </ul>
        <p class="label">投注金额</p>
        <ul class="uls">
          <li v-for="(item, index) in moneyArr" :key="index" class="list" :class="{'active-list': currentIndex2 === index}" @click="clickOne2(index, item)">{{item.currencyAmount}} {{item.currencyCode}}</li>
        </ul>
        <div class="btn-create" @click="createBtn">创建并投注</div>
        <p class="tips">支付对应投注金额后，即可完成创建</p>
      </div>
    </div>
    <v-dialog :title="dialogTitle" @cancelDialog="cancelDialog" v-if="veriDialog" @successDialog="successDialog"></v-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Dialog from '@/components/dialog2'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      veriDialog: false,
      titleName: '创建游戏',
      dialogTitle: '',
      currentIndex1: 0,
      currentIndex2: 0,
      currencyArr: [],
      moneyArr: [],
      defaultCurrent: '',
      defaultMoney: ''
    }
  },
  created () {
    this.getGameCurrency()
  },
  methods: {
    // 查询可参与的币种列表
    getGameCurrency () {
      this.$http.post(this.$api + '/game/queryGameCurrencyList').then(res => {
        if (res.success === true) {
          this.currencyArr = res.data
          this.activeCurrency = res.data[0].currencyCode
          this.getAmountList()
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
          if (res.data.length > 0) {
            this.moneyArr = res.data
            this.defaultMoney = res.data[0].currencyAmount
            this.defaultCurrent = res.data[0].currencyCode
            this.recordListId = res.data[0].id
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择投注币种
    clickOne1 (index, item) {
      this.currentIndex1 = index
      this.defaultCurrent = item
      this.activeCurrency = item
      this.currentIndex2 = 0
      this.getAmountList()
    },
    // 选择投注金额
    clickOne2 (index, item) {
      this.currentIndex2 = index
      this.defaultMoney = item.currencyAmount
      this.recordListId = item.id
    },
    // 创建投注
    createBtn () {
      this.dialogTitle = `${this.defaultMoney} ${this.defaultCurrent}`
      this.veriDialog = true
    },
    // 支付验证成功
    successDialog () {
      this.veriDialog = false
      this.$http.post(this.$api + '/game/newGameHouse', {
        platformCurrencyId: this.recordListId
      }).then(res => {
        if (res.success === true) {
          Dialog({
            title: '创建成功'
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
    cancelDialog () {
      this.veriDialog = false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    vDialog: resolve => require(['@/components/dialog/index.vue'], resolve),
    fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve)
  }
}
</script>

<style lang="less" scoped>
img{
  width: 100%;
  display: block;
}
.createPlay-w{
  padding: 180px 0 500px;
  @media screen and (max-width: 1200px) {
    padding: 100px 10px 200px;
  }
}
.createPlay{
  width: 1060px;
  height: auto;
  margin: 0 auto;
  border: 8px solid #ffc233;
  border-radius: 20px;
  background-color: #fff2b3;
  padding: 32px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 20px 10px;
    border: 5px solid #ffc233;
    display: block;
  }
  .left{
    width: 350px;
    margin-right: 70px;
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .right-content{
    flex: 1;
    .title{
      font-size: 24px;
      color: #299c91;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }
    .label{
      font-size: 18px;
      color: #b05500;
      margin: 40px 0 20px;
      font-weight: bold;
      @media screen and (max-width: 1200px) {
        margin: 0 0 10px;
      }
    }
    .uls{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .list{
        width: 120px;
        height: 40px;
        background-color: #299c91;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        cursor: pointer;
        margin-bottom: 20px;
        @media screen and (max-width: 1200px) {
          width: 22%;
          height: 32px;
          font-size: 12px;
          margin-bottom: 10px;
        }
        &:nth-child(4n){
          margin-right: 0;
        }
        &.active-list{
          background-color: #fc534c;
        }
      }
    }
    .btn-create{
      width: 220px;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight:bold;
      background-color: #fc534c;
      border-radius: 8px;
      color: #fff;
      box-shadow: 0 5px 0 #ffc233;
      margin: 40px 0 20px;
      cursor: pointer;
      @media screen and (max-width: 1200px) {
        width: 100%;
        height: 40px;
        font-size: 16px;
        margin: 20px 0;
      }
    }
    .tips{
      font-size: 14px;
      color: #b05500;
      @media screen and (max-width: 1200px) {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
