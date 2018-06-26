import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
import Classes from '@/components/page/Classes'
import Space from '@/components/page/Space'
import UploadResource from '@/components/module/UploadResource'
import LoadResource from '@/components/page/LoadResource.vue'
import MySpace from '@/components/common/MySpace.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
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
          path: 'NewsList',
          component: resolve => require(['../components/page/NewsList.vue'], resolve)          
        },
        {
          path: 'NewsDetail',
          component: resolve => require(['../components/page/NewsDetail.vue'], resolve)          
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
          path: 'DetailResourceSubject',
          component: resolve => require(['../components/page/DetailResourceSubject.vue'], resolve)          
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
          path: 'SpaceMore',
          component: resolve => require(['../components/page/SpaceMore.vue'], resolve)
        },
        {
          path: 'Application',
          component: resolve => require(['../components/page/Application.vue'], resolve)
        },
        {
          path: 'AppDetail',
          component: resolve => require(['../components/page/AppDetail.vue'], resolve)
        },
        {
          path: '/ClassSub', 
          component: resolve => require(['../components/page/ClassSub.vue'], resolve)
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
        },
        {
          path: 'DownLoadApp',
          component: resolve => require(['../components/page/DownLoadApp.vue'], resolve)
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',      
      component: resolve => require(['../components/page/Login.vue'], resolve)      
    },
    {
      path: '/SpaceAuthority', 
      name: 'SpaceAuthority',          
      component: resolve => require(['../components/module/SpaceAuthority.vue'], resolve)
    },
    {
      path:'/Register',
      component: resolve => require(['../components/page/Register.vue'], resolve),
      children:[
          {
            path: '/',          
            component: resolve => require(['../components/module/TeacherRegisterOne.vue'], resolve)
          },
          {
            path: 'TeacherRegisterTwo',          
            component: resolve => require(['../components/module/TeacherRegisterTwo.vue'], resolve)
          },
          {
            path: 'StudentRegisterOne',          
            component: resolve => require(['../components/module/StudentRegisterOne.vue'], resolve)
          },
          {
            path: 'StudentRegisterTwo',          
            component: resolve => require(['../components/module/StudentRegisterTwo.vue'], resolve)
          }
      ]
    },
    {      
      path:'/ForgetPassword',
      name:'ForgetPassword',
      component: resolve => require(['../components/page/ForgetPassword.vue'], resolve)
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
          path: 'ArticalInfo',
          component: resolve => require(['../components/module/ArticalInfo.vue'], resolve)
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
              path: 'PersonInfoStudent',          
              component: resolve => require(['../components/module/PersonInfoStudent.vue'], resolve)
            },
            {
              path: 'ClassInfo',          
              component: resolve => require(['../components/module/ClassInfo.vue'], resolve)
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
      component: resolve => require(['../components/page/ShowSpace.vue'], resolve),
      children:[
        {
          path: '/',          
          component: resolve => require(['../components/page/ShowSpaceIndex.vue'], resolve)
        },  
        {
          path: 'MyResource',
          component: resolve => require(['../components/page/HisResource.vue'], resolve),
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
          component: resolve => require(['../components/page/HisList.vue'], resolve),
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
          path: 'ArticalInfo',
          component: resolve => require(['../components/module/ArticalInfo.vue'], resolve)
        },
        {
          path: 'LoadResource/:resourceKindId',
          component: LoadResource
        }      
      ] 
    }
  ]
})



