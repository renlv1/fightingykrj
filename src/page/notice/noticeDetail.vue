<template>
  <div class="noticeDetail">
    <div class="app">
      <fixedTop :titleName="titleName" :isGoBack="true"></fixedTop>
      <div class="content-box">
        <div class="main-content">
          <div class="title">{{title}}</div>
          <div class="date" v-show="startTime">{{$changeDate(startTime, '-', 10)}}</div>
          <div class="content">{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '', // 标题
        content: '', // 公告内容
        startTime: '', // 有效期开始时间
        image: '', // 图片
        titleName: '公告详情',
        variable: 'http://ofydu65mj.bkt.clouddn.com/' // 拼接字符串需要的变量
        // obj: JSON.parse(this.$route.query.obj)
      }
    },
    created () {
      this.getNoticeInfoDetail()
    },
    mounted () {
      let that = this
      window.onresize = function () {
        that.routeRedirect() // 解决PC端空白问题
      }
    },
    methods: {
      getNoticeInfoDetail () {
        let url = `${this.$api}/version/noticeInfoDetail?noticeId=${this.$route.query.noticeId}`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            console.log(res.data)
            this.title = res.data.title
            this.content = res.data.content
            this.startTime = res.data.startTime
          }
        })
      },
      routeRedirect () {
        if (window.innerWidth > 1200) {
          this.$router.push('/notice')
        }
      }
    },
    components: {
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      fixedTop: resolve => require(['@/components/fixedTop.vue'], resolve),
      tabBar: resolve => require(['@/components/tabBar.vue'], resolve)
    }
  }
</script>

<style lang="less" scoped>
.app{
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 60px;
    width: 100%;
    height: 1600px;
    background-image: url("../../assets/images/notice/BG.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .content-box{
      margin-top: 30px;
      padding: 0 20px;
      .main-content{
        border: 8px solid #ffc233;
        border-radius: 10px;
        height: auto;
        background-color: #fff2b3;
        width: 100%;
        padding: 10px 20px 50px;
        margin-bottom: 20px;
        .title{
          font-size: 20px;
          color: #b05500;
          font-weight: bold;
        }
        .date{
          font-size: 16px;
          color: #b05500;
          margin: 15px 0;
        }
        .content{
          font-size: 20px;
          color: #b05500;
          line-height: 1.5;
          text-align: justify;
        }
      }
    }
}
</style>
