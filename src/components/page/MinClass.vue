<template>
	<div class="content">
		
		
		<div class="right">
			<div class="classCont">
				<p>
					好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好
					学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上
					好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好
					学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上。
				</p>
				<button class="create">创建微课程</button>
				
				<ul class="classList">
					<li>
						<ul class="row">
							<li>
								<div class="classImg">
									<img src="../../assets/imgs/space/headImg.png" width="140px;" height="140px"/>
									<p><a href="#" class="select">查看</a></p>
								</div>
								<div class="classTitle">
									<p>备战高考</p>
									<p>高三8节</p>
									<p>价格：<span>99.00</span></p>
								</div>
								
								
								
							</li>
							<li>
								<div class="classImg">
									<img src="../../assets/imgs/space/headImg.png" width="140px;" height="140px"/>
									<p><a href="#" class="select">查看</a></p>
								</div>
								<div class="classTitle">
									<p>备战高考</p>
									<p>高三8节</p>
									<p>价格：<span>99.00</span></p>
								</div>
								
								
								
							</li>
						</ul>
					</li>
					<li>
						<ul class="row">
							<li>
								<div class="classImg">
									<img src="../../assets/imgs/space/headImg.png" width="140px;" height="140px"/>
									<p><a href="#" class="select">查看</a></p>
								</div>
								<div class="classTitle">
									<p>备战高考</p>
									<p>高三8节</p>
									<p>价格：<span>99.00</span></p>
								</div>
								
								
								
							</li>
							<li>
								<div class="classImg">
									<img src="../../assets/imgs/space/headImg.png" width="140px;" height="140px"/>
									<p><a href="#" class="select">查看</a></p>
								</div>
								<div class="classTitle">
									<p>备战高考</p>
									<p>高三8节</p>
									<p>价格：<span>99.00</span></p>
								</div>
								
								
								
							</li>
						</ul>
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
	.classCont p{
		text-indent: 2rem;
	}
	.create{
		width: 120px;
		height: 40px;
		margin-top: 20px;
		background: #186DC2;
		color: #FFFFFF;
		line-height: 20px;
		border: none;
		border-radius: 5px;
	}
	.classList{
		margin-top: 30px;
	}
	.row li{
		float: left;
		width: 50%;
		height: 200px;
	}
	.classImg{
		width: 140px;
		height: 200px;
		float: left;
	}
	.select{
		color: #232829;
		margin-left: 20px;
		font-size: 16px;
	}
	.classTitle{
		float: left;
		margin-left: 5px;
	}
	.classTitle p:first-child{
		font-size: 14px;
		margin-top: 20px;
	}
	.classTitle p:nth-child(2){
		font-size: 14px;
		color: #C3C6CB;
	}
	.classTitle p:last-child{
		margin-top: 30px;
	}
	.classTitle p:last-child span{
		color: red;
		font-size: 16px;
		
	}
</style>