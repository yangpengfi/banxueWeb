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
					<li class="lefts unfinished">
						<a href="#">
							<span>3</span>
							<span>上传课程视频</span>
						</a>
					</li>
					<li class="lefts unfinished">
						<a href="#">
							<span>4</span>
							<span>提交审核</span>
						</a>
					</li>
				</ul>
				<div class="add-class">
					<div class="add-title">
						<span>课程名称：</span>
						<b>{{name}}</b>
						<div class="add-box">
							<Button type="ghost" icon="plus-round" size="small" title="添加目录" @click="addFirstShow" :class="{active:firstAdd == true}"></Button>
							<div class="add-box-content" v-if="firstAdd">
								<Input v-model="firstName" placeholder="添加目录" style="width: 200px"></Input>
								<Button type="ghost" icon="plus-round" size="small" title="添加目录" @click="createCatalog(firstName,parentId)">添加</Button>
							</div>
						</div>
					</div>
					<ul class="add-content" v-if="firstList.length>0">
						<li v-for="item of firstList">							
							<span class="left">{{item.name}}</span>
							<div class="right">
								<Button type="ghost" icon="close-round" size="small" title="删除目录" @click="deleteCatalog(item.id)"></Button>
								<div class="add-box">
									<Button type="ghost" icon="plus-round" size="small" title="添加目录" @click="addSecondShow(item)" :class="{active:item.id == secondAdd}"></Button>
									<div class="add-box-content" v-if="item.id == secondAdd">
										<Input v-model="secondName" placeholder="添加目录" style="width: 200px"></Input>
										<Button type="ghost" icon="plus-round" size="small" @click="createCatalog(secondName,item.id)">添加</Button>
									</div>
								</div>
							</div>							
							<ul v-if="item.children.length>0" class="second-content">
								<li v-for="item in item.children">
									<span class="left">{{item.name}}</span>
									<Button class="third-delete right" type="ghost" icon="close-round" size="small" title="删除目录" @click="deleteCatalog(item.id)"></Button>
								</li>
							</ul>
						</li>
					</ul>
				</div>				
				<p class="to-btn">
					<button type="button" class="last" @click="toBack">上一步</button>
					<button type="button" class="next" @click="toNext">保存进入下一步</button>					
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import qs from "qs"
export default {  
	name:'Step2',
	data(){
		return {
			msg:{
				reqError:'请求失败请重试',
                resError:'请求资源失败，请重试'
			},
			params:{
				token:this.$storage.getStorage("token")
			},
			name:this.$route.query.name,
			courseId:this.$route.query.courseId,
			firstList:[],
			firstAdd:false,
			firstName:'',
			secondName:'',
			secondAdd:'',
			parentId:0
		}
	},
	methods:{
		toBack(){
			// this.$router.push('/MySpace/CreateClassOne');
			this.$router.push({
				path:'/MySpace/CreateClassOne',
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
		toNext(){
			// this.$router.push('/MySpace/CreateClassThree');
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
		getCourseTree(){
			this.$http.post('/web/course/getCourseCatalogTree.do',qs.stringify({	
				courseId:this.courseId
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						console.log();					
						if(result.data.children instanceof Array && result.data.children.length>0){
							this.firstList = result.data.children;							
						}else{
							this.firstList = [];							
						}
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
		},
		addFirstShow(){			
			this.firstAdd = !this.firstAdd;
			this.secondAdd = '';
		},
		addSecondShow(item){			
			this.secondAdd = item.id;
			this.firstAdd = false;
		},
		deleteCatalog(catalogId){
			this.secondAdd = '';
			this.$Modal.confirm({
                title: '删除',
                content: '<p>确定删除吗？</p>',
                onOk: () => {
					this.$http.post('/web/course/a/deleteCourseCatalog.do',qs.stringify({				
						courseId:this.courseId,
						catalogId:catalogId,
						token:this.params.token
					})).then(res => {	
						if(res.status != 200){
							this.$Message.error(this.msg.reqError);
						}else{
							let result = res.data;
							if(result.status != 0){
								this.$Message.error(this.msg.resError);
							}else{						
								this.getCourseTree();
							}
						}				
						
					}).catch(function (error) {
						alert(error);
					});                    
                }
            });			
		},
		createCatalog(name,parentId){
			if(name.trim() == ''){
				this.firstName = '';
				this.secondName = '';
				return;
			}else{
				this.$http.post('/web/course/a/createCourseCatalog.do',qs.stringify({				
					name:name,
					courseId:this.courseId,
					parentId:parentId,
					token:this.params.token
				})).then(res => {	
					if(res.status != 200){
						this.$Message.error(this.msg.reqError);
					}else{
						let result = res.data;
						if(result.status != 0){
							this.$Message.error(this.msg.resError);
						}else{						
							this.getCourseTree();
							this.firstName = '';
							this.secondName = '';
							this.firstAdd = false;
							this.secondAdd = '';
						}
					}			
					
				}).catch(function (error) {
					alert(error);
				});
			}
		}
	},
	mounted(){
		this.getCourseTree();
	}
}
</script>

<style scoped>	
	.add-title{
		padding-left: 270px;
	}
	.add-title span{
		font-size: 14px;
		color: #666;
	}
	.add-title b{
		font-size: 14px;
		color: #333;
		margin-left: 40px;
		margin-right: 220px;
	}
	.add-content{
		width: 330px;
		margin: 10px auto 40px;
	}
	.add-content>li{		
		min-height: 30px;
		margin-left: 10px;
	}
	.second-content{
		padding-top: 30px;
	}
	.second-content>li{
		min-height: 20px;
		margin-bottom: 10px;
	}
	.second-content>li>span{
		margin-left: 10px;
	}	
	.add-content li .third-delete{
		margin-right: 28px;
	}
	.ivu-btn-ghost.active{
		color: #2d8cf0;		
		border-color: #2d8cf0;
	}
	.to-btn{
		margin-top: 80px;
		text-align: center;		
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
	.add-box{
		display: inline-block;
		position: relative;
	}
	.add-box-content{
		position: absolute;
		top: 0;
		left: 30px;
		z-index: 999;
		padding: 15px;
		background-color: #fff;
		border: 1px solid #eee;
	}
	.add-box-content button{
		margin-top: 10px;
	}
</style>
	