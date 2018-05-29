<template>
	<div class="mainContainer">
		<div class="right">
			<p class="title">
				<a href="#">写文章</a> 
			</p>
			
			<div class="articleForm">
				<p>
					<span>标题：</span>
					<input type="text" v-model="title" class="titleTxt" maxlength="80px" title="长度不超过80"/>
				</p>
				<p>
					<span class="vtop">内容：</span>
					 <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
				</p>
				<p>
					<span>文章分类：</span>
					<select class="articleTyep" v-model="typeId">
						 <option v-for="item in achList" :value="item.typeId">{{item.typeName}}</option>
					</select>
				</p>
				<p class="authorityP">
					<span>设置权限：</span>
					<input type="radio" name="authority" value="2" v-model="openStatus"/><label>仅自己可见</label>
					<input type="radio" name="authority" value="1"  id="public" v-model="openStatus"/><label>公开</label>
				</p>
				
				<input type="submit" value="发表" class="btn setUp" @click="creatAtcal"/>
				<input type="submit" value="取消" class="btn cancle" @click="goAchievemnet"/>
				
			</div>
		</div>		
	</div>
</template>
<script>
import global_ from '@/components/Global';
import UE from '@/components/common/ue';
export default {
  name:'WriteArticle',
  components: {UE},
  data(){
  	return{
  		title:"",
  		typeId:0,
  		openStatus:1,
  		defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 200
        },
        achList:[]
  	}
  },
  methods:{
  	getAchList(){
			this.$http.post('/web/space/article/listArticleType.do',this.$qs.stringify({
              userId:this.$storage.getStorage("userInfo").id
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.achList = result.data; 
              	this.typeId=this.achList.filter(item => {return item.type == 'no_type'})[0].typeId
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		},
		creatAtcal(){
			if(!this.title){
				this.$Message.warning({
                    content: '标题不能为空！',
                    duration: 2
                });
                return;
			}else if(!this.$refs.ue.getUEContent()){
				this.$Message.warning({
                    content: '内容不能为空！',
                    duration: 2
                });
                return;
			}
			this.$http.post('/web/space/article/a/createArticle.do',this.$qs.stringify({
              typeId:this.typeId,
              content:this.$refs.ue.getUEContent(),
              title:this.title,
              openStatus:this.openStatus,
              token:this.$storage.getStorage("token"),
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.goAchievemnet();
              	this.$Message.success(result.message); 
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		},
		goAchievemnet(){
			this.$router.push('/MySpace/Achievements');
		}
	},
	created(){
		this.getAchList();
	}
}
</script>

<style scoped>
	.mainContainer{
		width: 1200px;
		margin: auto;
		margin-top: 40px;
	}
	.right{
		width: 1080px;
		padding: 40px 60px 40px 60px;
		/*height: 559px;*/
		border: 1px solid #e9e9e9;
		margin: auto;
		float: left;
	}
	.right .title{
		font-size: 20px;
		color: #666666;
		border-bottom: 1px solid #e9e9e9; 
	}
	.right .title a{
		display: inline-block;
		text-decoration: none;
		font-size: 20px;
		color: #666666;
		padding-bottom: 20px;
	}
	.articleForm{
		padding-left: 45px;
		font-size: 14px;
		color: #666666;
		margin-top: 30px;
	}
	.articleForm>p>span{
		display: inline-block;
		width: 70px;
		text-align: right;
	}
	.vtop{
		vertical-align: top;
	}
	.articleForm .titleTxt{
		width: 350px;
		height: 30px;
		border: 1px solid #e9e9e9;
		padding: 5px;
		outline: none;
	}
	.articleForm p{
		margin-top: 20px;
	}
	.articleTyep{
		width: 350px;
		height: 30px;
		border: 1px solid #e9e9e9;
		outline: none;
		color: #666666;
	}
	.authorityP{
		margin-top: 20px;
	}
	.authorityP label{
		margin-left: 20px;
	}
	.authorityP input#public{
		margin-left: 40px;
	}
	.btn{
		width: 160px;
		height: 40px;
		color: #FFFFFF;
		background: #50a7ff;
		border: none;
		margin-top: 40px;
		font-size: 16px;
		border-radius: 5px;
	}
	.setUp{
		margin-left: 70px;
	}
	.cancle{
		margin-left: 30px;
		background: #cbcbcb;
	}
	textarea{
        /*float: left;*/
        width: 695px;
        border-radius: 5px;
        border:1px solid #dfe4e9;
        padding: 10px;
    }
</style>
	


