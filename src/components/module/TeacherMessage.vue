<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">任教信息</a> 
		</p>
		<ul class="teacherMessage">
			<li v-for="item of teachList">
				<p>{{item.class}}</p>
				<p>{{item.book}}</p>
				<div>
					<a href="javascript:void(0);" class="update">编辑</a>
					<a href="javascript:void(0);" class="upLevel">升级</a>
					<a href="javascript:void(0);" class="upLevel">转让班主任</a>
					<a href="javascript:void(0);" class="upLevel">解散</a>
					<a href="javascript:void(0);" class="upLevel">退出</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name:'TeacherMessage',
	data(){
		return{
			teachList:[
				{id:1,class:'深圳市育才一中   2016级  初二10班',book:'语文（人教版'},
				{id:2,class:'深圳市育才一中   2016级  初二10班',book:'语文（人教版'},
				{id:3,class:'深圳市育才一中   2016级  初二10班',book:'语文（人教版'},
				{id:4,class:'深圳市育才一中   2016级  初二10班',book:'语文（人教版'}
			]
		}
	}
}
</script>

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
	.teacherMessage li:first-child{
		margin-top: 40px;
	}
	.teacherMessage li{
		position: relative;
		height: 80px;
		padding: 20px 40px 20px 20px;
		color: #666;
		font-size: 14px;
		border: 1px solid #e9e9e9;
		margin-top: 20px;
	}
	.teacherMessage li p{
		line-height: 24px;
	}
	.teacherMessage a{
		color: #1EABF3;
		padding-left: 10px;
		padding-right: 10px;
		float: right;
		text-decoration: none;
	}
	.teacherMessage div{
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
</style>
	
