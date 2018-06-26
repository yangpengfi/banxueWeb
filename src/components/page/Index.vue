<template>
  <div>
      <div id="banner">
        <Carousel autoplay v-model="value1" loop>
            <CarouselItem v-for="(item,index) in bannerList" :key="item.bannerId" v-if="index<3">
                <div class="demo-carousel"  @click="goBannerUrl(item)">
                    <img :src="item.imgPath">
                </div>
            </CarouselItem>  
        </Carousel>
      </div>
      <div class="w-1200" id="role-container">
        <ul id="role">
            <li v-for="(item,index) in roleList" v-on:mouseenter="changeRole(item)" :style="{borderColor: item.id == nowId ? nowColor : 'transparent'}">
                <h1>{{item.role}}</h1>
                <img :src="item.icon" alt="角色icon">
                <div>
                    <span class="color-line" :style="{borderColor: item.id == nowId ? nowColor : 'transparent'}"></span>
                    <p>{{item.title}}</p>                    
                </div>
                <span class="drop-arrow" :class="{active:item.id == nowId}" :style="{backgroundPosition: item.id == nowId ? nowPosition+'px' : ''}"></span>               
            </li>            
        </ul>         
        <ul id="role-tab" class="w-1200">
            <li v-for="item of subImgList"><img :src="item"></li>              
        </ul>
      </div>
      <div id="result-container">
        <div id="result" class="w-1200">
          <div class="result">
                <div class="section-box">
                    <span class="section-title">资讯动态</span>
                    <span class="right more" @click="goNewsList">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                </div>   
                <div class="result-content">
                    <div class="img">
                        <Carousel autoplay v-model="value2" loop>
                            <CarouselItem v-for="item in newsInfoImgList" :key="item.newsInfoId">
                                <div class="demo-carousel" @click="goDetail(item)">
                                    <img :src="item.imgPath">
                                    <span :title="item.title">{{item.title}}</span>
                                </div>
                            </CarouselItem>  
                        </Carousel>
                    </div>
                    <div class="rightBox">
                        <h1>{{infoOne.title}}</h1>
                        <p>{{infoOne.summary}}</p>
                        <a href="javascript:void(0);" v-if="infoOne.summary" class="msg-detail" @click="goDetail(infoOne)">[详情]</a>
                        <ul>
                            <li  v-for="(item,index) in newsInfoTitleList" v-if="index>0" @click="goDetail(item)">
                                <span>{{item.title}}</span>
                                <span class="date">{{formatTime(item.createTime)}}</span>
                            </li>                       
                        </ul>

                    </div>
                </div>
          </div>
          <div class="monitor">
                <div class="section-box">
                    <span class="section-title">数据中心</span>
                    <p>
                      <span @click="changeTab('ResourceTab')" :class="{active:currentTab=='ResourceTab'}">资源</span>
                        <span @click="changeTab('SpaceTab')" :class="{active:currentTab=='SpaceTab'}">空间</span>
                        <span @click="changeTab('TeachTab')" :class="{active:currentTab=='TeachTab'}">教学</span>
                    </p>
                </div> 
                <component :is="currentTab" keep-alive></component>                                 
          </div>
        </div>
      </div>      
      <div id="classes" class="w-1200">
            <div class="section-box">
                <span class="section-title">热门课程</span>
                <span class="right more" @click="gotoSub(1,0)">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <ClassList :classList="recomClasses"></ClassList>          
      </div>
      <div id="space" class="w-1200">
        <div id="spaceList">
            <div class="section-box">
                <span class="section-title">优秀空间</span>
                <p class="section-tab">
                    <span v-for="item in spaceRole" 
                    :class="{active:item.id==roleId}" 
                    @click="changeSpaceTab(item)" 
                    :key="item.id">{{item.role}}</span>
                    <!-- <span>学生</span>
                    <span>家长</span>
                    <span>学校</span> -->
                </p>
            </div>
            <SpaceList :spaceList="spaceLists"></SpaceList> 
        </div>
        <SpaceDynamic :infos="latestNews"></SpaceDynamic>    
      </div>
      <div id="open-box">
            <div class="open-title">
                <span class="small-size">平台</span>
                已有
                <span class="blue-num">1000</span>
                所学校开通了数字校园服务
            </div>
            <p><!-- 仅需1分钟即可开始免费体验数字校园产品服务 --></p> 
            <a href="javascript:void(0);" @click="goOpenSchool" class="open-btn">开通数字校园</a>
      </div>     
  </div>
