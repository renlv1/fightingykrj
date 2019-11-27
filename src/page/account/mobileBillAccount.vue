<template>
  <div class="mobileBillAccount">
    <div class="web-mob">
      <mobile-header title="我的账单" :has-back-icon="true" :has-message-icon="true"></mobile-header>
      <div class="list-mobile-bill">
        <ul>
          <li v-for="item in billList" :key="item.index" @click="$router.push({path: '/mobileBillDetail', query: {id: item.id}})">
            <div class="top-bill">
              <div class="left-top">
              <span class="icon-left"><img width="13" height="13"
                                           src="../../assets/mobile-images/account/xing.png"/></span>
                <span class="text-num">编号：</span>
                <span class="value">{{item.id}}</span>
              </div>
              <div class="right-top">{{item.remark}}</div>
            </div>
            <div class="middle-bill">
              <div class="left-middle">{{item.amount}} {{item.currency}}</div>
            </div>
            <div class="bottom-bill">
              <div class="left-bottom">加入时间</div>
              <div class="right-bottom">{{item.createDate}}</div>
            </div>
          </li>
        </ul>
      </div>
      <turn-page :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></turn-page>
    </div>
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'
  import turnPage from '../../components/turnPage'

  export default {
    name: 'mobileBillAccount',
    data() {
      return {
        billList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        currentPage: 1 // 默认当前页为1
      }
    },
    created() {
      this.getTransactionList()
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      getTransactionList(pageIndex) {
        this.$http.post(this.$api + `/tx/transactionList`, {
          pageIndex: pageIndex,
          pageSize: this.pageSize
        }).then((res) => {
          if (res.success) {
            this.billList = res.data
            this.totalPage = res.mapData.totalPage
          }
        })
      },
      routeRedirect() {
        if (window.innerWidth > 1200 && this.$route.path === '/mobileBillAccount') {
          this.$router.push('/account/myBill')
        }
      },
      parentTurnPage(page) {
        this.currentPage = page
        this.getTransactionList(page)
      }
    },
    components: {
      mobileHeader,
      turnPage
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mobileBillAccount
    width 100%
    min-height 100vh
    background-image url("../../assets/mobile-images/account/BG.png")
    background-size cover
    .web-mob
      .list-mobile-bill
        ul
          padding 0 15px
          li
            margin-top 20px
            display flex
            flex-direction column
            padding 20px 15px
            background-color #fff2b3
            border 4px solid #ffc233
            border-radius 5px
            .top-bill, .middle-bill, .bottom-bill
              display flex
              flex-direction row
              justify-content space-between
            .top-bill
              font-size 12px
              font-weight bold
              .left-top
                font-size 0
                color #b05500
                span
                  font-size 12px
                .text-num
                  margin-left 4px
              .right-top
                color #299c91
            .middle-bill
              margin 15px 0
              color #b05500
              font-weight bold
            .bottom-bill
              color #b05500
              font-size 10px
</style>
