<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">修改密码</a> 
		</p>
		<Form :model="formRight" label-position="right" :label-width="100" id="password-form">
            <FormItem label="原密码：">
                <Input v-model="formRight.Pwd" type="password"></Input>
            </FormItem>
            <FormItem label="新密码：">
                <Input v-model="formRight.newPwd" type="password"></Input>
            </FormItem>
            <FormItem label="确认密码：">
                <Input v-model="formRight.surePwd" type="password"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitPwd">确认完成</Button>
            </FormItem>
        </Form>
	</div>
</template>
<script>
export default {
  name:'ChangePassword',
  data(){
      return{
        formRight: {
            Pwd: '',
            newPwd: '',
            surePwd: ''
        },
      }
  },
  methods:{
    submitPwd(){
        if(!this.formRight.Pwd){
            this.$Message.warning({
                content: '原密码不能为空！',
                duration: 2
            });
            return;
        }else if(!this.formRight.newPwd){
            this.$Message.warning({
                content: '请输入新密码！',
                duration: 2
            });
            return;
        }else if(!this.formRight.surePwd){
            this.$Message.warning({
                content: '请输入确认密码！',
                duration: 2
            });
            return;
        }else if(this.formRight.newPwd!=this.formRight.surePwd){
            this.$Message.warning({
                content: '密码输入不一致！',
                duration: 2
            });
            return;
        }
        this.$http.post('/web/user/a/updatePwd.do',this.$qs.stringify({
            token:this.$storage.getStorage('token'),
            password:this.$md5(this.formRight.Pwd),
            newPassword:this.$md5(this.formRight.surePwd)
        }))
        .then((res)=>{
        if(res.data.status==0){
            this.$Message.success({
                content: '密码修改成功!',
                duration: 2
            });
            this.formRight={
                Pwd: '',
                newPwd: '',
                surePwd: ''
            }
        }else{
            this.$Message.error(res.data.message);
        }
        })
        .catch((err)=>{
            alert(err);
        })
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
	#password-form{
        width: 460px;
        padding-top: 80px;
    }
    #password-form button{
        width: 160px;
        height: 40px;
        background-color: #50a7ff;
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
    }
    #password-form .ivu-form-item-label{
        font-size: 14px;
        color: #666;
    }
</style>
