<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">申请成为认证老师</a> 
		</p>
		<p class="cont">教师资格证是教育行业从业教师的许可证。在我国，师范类大学毕业生须在学期期末考试中通过学校开设的教育学和教育心理学课程考试，并且要在全省统一组织的普通话考试中成绩达到二级乙等（中文专业为二级甲等）以上，方可在毕业时领取教师资格证。非师范类和其他社会人员需要在社会上参加认证考试等一系列测试后才能申请教师资格证。</p>
		<div class="teacherInfo">
			<div>
				<span>教师教龄：</span> 
				<input type="text" class="age"/>
			</div>
			<div>
				<span>级别证书：</span> 
				<Upload
					multiple
					type="drag"
					action="//jsonplaceholder.typicode.com/posts/">
					<div style="padding: 20px 40px">
						<Icon type="ios-plus-empty" size="52" style="color: #dddee1"></Icon>
						<p>点击或者拖拽上传</p>
					</div>
				</Upload>
				<Upload
					multiple
					type="drag"
					action="//jsonplaceholder.typicode.com/posts/">
					<div style="padding: 20px 40px">
						<Icon type="ios-plus-empty" size="52" style="color: #dddee1"></Icon>
						<p>点击或者拖拽上传</p>
					</div>
				</Upload>
			</div>
			<div>
				<span>教师简介：</span>
				<textarea placeholder="无"></textarea>
			</div>			
			<button type="button" id="be-teacher">申请成为认证教师</button>
		</div>
	</div>
</template>
<style scoped>
	.right-container{
        float: left;
		width: 940px;
        min-height: 560px;
		margin-left: 20px;
        padding: 40px 60px 40px 60px;
        border: 1px solid #e9e9e9;
        background-color: #fff;
	}
	.right-container .title{
		border-bottom: 1px solid #e9e9e9; 
	}
	.right-container .title a{
		display: inline-block;
		text-decoration: none;
		font-size: 20px;
		color: #666666;
		padding-bottom: 20px;
		border-bottom: 1px solid #000; 
	}	
	.cont{
		margin-top: 20px;
		line-height: 28px;
		color: #666;
		font-size: 14px;
		text-indent: 30px;
	}
	.teacherInfo{
		font-size: 14px;
		color: #666;
		margin-top: 40px;
	}
	.teacherInfo>div{
		margin-bottom: 20px;
		overflow: hidden;
	}
	.teacherInfo>div span{
		float: left;
		width: 80px;
	}
	.teacherInfo>div div{
		float: left;
	}
	.age{
		width: 360px;
		height: 40px;
		border:1px solid #dddee1;
	}
	.teacherInfo>div textarea{
		width: 360px;
		height: 80px;
		padding-top: 5px;
		padding-left: 5px;
		border:1px solid #dddee1;
	}
	.ivu-upload{
		margin-right: 40px;
	}
	#be-teacher{
		width: 160px;
		height: 40px;
		background: #50a7ff;
		color: #fff;
		border: none;
		outline: none;
		margin-left: 80px;
		border-radius: 5px;
	}
</style>
	
	
