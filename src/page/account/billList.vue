<template>
  <div class="bill-wrapper">
    <div class="web-pc">
      <div class="bill-cont">
        <GeminiScrollbar class="bill">
          <h3>我的账单</h3>
          <div class="table-header">
            <span>编号</span>
            <span>交易金额</span>
            <span>交易类型</span>
            <span>时间</span>
            <span>操作</span>
          </div>
          <ul>
            <li v-for="item in billList" :key="item.index" @click="$router.push({path: '/account/myBill/billDetail', query: {id: item.id}})">
              <span>{{item.id}}</span>
              <span>{{item.amount}} {{item.currency}}</span>
              <span>{{item.remark}}</span>
              <span>{{item.createDate}}</span>
              <span>详情</span>
            </li>
          </ul>
          <turn-page class="turn-page" :propsPage="totalPage" @orderLogTrunPage="parentTurnPage"></turn-page>
        </GeminiScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import turnPage from '../../components/turnPage'
  export default {
    name: 'billList',
    data() {
      return {
        billList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        currentPage: 1 // 默认当前页为1
      }
    },
    mounted() {
      var that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
      this.getTransactionList()
    },
    methods: {
      routeRedirect() {
        if (window.innerWidth <= 1200 && this.$route.path === '/account/myBill') {
          this.$router.push('/mobileBillAccount')
        }
      },
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
      parentTurnPage(page) {
        this.currentPage = page
        this.getMyJoinList(page)
      }
    },
    components: {
      turnPage
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bill-wrapper
    .web-pc
      .bill-cont
        width 1060px
        height 500px
        @media screen and (max-width: 1400px){
          width: 800px;
        }
        .bill
          padding 40px
          border 8px solid #ffc233
          border-radius 10px
          background-color #fff2b3
          overflow: auto
          color #b05500
          .gm-scrollbar.-vertical {
            background-color: #fff2b3;
          }
          /* horizontal scrollbar track */
          .gm-scrollbar.-horizontal {
            background-color: #fff2b3;
          }
          /* scrollbar thumb */
          .gm-scrollbar .thumb {
            background-color: #fff2b3;
          }
          .gm-scrollbar .thumb:hover {
            background-color: #fff2b3;
          }
          h3
            margin-bottom 20px
            font-size 24px
            font-weight bold
            color #299c91
          .table-header
            width 960px
            display table
            table-layout fixed
            height 60px
            line-height 60px
            background-color #fff2b3
            @media screen and (max-width: 1400px){
              width: 700px;
            }
            span
              display table-cell
              text-align center
          ul
            width 960px
            padding-bottom: 40px
            @media screen and (max-width: 1400px){
              width: 700px;
              padding-bottom: 0
            }
            li
              width 960px
              display table
              table-layout fixed
              height 60px
              line-height 60px
              cursor pointer
              user-select none
              @media screen and (max-width: 1400px){
                height 40px
                line-height 40px
                width: 700px;
              }
              &:nth-child(odd) {
                background-color #ffe097
              }
              &:nth-child(even) {
                background-color #fff2b3
              }
              span
                display table-cell
                text-align center
          .turn-page
            width 960px !important
            @media screen and (max-width: 1400px){
              width: 700px !important;
            }
</style>
