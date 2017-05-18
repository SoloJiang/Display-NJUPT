/* eslint-disable no-new,no-undef,eqeqeq,no-useless-escape */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'babel-polyfill'

Vue.config.productionTip = false
let instance = Axios.create({
  baseURL: 'http://exhibition.mobapp.cn/api/',
// 因为后端接受数据只能formdata，所以每次发送请求前做了一个拦截将数据转换成formdata
  transformRequest (data) {
    if (typeof data === 'object') {
      let form = new FormData()
      Object.keys(data).forEach(item => {
        form.append(item, data[item])
      })
      return form
    }
    return data
  },
  transformResponse (data) {
    if (data.errcode === '1') {
      getOauthUrl()
    }
    data = JSON.parse(data)
    if (data.totalNum) {
      window.sessionStorage.setItem('totalNum', data.totalNum)
    }
    return data.data
  }
})

Vue.prototype.$http = instance
// 假设写死exhibition_id为9
Vue.prototype._Global = {
  url: 'http://exhibition.mobapp.cn'
}
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const code = to.query.code
  const exhibitionId = to.query.exhibition_id
  if ((token !== 'null' && token !== null) || (code !== undefined && code !== 'undefined') || (exhibitionId !== undefined && exhibitionId !== 'undefined')) {
    if (code !== undefined && code !== 'undefined') {
      instance.get(`Index/getToken?code=${code}`)
        .then(res => {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('exhibition_id', res.data.token)
          to.query.exhibition_id = res.data.exhibition_id
          let intro = sessionStorage.getItem('intro')
          if (!intro) {
            instance.get(`Exhibition/getIntro?exhibition_id=${res.data.exhibition_id}`)
                .then(res => {
                  window.sessionStorage.setItem('intro', JSON.stringify(res.data))
                })
          }
          next()
        })
    } else {
      to.query.exhibition_id = sessionStorage.getItem('exhibition_id')
      next()
    }
  } else {
    getOauthUrl()
  }
})

let getOauthUrl = () => {
  let href = window.location.href
  instance.post('Index/getOauthUrl', {oauthRedirectUri: href})
      .then(res => {
        window.location = res.data.oauthUrl
      })
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
