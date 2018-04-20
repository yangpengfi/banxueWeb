<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">修改密码</a> 
		</p>
		<Form :model="formRight" label-position="right" :label-width="100" id="password-form">
            <FormItem label="原密码：">
                <Input v-model="formRight.input1"></Input>
            </FormItem>
            <FormItem label="修改密码：">
                <Input v-model="formRight.input2"></Input>
            </FormItem>
            <FormItem label="新密码：">
                <Input v-model="formRight.input3"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">确认完成</Button>
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
            input1: '',
            input2: '',
            input3: ''
        },
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
