<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">申请成为认证老师</a> 
		</p>
		<p class="cont">教师资格证是教育行业从业教师的许可证。在我国，师范类大学毕业生须在学期期末考试中通过学校开设的教育学和教育心理学课程考试，并且要在全省统一组织的普通话考试中成绩达到二级乙等（中文专业为二级甲等）以上，方可在毕业时领取教师资格证。非师范类和其他社会人员需要在社会上参加认证考试等一系列测试后才能申请教师资格证。</p>
		<div class="teacherInfo">
			<div>
				<span>教师教龄：</span> 
				<input class="age" type="number" v-model="teacherInfo.teachAge" placeholder="请输入教龄" min="0" max="60" oninput="if(value.length>2)value=value.slice(0,2);if(value>60)value=60;if(!/^[0-9]\d*$/.test(value))value=''" v-if="teacherInfo.authStatus==0 || teacherInfo.authStatus==2">
				<span v-else>{{teacherInfo.teachAge}}年</span>
			</div>
			<div>
				<span>级别证书：</span> 
				<div class="uploadList" v-for="item in uploadList">
		            <img :src="item.url">
			    </div>
			    <input type="file" @change="uploading($event)" accept="image/*" id="fileIpt">
				<label for="fileIpt" style="padding: 15px 0" v-if="teacherInfo.authStatus==0 || teacherInfo.authStatus==2">
					<Icon type="ios-plus-empty" size="52" style="color: #dddee1"></Icon>
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
        	defaultList: [],
            uploadList: []
        }
	},
	methods:{
		getTeacherInfo(){
			this.$http.post('/web/user/a/teacherInfo.do',this.$qs.stringify({
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  this.teacherInfo = result.data;
              	  if(!result.data.certificatePath1 && !result.data.certificatePath2){
              	  	this.uploadList=[];
              	  }else if(result.data.certificatePath1 && !result.data.certificatePath2){
              	  	this.uploadList=[
              	  		{
		                    'name': '教师级别证书',
		                    'url': result.data.certificatePath1
		                }
              	  	];	
              	  }else{
              	  	this.uploadList=[
              	  		{
		                    'name': '教师级别证书',
		                    'url': result.data.certificatePath1
		                },
		                {
		                    'name': '教师级别证书',
		                    'url': result.data.certificatePath2
		                }
              	  	];
              	  }
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		}, 
        uploading(event){
        	let that=this;
	        var obj = event.target.files[0];
	        if(this.defaultList.length>1){
	        	this.defaultList.shift();
	        	this.defaultList.push(obj)
	        }else{
        		this.defaultList.push(obj)
	        }
	        var fr = new FileReader();
	        fr.onload = function() {
	        	if(that.uploadList.length>1){
	        		that.uploadList.shift();
	        		that.uploadList.push({
						'name': '教师级别证书',
						'url':this.result
					})
	        	}else{
	        		that.uploadList.push({
						'name': '教师级别证书',
						'url':this.result
					})
				}	
	        };
	        fr.readAsDataURL(obj);

        },
        submit(){
        	event.preventDefault();//取消默认行为
  			let formdata = new FormData();

        	if(!this.teacherInfo.teachAge){
        		this.$Message.warning({
                    content: '请输入教龄！',
                    duration: 2
                });
                return;
        	}else if(this.defaultList.length==0){
        		this.$Message.warning({
                    content: '请至少选择一张图片！',
                    duration: 2
                });
                return;
        	}else if(this.defaultList.length==1){
        		formdata.append('imgs', this.defaultList[0]);
        	}else if(this.defaultList.length==2){
        		formdata.append('imgs', this.defaultList[0]);
				formdata.append('imgs', this.defaultList[1]);
        	}else if(!this.teacherInfo.introduce){
        		this.$Message.warning({
                    content: '请输入教师简介！',
                    duration: 2
                });
                return;
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
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
          	  	this.$Message.success(result.message);
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
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
	.uploadList img{
		width: 100%;
        height: 100%;
	}
	#fileIpt{
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
	
	
