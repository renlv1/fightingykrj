<template>
    <div class="fighting">
      <fixedTop :titleName="titleName" :isGoBack="true"></fixedTop>
      <div class="main-box">
        <div class="box-top">
          <div class="top-title">
            <div class="top-img">
              <img src="../../assets/images/rule/rules-c.png">
            </div>
            <div class="title">
              选择投注场次，玩转游戏规则
            </div>
          </div>
          <div class="top-content">
            《放手一搏》根据投注额度分为100、300、500、1000USD四个场次，每个场次在同一时间段只会进行一轮比赛，等该轮比赛结束后才会进行下一轮。但是每个用户都可以选择参与任意额度场次的赛事，每场投注时间为1分钟，投注人数不限。
          </div>
          <div class="img-box">
            <img src="../../assets/images/rule/rules-a.png">
          </div>
        </div>
        <div class="box-bottom">
          <div class="top-title">
            <div class="bottom-img">
              <img src="../../assets/images/rule/rules-b.png">
            </div>
            <div class="title">
              奖金叠加，夺取游戏大奖
            </div>
          </div>
          <div class="top-content">
            <div class="content-one common">
              <div class="img-box">
                <img src="../../assets/images/rule/rules-1.png">
              </div>
              <div class="content-box">
                游戏开始后，奖金池的金额会不断增加，每秒增加1倍，直到与参加人数相同的倍数为止；
              </div>
            </div>
            <div class="content-one common">
              <div class="img-box">
                <img src="../../assets/images/rule/rules-2.png">
              </div>
              <div class="content-box">
                用户可以随时退出，仅用户本人退出时，则可以获得奖金池中相应倍数的金额奖励；如多名用户同时退出，则奖励失效，无人获奖；
              </div>
            </div>
            <div class="content-one common">
              <div class="img-box">
                <img src="../../assets/images/rule/rules-3.png">
              </div>
              <div class="content-box">
                当最后一位用户退出时，奖金池剩余金额小于该用户可获奖励金额，则奖金池中所有剩余金额全部归该用户；
              </div>
            </div>
            <div class="content-one common">
              <div class="img-box">
                <img src="../../assets/images/rule/rules-4.png">
              </div>
              <div class="content-box">
                投资金额均分完毕或所有用户退出游戏，则游戏结束，若游戏结束，奖金池还有余额，则归系统所有。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        titleName: '放手一搏'
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
  .fighting{
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
    .main-box{
      max-width: 1250px;
      margin: 0 auto;
      padding-top: 60px;
      @media screen and (max-width: 1200px) {
        padding: 0 10px;
      }
      .box-top{
        border: 8px solid #ffc233;
        border-radius: 10px;
        height: 300px;
        background-color: #ffef94;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 65px;
        width: 100%;
        position: relative;
        @media screen and (max-width: 768px) {
          height: 400px;
          padding: 0 20px;
        }
        .img-box{
          width: 64px;
          height: 138px;
          position: absolute;
          right: 20px;
          top: 250px;
          @media screen and (max-width: 768px) {
            top: 340px;
          }
          img{
            display: block;
            width: 100%;
          }
        }
        .top-img{
          width: 57px;
          height: 40px;
          margin-right: 10px;
          img{
            display: block;
            width: 100%;
          }
        }
        .top-content{
          font-size: 24px;
          color: #b05500;
          line-height: 2;
          @media screen and (max-width: 768px) {
            font-size: 16px;
            position: relative;
          }
        }
      }
      .box-bottom{
        margin-top: 60px;
        border: 8px solid #ffc233;
        border-radius: 10px;
        height: auto;
        background-color: #ffef94;
        padding: 0 65px;
        @media screen and (max-width: 768px) {
          height: auto;
          padding: 0 20px;
        }
        .bottom-img{
          width: 60px;
          height: 45px;
          margin-right: 10px;
          img{
            display: block;
            width: 100%;
          }
        }
        .common{
          display: flex;
          align-items: center;
          font-size: 24px;
          color: #b05500;
          margin-bottom: 40px;
          position: relative;
          @media screen and (max-width: 768px) {
            margin-top: 60px;
          }
          @media screen and (max-width: 400px) {
            font-size: 14px;
          }
          .img-box{
            margin-right: 10px;
            vertical-align: middle;
            width: 42px;
            height: 60px;
            position: absolute;
            top: -20px;
            @media screen and (max-width: 768px) {
              position: absolute;
              top: -30px;
            }
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .content-box{
            text-indent:50px;
            line-height: 2;
            @media screen and (max-width: 768px) {
              font-size: 18px;
            }
          }
        }
      }
      .top-title{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px 0;
        @media screen and (max-width: 1200px) {
          margin: 20px 0;
        }
        .title{
          font-size: 30px;
          color: #b05500;
          font-weight: bold;
          @media screen and (max-width: 768px) {
            font-size: 18px;
          }
          @media screen and (max-width: 400px) {
            font-size: 14px;
          }
          @media screen and (max-width: 320px) {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
