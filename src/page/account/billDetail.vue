<template>
  <div class="myBillDetail">
    <div class="web-pc">
      <div class="detail-content">
        <h3>账单详情</h3>
        <ul class="detailTable">
          <li>
            <span>账单编号</span>
            <span>{{detailItem.id}}</span>
          </li>
          <li>
            <span>交易金额</span>
            <span>{{detailItem.amount}} {{detailItem.currency}}</span>
          </li>
          <li>
            <span>交易类型</span>
            <span>{{detailItem.remark}}</span>
          </li>
          <li>
            <span>时间</span>
            <span>{{detailItem.nextCallbackTime}}</span>
          </li>
          <li>
            <span>订单状态</span>
            <span>{{statusChangeText(detailItem.status)}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="web-mob">
      123123132123
      <mobile-header title="账单详情"></mobile-header>
    </div>
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'
  export default {
    name: 'billList',
    data() {
      return {
        detailItem: {}
      }
    },
    components: {
      mobileHeader
    },
    created() {
      this.getListDetail()
    },
    methods: {
      statusChangeText(status) {
        if (status === -1) {
          return '删除'
        } else if (status === 0) {
          return '创建订单'
        } else if (status === 1) {
          return '处理中'
        } else if (status === 2) {
          return '处理成功'
        } else if (status === 3) {
          return '处理失败'
        } else if (status === 4) {
          return '撤单'
        } else if (status === 5) {
          return '无效'
        }
      },
      getListDetail() {
        this.$http.post(this.$api + `/tx/transactionList`).then((res) => {
          if (res.success) {
            res.data.forEach((item) => {
              if (item.id === Number(this.$route.query.id)) {
                this.detailItem = item
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .myBillDetail
    .web-pc
      .detail-content
        width 1060px
        height 900px
        padding 40px
        border 8px solid #ffc233
        border-radius 10px
        background-color #fff2b3
        color #b05500
        @media screen and (max-width: 1400px) {
          width 800px
        }
        h3
          margin-bottom 40px
          font-size 24px
          font-weight bold
          color #299c91
        .detailTable
          li
            padding 20px 40px
            display flex
            justify-content space-between
            &:nth-of-type(odd) {
              background-color #ffe097
            }
            &:nth-of-type(even) {
              background-color #fff2b3
            }
</style>
