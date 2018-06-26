<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">申请成为认证老师</a> 
		</p>
		<p class="cont">
		何为认证老师？认证老师是经过平台认证的老师用户。 <br>
		老师可上传相关资质证明、教师简介后提交系统后台认证。<br>
		认证老师上传的资源可以获得特别推荐，认证老师可以创建课程视频。<br>
		</p>
		<div class="teacherInfo">
			<div>
				<span>教师教龄：</span> 
				<input class="age" type="number" v-model="teacherInfo.teachAge" placeholder="请输入教龄" min="0" max="60" oninput="if(value.length>2)value=value.slice(0,2);if(value>60)value=60;if(!/^[0-9]\d*$/.test(value))value=''" v-if="teacherInfo.authStatus==0 || teacherInfo.authStatus==2">
				<span v-else>{{teacherInfo.teachAge}}年</span>
			</div>
			<div>
				<span>级别证书：</span> 
			    <input type="file" @change="uploading1($event)" accept="image/*" id="fileIpt1">
				<label for="fileIpt1" v-if="teacherInfo.authStatus==0|| teacherInfo.authStatus==2">
					<img :src="fileUrl1">
				</label>
				<label v-else>
					<img :src="fileUrl1">
				</label>
			    <input type="file" @change="uploading2($event)" accept="image/*" id="fileIpt2">
				<label for="fileIpt2" v-if="teacherInfo.authStatus==0|| teacherInfo.authStatus==2">
					<img :src="fileUrl2">
				</label>
				<label v-else>
					<img :src="fileUrl2">
				</label>
			</div>
			<div>
				<span>教师简介：</span>
				<textarea placeholder="无" v-model="teacherInfo.introduce" v-if="teacherInfo.authStatus==0 || teacherInfo.authStatus==2" maxlength="1000" title="不超过1000字"></textarea>
				<p v-else>{{teacherInfo.introduce}}</p>
			</div>	
			<p v-show="teacherInfo.authStatus==1" style="color:#19be6b;margin:15px 80px;">申请中...</p>		
			<button type="button" id="be-teacher" 
			@click="submit($event)" 
			v-show="teacherInfo.authStatus==0 || teacherInfo.authStatus==2">申请成为认证教师</button>
		</div>
	</div>
</template>
<script>
import global_ from '@/components/Global';
export default {
  	name:'ArticalInfo',
    data () {
        return {
            token:this.$storage.getStorage("token") ,
        	teacherInfo:{},
        	file1: {},
        	fileUrl1: require('../../assets/imgs/space/addImg.png'),
        	file2: {},
        	fileUrl2:  require('../../assets/imgs/space/addImg.png'),
        }
	},
	methods:{
		getTeacherInfo(){
			this.$http.post('/web/user/a/teacherInfo.do',this.$qs.stringify({
              token:this.token
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status == 0){
              	  this.teacherInfo = result.data;
              	  
              	  
              	  if(!result.data.certificatePath1 && !result.data.certificatePath2){
              	  	this.uploadList=[];
              	  }else if(result.data.certificatePath1 && !result.data.certificatePath2){
              	  	this.fileUrl1=result.data.certificatePath1;
              	  }else{
              	  	this.fileUrl1=result.data.certificatePath1;
              	  	this.fileUrl2=result.data.certificatePath2;
              	  }
              }else{ 
                this.$Message.error(result.message);      
              }
            }) 
		}, 
        uploading1(event){
        	let that=this;
	        this.file1 = event.target.files[0];
	        var fr = new FileReader();
	        fr.onload = function() {
	        	that.fileUrl1=this.result
	        };
	        fr.readAsDataURL(this.file1);

        },
        uploading2(event){
        	let that=this;
	        this.file2 = event.target.files[0];
	        var fr = new FileReader();
	        fr.onload = function() {
	        	that.fileUrl2=this.result	
	        };
	        fr.readAsDataURL(this.file2);

        },
        submit(event){
        	event.preventDefault();//取消默认行为
        	console.log(this.file1.name)
        	console.log(this.file2.name)
        	console.log(this.fileUrl1.indexOf('http'))
        	console.log(this.fileUrl2.indexOf('http'))
  			let formdata = new FormData();

        	if(!this.teacherInfo.teachAge){
        		this.$Message.warning({
                    content: '请输入教龄！',
                    duration: 2
                });
                return;
        	}else if(!this.file1.name&&!this.file2.name&&this.fileUrl1.indexOf('http')=='-1'&&this.fileUrl2.indexOf('http')=='-1'){
        		this.$Message.warning({
                    content: '请选择图片！',
                    duration: 2
                });
                return;
        	}else if(!this.teacherInfo.introduce){
        		this.$Message.warning({
                    content: '请输入教师简介！',
                    duration: 2
                });
                return;
        	}
        		if(this.file1.name){
        		   formdata.append('fileOne', this.file1);
        	    }
	        	if(this.file2.name){
					formdata.append('fileTwo', this.file2);
	        	}
				formdata.append('token', this.token);
				formdata.append('teachAge', this.teacherInfo.teachAge);
				formdata.append('introduce', this.teacherInfo.introduce);
        	this.$http.post('/web/user/a/applyAuthTeacher.do',formdata,
	    		{
					headers: {
					    'Content-Type': 'multipart/form-data'
					}
				})
            .then((res)=>{
              let result = res.data;
              if(result.status == 0){
          	  	this.$Message.success(result.message);
          	  	this.getTeacherInfo();
              }else{ 
                this.$Message.error(result.message);      
              }
            }) 
        }
	},
	created(){
		this.getTeacherInfo();
	},
    mounted () {

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
	.cont{
		margin-top: 20px;
		line-height: 28px;
		color: #666;
		font-size: 14px;
		/*text-indent: 30px;*/
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
		padding-left: 15px;
		border:1px solid #dddee1;
	}
	.uploadList{
		width: 106px;
		height: 92px;
        text-align: center;
        line-height: 92px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 10px;
	}
	#fileIpt1,#fileIpt2{
		display: none;
	}
	label{
		display: inline-block;
		width: 106px;
		height: 92px;
        text-align: center;
        line-height: 92px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
	}
	label img{
		width: 100%;
        height: 100%;
	}
	.teacherInfo>div textarea{
		width: 360px;
		height: 80px;
		padding-top: 5px;
		padding-left: 10px;
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
	
	
