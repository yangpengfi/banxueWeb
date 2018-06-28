<template>
  <div>
	<div class="w-1200 pageContent">
		<p>
			<span><i style="color:red;">*</i> 用户姓名：</span>
			<input v-model="userName" placeholder="用户姓名" maxlength="15" title="长度不超过15位"/>
        </p>
		<p>
			<span><i style="color:red;">*</i> 手机号码：</span>
			<input v-model="mobile" 
			placeholder="请输入手机号" 
            maxlength="11" 
            title="长度不超过11位"/>
        </p>
		<p>
			<span>联系邮箱：</span>
			<input v-model="email" placeholder="联系邮箱" maxlength="50" title="长度不超过50位"/>
        </p>
		<p>
			<router-link to="/OpenSchool" class="myBtnD">上一步</router-link>
			<a href="javascript:void(0);" @click="openSchool" class="myBtn">提交</a>
        </p>
  	</div>
  </div>
</template>

<script>
  export default {
  	data(){
  		return {
			userName:'',
			mobile:'',
			email:'',
			datas:this.$storage.getSession('commitData')
  		}
  	},
  	methods:{
        toIndex(){
            this.$router.push({
                path:'/'
            });
        },
        openSchool(){
        	let telReg=/^1[0-9]{10}$/;
            if(!this.userName){
                this.$Message.warning({
                    content: '请输入真实姓名！',
                    duration: 2
                });
                return;
            }else if(!this.mobile){
                this.$Message.warning({
                    content: '手机号码不能为空！',
                    duration: 2
                });
                return;
            }else if(!telReg.test(this.mobile)){
                this.$Message.warning({
                    content: '请输入正确的手机号码！',
                    duration: 2
                });
                return;
            }
            this.$http.post('/web/openSmartCampus/a/apply.do',this.$qs.stringify({
                skey:new Date().getTime(),
                token:this.$storage.getStorage("token"),
                schoolName:this.datas.name,
                shortName:this.datas.shortName,
                provinceCode:this.datas.provinceId,
                cityCode:this.datas.cityId,
                areaCode:this.datas.areaId,
                period:this.datas.periodId,
                userName:this.userName,
                mobile:this.mobile,
                email:this.email
            }))
            .then((res)=>{
            if(res.data.status==0){
                this.$Message.warning({
                    content: '开通成功，3秒后将跳转至首页面！',
                    duration: 2
                });
                setTimeout(()=>{
                    this.toIndex();
                }, 3000);
            }else{
               this.$Message.error({
                    content: res.data.message,
                    duration: 2
                }); 
            }
            })
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
.pageContent>p>input{
	display: inline-block;
    width: 480px;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
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