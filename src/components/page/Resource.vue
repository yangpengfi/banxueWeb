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
                <li v-for="item in resources" v-if="item.id>0" @mouseenter="getVersionList(item.id)">
                  <div>
                    <span>{{ item.name }}</span>
                    <Icon type="chevron-right" class="right"></Icon>
                  </div>                  
                  <ul class="sub-resource">
                    <li v-for="item in resouceList">
                      <b>{{ item.periodName }}</b>
                      <p>                    
                      <a href="javascript:void(0);" 
                      v-for="(version,index) in item.versions" 
                      @click="toAreaResource(version)" v-if="index<6">{{version.name}}</a>
                      <a href="javascript:void(0);" v-if="item.versions.length>6" 
                        @click="toAreaResource(version)" class="active">更多</a> 
                      </p>                      
                    </li>                   
                  </ul>
                </li>
              </ul>              
            </div>
            <div class="resNumBox">
              <p class="mt75">
                <span class="rNumber">{{resouceCount.totalNum}}</span><br>
                <span class="rType">已有海量资源</span>
              </p>
              <p class="mt45">
                <span class="rNumber">{{resouceCount.lastNum}}</span><br>
                <span class="rType">最近更新资源</span>
              </p>
              <p class="mt45">
                <button @click="goMyResource">查看我的资源</button>
              </p>
            </div>
          </div>          
        </div>   
      <div class="w-1200" id="classes">
      	<div class="w-590 left">
          <div class="section-box">
              <span class="section-title">特色微课</span>
              <span class="nums">（{{specialTotalCount}}）</span>
              <span class="right more" @click="goSpecialClass">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
          </div>
          <div class="class-content">
              <p><img src="../../assets/imgs/resource/courseimgA.png" alt="特色微课宣传图片"></p>
              <MircoClass :resClasses="specialClasses"></MircoClass>
          </div>
        </div>
        <div class="w-590 right">
          <div class="section-box">
              <span class="section-title">优课专区</span>
              <span class="nums">（{{hightTotalCount}}）</span>
              <span class="right more" @click="goHightQualityClass">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
          </div>
          <div class="class-content">
              <p><img src="../../assets/imgs/resource/courseimgB.png" alt="优课专区宣传图片"></p>
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
                  <img :src="fileType(item.fileSuffix,1)" alt="课程图标" @click="toDetailResource(item)">
                  <span  @click="toDetailResource(item)">{{item.recourceLocalName}}</span>                  
                </li>
              </ul>
          </div>
          <div id="resource-box">
              <div class="left w-430">
                <div class="section-box">
                  <span class="section-title">最新资源</span> 
                  <!-- <span class="address">[ 深圳 ]</span>              -->
                </div>
                <ResourceList :resourceList="newResource"></ResourceList>
              </div>
              <div class="right w-430">
                <div class="section-box">
                  <span class="section-title">最热资源</span>    
                  <!-- <span class="address">[ 深圳 ]</span>            -->
                </div>
                <ResourceList :resourceList="hotResource"></ResourceList>
              </div>
          </div>       
        </div>
        <div class="w-300 right" id="space-state">          
          <SpaceDynamic :infos="latestNews"></SpaceDynamic> 
        </div>
      </div>
  </div>
