<template>
  <div class="notice">
    <div class="notice-web">
      <ul>
        <li v-for="(item,index) in noticeList" :key="index" :class="{height: !contentShow}" class="list-item">
          <GeminiScrollbar class="scroll-w">
            <div class="li-box">
              <div class="li-title">
                <div class="img-box">
                  <img src="../../assets/images/notice/notice-a.png">
                </div>
                <div class="title">{{item.title}}</div>
              </div>
              <div class="date">{{$changeDate(item.startTime, '.', 5)}}</div>
            </div>
            <div class="li-content" v-show="contentShow" @click="readUp(item)">
              <div class="content">{{showContent(item.content, 200)}}</div>
              <div class="read-box"><span>阅读全文</span><div class="img-box"> <img src="../../assets/images/notice/notice-c.png"></div></div>
            </div>
            <div class="li-content" v-show="!contentShow" @click="readUp(item)">
              <div class="content">{{item.content}}</div>
              <div class="read-box"><span>收起</span><div class="img-box"> <img src="../../assets/images/notice/notice-b.png"></div></div>
            </div>
          </GeminiScrollbar>
        </li>
        <v-turnPage v-show="noticeList.length !== 0" :propsPage="totalPage" @noticeTrunPage="toTurnPage"></v-turnPage>
      </ul>
      <div class="load-more-box" v-show="emptyData">
        <div class="noData-box">
          <div class="loading-img">
            <img src="../../assets/images/notice/noData.png">
          </div>
          <p class="desc">暂无数据</p>
        </div>
      </div>
    </div>
    <div class="notice-app">
      <fixedTop :titleName="titleName" :isGoBack="true"></fixedTop>
      <ul>
        <li v-for="(item,index) in noticeList" :key="index" @click="toDetail(item)">
          <div class="title">{{item.title}}</div>
          <div class="date">{{$changeDate(item.startTime, '.', 5)}}</div>
        </li>
        <div class="load-more-box" v-show="emptyData">
          <div class="noData-box">
            <div class="loading-img">
              <img src="../../assets/images/notice/noData.png">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        noticeList: [],
        titleName: '公告列表',
        emptyData: false,
        contentShow: true,
        category: 1, // 1 普通公告 2 更新公告
        noticeId: '',
        allContent: '',
        pageSize: 10,
        totalPage: 1, // 公告页数
        noticePage: '' // 公告分页
      }
    },
    created () {
      // this.showContent()
      this.getNoticeList(1)
    },
    methods: {
      getNoticeList (page) {
        let url = `${this.$api}/version/noticeInfoList?pageIndex=${page}&pageSize=${this.pageSize}&category=${this.category}`
        this.$http.post(url).then(res => {
          if (res.status === 'success') {
            console.log(res.data)
            this.noticeList = res.data
            if (this.noticeList.length === 0) {
              this.emptyData = true
            } else {
              this.emptyData = false
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      readUp (item) {
        this.noticeId = item.id
        this.contentShow = !this.contentShow
      },
      // showContent (value) {
      //   let len = 200
      //   // let content = value.innerHTML
      //   let ctn
      //   if (value) {
      //     ctn = value.substring(0, len)
      //   }
      //   return ctn
      // },
      // 英文标题按单词截取(参数说明 text:要截取的英文 len：要截取的长度)
      showContent (text, len) {
      if (text.length < len) { // 如果要截取文本的长度小于或者等于要截取的长度，则不进行截取，直接返回文本
        return text
      } else { // 文本的长度大于要截取的长度，进行截取
        text = text.substr(0, len)
  //       以空格切分字符串
        var textArr = text.split('')
  //           最后一个字符长度
        var lastLen = textArr.pop().length
        console.log(textArr.pop())
        if (lastLen > 3) {
          return text.substr(0, text.length - lastLen - 1) + ' ...'
        } else if (lastLen === 3) {
          return text
        } else {
          var lastTwoLen = textArr[textArr.length - 1].length
          return text.substr(0, text.length - lastLen - lastTwoLen - 2) + ' ...'
        }
      }
    },
      toDetail (item) {
        this.$router.push({
          path: '/noticeDetail',
          query: {
            // obj: JSON.stringify({
            //   content: item.content,
            //   title: item.title,
            //   date: item.date
            // })
            noticeId: item.id
          }
        })
      },
      toTurnPage (page) {
        this.noticePage = page
        this.getNoticeList(page)
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
  .notice-web {
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 120px;
    width: 100%;
    height: 1600px;
    background-image: url("../../assets/images/common/BG2.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    ul{
      padding-top: 40px;
      max-width: 1250px;
      margin: 0 auto;
      .list-item{
        border: 8px solid #ffc233;
        border-radius: 10px;
        height: 200px;
        background-color: #ffef94;
        width: 100%;
        margin-bottom: 30px;
        padding: 0 10px 0 40px;
        &.height{
          height: 500px;
          overflow: auto;
          &::-webkit-scrollbar{
            width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: .5px;
          }
          &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 4px;
            -webkit-box-shadow: inset 0 0 5px rgba(241,241,241,0.4);
            background: #299c91;
          }
          &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(193,193,193,1);
            border-radius: 4px;
            background: #EDEDED;
          }
        }
        /deep/ .gm-scroll-view{
          padding-right: 26px;
        }
        .scroll-w{
          width: 100%;
          /deep/ .thumb{
            width: 8px;
            border-radius: 4px;
            background-color: #299C91;
          }
        }
        .li-box{
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .li-content{
          width: 100%;
          .content{
            font-size: 18px;
            color: #b05500;
            line-height: 1.5;
            text-align: justify;
          }
          .read-box{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 18px;
            color: #299c91;
            cursor: pointer;
            user-select: none;
            margin-bottom: 10px;
            span{
              margin-right: 5px;
              font-weight: bold;
            }
            .img-box{
              display: block;
              width: 14px;
              height: 9px;
              img{
                display: block;
                width: 14px;
                height: 9px;
              }
            }
          }
        }
        .li-title{
          display: flex;
          align-items: center;
          .img-box{
            margin-right: 10px;
            width: 35px;
            height: 30px;
            img{
              display: block;
              width: 100%;
            }
          }
          .title{
            font-size: 24px;
            color: #b05500;
            font-weight: bold;
          }
        }
        .date{
          font-size: 18px;
          color: #b05500;
        }
      }
    }
  }
  .notice-app{
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 60px;
    width: 100%;
    height: 1334px;
    background-image: url("../../assets/images/notice/BG.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: none;
    @media screen and (max-width: 1200px) {
      display: block;
    }
    ul{
      margin-top: 30px;
      padding: 0 20px;
      li{
        border: 8px solid #ffc233;
        border-radius: 10px;
        height: 100px;
        background-color: #ffef94;
        width: 100%;
        margin-bottom: 20px;
        padding: 10px 20px;
        .title{
          font-size: 20px;
          color: #b05500;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .date{
          font-size: 16px;
          color: #b05500;
        }
      }
    }
  }
</style>
