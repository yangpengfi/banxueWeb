<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">个人资料</a> 
		</p>
		<div>
			<div class="personCont left">
				<img :src="myInfo.logo"/>
			</div>
			<div class="personInfo left">
				<p><span class="itemTitle">账号：</span><span>{{myInfo.mobile}}</span></p>
				<p><span class="itemTitle">姓名：</span><span>{{myInfo.userName}}</span></p>
				<p>
					<span class="itemTitle">性别：</span>
					<span v-show="myInfo.sex==1">男</span>
					<span v-show="myInfo.sex==2">女</span>
				</p>
				<p>
					<span class="itemTitle">教龄：</span>
					<span>{{myInfo.teachAge}}年</span>
				</p>
				<p style="line-height:28px;">
					<span class="itemTitle">个性签名：</span>
					<span v-if="!myInfo.motto" class="font9">这个家伙很懒，什么都没留下！</span>
					<span v-if="myInfo.motto">{{myInfo.motto}}</span>
				</p>
				<h2 class="intro">更多资料</h2>
				<p>
					<span class="itemTitle">学历：</span>
					<span v-if="!myInfo.education" class="font9">请编辑</span>
					<span v-if="myInfo.education">{{myInfo.education}}</span>
				</p>
				<p>
					<span class="itemTitle">毕业院校：</span>
					<span v-if="!myInfo.school" class="font9">请编辑</span>
					<span v-if="myInfo.school">{{myInfo.school}}</span>
				</p>
				<p>
					<span class="itemTitle">民族：</span>
					<span v-if="!myInfo.nation" class="font9">请编辑</span>
					<span v-if="myInfo.nation">{{myInfo.nation}}</span>
				</p>
				<p>
					<span class="itemTitle">身份证号：</span>
					<span v-if="!myInfo.idCard" class="font9">请编辑</span>
					<span v-if="myInfo.idCard">{{myInfo.idCard}}</span>
				</p>
				<p>
					<span class="itemTitle">出生日期：</span>
					<span v-if="!myInfo.birthDate" class="font9">请编辑</span>
					<span v-if="myInfo.birthDate">{{myInfo.birthDate}}</span>
				</p>
				<p>
					<span class="itemTitle">地址：</span>
					<span v-if="!myInfo.address" class="font9">请编辑</span>
					<span v-if="myInfo.address">{{myInfo.address}}</span>
				</p>
				<button type="button" id="update" @click="edit">编辑</button>
			</div>
		</div>
		<Modal
        v-model="modal"
        title="编辑"
        @on-ok="ok"
        @on-cancel="cancel" 
        :styles="{top: '20px'}">
        <form class="uploadBox">
        	<Upload
		        ref="upload"
		        :show-upload-list="false"
		        :default-file-list="defaultList"
		        :on-success="handleSuccess"
		        :format="['jpg','jpeg','png','bmp']"
		        :max-size="2048"
		        :on-format-error="handleFormatError"
		        :on-exceeded-size="handleMaxSize"
		        name="logo"
		        :data="{token:token}"
		        :action="uploadUrl">
		        <div class="previewBox">
		            <img :src="defaultList[0].url"><br>
		            <span>上传图像<span class="font9">（jpg,png,bmp）</span></span>
		        </div>
		    </Upload>
		    <p><span class="itemTitle">用户账号：</span><span>{{myInfo.mobile}}</span></p>
		    <p>
		    	<span class="itemTitle">用户姓名：</span>
		    	<span>{{myInfo.userName}}</span>
		    </p>
			<p>
				<span class="itemTitle">性别：</span>
				<span v-show="myInfo.sex==1">男</span>
				<span v-show="myInfo.sex==2">女</span>
			</p>
            <p>
                <span class="itemTitle"><i style="color:red;">*</i> 教龄：</span>
                <input type="number" v-model="myInfo.teachAge" placeholder="请输入教龄" min="0" max="60" oninput="if(value.length>2)value=value.slice(0,2);if(value>60)value=60;if(!/^[0-9]\d*$/.test(value))value=''">
            </p>
            <p class="level">
                <span class="itemTitle">个性签名：</span>
                <textarea placeholder="请输入毕业院校" v-model="myInfo.motto" maxlength="80" title="长度不超过80位"></textarea> 
            </p>
            <p class="level">
                <span class="itemTitle">学历：</span>
                <input type="text" placeholder="请输入学历" v-model="myInfo.education" maxlength="10" title="长度不超过15位">
            </p>
            <p class="level">
                <span class="itemTitle">毕业院校：</span>
                <input type="text" placeholder="请输入毕业院校" v-model="myInfo.school" maxlength="25" title="长度不超过25位">
            </p>
            <p>
                <span class="itemTitle">民族：</span>
                <input type="text" placeholder="请输入民族" v-model="myInfo.nation" maxlength="5" title="长度不超过5位">
            </p>
            <p>
                <span class="itemTitle">身份证号：</span>
                <input type="text" placeholder="请输入身份证号" v-model="myInfo.idCard" maxlength="18" title="长度不超过18位">
            </p>
            <p>
                <span class="itemTitle">出生日期：</span>
                <DatePicker type="date" placeholder="请选择出生日期" style="width: 350px" size="large" v-model="myInfo.birthDate" format="yyyy-MM-dd" @on-change="myInfo.birthDate=$event"></DatePicker>
            </p>
            <p>
                <span class="itemTitle">地址：</span> 
                <input type="text" placeholder="请输入地址" v-model="myInfo.address" maxlength="80" title="长度不超过80位">
            </p>
        </form>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok">保存</button>
        </div>
    </Modal>
	</div>
