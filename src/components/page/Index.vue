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
            <li class="manager">
                <h1>管理者</h1>
                <img src="../../assets/imgs/index/managerIcon.png" alt="管理者logo">
                <div>
                    <span class="color-line"></span>
                    <p>我想知道如何提升管理效率和管理水平</p>
                    <span class="drop-arrow"></span>
                </div>
            </li>
            <li class="teacher">
                <h1>教师</h1>
                <img src="../../assets/imgs/index/teacherIcon.png" alt="教师logo">
                <div>
                    <span class="color-line"></span>
                    <p>我想知道如何提升工作效率和教育水平</p>
                    <span class="drop-arrow"></span>
                </div>
            </li>
            <li class="student">
                <h1>学生</h1>
                <img src="../../assets/imgs/index/studentsIcon.png" alt="学生logo">
                <div>
                    <span class="color-line"></span>
                    <p>我想知道如何提升学习效率和成绩</p>
                    <span class="drop-arrow"></span>
                </div>             
            </li>
            <li class="parent">
                <h1>家长</h1>
                <img src="../../assets/imgs/index/homemasterIcon.png" alt="家长logo">
                <div>
                    <span class="color-line"></span>
                    <p>我想知道如何了解孩子的学习情况</p>
                    <span class="drop-arrow"></span>
                </div>
            </li>
        </ul>
        <ul id="role-tab" class="w-1200">
            <li><img src="../../assets/imgs/index/managerSelect01.png"></li>  
            <li><img src="../../assets/imgs/index/managerSelect02.png"></li>  
            <li><img src="../../assets/imgs/index/managerSelect03.png"></li>  
            <li><img src="../../assets/imgs/index/managerSelect04.png"></li>           
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
                        <span class="active">空间</span>
                        <span>资源</span>
                        <span>教学</span>
                    </p>
                </div>   
                <p class="space-total"> 
                    <span>已开通的空间 </span> <br>
                    <b>14131912</b> 
                </p>
                <ul class="one-total">
                    <li>
                        <img src="../../assets/imgs/index/teacherRole.png" alt="老师icon">
                        <p>老师</p>
                        <p class="one-num">565758</p>
                    </li>
                    <li>
                        <img src="../../assets/imgs/index/studentRole.png" alt="学生icon">
                        <p>学生</p>
                        <p class="one-num">4577949</p>
                    </li>
                    <li>
                        <img src="../../assets/imgs/index/masterparentRole.png" alt="家长icon">
                        <p>家长</p>
                        <p class="one-num">8975185</p>
                    </li>
                </ul>
                <div class="pecent">
                    <!-- <IEcharts :option="pie" style="width:150px;height:100px;"></IEcharts>
                    <IEcharts :option="pie2" style="width:150px;height:100px;"></IEcharts> -->
                    <div id="pie0ne" :style="{width: '180px', height: '180px'}"></div>
                    <div id="pieTwo" :style="{width: '180px', height: '180px'}"></div>
                </div>                   
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
        <SpaceDynamic></SpaceDynamic>    
      </div>
      <div id="open-box">
            <div class="open-title">
                <span class="small-size">平台</span>
                已有
                <span class="blue-num">1481</span>
                所学校开通了智慧校园服务
            </div>
            <p>仅需1分钟即可开始免费体验智慧校园产品服务</p> 
            <button class="open-btn">开通智慧校园</button>
      </div>     
  </div>
</template>
<script>
// import IEcharts from 'vue-echarts-v3';
import ClassList from '@/components/common/ClassList'; 
import SpaceList from '@/components/common/SpaceList.vue';
import SpaceDynamic from '@/components/common/SpaceDynamic.vue';
export default {
    name:'Index',
    components:{
        ClassList,
        SpaceList,
        SpaceDynamic
    },
    data () {
        return {
            value2: 0,
            recomClasses:[]            
        }
    },
    methods:{
        getRecomClassesList(){
          this.$http.get('http://recommendClasses.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.recomClasses=res.data.classesList;
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
        overflow: hidden;
        padding-top: 20px;        
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
        border-top: 1px solid #E7E7E7;
    }
    #role>li>div p{
        margin-top: 18px;
        font-size: 14px;   
        height:32px;     ;
        line-height: 32px;        
        color: #666;
        font-family: MicrosoftYaHei;
    }
    #role>li.manager:hover{
        border-color: #54CCC8;
    }    
    #role>li.teacher:hover{
        border-color: #61BF2D;
    }
    #role>li.student:hover{
        border-color: #FFBD5F;
    }
    #role>li.parent:hover{
        border-color: #FF9190;
    }
    #role-tab{
        overflow: hidden; 
    }
    #role-tab li{
        float: left;
        margin-left: 30px;
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
    .space-total{
        border-top: 1px solid #E9E9E9; 
        padding: 20px 35px 0;  
        text-align: center;
    }
    .space-total span{        
        margin-right: 10px;       
        font-size: 16px;        
        color: #666;
    }
    .space-total b{       
        font-family: MicrosoftYaHei;
        font-size: 30px;        
        color: #1cb0ea;
    }
    .one-total{
        overflow: hidden;
    }
    .one-total li{
        float: left;
        width: 30%;
        padding: 20px 0;
        margin-right: 10px;
        text-align: center;        
        border-right:1px solid#EFEFEF;        
	    font-size: 20px;	
	    color: #666;
    }
    .one-total li:last-child{        
        border-right:none;
    }
    .one-num{        
        color: #1cb0ea;        
	    font-size: 20px;	
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
        margin-top: 530px;        
        border:none;
        color:#fff;
        font-size: 20px;
        border-radius: 10px;
	    background-color: #47a2ff;
    }   
    .pecent>div{
        float: left; 
        width: 50%;
    }
</style>


