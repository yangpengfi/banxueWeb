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
						<br />
						<span>深圳市华侨中学</span>
					</div>
				</div>
				
				<div id="resource">
					<div id="side">
						<p>10</p>
						<p>资源</p>
					</div>
					<div id="side">
						<p>10</p>
						<p>学习成果</p>
					</div>
				</div>
				
				<div class="homework">
					<img src="../../assets/imgs/space/class.jpg" alt="头像" align="absmiddle"/>
					<span>高三一班</span>
					<a class="bgImg"></a>
				</div>
				
				<div class="homework">
					<img src="../../assets/imgs/space/class.jpg" alt="头像" align="absmiddle"/>
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
					<ul>
						<li>
							<a href="#">
								张老师复制了作业，请于9:30之前完成
							</a> 
						</li>
						<li>
							<a href="#">
								张老师复制了作业，请于9:30之前完成
							</a> 
						</li>
						<li>
							<a href="#" class="active">
								张老师复制了作业，请于9:30之前完成
							</a> 
						</li>
						<li>
							<a href="#">
								张老师复制了作业，请于9:30之前完成
							</a> 
						</li>
					</ul>
				</div>
				
				
				<div class="spaceInfo">
					<ul class="ulTitle">
						<li><a hhref="#" class="active">空间动态</a></li>
						<li><a hhref="#">全部</a></li>
						<li><a hhref="#">班级</a></li>
						<li><a hhref="#">好友</a></li>
						<li><a hhref="#">与我相关</a></li>
					</ul>
					<div style="clear: both;"></div>
					
					<ul class="spaceList">
						<li>
							<div class="headImg">
								<img src="../../assets/imgs/space/headImg.png" />
							</div>
							<div class="headImgInfo">
								<p class="headName">
									<a href="#">超级帅斌斌</a>
									<span>2018-01-19 1:20:00</span>
								</p>
								<p class="className">
									<span>上传了</span>&nbsp;《前端开发-从入门到放弃.doc》
								</p>
								<div style="clear: both;"></div>
								<p class="comment">
									<a>
										赞一个
									</a>
									<a>分享</a>
									<a>分享</a>
								</p>
								
							</div>
							
							
						</li>
					</ul>
					<div style="clear: both;"></div>
					
					
				</div>
			
			</div>
			
			
			
			<div class="right">
				<div class="threeBtn">
					<button>上传资源</button>
					<button>上传资源</button>
					<button>上传资源</button>
				</div>
				
				<div class="myView">
					<p class="viewTitle">
						我的关注
						<a href="#">更多</a>
					</p>
					<ul class="viewCont">
						<li class="marginTop">
							<ul class="row">
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
							</ul>
						</li>
						<li class="marginTop">
							<ul class="row">
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
							</ul>
						</li>
					</ul>
					
					
				</div>
				
				<div class="myView">
					<p class="viewTitle">
						我的关注
						<a href="#">更多</a>
					</p>
					<ul class="viewCont">
						<li class="marginTop">
							<ul class="row">
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
							</ul>
						</li>
						<li class="marginTop">
							<ul class="row">
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
								<li>
									<img src="../../assets/imgs/space/headImg.png" />
									<br />
									帅帅斌
								</li>
							</ul>
						</li>
					</ul>
					
					
				</div>
				
			</div>
			
			
			
			
		</div>
	</div>
	
	
</template>
<style scoped>

	

	*{
		font-family: MicrosoftYaHeiLight;
	}
	#spaceIndex{
		width: 100%;
		height: 2000px;/**/
	}
	.bgColor{
		width: 100%;
		height: 370px;
		background: rgb(78, 167, 255);
	}
	.spaceCont{
		width: 1200px;
		height: 1000px;/**/
		margin: -336px auto 0;
	}
	.spaceCont .left{
		float: left;
		width: 300px;
		height: 800px;/**/
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
	#name #nameIntroduction{
		float: left;
		margin-left: 22px;
		margin-top: 33px;
	}
	#name #nameIntroduction span:first-child{
		font-size: 16px;
		color: #5aaaff;
		font-weight: bolder;
	}
	#name #nameIntroduction span:nth-child(2){
		margin-left: 15px;
		font-size: 14px;
		color: #a9a9a9;
	}
	#name #nameIntroduction span:last-child{
		color: #666666;
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
		font-weight: 500;
		color: #404549;
	}
	#resource #side p:nth-child(2){
		font-size: 18px;
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
	}
	.homework span{
		font-size: 18px;
		margin-left: 20px;
		font-weight: 400;
	}
	.bgImg{
		display: inline-block;
		width: 20px;
		height: 15px;
		background: url(../../assets/imgs/space/TeacherZoneIcon.png);
		background-position: 0 0;
		margin-left: 100px;
	}
	#code{
		width: 300px;
		height: 300px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		margin-top: 10px;
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
		background: url(../../assets/imgs/space/TeacherZoneIcon.png) -25px 0;
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
		height: 1000px;/**/
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
	}
	.unfishedList ul li a{
		color: #a4a7ac;
	}
	.unfishedList ul li a.active{
		color: rgb(87, 165, 248);
	}
	
	.spaceInfo{
		width: 100%;
		height: 875px;
		background: rgb(255, 255, 255);
		border: 1px solid rgb(223, 228, 232);
		margin-top: 10px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.spaceInfo .ulTitle{
		padding-left: 10px;
		padding-top: 20px;
	}
	.spaceInfo .ulTitle li{
		float: left;
		width: 80px;
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	.spaceInfo .ulTitle li a{
		color: #7a8187;
		font-size: 14px;
	}
	.spaceInfo .ulTitle li a.active{
		color: #656565;
	}
	.spaceInfo .spaceList{
		margin-top: 20px;
		height: 140px;
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
		height: 140px;
		border-bottom: 1px solid rgb(223, 228, 232);
	}
	.spaceList .headName{
		width: 100%;
		height: 30px;
	}
	.spaceList .headName a{
		float: left;
		font-size: 16px;
		color: #5aaaff;
	}
	.spaceList .headName span{
		float: right;
		font-size: 16px;
		color: #c3c6cb;
	}
	.spaceList .className{
		float: left;
		color: #3d4548;
	}
	.spaceList .className span{
		color: #999999;
	}
	.spaceList .comment{
		width: 100%;
		height: 40px;
		margin-top: 30px;
	}
	.comment a{
		color: #A4A7AC;
	}
	.comment a:first-child{
		float: left;
	}
	.comment a:last-child{
		float: right;
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
		background: #186DC2;
		margin-top: 10px;
		font-size: 16px;
		border: none;
	}
	.myView{
		width: 100%;
		padding: 20px;
		padding-top: 50px;
		height: 500px;
		background: #FFFFFF;
		margin-top: 10px;
	}
	.viewTitle{
		font-size: 16px;
	}
	.viewTitle a{
		font-size: 14px;
		color: #3F4449;
		float: right;
	}
	.row li{
		float: left;
		margin-left: 25px;
	}
	.row li img{
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	.viewCont{
		padding-top:30px;
		padding-left: 20px;
	}
	
</style>


