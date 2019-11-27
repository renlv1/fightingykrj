<template>
  <div class="header-w">
    <div class="header">
      <h1 class="logo">
        <router-link to="/home" class="logo-a">
          <div class="img-logo">
            <img src="../assets/images/common/logo.svg" alt="">
          </div>
          <div class="title-w">
            <h3 class="title-1">放手一搏</h3>
            <h3 class="title-2">FIGHTING</h3>
          </div>
        </router-link>
      </h1>
      <ul class="nav-uls">
        <router-link to="/home" class="list" :class="{'is-active': currentIndex === 0}">
          <span class="item">首页</span>
        </router-link>
        <router-link to="/fighting" class="list" :class="{'is-active': currentIndex === 1}">
          <span class="item">放手一搏</span>
        </router-link>
        <router-link to="/notice" class="list">
          <span class="item">公告</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentIndex: -1
    }
  },
  mounted () {
    this.getPath()
  },
  methods: {
    getPath () {
      if (this.$route.path.indexOf('/account') > -1) {
        this.currentIndex = 0
      } else if (this.$route.path === '/login') {
        this.currentIndex = 0
      } else if (this.$route.path === '/betting') {
        this.currentIndex = 1
      } else if (this.$route.path === '/ongoing') {
        this.currentIndex = 1
      } else {
        this.currentIndex = -1
      }
    }
  },
  watch: {
    '$route': 'getPath'
  }
}
</script>

<style lang="less" scoped>
.header-w{
  padding-top: 50px;
  position: relative;
  z-index: 10;
  @media screen and (max-width: 1400px) {
    padding: 50px 80px 0;
  }
  @media screen and (max-width: 1199px) {
    display: none;
  }
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1320px;
  height: 80px;
  background-color: #299c91;
  border: 8px solid #066055;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 80px;
  color: #fff;
  @media screen and (max-width: 1400px) {
    width: 100%;
  }
  .logo{
    margin-left: 40px;
    cursor: pointer;
    .logo-a{
      display: flex;
      align-items: center;
      .img-logo{
        width: 60px;
        img{
          width: 100%;
          display: block;
        }
      }
      .title-w{
        color: #fff;
        margin-left: 5px;
        .title-1{
          font-size: 24px;
          text-shadow: 2px 2px 5px #000;
          margin-bottom: 2px;
        }
        .title-2{
          font-size: 18px;
          text-shadow: 2px 2px 5px #000;
        }
      }
    }
  }
  .nav-uls{
    display: flex;
    align-items: center;
    height: 100%;
    .list{
      font-size: 18px;
      font-weight: bold;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 140px;
      position: relative;
      &.is-active::before{
        content: '';
        display: block;
        position: absolute;
        right: -15px;
        top: 4px;
        width: 27px;
        height: 26px;
        background: url("../assets/images/common/active_nav.png") no-repeat center;
      }
      .item{
        position: relative;
        z-index: 10;
      }
    }
  }
}
</style>
