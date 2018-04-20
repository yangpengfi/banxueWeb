<template>	
	<div id="spaceIndex">
		<div class="bgColor"></div>
		<div class="spaceCont">
			<div class="left">				
				<div id="name">
					<img src="../../assets/imgs/space/headImg.png" alt="头像"/>
					<div id="nameIntroduction">
						<span>帅帅斌</span>
						<span>老师</span>
						<p>深圳市华侨中学</p> 
					</div>
				</div>
				
				<div id="resource">
					<div id="side">
						<p>10</p>
						<p>资源</p>
					</div>
					<div id="side">
						<p>30</p>
						<p>学习成果</p>
					</div>
				</div>
				
				<div class="homework">
					<img src="../../assets/imgs/space/class.png" alt="头像" align="absmiddle"/>
					<span>高三一班</span>
					<a class="bgImg"></a>
				</div>
				
				<div class="homework">
					<img src="../../assets/imgs/space/work.png" alt="头像" align="absmiddle"/>
					<span>作业</span>
				</div>
				
				<div id="code">
					<div id="title">
						<div class="bgImgApp"></div>
						<div class="fonts">下载客户端</div>
					</div>
					<img src="../../assets/imgs/space/code.jpg" alt="二维码图片" />
				</div>
			</div>
		
			<div class="center">
				<div class="unfishedList">
					<p class="unfishedTitle">
						<a href="#">待办完成任务</a>
					</p>
					<ul v-if="unfinishedList.length>0">
						<li v-for="item of unfinishedList">{{item.info}}</li>
					</ul>
				</div>
				
				
				<div class="spaceInfo">
					<div>
						<p>空间动态</p>
						<ul class="ulTitle">
							<li v-for="item of spaceStatus" @click="changeStatus(item)" :class="{active:item.id == localStatus}">{{item.title}}</li>
						</ul>
					</div>
					<ul class="spaceList">
						<li v-for="item of spaceList">
							<div class="headImg">
								<img src="../../assets/imgs/space/headImg.png" />
							</div>
							<div class="headImgInfo">
								<p class="headName">
									<a href="#">{{item.name}}</a>
									<span>{{item.date}}</span>
								</p>
								<p class="className">
									<span>上传了</span>&nbsp;{{item.file}}
								</p>								
								<div class="comment">
									<p>
										<span></span>
										<a href="javascript:void(0);">赞一个</a>
									</p>
									<p>
										<span class="share"></span>
										<a href="javascript:void(0);">分享</a>
									</p>
									<p>
										<span class="review"></span>
										<a href="javascript:void(0);">评论</a>
									</p>
								</div>
							</div>
						</li>
					</ul>
					<button id="load-more">加载更多</button>
				</div>
			</div>
			
			
			
			<div class="right">
				<div class="threeBtn">
					<button type="button" @click="toLoadResource">上传资源</button>
					<button type="button">写文章</button>
					<button type="button">班级详情</button>
				</div>
				<div class="myView">
					<p class="viewTitle more-focus">
						我的关注
						<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
					</p>
					<ul class="viewCont">
						<li class="marginTop" v-for="item of peopleList">
							<img src="../../assets/imgs/space/headImg.png"/>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
				<div class="myView">
					<p class="viewTitle total-visitor">
						最近访客
						<span>26564次</span>
					</p>
					<ul class="viewCont">
						<li class="marginTop" v-for="item of peopleList">
							<img src="../../assets/imgs/space/headImg.png" />
							<p>{{item.name}}</p>
						</li>
					</ul>
					<div>
						<Page :total="40" size="small"></Page>
					</div>
				</div>
			</div> 
		</div>
	</div>
