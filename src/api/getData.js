import axios from './api.js' // 倒入 api

export default {
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // post请求
  post (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
