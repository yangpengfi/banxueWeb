// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import data from './mock'

import iView from 'iview'
import 'iview/dist/styles/iview.css';

import './assets/css/base.css' /*引入公共样式*/

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

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