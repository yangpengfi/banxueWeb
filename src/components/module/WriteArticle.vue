<template>
	<div class="mainContainer">
		<div class="right">
			<p class="title">
				<a href="#">写文章</a> 
			</p>
			
			<form class="articleForm">
				<p>
					文章标题：
					<input type="text" class="titleTxt"/>
				</p>
				<p>
					&nbsp;&nbsp;&nbsp;文标题：
					
				</p>
				<p>
					文章分类：
					<select class="articleTyep">
						<option>1</option>
						<option>1</option>
						<option>1</option>
						<option>1</option>
						<option>1</option>
						<option>1</option>
					</select>
				</p>
				<p class="authorityP">
					设置权限：
					<input type="radio" name="authority" /><label>仅自己可见</label>
					<input type="radio" name="authority"  id="public"/><label>公开</label>
				</p>
				
				<input type="submit" value="发表" class="btn setUp"/>
				<input type="submit" value="取消" class="btn cancle"/>
				
			</form>
		</div>		
	</div>
</template>
<script>
export default {
  name:'WriteArticle'
}
</script>

<style scoped>
	.mainContainer{
		width: 1200px;
		margin: auto;
		margin-top: 40px;
	}
	.right{
		width: 1080px;
		padding: 40px 60px 40px 60px;
		height: 559px;
		border: 1px solid #e9e9e9;
		margin: auto;
		float: left;
	}
	.right .title{
		font-size: 20px;
		color: #666666;
		border-bottom: 1px solid #e9e9e9; 
	}
	.right .title a{
		display: inline-block;
		text-decoration: none;
		font-size: 20px;
		color: #666666;
		padding-bottom: 20px;
	}
	.articleForm{
		padding-left: 45px;
		font-size: 14px;
		color: #666666;
		margin-top: 30px;
	}
	.articleForm .titleTxt{
		width: 350px;
		height: 30px;
		border: 1px solid #e9e9e9;
		padding: 5px;
		outline: none;
	}
	.articleForm p{
		margin-top: 20px;
	}
	.articleTyep{
		width: 360px;
		height: 40px;
		border: 1px solid #e9e9e9;
		outline: none;
		color: #666666;
	}
	.authorityP{
		margin-top: 20px;
	}
	.authorityP label{
		margin-left: 20px;
	}
	.authorityP input#public{
		margin-left: 40px;
	}
	.btn{
		width: 160px;
		height: 40px;
		color: #FFFFFF;
		background: #50a7ff;
		border: none;
		margin-top: 40px;
		font-size: 16px;
		border-radius: 5px;
	}
	.setUp{
		margin-left: 20px;
	}
	.cancle{
		margin-left: 30px;
		background: #cbcbcb;
	}
</style>
	


