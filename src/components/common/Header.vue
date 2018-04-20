<template>  
  <div id="header-container">
    <div id="header" class="w-1200">    
      <div class="left">
          <div class="logo">
            <img src="../../assets/imgs/index/u124.png" alt="这是logo图片">
          </div>        
          <div class="title">
            <div>伴学网教育云平台</div>
            <p>专注中小学个性化教育</p>
          </div>
          <div class="address">
            <span href="#">运营千城计划</span>
            <p>
              <img src="../../assets/imgs/index/u120.png" alt="地图定位图片">
              <a href="#">深圳</a>
            </p>
          </div>
      </div>        
      <ul class="left nav">
        <li v-for="(relation,index) in relations" v-on:click="relationClick(relation)">
          <router-link :to='relation.path' :class="{active:relation.id==nowId}">{{relation.text}}</router-link>
        </li>
      </ul>
      <div class="right">
        <button @click = "login">登录</button>
        <button>伴学网</button>      
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
      nowId:''
    }
  },
  methods:{
    login(){
      this.$router.replace({
         name:"Login",
         query: {redirect: this.$router.currentRoute.fullPath}
        })
      // this.$router.push('/Login');
    },
    relationClick(item){  
      this.nowId=item.id; 
    } 
  },
  created(){
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
  width: 100%;
  background-color: #fff;
}
#header{  
  height:120px;
  margin: auto;  
  overflow: hidden;
  padding-top: 34px; 
}
#header>div.left{
  overflow: hidden;  
	height: 53px;
}
#header>.left>div{
  float: left;
}
.logo{
  margin-right: 10px;
}
.logo img{
  height: 53px;
}
.title{
  text-align: center;
  border-right:1px solid #e9e9e9;
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
#header>.right>button:first-child{
  margin-right: 20px;  
}
</style>
