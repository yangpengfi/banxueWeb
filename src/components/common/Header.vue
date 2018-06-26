<template>  
  <div id="header-container">
    <div id="header" class="w-1200">    
      <div class="left">
          <div class="logo">
            <!-- <img src="../../assets/imgs/index/webtitlelogo.png" alt="这是logo图片"> -->
            <img :src="logoUrl" alt="这是logo图片">
          </div>        
          <!-- <div class="title">
            <div>伴学网教育云平台</div>
            <p>专注中小学个性化教育</p>
          </div> -->
          <div class="address">
            <!-- <span href="#">运营千城计划</span>
            <p>
              <img src="../../assets/imgs/index/u120.png" alt="地图定位图片">
              <a href="#">深圳</a>
            </p> -->
          </div>
      </div>        
      <ul class="left nav">
        <li v-for="(relation,index) in relations" v-on:click="relationClick(relation)">
          <router-link :to='relation.path' :class="{active:relation.id==nowId}">{{relation.text}}</router-link>
        </li>
      </ul>
      <div class="right">
        <span v-show="isLogin" class="users" @click="goMySpace"><img :src="userInfo.server+userInfo.logo"> <span>{{userInfo.trueName}}</span></span>
        <button v-show="!isLogin" @click = "login">登录</button>
        <button @click="toBanxue">伴学网</button>      
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'v-header',
  data () {
    return {
      relations:[
            {text:'首页',path:'/',id:'index'},   
            {text:'资源',path:'/resource',id:'resource'},   
            {text:'课程',path:'/Classes',id:'classes'},   
            {text:'空间',path:'/space',id:'space'},   
            {text:'应用',path:'/application',id:'application'} 
      ],
      isLogin:false,
      nowId:'',
      userInfo:'',
      logoUrl:''
    }
  },
  methods:{
    getLogo(){
      this.$http.post('web/space/logo.do')
        .then((res)=>{
        if(res.data.status==0){
            this.logoUrl=res.data.data.logoPath
        }else{
            this.$Message.error(res.data.message);
        }
        })
        .catch((err)=>{
            alert(err);
        })
    },
    toBanxue(){
      this.$router.push('/DownLoadApp');
    },
    goMySpace(){
      this.$router.push('/MySpace/');
    },
    login(){
      this.$router.replace({
         name:"Login",
         query: {redirect: this.$router.currentRoute.fullPath}
        })
      // this.$router.push('/Login');
    },
    relationClick(item){ 
      if(item.id==this.nowId){
          this.$router.go(0)
      } 
      this.nowId=item.id; 
    } ,
    //获取pc用户地理位置
    getLocation(){
         var options={
             enableHighAccuracy:true, 
             maximumAge:1000
         }
         if(navigator.geolocation){
             //浏览器支持geolocation
             navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
             
         }else{
             //浏览器不支持geolocation
         }
     },

     //成功时
     onSuccess(position){
         //返回用户位置
         //经度
         var longitude =position.coords.longitude;
         //纬度
         var latitude = position.coords.latitude;

         //使用百度地图API
         //创建地图实例  
         var map =new BMap.Map("container");

         //创建一个坐标
         var point =new BMap.Point(longitude,latitude);
         //地图初始化，设置中心点坐标和地图级别  
         map.centerAndZoom(point,15);



     },
     //失败时
     onError(error){
         switch(error.code){
             case 1:
             alert("位置服务被拒绝");
             break;

             case 2:
             alert("暂时获取不到位置信息");
             break;

             case 3:
             alert("获取信息超时");
             break;

             case 4:
              alert("未知错误");
             break;
         }

     }
  },
  created(){
    this.getLogo();
    if(!this.$storage.getStorage("userInfo")){
      this.isLogin=false;
    }else{
      this.isLogin=true;
      this.userInfo=this.$storage.getStorage("userInfo");
    }
    if(!location.hash.substr(2)){
      this.nowId='index';
      return;
    }
    this.nowId=location.hash.substr(2);
  }
}
</script>
<style scoped>
#header-container{
  position: fixed;
  top:0;
  width: 100%;
  background-color: #fff;
  z-index: 9999;
}
#header{  
  height:120px;
  margin: auto;  
  overflow: hidden;
  padding-top: 25px; 
}
#header>div.left{
  overflow: hidden;  
	height: 80px;
}
#header>.left>div{
  float: left;
}
.logo{
  margin-right: 10px;
  width: 240px;
  position: relative;
}
.logo img{
  position: absolute;
  height: 120px;
  z-index: 120;
  top: -25px;
}
.title{
  text-align: center;
  /*border-right:1px solid #e9e9e9;*/
  padding-right: 25px;
}
.title div{
  font-family: FZZXHJW--GB1-0;
	font-size: 20px;
	color: #333;
}
.title p{  
	font-family: MicrosoftYaHei;
	font-size: 14px;	
	color: #999;
}
.address{
  margin-top: 5px; 
  margin-left: 10px;
}
.address span{  
	font-family: MicrosoftYaHeiLight;
	font-size: 14px;		
	color: #999;
}
.address img{
  vertical-align: middle;
} 
.address a{  
	font-family: MicrosoftYaHeiLight;
	font-size: 16px;	
	color: #008fd5;
}
.nav{
  overflow: hidden;   
  margin-left: 80px; 
}
.nav li{
  float: left;
}
.nav li a{ 
  display: inline-block; 
  width: 80px;
  padding: 24px 0 15px;
  font-size: 16px;
  cursor: pointer;
  color:#333;
  text-align: center;
}
.nav li a.active{ 
  border-bottom:2px solid #1cb0ea;
  color:#1cb0ea;
}
/* .nav li:hover a{
  border-bottom:2px solid #1cb0ea;
  color:#1cb0ea;
} */
#header>.right{
  margin-top: 25px;
}
#header>.right>button{
  width: 68px;
	height: 32px;
  border: solid 1px #e9e9e9;  
	font-family: MicrosoftYaHeiLight;
	font-size: 14px;	
  color: #666;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
#header>.right>button:nth-child(2){
  margin-right: 20px;  
}
.users>img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
.users>span{
  font-size: 14px;
  color: #333;
  margin:0 12px;
}
</style>
