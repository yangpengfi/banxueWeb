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

Vue.use(iView)

import './assets/css/base.css' /*引入公共样式*/

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'
import api from '../static/js/config.js'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

// Vue.prototype.$previewURL = api.previewURL;

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
var count=0;
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    // console.log(response.data.status)
    // console.log(router.currentRoute.fullPath)
    if(response.status){
      if(response.data.status== 9||response.data.status== 1){
          count++;
          router.replace({
           name:"Login",
           query: {redirect: router.currentRoute.fullPath}
          })
          if(count==1){
            iView.Message.error(response.data.message)
          }
          return;
      }else if(response.data.status == 1500 ||response.data.status == 1501 ||response.data.status == 1502 || response.data.status == 1503 || response.data.status == 1504 ||response.data.status == 1505 ){ 
          router.push({
              path:'/SpaceAuthority',
              query:{status:response.data.status}
          }); 
          return false;
        }
      }
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


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created(){
    this.$Message.config({
      top: 150,
      duration: 2
    });
  }
})