import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import login from '@/page/login/login'
import navAccount from '@/page/account/navAccount'
import mobileAccount from '@/page/account/accountMoblie'
import previewAccount from '@/page/account/previewAccount'
import billList from '@/page/account/billList'
import billDetail from '@/page/account/billDetail'
import mobileBillAccount from '@/page/account/mobileBillAccount'
import mobileBillDetail from '@/page/account/mobileBillDetail'
import ongoing from '@/page/bet/ongoing'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active', /* 设置router-link 激活样式方法1 */
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/home/createPlay',
      name: 'createPlay',
      component: resolve => require(['@/page/home/createPlay'], resolve)
    },
    {
      path: '/message',
      name: 'message',
      component: resolve => require(['@/page/message/message'], resolve)
    },
    {
      path: '/join',
      name: 'join',
      component: resolve => require(['@/page/join/join'], resolve)
    },
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 我的账户
    {
      path: '/account',
      name: 'account',
      component: navAccount,
      redirect: {path: '/account/previewAccount'},
      children: [
        {
          path: '/account/previewAccount',
          component: previewAccount
        },
        {
          path: '/account/myBill',
          component: billList
        },
        {
          path: '/account/myBill/billDetail',
          component: billDetail
        }
      ]
    },
    // 移动端我的账户
    {
      path: '/mobileAccount',
      name: '/mobileAccount',
      component: mobileAccount
    },
    // 移动端账单
    {
      path: '/mobileBillAccount',
      name: '/mobileBillAccount',
      component: mobileBillAccount
    },
    // 移动端账单详情
    {
      path: '/mobileBillDetail',
      name: '/mobileBillDetail',
      component: mobileBillDetail
    },
    {
      path: '/account/billDetail',
      name: '/billDetail',
      component: billDetail
    },
    // 投注进行中
    {
      path: '/ongoing',
      name: 'ongoing',
      component: ongoing
    },
    {
      path: '/fighting',
      name: 'fighting',
      component: resolve => require(['@/page/fighting/fighting'], resolve)
    },
    {
      path: '/notice',
      name: 'notice',
      component: resolve => require(['@/page/notice/notice'], resolve)
    },
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: resolve => require(['@/page/notice/noticeDetail'], resolve)
    },
    {
      path: '/betting',
      name: 'betting',
      component: resolve => require(['@/page/bet/betting'], resolve)
    }
  ]
})
