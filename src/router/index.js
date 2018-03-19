import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/common/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',              
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/',          
          component: resolve => require(['../components/page/Index.vue'], resolve)
        },
        {
          path: 'Resource',
          component: resolve => require(['../components/page/Resource.vue'], resolve)
        },
        {
          path: 'Classes',
          component: resolve => require(['../components/page/Classes.vue'], resolve)
        },
        {
          path: 'Space',
          component: resolve => require(['../components/page/Space.vue'], resolve)
        },
        {
          path: 'Application',
          component: resolve => require(['../components/page/Application.vue'], resolve)
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',      
      component: resolve => require(['../components/page/Login.vue'], resolve)      
    },
  ]
})



