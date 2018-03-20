<template>
    <div>
        <div id="banner">
          <div class="w-1200">            
            <div class="classes-classify">
              <p class="classify-title">
                <Icon type="navicon-round" size=24></Icon>
                <span>课程分类</span>
              </p>
              <ul class="classify-content">
                <li>
                  <p>高中</p>
                  <div>
                    <a href="#">高一</a>
                    <a href="#">高二</a>
                    <a href="#">高三</a>
                  </div>
                </li>
                <li>
                  <p>初中</p>
                  <div>
                    <a href="#">初一</a>
                    <a href="#">初二</a>
                    <a href="#">初三</a>
                  </div>
                </li>
                <li>
                  <p>小学</p>
                  <div>
                    <a href="#">一年级</a>
                    <a href="#">二年级</a>
                    <a href="#">三年级</a>
                    <a href="#">四年级</a>
                    <a href="#">五年级</a>
                    <a href="#">六年级</a>
                  </div>
                </li>
                <li>
                  <p>专题</p>
                  <div>
                    <a href="#">小升初</a>
                    <a href="#">中考</a>
                    <a href="#">高考</a>
                  </div>
                </li>
              </ul>              
            </div>
            <div id="search">
              <input placeholder="请输入课程名称"/> 
              <div>查询</div>
            </div>
          </div>          
        </div>       
        <div id="new-classes" class="w-1200">          
          <div class="section-box">
            <span class="section-title">最新课程</span>
            <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
          </div>
          <ClassList :classList="newClasses"></ClassList>           
        </div>
        <div id="recommend-classes" class="w-1200">
          <div class="section-box">
            <span class="section-title">推荐课程</span>
            <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
          </div>
          <ClassList :classList="recomClasses"></ClassList> 
        </div>
        <div id="hot-classes" class="w-1200">
          <div class="section-box">
            <span class="section-title">热门课程</span>
            <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
          </div>
          <ClassList :classList="hotClasses"></ClassList> 
        </div>
    </div>
</template>
<script>
import ClassList from '@/components/common/ClassList'; 
export default {
    name:'Classes',
    components:{
        ClassList
    },
    data () {
        return {
            value2: 0,
            newClasses:[],
            recomClasses:[],
            hotClasses:[]
        }
    },
    methods:{
        getNewClassesList(){
          this.$http.get('http://newClasses.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.newClasses=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        },
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
        getHotClassesList(){
          this.$http.get('http://hotClasses.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.hotClasses=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        }           
    },
    created:function(){
      this. getNewClassesList();
      this. getRecomClassesList();
      this. getHotClassesList();
    }
}
</script>
<style scoped>
#banner{  
  width: 100%;
  height: 480px;
  background-color: #E0BB83;
  background: url('../../assets/imgs/classes/banner.png') no-repeat center center;
}
#banner>div{
  position: relative;
}
.classes-classify{
  position: absolute;
  left: 0;
  top: 0;
  width: 240px;
  height: 480px;  
  background-color: rgba(0, 0, 0, 0.4);
}
.classify-title{
  height:80px;
  line-height: 80px;
  padding-left: 15px;  
  font-family: MicrosoftYaHeiLight;
  background-color: rgba(0, 0, 0, 0.2);
	font-size: 20px;	
	color: #fff;
}
.classify-content{
  height: 400px;
  padding:0 20px 0 40px;
  color: #fff;
  font-size: 14px;  
}
.classify-content li{
  padding: 15px 0 10px 0;
  border-bottom: 1px solid rgba(248, 248, 248, 0.1);
}
.classify-content li:last-child{
  border-bottom: none;
}
.classify-content li>p{  
  margin-bottom: 10px;
  font-size: 16px;
}
.classify-content a{ 
  display: inline-block;
  width: 30%;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);  
}
#search{
  position: absolute;
  right: 0;
  top: 45px;
  font-size: 14px;
}
#search input{
  width: 540px;
  height: 50px;
  padding-left: 20px;
	background-color: rgba(255, 255, 255, 0.8);
	border: solid 1px rgba(28, 176, 234, 0.8);
  opacity: 0.8;
  border-radius: 5px;  
}
#search div{
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  height: 50px;
  line-height: 50px;
	background-color: #1cb0ea;
  border-radius: 0px 5px 5px 0px;  
  text-align: center;
  color:#fff;
}
#new-classes{
  margin-top: 80px;
}
#hot-classes{
  margin-bottom: 60px;
}
</style>


