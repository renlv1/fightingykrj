<template>
  <div class="mobileBillDetail">
    <div class="web-mob">
      <div class="content-detail">
        <mobile-header :has-back-icon="true" :has-message-icon="true" title="账单详情"></mobile-header>
        <ul class="detail-content">
          <li>
            <span>编号</span>
            <span>{{objItem.id}}</span>
          </li>
          <li>
            <span>交易金额</span>
            <span>{{objItem.amount}}</span>
          </li>
          <li>
            <span>创建时间</span>
            <span>{{objItem.createDate}}</span>
          </li>
          <li>
            <span>交易类型</span>
            <span>{{objItem.remark}}</span>
          </li>
          <li>
            <span>订单状态</span>
            <span>{{statusChangeText(objItem.status)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import mobileHeader from '../../components/mobileHeader'

  export default {
    name: 'mobileBillDetail',
    components: {
      mobileHeader
    },
    data() {
      return {
        objItem: {}
      }
    },
    created() {
      this.getTransactionList()
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
      getTransactionList() {
        this.$http.post(this.$api + `/tx/transactionList`).then((res) => {
          if (res.success) {
            res.data.forEach((item) => {
              if (item.id === Number(this.$route.query.id)) {
                this.objItem = item
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mobileBillDetail
    .web-mob
      .content-detail
        width 100%
        height 100%
        min-height 100vh
        background-image url("../../assets/mobile-images/account/BG.png")
        background-size cover
        .detail-content
          margin 15px
          background-color #fff2b3
          border 4px solid #ffc233
          border-radius 5px
          li
            display flex
            justify-content space-between
            color #b05500
            font-size 12px
            padding 15px
            &:nth-of-type(odd) {
              background-color #ffe097
            }
            &:nth-of-type(even) {
              background-color #fff2b3
            }
</style>
