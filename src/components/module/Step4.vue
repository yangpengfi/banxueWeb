<template>
	<div class="mainContainer">
		<div class="right">
			<p class="title">
				<a href="#">创建课程</a> 
			</p>
			
			<div class="content">
				<ul class="stepUl">
					<li>
						<a href="#">
							<span>1</span>
							<span>课程简介</span>
						</a>
					</li>
					<li class="lefts">
						<a href="#">
							<span>2</span>
							<span>创建课程目录</span>
						</a>
					</li>
					<li class="lefts">
						<a href="#">
							<span>3</span>
							<span>上传课程视频</span>
						</a>
					</li>
					<li class="lefts">
						<a href="#">
							<span>4</span>
							<span>提交审核</span>
						</a>
					</li>
				</ul>				
				<div class="add-class">
					<p>
						<span>课程目录：</span>
						<RadioGroup v-model="nofree">
							<Radio label="免费"></Radio>
							<Radio label="收费"></Radio>							
						</RadioGroup>						
					</p>
					<p v-if="nofree !='免费'">
						<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="price == ''"></Icon>收费预期：</span>
						<Input  v-model="price" placeholder="请输入价格：例如：199" style="width: 300px"></Input>
						<b>元</b>						
					</p>
				</div>				
				<p class="to-btn">
					<button type="button" class="last" @click="toBack">上一步</button>
					<button type="button" class="next" @click="commitCourse">保存进入下一步</button>					
				</p>
			</div>
		</div>		
		<Modal v-model="modal2" width="360" :closable="false">
			<p slot="header" style="color:#333;font-size:16px;text-align:center">				
				<span>提示</span>
			</p>
			<div style="text-align:center">
				<p>恭喜您已提交成功，审核通过后，工作人员将于近期与您联系</p>				
			</div>
			<div slot="footer" style="text-align:center">
				<!-- <Button type="primary" :loading="modal_loading" @click="del">好的</Button> -->
				<Button type="primary" @click="del">好的</Button>
			</div>
		</Modal>		
	</div>
</template>
<script>
import qs from "qs"
export default {
	name:'Step4',
	data(){
		return {
			msg:{				
				reqError:'请求失败请重试',
				resError:'请求资源失败，请重试',
				emptyInfo:'带*号的为必填项或者必选项'
			},    
			params:{
				token:this.$storage.getStorage("token")
			},
			nofree:'收费',
			modal2: false,
			modal_loading: false,
			name:this.$route.query.name,
			courseId:this.$route.query.courseId,
			price:''
		}
	},
	methods:{
		toBack(){			
			this.$router.push({
				path:'/MySpace/CreateClassThree',
				query:{
					name:this.$route.query.name,
					courseId:this.$route.query.courseId,
					price:this.$route.query.price,							
					periodId:this.$route.query.periodId,
					subjectId:this.$route.query.subjectId,
					versionId:this.$route.query.versionId,
					introduction:this.$route.query.introduction,
					gradeIds:this.$route.query.gradeIds	
				}
			});	
		},
		commitCourse(){
			if(this.nofree == '收费' && this.price.trim() == ''){
				this.price = '';
				this.$Message.error(this.msg.emptyInfo);
				return;
			}else if(this.nofree == '免费'){
				this.price = 0;
			}
			this.$http.post('/web/course/a/submitCourse.do',qs.stringify({				
				courseId:this.courseId,
				money:parseInt(this.price*100),
                token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						this.modal2 = true;	
						this.price = '';
					}
				}	
			}).catch(function (error) {
				alert(error);
			});
		},
		del(){
			this.$router.push('/MySpace/minClasses');
            // this.modal_loading = true;
            // setTimeout(() => {
            //     this.modal_loading = false;
            //     this.modal2 = false;
            //     this.$router.push('/MySpace/minClasses');
            // }, 2000);
        }	
	},
	mounted(){
		if(this.$route.query.price != 0){
			this.price = (this.$route.query.price/100).toFixed(2);
		}else{
			this.price = '';
		}
	}
}
</script>

<style scoped>
	.add-class{
		width: 500px;
		margin: 0 auto 160px;
	}
	.add-class span{
		font-size: 14px;
		color: #666;
		margin-right: 20px;
	}	
	.add-class>p{
		margin-bottom: 30px;
	}
	.ivu-radio-wrapper{
		margin-right: 40px;
		font-size: 14px;
	}
	.add-class b{
		margin-left: 5px;
	}
	.to-btn{
		text-align: center;	
		margin-bottom: 56px;	
	}
	.to-btn button{
		cursor: pointer;
	}
	.last{
		width: 160px;
		height: 40px;
		background-color: #cbcbcb;
		border-radius: 5px;		
		color: #fff;
		border: none;		
		margin-left: 80px;
		font-size: 16px;	
		margin:  0 40px;	
	}
	.next{
		width: 160px;
		height: 40px;
		background-color: #50a7ff;
		border-radius: 5px;
		border: none;	
		font-size: 16px;
		color: #fff;
	}
</style>
