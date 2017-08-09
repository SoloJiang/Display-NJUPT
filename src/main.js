/* eslint-disable no-new,no-undef,eqeqeq,no-useless-escape,no-const-assign */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'babel-polyfill'

Vue.config.productionTip = false
let instance = Axios.create({
  baseURL: '/api/',
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
    if (typeof data === 'string' && data.length !== 0) {
      data = JSON.parse(data)
    }
    if (data.totalNum) {
      window.sessionStorage.setItem('totalNum', data.totalNum)
    }
    if (data.data) return data.data
    return data
  }
})

Vue.prototype.$http = instance
// 假设写死exhibition_id为9
Vue.prototype._Global = {
  url: '',
  share (title, desc, imgUrl, link) {
    let str = ''
    let arr = link.href.split('?')
    let exhibitionId = window.sessionStorage.getItem('exhibition_id')
    if (link.href.indexOf('?') > -1) {
      let array = link.href.split('?')
      if (array[1] !== '') {
        str = `&exhibition_id=${exhibitionId}`
      } else {
        str = `exhibition_id=${exhibitionId}`
      }
      if (link.href.indexOf('code') > -1) {
        link = link.href.split('code')
        link = link[0] + link[1].slice(40)
      } else {
        link = link.href
      }
    } else {
      link = arr[0]
      str = `?exhibition_id=${exhibitionId}`
    }
    wx.onMenuShareAppMessage({
      title: title || '',
      desc: desc || '',
      link: link + str,
      imgUrl: window.location.origin + imgUrl || ''
    })
  },
  ready (title, desc, imgUrl, link) {
    getConfig(() => {
      wx.ready(() => {
        this.share(title, desc, imgUrl, link)
      })
      wx.error(res => {
        console.log(res)
      })
    })
  },
  hideMenu () {
    getConfig(() => wx.hideMenuItems({
      menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    }))
  },
  getLocation (cb) {
    getConfig(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          let geoc = new BMap.Geocoder()
          let point = new BMap.Point(longitude, latitude)
          geoc.getLocation(point, res => {
            let city = res.addressComponents.city
            city = city.substring(0, city.length - 1)
            let title = JSON.parse(window.sessionStorage.getItem('intro')).title
            document.getElementsByTagName('title')[0].innerHTML = title
            cb && cb(city)
          })
        },
        fail: function (res) {
          window.location.reload()
        }
      })
    })
  },
  background: ''
}
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const code = to.query.code
  let exhibitionId = window.sessionStorage.getItem('exhibition_id')
  if (exhibitionId === '' || exhibitionId === null) {
    window.sessionStorage.setItem('exhibition_id', to.query.exhibition_id)
    exhibitionId = to.query.exhibition_id
  }
  if (
    (token !== 'null' && token !== null) ||
    (exhibitionId !== undefined && exhibitionId !== 'undefined') ||
    (code !== undefined && code !== 'undefined')
  ) {
    if (token === null && (code !== undefined && code !== 'undefined')) {
      instance.get(`Index/getToken?code=${code}`).then(res => {
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('exhibition_id', res.data.exhibition_id)
        from.query.exhibition_id = res.data.exhibition_id
        to.query.exhibition_id = res.data.exhibition_id
        let intro = sessionStorage.getItem('intro')
        if (!intro) {
          instance
            .get(`Exhibition/getIntro?exhibition_id=${res.data.exhibition_id}`)
            .then(res => {
              window.sessionStorage.setItem('intro', JSON.stringify(res.data))
              // getConfig(to, next)
              next()
            })
        } else {
          // getConfig(to, next)
          next()
        }
      })
    } else if (exhibitionId !== undefined || exhibitionId !== 'undefined') {
      instance
        .get(`Exhibition/getIntro?exhibition_id=${exhibitionId}`)
        .then(res => {
          window.sessionStorage.setItem('intro', JSON.stringify(res.data))
          sessionStorage.setItem('exhibition_id', exhibitionId)
          to.query.exhibition_id = exhibitionId
          document.getElementsByTagName('title')[0].innerHTML = res.data.title
          next()
        })
    }
  } else {
    to.query.exhibition_id = exhibitionId
    getOauthUrl()
  }
})

let getOauthUrl = () => {
  let href = window.location.href
  instance.post('Index/getOauthUrl', { oauthRedirectUri: href }).then(res => {
    window.location = res.data.oauthUrl
  })
}

let getConfig = cb => {
  let url = window.location.origin + encodeURIComponent(window.location.pathname + window.location.search)
  instance
    .get('Index/getJsSdk', {
      params: {
        url: url
      }
    })
    .then(res => {
      let config = res.data.signPackage
      wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: ['onMenuShareAppMessage', 'hideMenuItems', 'getLocation']
      })
      cb && cb()
    })
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
