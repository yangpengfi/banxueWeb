<template>
	<div class="content">
		<div class="right">
			<ul class="manager">
				<li><button class="active">写日志</button></li>
				<li><button>批量管理</button></li>
			</ul>
			<div style="clear: both;"></div>
			<ul class="ulListCont">
				<li>
					<a href="#" class="contLink">好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上</a>
					<span class="time">2017-03-12</span>
					<span class="pages">3/8</span>
					<a href="#" class="update">编辑</a>
				</li>
				<li>
					<a href="#" class="contLink">好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上</a>
					<span class="time">2017-03-12</span>
					<span class="pages">3/8</span>
					<a href="#" class="update">编辑</a>
				</li><li>
					<a href="#" class="contLink">好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上</a>
					<span class="time">2017-03-12</span>
					<span class="pages">3/8</span>
					<a href="#" class="update">编辑</a>
				</li>
			</ul>
			
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
	.right .manager li{
		float: left;
	}
	.right .manager button{
		display: inline-block;
		width: 100px;
		height: 40px;
		background: #008FD5;
		color: #FFFFFF;
		border: none;
		outline: none;
		border-radius: 5px;
	}
	.right .manager button:first-child{
		margin-right: 20px;
	}
	.ulListCont{
		margin-top: 30px;
	}
	.ulListCont li{
		height: 80px;
		line-height: 80px;
		position: relative;
		border-bottom: 1px solid #f5f5f5;
	}
	.ulListCont li a.contLink{
		color: #747474;
		
	}
	.time{
		position: absolute;
		top: 0;
		right: 120px;
	}
	.pages{
		position: absolute;
		top: 0;
		right: 80px;
	}
	.update{
		position: absolute;
		top: 0;
		right: 10px;
	}
</style>

