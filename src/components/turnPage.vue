<template>
  <div class="turnPage" v-if="pages !== 0">
    <div class="pagelist">
      <span class="phTurnPage arrow-jump" :class="{disabled: pstart}" @click="jumpPage(--current_page)">
        <img src="../assets/images/common/arrow_left.png" alt="">
      </span>
      <span class="jump arrow-jump" :class="{disabled: pstart}" @click="jumpPage(--current_page)"><img src="../assets/images/common/arrow_left.png" alt=""></span>
      <span v-show="current_page > 5 && pages !== 7 && pages !== 6" class="jump" @click="jumpPage(1)">1</span>
      <!--<span class="ellipsis ellipsis1" v-show="efont">...</span>-->
      <span class="jump" v-for="num in indexs" :key="num" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
      <!--<span class="ellipsis ellipsis2" v-show="ebehind">...</span>-->
      <span v-show="current_page > 5 && current_page <= pages - 5" class="jump" @click="jumpPage(pages)">{{pages}}</span>
      <span :class="{disabled: pend}" class="jump arrow-jump" @click="jumpPage(++current_page)"><img src="../assets/images/common/arrow_right.png" alt=""></span>
      <span class="phTurnPage arrow-jump" :class="{disabled: pend}" @click="jumpPage(++current_page)"><img src="../assets/images/common/arrow_right.png" alt=""></span>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$btn31 = #FC534C // 按钮颜色
.turnPage
  text-align center
  .pagelist
    display flex
    align-items center
    justify-content center
    user-select none
    padding 30px 0
    @media screen and (max-width 768px)
      display flex
      justify-content space-around
    .ellipsis
      margin-left: 20px
      @media screen and (max-width 768px)
        display none
    .jump
      font-size 20px
      width: 40px
      height: 40px
      display block
      text-align: center
      line-height: 30px
      border-radius 8px
      font-weight: bold
      border: 6px solid #ffc233
      background-color: #ffef94
      cursor pointer
      margin-left 20px
      color #299c91
      &.disabled
        pointer-events none
      @media screen and (max-width 768px)
        display none
      &.bgprimary
        color #fff
        background-color: #299c91
        border: 6px solid #066055;
        @media screen and (max-width 768px)
          font-size 14px
          display: block
          margin-left:0
      &.arrow-jump
        border: none
        background-color: transparent
    .phTurnPage
      display none
      font-size 14px
      &.disabled
        pointer-events none
        color #ccc
      @media screen and (max-width 768px)
        display inline-block
</style>

<script>
export default{
  props: [
    'propsPage'
  ],
  data () {
    return {
      current_page: 1, // 当前页
      nowIndex: 0
    }
  },
  mounted () {
    // console.log(this.$store.state.rewardPage)
  },
  computed: {
    pages () {
      return this.propsPage
    },
    show () {
      return this.pages && this.pages !== 1
    },
    pstart () {
      return this.current_page === 1
    },
    pend () {
      return this.current_page === this.pages
    },
    efont () {
      if (this.pages <= 7) return false
      return this.current_page > 5
    },
    ebehind () {
      if (this.pages <= 7) return false
      var nowAy = this.indexs
      return nowAy[nowAy.length - 1] !== this.pages
    },
    indexs () {
      var left = 1
      var right = this.pages
      var ar = []
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3
          right = Number(this.current_page) + 3
        } else {
          if (this.current_page <= 5) {
            left = 1
            right = 7
          } else {
            right = this.pages
            left = this.pages - 6
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    jumpPage (page) {
      this.current_page = page
      this.$emit('achievementTrunPage', page) // 查看业绩
      this.$emit('orderLogTrunPage', page) // 订单记录
      this.$emit('discountTrunPage', page) // 优惠券兑换记录
      this.$emit('noticeTrunPage', page) // 公告列表
      this.$emit('bettingTrunPage', page) // 投注中
      this.$emit('ongoingTrunPage', page) // 进行中
      this.$emit('joinTrunPage', page) // 参与记录
      this.$emit('activityLog', page) // 往期活动
      this.$emit('activityLogDetail', page) // 往期活动详情
      this.$emit('eatGameHome', page) // 吃饼游戏
      this.$emit('getRecordList', page) // 我的排位奖励
      this.$emit('rechargeTrun', page) // 充值
      this.$emit('withdrawTrun', page) // 提现
      this.$emit('usdTradeTrun', page) // USD交易
      this.$emit('finishedTrun', page) // USD已完成交易列表
      this.$emit('sieTradeTrun', page) // 交易
      this.$emit('transferTrun', page) // 转账
      this.$emit('finishedTrun1', page) // USD提现已完成交易列表
    },
    resetPage (val) {
      this.current_page = val
    }
  }
}
</script>
