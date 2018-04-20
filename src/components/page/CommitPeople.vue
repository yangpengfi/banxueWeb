<template>
  <div>
	<div class="w-1200 pageContent">
		<p>
			<span>用户姓名：</span>
			<Input v-model="name" placeholder="用户姓名" style="width: 480px"></Input>
        </p>
		<p>
			<span>手机号码：</span>
			<Input v-model="mobile" placeholder="手机号码" style="width: 480px"></Input>
        </p>
		<p>
			<span>联系邮箱：</span>
			<Input v-model="email" placeholder="联系邮箱" style="width: 480px"></Input>
        </p>
		<p>
			<router-link to="/OpenSchool" class="myBtnD">上一步</router-link>
			<router-link to="/CommitPeople" class="myBtn">提交</router-link>
        </p>
  	</div>
  </div>
</template>

<script>
  export default {
  	data(){
  		return {
			name:'',
			mobile:'',
			email:''
  		}
  	}
  }
</script>

<style scoped>
.pageContent{
	margin-top: 40px;
	margin-bottom: 150px;
	padding:100px 70px 120px 260px; 
	border:1px solid #eee;
	background-color: #fff;
}
.pageContent>p{
	line-height: 40px;
	font-size: 16px;
	margin-bottom: 50px;
}
.pageContent>p>span{
	display: inline-block;
	width: 150px;
	text-align: right;
}
.myBtnD{
	display: inline-block;
	width: 160px;
	height: 40px;
	margin-left: 150px;
	text-align: center;
	color:#fff;
	background-color: #999;
	border-radius: 5px;
}
.myBtn{
	display: inline-block;
	width: 160px;
	height: 40px;
	margin-left: 20px;
	text-align: center;
	color:#fff;
	background-color: #0098e0;
	border-radius: 5px;
}
</style>