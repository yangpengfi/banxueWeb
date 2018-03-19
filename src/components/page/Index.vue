<template>
  <div>
      <div id="banner">
        <Carousel autoplay v-model="value2" loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/imgs/index/u137.jpg">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="../../assets/imgs/index/u139.jpg">
                </div>
            </CarouselItem>        
        </Carousel>
      </div>
      <ul id="role" class="w-1200">
          <li>管理者</li>
          <li>教师</li>
          <li>学生</li>
          <li>家长</li>
      </ul>
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
                        <img src="" alt="">
                        <p>老师</p>
                        <p class="one-num">565758</p>
                    </li>
                    <li>
                        <img src="" alt="">
                        <p>学生</p>
                        <p class="one-num">4577949</p>
                    </li>
                    <li>
                        <img src="" alt="">
                        <p>家长</p>
                        <p class="one-num">8975185</p>
                    </li>
                </ul>
                <div class="pecent">
                    
                </div>
                    <Circle :percent="80">
                        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                    </Circle>
                    <Circle :percent="100" stroke-color="#5cb85c">
                        <Icon type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
                    </Circle>
                    <Circle :percent="35" stroke-color="#ff5500">
                        <span class="demo-Circle-inner">
                            <Icon type="ios-close-empty" size="50" style="color:#ff5500"></Icon>
                        </span>
                    </Circle>
          </div>
      </div>
      <div id="classes" class="w-1200">
            <div class="section-box">
                <span class="section-title">热门课程</span>
                <a href="#" class="right more">更多<Icon type="ios-arrow-thin-right" size="16px" color="#ccc"></Icon></a>
            </div>
            <ClassList></ClassList>           
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
            <img src="../../assets/imgs/index/u145.png" alt="开通介绍图">
            <div>
                <button class="open-btn">开通智慧校园</button>
            </div>            
      </div>
      <div id="about-us">
          <div>
              <div>
                <span>帮助中心</span>
                <p>
                    <img src="" alt="">
                </p>
              </div>
              
          </div>
      </div>
  </div>
</template>
<script>
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
            value2: 0
        }
    }
}
</script>
<style scoped>
    #banner img{
        vertical-align: bottom;
        width: 100%;
    }    
    #role{
        overflow: hidden;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    #role li:first-child{
        margin-left: 0;
    }
    #role li{
        float: left;
        width: 24%;
        margin-left: 10px;
        height: 200px;
        line-height: 200px;
        background-color: #3d95d5;
        text-align: center;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
    }
    #result{
        overflow: hidden;
        margin-bottom: 15px;
        margin-top: 50px;
    }
    .result{
        float: left;
        width: 65%;        
    }    
    .monitor{
        float: right;
        width: 30%;
    }
    .result-content{
        overflow: hidden;
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
        margin-bottom: 20px;
    }
    #space .section-tab{
        margin-left: 80px;
    }
    .space-total{
        text-align: center;
    }
    .space-total span{
        font-size: 18px;
        margin-right: 10px;
    }
    .space-total b{
        font-size: 40px;
        color: #4EA7F5;
    }
    .one-total{
        overflow: hidden;
    }
    .one-total li{
        float: left;
        width: 30%;
        margin-right: 10px;
        text-align: center;
        font-size: 18px;
    }
    .one-num{
        font-size: 25px;
        color: #4EA7F5;
    }
    #classes{
        margin-top: 50px;
    }
    .classes-title{
        overflow: hidden;
        margin: 20px;        
    }
    .classes-title a{
        font-size: 14px;      
    }    
    #open-box{
        padding: 40px 0;
        text-align: center;
        background-color: #ECF9FF;
    }
    .open-title{
        font-size: 40px;
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
        width: 300px;
        height: 60px;
        margin-top: 10px;
        background-color: #0882E3;
        border:none;
        color:#fff;
        font-size: 20px;
        border-radius: 10px;
    }
</style>


