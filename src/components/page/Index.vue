<template>
  <div>
      <div id="banner">
        <Carousel autoplay v-model="value2" loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/imgs/index/indexBanner01.jpg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/imgs/index/indexBanner02.jpg">
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
                    <span class="section-title">成果.咨询</span>
                </div>   
                <div class="result-content">
                    <img src="../../assets/imgs/index/u143.png" alt="教学成果图片">
                    <div>
                        <h1>教育部办公厅印发《2017年教育信息化工程工作推进会》</h1>
                        <p>
                            党的十九大报告指出，建设教育强国是中华民族伟大复兴的基础工程，必须把教育事业放在优先位置，深化教育改革，加快教育现代化，办好人民满意的教育。教育现代化还需要实现哪些根本性跨越？今年两会期间，记者采访了几位来自教育战线的全国人大代表，听听他们的建议。
                            <a href="#" class="msg-detail">[详情]</a>
                        </p>
                        <ul>
                            <li>
                                <span>2017年福建省基础教育信息化工程工作推进会——从深化应用</span>
                                <span class="date">06-12</span>
                            </li>
                            <li>
                                <span>福建省示范性幼儿园新增14所</span>                                
                                <span class="date">05-12</span>
                            </li>
                            <li>
                                <span>2017年福建省基础教育信息化工程工作推进会——从深化应用</span>
                                <span class="date">06-12</span>
                            </li>
                            <li>
                                <span>福建省示范性幼儿园新增14所</span>                                
                                <span class="date">05-12</span>
                            </li>
                            <li>
                                <span>2017年福建省基础教育信息化工程工作推进会——从深化应用</span>
                                <span class="date">06-12</span>
                            </li>
                            <li>
                                <span>福建省示范性幼儿园新增14所</span>                                
                                <span class="date">05-12</span>
                            </li>                            
                        </ul>

                    </div>
                </div>
          </div>
          <div class="monitor">
                <div class="section-box">
                    <span class="section-title">应用监控</span>
                    <p>
                        <span @click="changeTab('SpaceTab')" :class="{active:currentTab=='SpaceTab'}">空间</span>
                        <span @click="changeTab('ResourceTab')" :class="{active:currentTab=='ResourceTab'}">资源</span>
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
                <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <ClassList :classList="recomClasses"></ClassList>          
      </div>
      <div id="space" class="w-1200">
        <div id="spaceList">
            <div class="section-box">
                <span class="section-title">优秀空间</span>
                <p class="section-tab">
                    <span class="active">教师</span>
                    <span>学生</span>
                    <span>家长</span>
                    <span>学校</span>
                </p>
            </div>
            <SpaceList></SpaceList> 
        </div>
        <SpaceDynamic :infos="latestNews"></SpaceDynamic>    
      </div>
      <div id="open-box">
            <div class="open-title">
                <span class="small-size">平台</span>
                已有
                <span class="blue-num">1481</span>
                所学校开通了智慧校园服务
            </div>
            <p>仅需1分钟即可开始免费体验智慧校园产品服务</p> 
            <router-link to="/OpenSchool" class="open-btn">开通智慧校园</router-link>
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
            value2: 0,
            recomClasses:[],            
            roleList:[
                {role:'管理者',icon:'./static/imgs/index/managerIcon.png',title:'我想知道如何提升工作效率和教育水平',id:"manager",color:'#54CCC8',position:'-2'},
                {role:'教师',icon:'./static/imgs/index/teacherIcon.png',title:'我想知道如何提升工作效率和教育水平',id:"teacher",color:'#61bf2e',position:'-22'},
                {role:'学生',icon:'./static/imgs/index/studentsIcon.png',title:'我想知道如何提升学习效率和成绩',id:"student",color:'#ffbd5f',position:'-42'},
                {role:'家长',icon:'./static/imgs/index/homemasterIcon.png',title:'我想知道如何了解孩子的学习情况',id:"parent",color:'#ff9191',position:'-62'}
            ],            
            imgList:{
                manager:['./static/imgs/index/managerSelect01.png','./static/imgs/index/managerSelect02.png','./static/imgs/index/managerSelect03.png','./static/imgs/index/managerSelect04.png'],
                teacher:['./static/imgs/index/teacherSelect01.png','./static/imgs/index/teacherSelect02.png','./static/imgs/index/teacherSelect03.png','./static/imgs/index/teacherSelect04.png'],
                student:['./static/imgs/index/studentsSelect01.png','./static/imgs/index/studentsSelect02.png','./static/imgs/index/studentsSelect03.png','./static/imgs/index/studentsSelect04.png'],
                parent:['./static/imgs/index/studentsSelect01.png','./static/imgs/index/studentsSelect02.png','./static/imgs/index/studentsSelect03.png','./static/imgs/index/studentsSelect04.png']
            },
            subImgList:['./static/imgs/index/managerSelect01.png','./static/imgs/index/managerSelect02.png','./static/imgs/index/managerSelect03.png','./static/imgs/index/managerSelect04.png'],
            nowId:'manager',
            nowColor:'#54CCC8',
            nowPosition:'-2',
            currentTab:'SpaceTab' ,
            latestNews:[]    
        }
    },
    methods:{
        getRecomClassesList(){
          this.$http.post('/web/course/listCourse',this.$qs.stringify({
            needHotest:1,
            pageSize:8
          }))
          .then((res)=>{
            // console.log(res.data.data.list); 
            this.recomClasses=res.data.data.list;
          })
          .catch((err)=>{
            alert(err);
          })
        },
        drawPieOne(){
            let pieOne = this.$echarts.init(document.getElementById('pie0ne'));
            pieOne.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },               
                series: [
                    {
                        name:'空间数量',
                        type:'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: '75%',
                                position: 'center',
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:8888, name:'占有量',itemStyle:{normal:{color:'#31C46E'}}},
                            {value:2222, name:'剩余量',itemStyle:{normal:{color:'#31C499'}}}                            
                        ]
                    }
                ]
            });
        },
        drawPieTwo(){
            let pieTwo = this.$echarts.init(document.getElementById('pieTwo'));
            pieTwo.setOption({
               tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },                
                series: [
                    {
                        name:'空间数量',
                        type:'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {                                
                                formatter: '100%',
                                position: 'center',
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:8888, name:'占有量',itemStyle:{normal:{color:'#31C46E'}}}                                                     
                        ]
                    }
                ]
            });
        },
        changeRole(item){
            this.nowId=item.id; 
            this.nowColor=item.color; 
            this.subImgList=this.imgList[item.id];
            this.nowPosition = item.position;
        },
        changeTab(tab){
            this.currentTab = tab;
        }
    },
    mounted(){
        this.drawPieOne();
        this.drawPieTwo();
    },
    created:function(){     
        this. getRecomClassesList();
    }
}
</script>
<style scoped>
    #banner img{
        vertical-align: bottom;
        width: 100%;
    }   
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
        cursor: pointer;
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
        cursor: pointer;
    }
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
    .result-content>img{
        float: left;
        width: 30%;        
    }
    .result-content>div{
        float: right;
        width: 68%;
    }
    .result-content>div h1{
        width: 80%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color:#1cb0ea;
    }    
    .result-content>div p{
        text-indent:2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .result-content ul{
        margin-top: 20px;
    }
    .result-content ul li{
        overflow: hidden;
        width: 100%;
        height:30px;
    }
    .result-content ul li span:first-child{
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
        margin-top: 530px;        
        border:none;
        color:#fff;
        font-size: 20px;
        border-radius: 10px;
	    background-color: #47a2ff;
    }   
    
</style>