</template>
<script>
import global_ from '@/components/Global'; 
import ResClasses from '@/components/common/ResClasses';
import MircoClass from '@/components/common/MircoClass';
import ResourceList from '@/components/common/ResourceList';
import SpaceDynamic from '@/components/common/SpaceRes';
export default {
    name:'Resource',
    components:{
        MircoClass,
        ResClasses,
        ResourceList,
        SpaceDynamic
    },
    data(){
      return {
        token:this.$storage.getStorage("token"),
        resources:global_.subjectList,
        resouceList:[],
        specialClasses:[],
        specialTotalCount:0,
        hightClasses:[],
        hightTotalCount:0,
        famousLecture:[],
        newResource:[],
        hotResource:[],
        latestNews:[],
        resouceCount:{},
        colorList:global_.colorList,
        randColor:global_.getRandColor(),
        fileType:global_.setFileType
      }
    },
    methods:{
        toDetailResource(item){
            if(!this.token){
              this.login();
              return;
            }
            this.$router.push({
              path:'/DetailResource',
              query:{
                resourceLocalId:item.resourceLocalId          
              }
            });   
        },
        getResouceCount(sId){//资源最近更新
          this.$http.post('/web/coursebook/countLastAndTotalResource.do')
          .then((res)=>{
            // console.log(res.data); 
            if(res.data.status==0){
              this.resouceCount=res.data.data;
            }else{
              
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getVersionList(sId){//版本列表
          this.$http.post('/web/coursebook/getVersionsGroupByPeriod.do',this.$qs.stringify({
            subjectId:sId
          }))
          .then((res)=>{
            // console.log(res.data); 
            if(res.data.status==0){
              this.resouceList=res.data.data;
            }else{
              
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getSpecialClassesList(){//微课
          this.$http.post('/web/microcourse/listResource.do',this.$qs.stringify({
            pageSize:4,
            needHost:1
          }))
          .then((res)=>{
            // console.log(res.data); 
            if(res.data.status==0){
              this.specialClasses=res.data.data.list;
              this.specialTotalCount=res.data.data.totalCount;
              this.setBgcolor(this.specialClasses);
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getHightClassesList(){//优课
          this.$http.post('/web/coursebook/listExcellentResource.do',this.$qs.stringify({
            pageSize:4
          }))
          .then((res)=>{
            // console.log(res.data.classesList); 
            if(res.data.status==0){
              this.hightClasses=res.data.data.list;
              this.hightTotalCount=res.data.data.totalCount;
              this.setBgcolor(this.hightClasses);
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getFamousLecture(){//名师推荐
          this.$http.post('/web/coursebook/listTeacherHostResource.do',this.$qs.stringify({
            pageSize:8,
          }))
          .then((res)=>{
            // console.log(res.data.classesList);
            if(res.data.status==0){
              this.famousLecture=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            } 
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getLatestNews(){//名师推荐
          this.$http.post('/web/coursebook/listTeacherLastResource.do',this.$qs.stringify({
            pageSize:6
          }))
          .then((res)=>{
            // console.log(res.data.classesList);
            if(res.data.status==0){
              this.latestNews=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            } 
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getNewResourceList(){//最新资源
          this.$http.post('/web/coursebook/listRegionLastResource.do',this.$qs.stringify({
            pageSize:8
          }))
          .then((res)=>{
            // console.log(res.data.classesList); 
            if(res.data.status==0){
              this.newResource=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            } 
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getHotResourceList(){//最热资源
          this.$http.post('/web/coursebook/listRegionHostResource.do',this.$qs.stringify({
            pageSize:8,
          }))
          .then((res)=>{
            // console.log(res.data.classesList); 
            if(res.data.status==0){
              this.hotResource=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            } 
          })
          .catch((err)=>{
            alert(err);
          })
        },
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        toAreaResource(item){
          this.$storage.setSession('baseData',item)
          this.$router.push({
							path:'/FilterResource/AreaResource?id=SubjectResource'
          });		
        },
        goMyResource(){
          this.$router.push({
              path:'/MySpace/MyResource'
          }); 
        },
        goSpecialClass(){
          this.$router.push({
              path:'/FilterResource/SpecialClass?id=SpecialClass'
          }); 
        },
        goHightQualityClass(){
          this.$router.push({
              path:'/FilterResource/HightQualityClass?id=HightQualityClass'
          }); 
        },
        setBgcolor(item){
          for(let i=0,len=item.length;i<len;i++){
            var sId=parseInt(item[i].subjectId);
            if(sId<10){
              item[i].bgColor=this.colorList[sId-1]
            }else{
              item[i].bgColor=this.randColor;
            }
          }
        } 
                      
    },
    created:function(){
      this.getSpecialClassesList();
      this.getHightClassesList();
      this.getFamousLecture();
      this.getLatestNews();
      this.getNewResourceList();
      this.getHotResourceList();
      this.getResouceCount();
    }
}
</script>
<style scoped>
#banner{  
  width: 100%;
  height: 515px;
  background-color:#1cb0ea;
  background: url('../../assets/imgs/resource/banner.png') no-repeat top center;
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
  padding: 20px 0 10px 40px;  
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
  line-height: 2;
  margin-bottom: 10px;
}
.sub-resource li b{ 
  margin-right: 28px; 
	font-size: 16px;	
	color: #333;
}
.sub-resource li p{
  display: inline-block;
  vertical-align: top;
  width: 495px;
}
.sub-resource li a{ 
  padding-bottom:3px;
  margin-right: 30px;	
	font-size: 14px;	
	color: #666;
  display: inline-block;
}
.sub-resource li a:hover{
  color: #1cb0ea;
  text-decoration: underline;
}
.sub-resource li a.active{
  color: #1cb0ea;
  font-weight: bold;
}
.resNumBox{
  width: 320px;
  height: 340px;
  background:url('../../assets/imgs/resource/rNum.png') no-repeat center;
  position: absolute;
  top:50px;
  right: 0;
  text-align: center;
}
.mt75{
  margin-top: 75px;
}
.mt45{
  margin-top: 35px;
}
.rNumber{
  font-size: 24px;
  line-height: 28px;
  color: #1cb0ea;
}
.rType{
  font-size: 14px;
  line-height: 28px;
  color: #666666;
}
.resNumBox button{
  width: 140px;
  height: 32px;
  background-color: #1cb0ea;
  box-shadow: inset 0px -2px 0px 0px 
    #149fd6;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  color: #ffffff;
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
  width: 32px;
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


