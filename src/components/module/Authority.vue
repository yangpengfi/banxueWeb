<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">访问权限</a> 
		</p>
		<div class="boderImg">
			<img src="../../assets/imgs/space/headImg.png"/>
		</div>
		<p class="authority">设置谁可以访问我的空间</p>
			
		<p class="authorityInput">
			<input type="radio" name="authority" value="0" checked="checked"/><label>所有人可见</label>
			<input type="radio" name="authority" value="1" /><label>通讯录可见</label>
			<input type="radio" name="authority" value="2" /><label>仅自己可见</label>
		</p>
	</div>
</template>
<style scoped>
	.right-container{
        float: left;
		width: 940px;
        min-height: 560px;
		margin-left: 20px;
        padding: 40px 60px 40px 60px;
		background-color: #fff;
        border: 1px solid #e9e9e9;
	}
	.right-container .title{
		border-bottom: 1px solid #e9e9e9; 
	}
	.right-container .title a{
		display: inline-block;
		font-size: 20px;
		color: #666;
		padding-bottom: 20px;
		border-bottom: 1px solid #333; 
	}
	.boderImg img{
		width: 350px;
		height: 230px;
		border: 1px solid #e9e9e9;
		margin-top: 40px;
		padding: 2px;
	}
	.authority{
		font-size: 14px;
		color: #999;
		margin-top: 14px;
	}
	.authorityInput{
		font-size: 14px;
		color: #333;
	}
	.authorityInput label{
		margin-left: 20px;
	}
	.authorityInput input:first-child{
		margin-left: 0px;
	}
	.authorityInput input{
		margin-top: 50px;
		margin-left: 100px;
	}
</style>