</template>
<script>
import global_ from '@/components/Global';
export default {
  	name:'ArticalInfo',
    data () {
        return {
            token:this.$storage.getStorage("token") ,
        	myInfo:{},
        	uploadUrl:this.$baseURL+'/web/user/a/uploadHeadImg.do',
        	modal:false,
        	defaultList: [
                {
                    'name': '',
                    'url': ''
                }
            ]
        }
	},
	methods:{
		edit(){
			this.modal = true;
		},
		cancel() {
        	this.getMyInfo();
        },
		getMyInfo(){
			this.$http.post('/web/user/a/myInfo.do',this.$qs.stringify({
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  this.myInfo = result.data;
              	  this.defaultList[0].name=result.data.userName;
              	  this.defaultList[0].url=result.data.logo;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		}, 
        ok(){
            if(!this.myInfo.teachAge){
                this.$Message.warning({
                    content: '请输入教龄！',
                    duration: 2
                });
                return;
            }
            this.myInfo.token=this.token;
            this.$http.post('/web/user/a/updateTeacherInfo.do',this.$qs.stringify(this.myInfo))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: '编辑成功！',
	                    duration: 2
	                });
	                this.getMyInfo();
	                this.modal = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
        },
        handleSuccess (res, file) {
        	if(res.status==0){
        		this.getMyInfo();
        	}else{
        		this.$Message.error(res.message); 
        	}
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name +'的文件格式不正确，请选择jpg、bmp或png。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc:   file.name +'太大，请不要超过2M。'
            });
        }
	},
	created(){
		this.getMyInfo();
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
		cursor: default;
	}
	.personCont{
		width: 140px;
		padding-top: 30px;
	}
	.personCont img{
		width: 140px;
		height: 140px;
		border-radius: 5px;
	}
	.intro{
		font-size: 16px;
		color: #999999;
		font-weight: normal;
	}
	.font9{
		color:#999!important;
	}
	.personInfo{
		width: 635px;
		margin-left: 40px;
		margin-top: 30px;
		color: #666666;
		text-align: left;
		line-height: 3.5;
	}
	.personInfo p{
		font-size: 14px;
	}
	p .itemTitle{
		display: inline-block;
		width: 80px;
		color: #666;
	}
	.personInfo p span{
		color: #333;
	}
	#update{
		width: 106px;;
		height: 32px;
		line-height: 32px;
		background: #47a2ff;
		color: #FFFFFF;
		border: none;
		border-radius: 5px;
		margin-top: 20px;
		cursor: pointer;
	}
	#update:focus{
		outline: none;
	}
	.saveBtn{
		width: 160px;
		height: 40px;
		line-height: 40px;
		background-color: #50a7ff;
		border-radius: 5px;
		font-size: 16px;
		color:#fff;
		outline: none;
		border:none;
	}
	.previewBox{
		width: 140px;
		margin-left: 110px;
		margin-bottom: 30px;
		text-align: center;
	}
	.previewBox>img{
		width: 100px;
		border-radius: 50%;
	}
	.previewBox span{
		color:#1ABC9C;
	}
	.uploadBox p{
        margin-left: 30px;
        margin-bottom: 20px;
    }
    .uploadBox p input{
        width: 350px;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        border:1px solid #dfe4e9;
        border-radius: 4px;
    }
    .uploadBox p textarea{
    	width: 350px;
        height: 60px;
        padding: 10px;
        border:1px solid #dfe4e9;
        border-radius: 4px;
        vertical-align: middle;
    }
</style>

