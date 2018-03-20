<template>
	<div class="content">
		
		<div class="right">
			<ul class="ulList">
				<li class="active"><a href="#" class="active">老师</a></li>
				<li><a href="#">学生</a></li>
			</ul>
			<div class="rightCont">
				<ul>
					<li>
						<img src="../../assets/imgs/space/headImg.png" />
						<br />
						<p>帅帅斌</p>
						<br />
						<button class="out">取消关注</button>
					</li>
					<li>
						<img src="../../assets/imgs/space/headImg.png" />
						<br />
						<p>帅帅斌</p>
						<br />
						<button class="out">取消关注</button>
					</li>
					<li>
						<img src="../../assets/imgs/space/headImg.png" />
						<br />
						<p>帅帅斌</p>
						<br />
						<button class="out">取消关注</button>
					</li>
					<li>
						<img src="../../assets/imgs/space/headImg.png" />
						<br />
						<p>帅帅斌</p>
						<br />
						<button class="out">取消关注</button>
					</li>
				</ul>
			</div>
		</div>
		
		
	</div>
	
	
	
	
</template>

<style scoped>
	.content{
		width: 1200px;
		height: 1000px;/**/
		margin: auto;
	}
	.right{
		float: left;
		width: 950px;
		border: 1px solid #CCCCCC;
		margin-left: 40px;
		padding: 50px;
		background: #FFFFFF;
	}
	.right ul.ulList{
		height: 50px;
		border-bottom: 1px solid #CCCCCC;
	}
	.right ul li{
		float: left;
		width: 100px;
	}
	.right ul li a{
		font-size: 18px;
		color: #000000;
	}
	.right ul li a.active{
		color: #008FD5;
	}
	.rightCont{
		padding: 20px;
		width: 800px;
		height: 700px;
		margin: auto
	}
	.rightCont ul li{
		width: 189px;
		height: 200px;
		float: left;
	}
	.rightCont ul li img{
		border-radius: 50%;
		margin-left: 50px;
	}
	.rightCont ul li p{
		margin-top: 20px;
		font-size: 18px;
		text-align: center;
		color: #ADADAD;
	}
	.rightCont ul li .out{
		width: 120px;
		height: 40px;
		border: 1px solid #ADADAD;
		background: #FFFFFF; 
		margin-left: 30px;
		color: #ADADAD;
		border-radius: 5px;
	}
</style>

