//   公共请求数据
import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/getData'
// import router from '../router'

Vue.use(Vuex)
var $api = 'http://webapi.banghongda88.com'
export default new Vuex.Store({
  state: {
    userInfo: [],
    account: [],
    loginFlag: false
  },
  getters: {
    account: state => state.account,
    userInfo: state => state.userInfo,
    loginFlag: state => state.loginFlag
  },
  actions: {
    balanceAction ({commit}) {
      http.post($api + '/user/balance').then((res) => { // 用戶信息
        if (res.success) {
          commit('USERINFO', res.data.user)
          commit('ACCOUNT', res.data.account)
          commit('LOGIN_FLAG', true)
        } else {
          commit('LOGIN_FLAG', false)
        }
      })
    }
  },
  mutations: {
    USERINFO (state, data) {
      state.userInfo = data
    },
    ACCOUNT (state, data) {
      state.account = data
    },
    LOGIN_FLAG (state, data) {
      state.loginFlag = data
    }
  }
})
