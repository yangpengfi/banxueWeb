<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">个人资料</a> 
		</p>
		<form>
			<div class="personCont">
				<img src="../../assets/imgs/space/headImg.png" width="150px;" height="150px;" align="absbottom"/>
				<input type="button" class="up" value="上传头像"/>
				<span class="intro">"图像格式：jpg    png  gif    格式"</span>
			</div>
			<div class="personInfo">
				<p>账号：<span>admin</span></p>
				<p>姓名：<span>书拉密女</span></p>
				<p>个性签名：</p>
				<textarea placeholder="无"></textarea>
				<button type="button" id="update">编辑</button>
			</div>
		</form>
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
	.personCont{
		width: 826px;
		padding-top: 30px;
		margin: auto;
	}
	.up{
		width: 160px;
		height: 40px;
		background: #50a7ff;
		color: #fff;
		border: none;
		outline: none;
		margin-left: 30px;
		margin-right: 30px;
		border-radius: 5px;
		cursor: pointer;
	}
	.intro{
		font-size: 14px;
		color: #999999;
	}
	.personInfo{
		width: 385px;
		height: 360px;
		margin-left: 188px;
		color: #666666;
	}
	.personInfo p{
		margin-top: 38px;
		font-size: 14px;
		color: #666;
	}
	.personInfo p span{
		color: #333;
	}
	.personInfo textarea{
		width: 360px;
		height: 100px;
		padding-top: 5px;
		padding-left: 5px;
		margin-top: 10px;
		border:1px solid #eee;
	}
	#infoDivs{
		width: 350px;
		height: 98px;
		border: 1px solid #e9e9e9; 
		margin-top: 10px;
		color: #999999;
		outline: none;
		padding: 5px;
	}
	#update{
		width: 86px;
		height: 32px;
		background: #47a2ff;
		color: #FFFFFF;
		border: none;
		margin-top: 20px;
		margin-left: 274px;
		cursor: pointer;
	}
	#update:focus{
		outline: none;
	}
</style>

