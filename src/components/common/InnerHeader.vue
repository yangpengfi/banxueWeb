<template>
	<div id="innerHeader">
		<div id="spaceTitle">
			<span>{{userNme}}的空间</span>
			<div id="infoSet">
				<div @click="toIndex">
					<span>平台首页</span>
				</div>
				<div class="set">
					<span>设置</span> 
					<div class="login-out">
						<p @click="toPersonCenter">个人中心</p>
						<p @click="logout">退出</p>
					</div>
				</div>
			</div>
		</div>		
		<div class="nav-bar">
			<ul>
				<li v-for="(relation,index) in relations" v-on:click="relationClick(relation)">
					<a href="javascript:void(0);" :class="{active:relation.id==selelectId}">{{relation.text}}</a>
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
			userNme:this.$storage.getStorage("userInfo").trueName,
			relations:[
					{text:'空间首页',path:'/MySpace/',id:'spaceIndex'},   
					{text:'我的资源',path:'/MySpace/MyResource',id:'myResource'},   
					{text:'课程',path:'/MySpace/MinClasses',id:'minClasses'},   
					{text:'学习成果',path:'/MySpace/Achievements',id:'achievements'},   
					{text:'我的应用',path:'/MySpace/MyApplication',id:'myApplication'},
					{text:'我的通讯录',path:'/MySpace/MyList',id:'myList'},   
					{text:'展示空间',path:'/ShowSpace',id:'showSpace'}
			],
			selelectId:'spaceIndex'
		}
	},
	methods:{
		relationClick(item){  
			this.selelectId=item.id; 
			if(item.id=='showSpace'){
				window.open('#/ShowSpace/?userId='+this.$storage.getStorage("userInfo").id);
				return;
			}
			this.$router.push({
                  path:item.path
            }); 
		},
		logout(){
			this.$http.post('/web/user/a/logout.do',this.$qs.stringify({
            skey:new Date().getTime(),
            token:this.$storage.getStorage("token"),
          }))
          .then((res)=>{
            if(res.data.status==0||res.data.status==9){
            	this.$storage.setStorage("token",'');
	            this.$storage.setStorage("vipStatus",0);
	            this.$storage.setStorage("userInfo",'');
				this.$router.push('/Login');
            }else{
              
            }
          })
          .catch((err)=>{
            alert(err);
          })
		},
		toIndex(){
			this.$router.push('/');
		},
		toPersonCenter(){
			let userType=this.$storage.getStorage('userInfo').type;
			if(userType==2){
				this.$router.push('/MySpace/PersonalCenter/PersonInfoStudent');
			}else{
				this.$router.push('/MySpace/PersonalCenter');
			}
		}
	},
	created(){
		let userType=this.$storage.getStorage('userInfo').type;
		if(userType==2){
			this.relations=[
				{text:'空间首页',path:'/MySpace/',id:'spaceIndex'},   
				{text:'我的资源',path:'/MySpace/MyResource/PushResource',id:'myResource'},   
				{text:'课程',path:'/MySpace/MinClasses/BuiedClass',id:'minClasses'},   
				{text:'学习成果',path:'/MySpace/Achievements',id:'achievements'},   
				{text:'我的应用',path:'/MySpace/MyApplication',id:'myApplication'},
				{text:'我的通讯录',path:'/MySpace/MyList',id:'myList'},   
				{text:'展示空间',path:'/ShowSpace',id:'showSpace'}
			]
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
	border: 1px solid #47a2ff;
	background: #47a2ff;
	font-family: MicrosoftYaHeiLight;
}
#spaceTitle{
	width: 1200px;
	height: 38px;
	line-height: 38px;
	margin: 43px auto  0;
	color: #fff;
	font-size: 26px;
	font-weight: bolder;
}
#infoSet{	
	line-height: 25px;
	float: right;	
}
#infoSet>div{
	float: left;
	width: 120px;
	text-align: center;
	height: 30px;
	line-height: 30px;
	border:1px solid #fff;
	border-radius: 3px;
	color: #FFFFFF;
	font-size: 12px;
	margin-left: 20px;	
	cursor: pointer;
}
.set{
	position: relative;
}
.login-out{
	position: absolute;
	top: 29px;
	left: 0;
	width: 120px;
	height: 70px;
	line-height: 35px;
	padding: 0 10px;
	background-color: #fff;
	color: #999;
	box-shadow: 0px 1.5px 0px  #eee;
	border-radius: 3px;
	display: none;
}
.set:hover .login-out{
	display: block;
}
#infoSet>div>div>p{
	cursor: pointer;
}
#infoSet>div>div>p:first-child{
	border-bottom:1px solid #e9e9e9;
}
.nav-bar{
	width: 1200px;
	height: 80px;
	background: #FFF;
	padding: 0 20px;
	margin: 40px auto  0;
	box-shadow: 2px 5px 5px #186dc2;
	-moz-box-shadow: 2px 5px 5px #186dc2;          
  -webkit-box-shadow: 2px 5px 5px #186dc2;  
	
}
.nav-bar ul li{
	float: left;
	
}
.nav-bar ul li a{
	display: inline-block;
	width: 120px;
	margin-top: 30px;
	padding-bottom: 8px;
	text-align: center;
	font-size: 16px;
	color: #666;
}
.nav-bar li a.active{
	color: #4fa7ff;
	border-bottom:1px solid #4fa7ff;
}
</style>