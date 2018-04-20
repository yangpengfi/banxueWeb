import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
import Classes from '@/components/page/Classes'
import Space from '@/components/page/Space'
import UploadResource from '@/components/module/UploadResource'
import LoadResource from '@/components/page/LoadResource.vue'
import MySpace from '@/components/common/MySpace.vue'
import ClassSub from '@/components/page/ClassSub.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',              
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/',          
          component: Index
        },
        {
          path: 'Resource',
          component: resolve => require(['../components/page/Resource.vue'], resolve)          
        }, 
        {
          path:'FilterResource',
          component:resolve => require(['../components/page/FilterResource.vue'], resolve),     
          children:[
            {
              path: 'AreaResource',
              component: resolve => require(['../components/module/AreaResource.vue'], resolve)
            },
            {
              path: 'SubjectResource',
              component: resolve => require(['../components/module/SubjectResource.vue'], resolve)
            },
            {
              path: 'SchoolResource',
              component: resolve => require(['../components/module/SchoolResource.vue'], resolve)
            },
            {
              path: 'SpecialClass',
              component: resolve => require(['../components/module/SpecialClass.vue'], resolve)
            },
            {
              path: 'HightQualityClass',
              component: resolve => require(['../components/module/HightQualityClass.vue'], resolve)
            }
          ]
        },  
        {
          path: 'SearchResource',
          component: resolve => require(['../components/page/SearchResource.vue'], resolve)          
        },  
        {
          path: 'DetailResource',
          component: resolve => require(['../components/page/DetailResource.vue'], resolve)          
        },     
        {
          path: 'Classes',
          component: Classes
        },
        {
          path: 'Space',
          component: resolve => require(['../components/page/Space.vue'], resolve)
        },
        {
          path: 'Application',
          component: resolve => require(['../components/page/Application.vue'], resolve)
        },
        {
          path: '/ClassSub',          
          component: ClassSub
        },
        {
          path: '/ClassDatile',          
          component: resolve => require(['../components/module/ClassDatile.vue'], resolve)
        },
        {
          path: '/ConfirmPayment',          
          component: resolve => require(['../components/module/ConfirmPayment.vue'], resolve)
        },
        {
          path: '/ClassPay',          
          component: resolve => require(['../components/module/ClassPay.vue'], resolve)
        },
        {
          path: '/ClassPaySuccess',          
          component: resolve => require(['../components/module/ClassPaySuccess.vue'], resolve)
        },
        {
          path: 'OpenSchool',
          component: resolve => require(['../components/page/OpenSchool.vue'], resolve)
        },
        {
          path: 'CommitPeople',
          component: resolve => require(['../components/page/CommitPeople.vue'], resolve)
        }
      ]
    },
    
    {
      path: '/Login',
      name: 'Login',      
      component: resolve => require(['../components/page/Login.vue'], resolve)      
    },
    {
      path: '/MySpace',   
      component: MySpace,
      children:[
        {
          path: '/',          
          component: resolve => require(['../components/page/SpaceIndex.vue'], resolve)
        }, 
        {
          path: 'MyResource',
          component: resolve => require(['../components/page/MyResource.vue'], resolve),
          children:[
            {
              path: '/',          
              component: UploadResource
            },
            {
              path: 'PushResource',          
              component: resolve => require(['../components/module/PushResource.vue'], resolve)
            },
            {
              path: 'DownloadResource',          
              component: resolve => require(['../components/module/DownloadResource.vue'], resolve)
            },
            {
              path: 'CollectResource',          
              component: resolve => require(['../components/module/CollectResource.vue'], resolve)
            }
          ]
        },
        {
          path: 'MyList',
          component: resolve => require(['../components/page/MyList.vue'], resolve),
          children:[
            {
              path: '/',          
              component: resolve => require(['../components/module/FocusLink.vue'], resolve)
            },
            {
              path: 'FunLink',          
              component: resolve => require(['../components/module/FunLink.vue'], resolve)
            },
            {
              path: 'ClassLink',          
              component: resolve => require(['../components/module/ClassLink.vue'], resolve)
            },
            {
              path: 'MateLink',          
              component: resolve => require(['../components/module/MateLink.vue'], resolve)
            }
          ]
        }, 
        {
          path: 'Achievements',
          component: resolve => require(['../components/page/Achievements.vue'], resolve),
          children:[
            {
              path: '/',          
              component: resolve => require(['../components/module/AllClassify.vue'], resolve)
            },
            {
              path: 'ClassifyOne',          
              component: resolve => require(['../components/module/ClassifyOne.vue'], resolve)
            },
            {
              path: 'ClassifyTwo',          
              component: resolve => require(['../components/module/ClassifyTwo.vue'], resolve)
            },
            {
              path: 'ClassifyThree',          
              component: resolve => require(['../components/module/ClassifyThree.vue'], resolve)
            }
          ]
        }, 
        {
          path: 'MinClasses',
          component: resolve => require(['../components/page/MinClass.vue'], resolve),
          children:[
            {
              path: '/',          
              component: resolve => require(['../components/module/CreateClass.vue'], resolve)
            },
            {
              path: 'BuiedClass',          
              component: resolve => require(['../components/module/BuiedClass.vue'], resolve)
            }
          ]
        },
        {
          path: 'MyApplication',
          component: resolve => require(['../components/page/MyApplication.vue'], resolve)         
        },
        {
          path: 'CreateClassOne',
          component: resolve => require(['../components/module/Step1.vue'], resolve)
        },
        {
          path: 'CreateClassTwo',
          component: resolve => require(['../components/module/Step2.vue'], resolve)
        },
        {
          path: 'CreateClassThree',
          component: resolve => require(['../components/module/Step3.vue'], resolve)
        },
        {
          path: 'CreateClassFour',
          component: resolve => require(['../components/module/Step4.vue'], resolve)
        },
        {
          path: 'WriteArticle',
          component: resolve => require(['../components/module/WriteArticle.vue'], resolve)
        },
        {
          path: 'LoadResource/:resourceKindId',
          component: LoadResource
        },
        {
          path: 'PersonalCenter',
          component: resolve => require(['../components/page/PersonalCenter.vue'], resolve),
          children:[
            {
              path: '/',          
              component: resolve => require(['../components/module/PersonInfo.vue'], resolve),
            },
            {
              path: 'ChangePassword',          
              component: resolve => require(['../components/module/ChangePassword.vue'], resolve)
            },
            {
              path: 'Teacher',          
              component: resolve => require(['../components/module/Teacher.vue'], resolve)
            },
            {
              path: 'Authority',          
              component: resolve => require(['../components/module/Authority.vue'], resolve)
            },
            {
              path: 'TeacherMessage',          
              component: resolve => require(['../components/module/TeacherMessage.vue'], resolve)
            }
          ]
        }      
      ]     
    },
    {
      path: '/ShowSpace', 
      name: 'ShowSpace',   
      component: resolve => require(['../components/page/ShowSpace.vue'], resolve) 
    }
  ]
})



