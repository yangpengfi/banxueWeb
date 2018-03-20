<template>
	<div class="content">
		
		
		<div class="right">
			<ul class="resource">
				<li>
					<select class="select">
						<option>全部学科</option>
					</select>
				</li>
				<li class="search">
					<input placeholder="请输入资源名称" class="txt"/>
					<button>搜索</button>
				</li>
			</ul>
			<div style="clear: both;"></div>
			
			<div class="resourceCont">
				<ul>
					<li>
						<div class="docType">
							<img src="../../assets/imgs/space/headImg.png" />
						</div>
						<div class="docCont">
							<p>
								前端从入门到放弃.doc
								<span class="upTime">上传时间：2019-01-01</span>
							</p>
							<p class="types">
								<span>初中</span>
								<span>初中</span>
								<span>初中</span>
								<span>初中</span>
							</p>
						</div>
						
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
	.resource{
		margin-left: 400px;
	}
	.resource li{
		float: left;
	}
	.select{
		width: 100px;
		height: 40px;
		color: #ADADAD;
		border: 1px solid #F5F5F5;
	}
	.search{
		margin-left: 10px;
		position: relative;
	}
	.search .txt{
		width: 200px;
		height: 40px;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #F5F5F5;
		
	}
	.search button{
		width: 100px;
		height: 40px;
		background: #008FD5;
		border: none;
		outline: none;
		position: absolute;
		top: 0;
		right: -90px;
		font-size: 16px;
		color: #fff;
		border-radius: 0 5px 5px 0;
	}
	.resourceCont{
		width: 850px;
		height: 600px;
		margin: auto;
		border: 1px solid #F5F5F5;
		margin-top: 30px;
	}
	.resourceCont ul li{
		width: 100%;
		padding-left: 30px;
		height: 150px;
		border-bottom: 1px solid #F5F5F5;
	}
	.resourceCont ul li .docType{
		float: left;
		padding-top: 35px;
	}
	.resourceCont ul li .docCont{
		float: left;
		margin-left: 30px;
		padding-top: 20px;
		font-size: 16px;
	}
	.resourceCont ul li .upTime{
		color: #ADADAD;
		font-size: 14px;
		margin-left: 370px;
	}
	.types{
		margin-top: 20px;
		font-size: 14px;
		color: #ADADAD;
	}
</style>