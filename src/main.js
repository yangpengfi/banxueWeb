// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
// import data from './mock'
import uploader from 'vue-simple-uploader'
Vue.use(uploader);

import iView from 'iview'
import 'iview/dist/styles/iview.css';

import './assets/css/base.css' /*引入公共样式*/

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'
import api from '../static/js/config.js'
console.log(api.previewURL)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

// const previewURL='http://ow365.cn/?i=15754&furl=';//吉视传媒
// const previewURL='http://ow365.cn/?i=15765&furl=';//福建广电
// const previewURL='http://ow365.cn/?i=15549&furl=';//公司
Vue.prototype.$previewURL = api.previewURL;

// const baseURL='http://175.25.177.100/banxue/';//吉视传媒
// const baseURL='http://220.250.18.60:8761/banxue/';//福建广电
// const baseURL='http://192.168.8.251/banxue/';
// const baseURL='http://localhost:8060/banxue/';
// const baseURL='http://mybanxue.com';
// const baseURL=process.env.BASE_API;
Vue.prototype.$baseURL = api.baseURL;

axios.defaults.baseURL = api.baseURL;
let cancel ,promiseArr = {};
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, error => {
    return Promise.reject(error)
})
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    message.err(err.message)
      return Promise.resolve(err.response)
})
Vue.prototype.$http = axios;


import md5 from 'js-md5'
Vue.prototype.$md5 = md5;

import qs from "qs"
Vue.prototype.$qs = qs;

import storage from '@/utils/storage.js'
Vue.prototype.$storage = storage;

Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})