</template>
<script>
export default {
	name:'SpaceIndex',
	data(){
		return {
				unfinishedList:[
					{id:1,info:'张老师复制了作业，请于9:30之前完成'},
					{id:2,info:'张老师复制了作业，请于9:30之前完成'},
					{id:3,info:'张老师复制了作业，请于9:30之前完成'},
					{id:4,info:'张老师复制了作业，请于9:30之前完成'}
				],
				spaceStatus:[
					{id:1,title:'全部'},
					{id:2,title:'班级'},
					{id:3,title:'好友'},
					{id:4,title:'与我相关'}
				],
				localStatus:1,
				spaceList:[
					{id:1,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'},
					{id:2,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'},
					{id:3,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'},
					{id:4,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'},
					{id:5,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'},
					{id:6,name:'灵活的大瘦子',file:'《一元一次方程课件.doc》',date:'2018-1-25 14:30:36'}
				],
				localSpaceId:1,
				peopleList:[
					{id:1,name:'张三'},
					{id:2,name:'张三'},
					{id:3,name:'张三'},
					{id:4,name:'张三'},
					{id:5,name:'张三'},
					{id:6,name:'张三'},
					{id:7,name:'张三'},
					{id:8,name:'张三'},
					{id:9,name:'张三'},
					{id:10,name:'张三'}
				]
		}
	},
	methods:{
		changeStatus(item){
			this.localStatus = item.id;
		},
		toLoadResource(){
			this.$router.push({
				path:'/MySpace/LoadResource/1',  				
			});
		}
	}
}
</script>

<style scoped>
	*{
		font-family: MicrosoftYaHeiLight;
	}
	#spaceIndex{
		width: 100%;		
		overflow: hidden;
		margin-bottom: 60px;
		font-family: MicrosoftYaHeiLight;
		font-size: 36px;
		color: #fff;
	}
	.bgColor{
		width: 100%;
		height: 370px;
		background: #47a2ff;
	}
	.spaceCont{
		width: 1200px;
		height: 1000px;
		margin: -336px auto 0;
	}
	.spaceCont .left{
		float: left;
		width: 300px;
		height: 800px;
	}
	#name{
		width: 300px;
		padding-left: 20px;
		padding-right: 20px;
		height: 122px;
		background: rgb(255, 255, 255);
	}
	#name img{
		margin-top: 20px;
		float: left;
	}
	#nameIntroduction{
		float: left;
		margin-left: 22px;
	}
	#nameIntroduction span:first-child{
		font-size: 16px;
		color: #0098e0;
	}
	#nameIntroduction span:nth-child(2){
		margin-left: 15px;
		font-size: 14px;
		color: #999;
	}
	#nameIntroduction p{
		color: #666;
		font-size: 14px;
		font-weight: 600;
	}
	#resource{
		width: 300px;
		height: 100px;/**/
		background: rgb(255, 255, 255);
		margin-top: 10px;
		border: 1px solid rgb(223, 228, 232);
	}
	#resource #side{
		width: 50%;
		height: 60px;/**/
		border-right: 1px solid #ccc; 
		margin-top: 20px;
		float: left;
		text-align: center;
	}
	#resource #side:last-child{
		border: none;
	}
	#resource #side p:first-child{
		font-size: 24px;	
		color: #3f4449;
	}
	#resource #side p:nth-child(2){
		font-size: 16px;
		color: #3f444a;
	}
	.homework{
		width: 300px;
		height: 80px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		margin-top: 10px;
		padding-left: 20px;
		line-height: 75px;
		color: #3f4449;
		font-size: 16px;
	}
	.homework span{
		margin-left: 20px;
		font-weight: 400;
	}
	.bgImg{
		display: inline-block;
		width: 20px;
		height: 18px;
		background: url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat 0 0;		
		margin-left: 100px;
	}
	.bgImg:hover{
		background-position: 0 -20px;
	}
	#code{
		width: 300px;
		height: 300px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		margin-top: 10px;
		color: #666;
		font-size: 16px;
	}
	#code #title{
		padding: 20px;
		height: 70px;
		width: 300px;
	}
	.bgImgApp{
		float: left;
		width: 30px;
		height: 40px;
		background:url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat -25px 0;
	}
	#code .fonts{
		font-size: 18px;
		float: left;
		margin-top: 7px;
		margin-left: 10px;
	}
	#code img{
		margin-left: 50px;
	}
	.center{
		width: 580px;		
		margin-left: 10px;
		float: left;
	}
	.unfishedList{
		padding-left: 30px;
		padding-right: 30px;
		width: 100%;
		height: 280px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		overflow: hidden;
	}
	.unfishedTitle{
		padding-top: 30px;
		width: 520px;
		height: 70px;
		border-bottom: 1px solid rgb(223, 228, 232);
		text-align: left;
		font-size: 16px;
	}
	.unfishedTitle a{
		display: inline-block;
		width: 100px;
		height: 40px;
		border-bottom: 1px solid rgb(87, 165, 248);
		color: #000000;
	}
	.unfishedList ul li{
		height: 50px;
		line-height: 50px;
		text-align: left;
		font-size: 14px;
		color: #a4a7ac;
		cursor: pointer;
	}
	.unfishedList ul li:hover{
		color: #008fd5;
	}
	.unfishedList ul li.active{
		color: #008fd5;
	}
	.spaceInfo{
		width: 100%;	
		background: rgb(255, 255, 255);
		border: 1px solid rgb(223, 228, 232);
		margin-top: 10px;
		padding: 35px 15px 30px 20px;
	}
	.spaceInfo>div{
		overflow: hidden;		
	}
	.spaceInfo>div p{
		float: left;
		font-size: 16px;
		color: #666;
		margin-right: 45px;
	}
	.ulTitle{
		float: left;
		overflow: hidden;		
	}
	.ulTitle li{
		float: left;
		padding: 2px 10px 20px;	
		margin-right: 20px;	
		text-align: center;
		color: #7b8085;
		font-size: 14px;
		cursor: pointer;
	}
	.ulTitle li.active{
		color: #3f4449;
		border-bottom:1px solid #3f4449;
	}	
	.spaceInfo .spaceList{
		margin-top: 20px;		
	}
	.spaceList>li{
		overflow: hidden;
	}
	.spaceList .headImg{
		float: left;
		width: 40px;
		height: 40px;
		margin-left: 10px;
	}
	.spaceList .headImg img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.spaceList .headImgInfo{
		float: left;
		width: 470px;
		margin-left: 15px;
		margin-bottom: 15px;
		border-bottom: 1px solid #f3f3f3;
	}
	.spaceList .headName{
		width: 100%;
		height: 30px;
	}
	.spaceList .headName a{
		float: left;
		font-size: 14px;
		color: #008fd5;
	}
	.spaceList .headName span{
		float: right;
		font-size: 14px;
		color: #b7bcc1;
	}
	.spaceList .className{
		text-align: left;		
		color: #3d4548;
		font-size: 14px;
	}
	.spaceList .className span{
		color: #999;
	}	
	.comment{		
		overflow: hidden;
		font-size: 14px;
		margin-bottom: 30px;
		margin-top: 15px;
	}
	.comment p{
		float: left;
		margin-right: 45px;
	}
	.comment a{
		color: #7b8085;
	}
	.comment span{
		height: 24px;
		padding-left: 26px;
		margin-right: 5px;
		font-size: 14px;
		color: #7b8085;
		cursor: pointer;
		background: url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat -110px -3px;	
	}
	.comment span.share{
		background-position: -85px -4px;	
	}
	.comment span.review{
		background-position: -55px -5px;	
	}
	.comment span:hover{
		background-position: -110px -26px;
	}
	.comment span.share:hover{
		background-position: -85px -26px;
	}
	.comment span.review:hover{
		background-position: -55px -25px;
	}
	#load-more{
		width: 140px;
		height: 40px;
		border: solid 1px #dfe4e9;
		color: #999;
		font-size: 14px;
		background-color: transparent;
		border-radius: 3px;
		cursor: pointer;
	}
	#load-more:focus{
		outline: none;
	}
	.right{
		float: left;
		width: 298px;
		height: 1000px;
		margin-left: 10px;
	}
	.right .threeBtn{
		width: 100%;
		height: 220px;
		background: #FFFFFF;
		padding: 30px;
	}
	.right .threeBtn button{
		width: 240px;
		height: 40px;
		color: #FFFFFF;
		background: #86c1ff;
		margin-top: 10px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	.right .threeBtn button:hover{
		background: #47a2ff;
	}
	.myView{
		width: 100%;
		padding: 40px 20px 0;
		background: #FFFFFF;
		margin-top: 10px;
		border: solid 1px #dfe4e9;
	}
	.viewTitle{
		font-size: 16px;
		color: #3f4449;
		margin-bottom: 30px;
	}
	.viewTitle span{
		font-size: 14px;
		color: #3F4449;
		float: right;
	}
	.more-focus span{
		margin-top: 5px;
	}
	.total-visitor span{
		margin-top: 5px;
		color: #7b8085;
	}
	.viewCont{
		width: 100%;
		overflow: hidden;
	}
	.viewCont li{
		float: left;
		width: 33%;
		text-align: center;
		margin-bottom: 25px;
	}
	.viewCont li img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.viewCont li p{
		font-size: 14px;
		color: #7b8085;
	}
	.myView>div{
		text-align: center;
		font-size: 14px;
		margin-bottom: 30px;
	}
	
</style>


