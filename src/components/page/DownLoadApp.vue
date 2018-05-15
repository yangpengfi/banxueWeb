<template>
  <div class="w-1200">
  	<div class="teb">
  		<span v-for="item in tab" @click="changeTab(item)" :class="{active:item.id==thisId}">{{item.name}}</span>
  	</div>
  	<div class="left pLft">
  		<img :src="imgurl">
  	</div>
  	<div class="left pRigth">
  		<h1>{{appInfo.title}}</h1>
  		<p class="topP">适用于iPhone&nbsp;&nbsp;Android手机</p>
  		<p class="topP"><span>大小：{{appInfo.size}}M</span> 
  			<Rate disabled v-model="appInfo.score" style="margin-left:20px;"></Rate></p>
  		<img :src="codeimgurl">
  		<p class="imgTitle">
  			<span>手机扫描二维码</span><br>
			<span>下载安装</span>
		</p>
  		<p class="bottomP">{{appInfo.text}}</p>
  	</div>
  	<div class="clear"></div>
  </div>
</template>


<script>
  export default {
  	name:'DownLoadApp',
    data(){
        return {
            tab:[
            {id:0,name:"我是老师",imgurl:require('../../assets/imgs/index/appdownload.png'),codeimgurl:require('../../assets/imgs/index/ter.png')},
            {id:1,name:"我是学生",imgurl:require('../../assets/imgs/index/appdownloadstu.png'),codeimgurl:require('../../assets/imgs/index/stu.png')}
            ],
            thisId:0,
            val:5,
            imgurl:require('../../assets/imgs/index/appdownload.png'),
            codeimgurl:require('../../assets/imgs/index/ter.png'),
            appInfoArr:[
            {size:66,text:"伴学网是异度云教育旗下中小学在线教育品牌，是K12教育生态服务云平台，伴学网老师端集海量教学资源、云端互动教学、作业、班级管理、数据分析统计、师生沟通、学习交流等为一体，帮助教师实现高质量教学，为教师减负。是老师教学好帮手。",title:"伴学网老师客户端",score:5},
            {size:60,text:"伴学网是异度云教育旗下中小学在线教育品牌，是K12教育生态服务云平台。通过伴学网学生端学生可随时随地回看课堂视频，查漏补缺。系统对学生学习数据进行采集，智能分析并推荐个性化的优质学习资源，帮助学生快速提分，是学生挚爱的学习好帮手！",title:"伴学网学生客户端",score:5}
            ],
            appInfo:{size:66,text:"伴学网是异度云教育旗下中小学在线教育品牌，是K12教育生态服务云平台，伴学网老师端集海量教学资源、云端互动教学、作业、班级管理、数据分析统计、师生沟通、学习交流等为一体，帮助教师实现高质量教学，为教师减负。是老师教学好帮手。",title:"伴学网老师客户端",score:5}
        }
    } ,
    methods:{
    	changeTab(item){
    		this.thisId=item.id;
			this.imgurl=item.imgurl
			this.codeimgurl=item.codeimgurl
			this.appInfo=this.appInfoArr[item.id]
    	}
    },
    created(){

    }
  }
</script>

<style scoped>
.teb{
	padding-top: 30px;
	padding-bottom: 1px;
	border-bottom: 1px solid #e9e9e9;
	text-align: center;
}
.teb span{
	display: inline-block;
	cursor: pointer;
	font-size: 20px;
	color:#666;
	padding:20px 30px;
	border-bottom: 2px solid transparent;
}
.teb span.active{
	color:#1cb0ea;
	border-bottom-color: #1cb0ea;
}
.pLft{
	width: 50%;
	box-sizing: border-box;
	padding: 85px 0 75px 110px;
}
.pRigth{
	width: 50%;
	box-sizing: border-box;
	padding-top:205px;
	padding-left: 60px; 
	font-size: 14px;
}
.pRigth h1{
	font-size: 36px;
	font-weight: normal;
	color: #333333;
}
.pRigth img{
	width: 240px;
	height: 240px;
}
.topP{
	line-height: 2;
	color: #666;
}
.imgTitle{
	margin-top: 10px;
	line-height: 22px;
	color:#999;
	width: 240px;
	text-align: center;
}
.bottomP{
	color:#999;
	line-height: 24px;
	text-indent: 2em;
	margin-top: 20px;
}
</style>