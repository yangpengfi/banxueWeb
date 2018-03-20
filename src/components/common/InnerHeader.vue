<template>
	<div id="innerHeader">
		<div id="spaceTitle">
			<span>阿里巴巴的空间</span>
			<div id="infoSet">
				<a href="#">消息</a>
				<a href="#">设置</a>
			</div>
		</div>
		
		<div class="nav-bar">
			<ul>
	      <li v-for="(relation,index) in relations" v-on:click="relationClick(relation)">
	        <router-link :to='relation.path' :class="{active:relation.id==nowId}">{{relation.text}}</router-link>
	      </li>
    	</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'v-header',
  data () {
    return {
      relations:[
            {text:'空间首页',path:'/',id:'sapceIndex'},   
            {text:'我的资源',path:'/myResource',id:'myResource'},   
            {text:'微课程',path:'/minClasses',id:'minClasses'},   
            {text:'学习成果',path:'/achievements',id:'achievements'},   
            {text:'我的应用',path:'/myApplication',id:'myApplication'},
            {text:'我的通讯录',path:'/myList',id:'myList'},   
            {text:'展示空间',path:'/showSpace',id:'showSpace'}
      ],
      nowId:''
    }
  },
  methods:{
    relationClick(item){  
      this.nowId=item.id; 
    } 
  }
}
</script>
<style scoped>
#innerHeader{
	width: 100%;
	min-width: 1200px;
	height: 230px;
	margin: auto;
	border: 1px solid rgb(78, 167, 255); 
	background: rgb(78, 167, 255);
	font-family: MicrosoftYaHeiLight;
}
#innerHeader #spaceTitle{
	width: 1200px;
	height: 38px;
	line-height: 38px;
	margin: 43px auto  0;
	color: #fff;
	font-size: 26px;
	font-weight: bolder;
}
#spaceTitle #infoSet{
	width: 200px;
	line-height: 25px;
	float: right;
	margin-right: 20px;
}
#spaceTitle #infoSet a{
	color: #FFFFFF;
	font-size: 12px;
}
#spaceTitle #infoSet a:first-child{
	margin-right: 80px;
}
.nav-bar{
	width: 1200px;
	height: 80px;
	background: #FFFFFF;
	margin: 40px auto  0;
	box-shadow: 2px 5px 5px #186dc2;
	-moz-box-shadow: 2px 5px 5px #186dc2;          
  	-webkit-box-shadow: 2px 5px 5px #186dc2;     
}
.nav-bar ul li{
	float: left;
}
.nav-bar ul li a{
	text-decoration: none;
	padding-left: 30px;
	line-height: 80px;
	color: #6e6e6e;
	font-size: 16px;
	font-weight: bolder;
}
.nav-bar li a.active{
	color: #4fa7ff;
}
</style>