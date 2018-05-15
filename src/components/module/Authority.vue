<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">访问权限</a> 
		</p>
		<div class="boderImg">
			<img src="../../assets/imgs/space/headImg.png"/>
		</div>
		<p class="authority">设置谁可以访问我的空间</p>
			
		<p class="authorityInput">
			<input type="radio" name="authority" value="1" 
			@click="update(1)" checked="checked" v-model="openStatus"/><label>所有人可见</label>
			<input type="radio" name="authority" value="3" 
			@click="update(3)"  v-model="openStatus"/><label>通讯录可见</label>
			<input type="radio" name="authority" value="2" 
			@click="update(2)"  v-model="openStatus"/><label>仅自己可见</label>
		</p>
	</div>
</template>
<script>
export default {
	name:'Authority',
	data(){
		return {
			openStatus:1	
		}
	},
	methods:{
		update(status){
			this.$http.post('/web/space/a/updateOpenStatus.do',this.$qs.stringify({
              openStatus:status,
              token:this.$storage.getStorage("token")
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                // this.$Message.info(result.message);         
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		}
	},
	created(){
		this.update(1);
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
	}
	.boderImg img{
		width: 350px;
		height: 230px;
		border: 1px solid #e9e9e9;
		margin-top: 40px;
		padding: 2px;
	}
	.authority{
		font-size: 14px;
		color: #999;
		margin-top: 14px;
	}
	.authorityInput{
		font-size: 14px;
		color: #333;
	}
	.authorityInput label{
		margin-left: 20px;
	}
	.authorityInput input:first-child{
		margin-left: 0px;
	}
	.authorityInput input{
		margin-top: 50px;
		margin-left: 100px;
	}
</style>
