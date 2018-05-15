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
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

const baseURL='http://192.168.8.251/banxue/';
// const baseURL='http://mybanxue.com';
Vue.prototype.$baseURL = baseURL;
axios.defaults.baseURL = baseURL;
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