</template>
<script>
import ClassList from '@/components/common/ClassList'; 
import SpaceList from '@/components/common/SpaceList.vue';
import SpaceDynamic from '@/components/common/SpaceDynamic.vue';
import SpaceTab from '@/components/module/SpaceTab.vue';
import ResourceTab from '@/components/module/ResourceTab.vue';
import TeachTab from '@/components/module/TeachTab.vue';
import global_ from '@/components/Global'; 
export default {
    name:'Index',
    components:{
        ClassList,
        SpaceList,
        SpaceDynamic,
        SpaceTab,
        ResourceTab,
        TeachTab
    },
    data () {
        return {
            token:this.$storage.getStorage("token"),
            value1: 0,
            value2: 0,
            bannerList:[],            
            newsInfoImgList:[],            
            newsInfoTitleList:[],            
            recomClasses:[],            
            roleList:[
                {role:'管理者',icon:'./static/imgs/index/managerIcon.png',title:'我想知道如何提升工作效率和教育水平',id:"manager",color:'#54CCC8',position:'-2'},
                {role:'教师',icon:'./static/imgs/index/teacherIcon.png',title:'我想知道如何提升工作效率和教育水平',id:"teacher",color:'#61bf2e',position:'-22'},
                {role:'学生',icon:'./static/imgs/index/studentsIcon.png',title:'我想知道如何提升学习效率和成绩',id:"student",color:'#ffbd5f',position:'-42'},
                {role:'家长',icon:'./static/imgs/index/homemasterIcon.png',title:'我想知道如何了解孩子的学习情况',id:"parent",color:'#19a5f0',position:'-62'}
            ],            
            imgList:{
                manager:['./static/imgs/index/managerSelect01.png','./static/imgs/index/managerSelect02.png','./static/imgs/index/managerSelect03.png','./static/imgs/index/managerSelect04.png'],
                teacher:['./static/imgs/index/teacherSelect01.png','./static/imgs/index/teacherSelect02.png','./static/imgs/index/teacherSelect03.png','./static/imgs/index/teacherSelect04.png'],
                student:['./static/imgs/index/studentsSelect01.png','./static/imgs/index/studentsSelect02.png','./static/imgs/index/studentsSelect03.png','./static/imgs/index/studentsSelect04.png'],
                parent:['./static/imgs/index/parentsselectA.png','./static/imgs/index/parentsselectB.png','./static/imgs/index/parentsselectC.png','./static/imgs/index/parentsselectD.png']
            },
            subImgList:['./static/imgs/index/managerSelect01.png','./static/imgs/index/managerSelect02.png','./static/imgs/index/managerSelect03.png','./static/imgs/index/managerSelect04.png'],
            nowId:'manager',
            nowColor:'#54CCC8',
            nowPosition:'-2',
            currentTab:'ResourceTab' ,
            infoOne:{},
            latestNews:[
            {id:1,title:"发布了文章",logo:'http://192.168.8.252:86//user/2018/05/09/1659c4b2bdf44a30be01bac689ed366d.jpg',userName:'刘小斌',name:'《一元一次方程课件.doc》',createTime:1524813477000}],
            spaceRole:[
              {role:'老师',id:"Teacher"},
              {role:'学生',id:"Student"},
              // {role:'家长',id:3},
              // {role:'学校',id:4}
            ],
            roleId:"Teacher",
            spaceLists:[],
            formatTime:global_.formatTime  
        }
    },
    methods:{
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        goOpenSchool(){
          if(!this.token){
            this.login();
            return;
          }
          this.$router.push({
                path:'/OpenSchool'
          });   
        },
        goBannerUrl(item){
          if(!item.href){
            return false;
          }
          window.open(item.href);
        },
        goDetail(item){
            this.$router.push({
                path:'/NewsDetail',
                query:{newsInfoId:item.newsInfoId,selType:item.type}
          }); 
        },
        goNewsList(){
          this.$router.push({
                path:'/NewsList'
          });   
        },
        gotoSub(periodId,gradeId){
            this.$router.push({
              path:'/ClassSub',
              query:{
                pId:periodId,
                gId:gradeId          
              }
            });
        },
        getRecomClassesList(){
          this.$http.post('/web/course/listCourse',this.$qs.stringify({
            needHotest:1,
            pageSize:8
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.recomClasses = result.data.list;
                }else{
                  this.recomClasses = [];
                }           
              }
            }  
          }) 
        },
        getBannerList(){
          this.$http.post('web/banner/list.do',this.$qs.stringify({
            pageSize:3
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.bannerList = result.data;
                }else{
                  this.bannerList = [];
                }           
              }
            } 
          }) 
        },
        getNewInfoImgList(){
          this.$http.post('web/newsInfo/showList',this.$qs.stringify({
            pageSize:3
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.newsInfoImgList = result.data.list;
                }else{
                  this.newsInfoImgList = [];
                }           
              }
            } 
          }) 
        },
        getNewInfoList(){
          this.$http.post('web/newsInfo/list.do',this.$qs.stringify({
            pageSize:7
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.newsInfoTitleList = result.data.list;
                  this.infoOne=result.data.list[0];
                }else{
                  this.newsInfoTitleList = [];
                }           
              }
            }
          }) 
        },
        getSpaceList(role){//获取优秀空间
            this.$http.post('web/space/listExcellent'+role+'Space.do',this.$qs.stringify({
              pageSize:9
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.spaceLists = result.data.list;
                }else{
                  this.spaceLists = [];
                }           
              }
            } 
            })         },
        getSpaceDynamic(type){//获取最新动态
            this.$http.post('web/space/listAllSpaceDynamic.do',this.$qs.stringify({
              pageSize:5,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.latestNews = result.data.list;
                }else{
                  this.latestNews = [];
                }
              }else{ 
                 this.$Message.error(result.message);          
              }
            } 
            })         },
        changeRole(item){
            this.nowId=item.id; 
            this.nowColor=item.color; 
            this.subImgList=this.imgList[item.id];
            this.nowPosition = item.position;
        },
        changeTab(tab){
            this.currentTab = tab;
        },
        changeSpaceTab(item){
            this.roleId = item.id;
            this.getSpaceList(item.id);
        },
    },
    created:function(){     
        this.getRecomClassesList();
        this.getBannerList();
        this.getNewInfoList();
        this.getNewInfoImgList();
        this.getSpaceList(this.roleId);
        this.getSpaceDynamic();
    }
}
</script>
<style scoped>
    #banner img{
        vertical-align: bottom;
        width: 100%;
        max-height: 600px;
    }   
    /*用户角色*/
    #role-container{
        padding: 0 17px 40px;
        background-color: #fff;        
    } 
    #role{ 
        padding-top: 20px;  
        border-bottom: 1px solid #E9E9E9; 
    }    
    #role>li{
        position: relative;        
        float: left;
        width: 25%;        
        height: 266px;  
        padding: 0 20px;     
        text-align: center;        
        cursor: default;
        border:1px solid transparent;
        margin-bottom: 20px;
    }    
    #role>li>h1{ 
        margin-top: 20px;
        margin-bottom: 25px;       
        font-size: 20px;	
        color: #333;
        font-family: MicrosoftYaHei;
    }
    #role>li>div{
        padding: 0 60px;
        margin-top: 18px;
        border-top: 1px solid #dfdfdf;
        position: relative;
    }
    #role>li>div p{
        margin-top: 18px;
        font-size: 14px;   
        height:32px;     ;
        line-height: 32px;        
        color: #666;
        font-family: MicrosoftYaHei;
    }
    .color-line{
        position: absolute;
        left: 0;
        top: -1px;
        width: 66px;
        border-bottom: 1px solid transparent;
        color: #000;
    }    
    .more{
        padding-top: 20px;
    }
    .drop-arrow{
        position: absolute;
        bottom: -13px;        
        left: 135px;
        z-index:999;
        width: 16px;
        height: 18px;        
        background: url('../../assets/imgs/index/arrow.png') no-repeat -2px top;
        background-color: #fff;   
        display:none;  
    }  
    .drop-arrow.active{        
        display:block;  
    }    
    #role-tab{
        overflow: hidden;        
    }
    #role-tab li{
        float: left;
        margin-left: 33px;
    }
    #role-tab li:first-child{
        margin-left: 0;
    }
    #role-tab li{
        float: left;
        cursor: default;
    }
    /*资讯动态*/
    #result-container{
        background-color: #fff;
        width: 100%;
    }
    #result{
        overflow: hidden;
        margin-bottom: 15px;
        margin-top: 50px;
        background-color: #fff;
    }
    .result{
        float: left;
        width: 70%;         
    }   
    .demo-carousel{
      position: relative;
      cursor: pointer;
    } 
    .demo-carousel>span{
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      box-sizing: border-box;
      width: 260px;
      height: 40px;
      line-height: 40px;
      padding:0 40px;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 16px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    /*数据中心*/
    .monitor{
        float: right;
        width: 30%;
    }
    .result-content{
        overflow: hidden;
        border-right:1px solid #E9E9E9;
        border-top: 1px solid #E9E9E9; 
        padding: 20px 20px 50px 0;  
    }
    .result-content>.img{
        float: left;
        width: 30%;        
    }
    .result-content>.rightBox{
        float: right;
        width: 68%;
    }
    .rightBox h1{
        width: 80%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color:#1cb0ea;
    }    
    .rightBox p{
        text-indent:2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        color:#999;
        overflow: hidden;
        height: 55px;
    }
    .rightBox ul{
        margin-top: 20px;
    }
    .rightBox ul li{
        overflow: hidden;
        width: 100%;
        height:30px;
        cursor: pointer;
    }
    .rightBox ul li span:first-child{
        float: left;        
        font-size: 14px;
        color:#333;
    }
    .date{
        float: right;
        color:#777;
    }
    .monitor .section-box p{   
        display: inline-block;
        margin-left: 20px;
    }
    .monitor .section-box p span{ 
        font-size: 16px;
        color: #666;
        padding: 4px 15px;    
        cursor: pointer;           
    }
    .monitor .section-box p span.active{ 
        color: #fff;
        background-color: #57BBEE; 
        border-radius: 20px;      
    }
    /*空间*/
    #space {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 26px;
    }
    #space .section-tab{
        margin-left: 80px;
    }
    
    #classes{
        margin-top: 50px;
    }    
    #open-box{
        position: relative;
        height:830px;
        text-align: center;
        background-color: #ECF9FF;
        background: url('../../assets/imgs/index/wisdomSchoolbg.png') no-repeat center center;
    }
    .open-title{
        font-size: 40px;
        padding-top: 66px;
    }
    .small-size{
        font-size: 35px;
    }
    .blue-num{
        color: #29A0FF;
        font-size: 45px;
    }
    #open-box>p{
        font-size: 24px;
        color: #676767;    
        margin-bottom: 20px;
    }
    .open-btn{
        display: inline-block;
        width: 280px;
        height: 60px;
        line-height: 60px;
        margin-top: 550px;        
        border:none;
        color:#fff;
        font-size: 20px;
        border-radius: 10px;
	    background-color: #47a2ff;
    }   
    
</style>


