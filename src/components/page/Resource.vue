<template>
  <div>
      <div id="banner">
          <div class="w-1200">            
            <div class="resource-classify">
              <p class="resource-title">
                <Icon type="navicon-round" size=24></Icon>
                <span>同步资源</span>
              </p>
              <ul class="resource-content">
                <li v-for="item in resources">
                  <div>
                    <span>{{ item }}</span>
                    <Icon type="chevron-right" class="right"></Icon>
                  </div>                  
                  <ul class="sub-resource">
                    <li v-for="item in resouceList">
                      <b>{{ item.class }}</b>                      
                      <a href="#" v-for="version in item.versions">{{ version }}</a>                     
                    </li>                   
                  </ul>
                </li>
              </ul>              
            </div>
          </div>          
        </div>   
      <div class="w-1200" id="classes">
      	<div class="w-590 left">
          <div class="section-box">
              <span class="section-title">特色微课</span>
              <span class="nums">（2634）</span>
              <a href="#" class="right more">更多<Icon type="ios-arrow-thin-right" size="16px" color="#ccc"></Icon></a>
          </div>
          <div class="class-content">
              <p><img src="../../assets/imgs/resource/special.png" alt="特色微课宣传图片"></p>
              <resClasses :resClasses="specialClasses"></resClasses>
          </div>
        </div>
        <div class="w-590 right">
          <div class="section-box">
              <span class="section-title">优课专区</span>
              <span class="nums">（2634）</span>
              <a href="#" class="right more">更多<Icon type="ios-arrow-thin-right" size="16px" color="#ccc"></Icon></a>
          </div>
          <div class="class-content">
              <p><img src="../../assets/imgs/resource/hight.png" alt="优课专区宣传图片"></p>
              <resClasses :resClasses="hightClasses"></resClasses>
          </div>
        </div>
      </div>
      <div class="w-1200" id="multi-box">
        <div class="w-800 left">
          <div id="famous-lecture">
              <div class="section-box">
                  <span class="section-title">名师推荐</span>              
              </div> 
              <ul>
                <li v-for="item in famousLecture">
                  <img :src="item.img" alt="课程图标">
                  <span>{{item.title}}</span>                  
                </li>
              </ul>
          </div>
          <div id="resource-box">
              <div class="left w-430">
                <div class="section-box">
                  <span class="section-title">最新资源</span> 
                  <span class="address">[ 深圳 ]</span>             
                </div>
                <ResourceList :resourceList="newResource"></ResourceList>
              </div>
              <div class="right w-430">
                <div class="section-box">
                  <span class="section-title">最热资源</span>    
                  <span class="address">[ 深圳 ]</span>           
                </div>
                <ResourceList :resourceList="hotResource"></ResourceList>
              </div>
          </div>       
        </div>
        <div class="w-300 right" id="space-state">          
          <SpaceDynamic></SpaceDynamic> 
        </div>
      </div>
  </div>
</template>
<script>
import ResClasses from '@/components/common/ResClasses';
import ResourceList from '@/components/common/ResourceList';
import SpaceDynamic from '@/components/common/SpaceDynamic.vue';
export default {
    name:'Resource',
    components:{
        ResClasses,
        ResourceList,
        SpaceDynamic
    },
    data(){
      return {
        resources:['语文','数学','英语','历史','政治','地理','生物','化学','物理'],
        resouceList:[         
            {
              class:'高中',
              versions:['人教版','沪教版','冀教版','湘教版','粤教版','豫教版']
            },
            {
              class:'初中',
              versions:['人教版','沪教版','冀教版','湘教版','粤教版','豫教版']
            },
            {
              class:'小学',
              versions:['人教版','沪教版','冀教版','湘教版','粤教版','豫教版']
            }
        ],
        specialClasses:[],
        hightClasses:[],
        famousLecture:[],
        newResource:[],
        hotResource:[]
      }
    },
    methods:{
        getSpecialClassesList(){
          this.$http.get('http://specialClasses.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.specialClasses=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getHightClassesList(){
          this.$http.get('http://highClasses.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.hightClasses=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getFamousLecture(){
          this.$http.get('http://famousLecture.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.famousLecture=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getNewResourceList(){
          this.$http.get('http://newResource.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.newResource=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getHotResourceList(){
          this.$http.get('http://hotResource.cn')
          .then((res)=>{
            console.log(res.data.classesList); 
            this.hotResource=res.data.classesList;
          })
          .catch((err)=>{
            alert(err);
          })
        }      
                      
    },
    created:function(){
      this.getSpecialClassesList();
      this.getHightClassesList();
      this.getFamousLecture();
      this.getNewResourceList();
      this.getHotResourceList();
    }
}
</script>
<style scoped>
#banner{  
  width: 100%;
  height: 515px;
  background-color:#1cb0ea;
  background: url('../../assets/imgs/resource/banner.png') no-repeat center center;
}
#banner>div{
  position: relative;
}
.resource-classify{
  position: absolute;
  left: 0;
  top: 0;  
  width: 240px;
  height: 440px;  
  background-color: rgba(0, 0, 0, 0.4);    
}
.resource-title{
  height:60px;
  line-height: 60px;
  padding-left: 30px;  
  font-family: MicrosoftYaHeiLight;
  background-color: rgba(0, 0, 0, 0.2);
	font-size: 20px;	
	color: #fff;
}
.resource-content{
  height: 380px;  
  color: #fff;
  font-size: 14px;   
}
.resource-content>li{
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #217494;
}
.resource-content>li>div{
  padding: 0 60px;
}
.sub-resource{
  position: absolute;
  left: 240px;
  top: 0;  
  width: 600px;	
  background-color: #fff;
  display: none;
  padding-top: 40px;  
}
.resource-content .right{
  margin-top: 13px;
}
.resource-content>li:hover{
  background-color: rgba(255, 255, 255, 0.1);
}
.resource-content>li:hover .sub-resource{
  display: block;
}
.resource-content>li:hover .right{
  display: none;
}
.sub-resource li{
  padding-left: 40px;
  margin-bottom: 30px;
}
.sub-resource li b{ 
  margin-right: 28px; 
	font-size: 16px;	
	color: #333;
}
.sub-resource li a{ 
  margin-right: 30px;	
	font-size: 14px;	
	color: #666;
}
#classes{
  overflow: hidden;
  margin-top: -40px;
}
.class-content{
  padding-top: 18px;      
  border: solid 1px #e9e9e9;
}
.class-content p{
  text-align: center;
}
.nums{  
	font-size: 12px;	
	color: #999;
}
#multi-box{
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 80px;
}
#famous-lecture ul{
  overflow: hidden;
  width: 880px;
  padding: 30px 20px 0 20px;
  border: solid 1px #dfe4e9;
  background-color: #fff;
}
#famous-lecture ul li{
  float: left;
  width: 50%;
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}
#famous-lecture ul li img{
  vertical-align: middle;
  margin-right: 16px;
}
.address{
	font-size: 14px;	
	color: #1cb0ea;
}
#resource-box{
  margin-top: 20px;
}
#resource-box{
  width: 880px;
}
#space-state{
  width: 300px;
}
</style>


