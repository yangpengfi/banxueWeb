<template>
	<div class="mainContainer">
		<div class="right">
			<p class="title">
				<span>创建课程</span> 
			</p>			
			<div class="content">
				<ul class="stepUl">
					<li>
						<a href="#">
							<span>1</span>
							<span>课程简介</span>
						</a>
					</li>
					<li class="lefts unfinished">
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
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="name == ''"></Icon>课程名称：</span> 
					<input type="text" v-model="name" class="number" placeholder="高考集合"/>
				</div>
				<!-- <div class="fontsStyle">
					<span>上传图片：</span> 
					<div>
						<Upload	type="drag" action="//jsonplaceholder.typicode.com/posts/" >
							<div style="padding: 20px 0">
								<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
								<p>点击或者拖拽上传</p>
							</div>
						</Upload>
						<p class="example-img">
							<img src="../../assets/imgs/space/example.png" alt="示例图片">
							<b class="example-title">示例图片</b>
						</p>
					</div>					
				</div>				 -->				
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="localPeriodId == ''"></Icon>分类：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="period in periodList" :key="period.id" @click='changePeriod(period)' :class="{active: period.id == localPeriodId}">{{period.name}}</Button>
					</div>					
				</div>
				<div class="fontsStyle com-width" v-if="localPeriodId != ''">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="localScopeId == ''"></Icon>年级/专题：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="scope in scopeList" :key="scope.id"  @click='changeScope(scope)' :class="{active:scope.id == localScopeId}">{{scope.name}}</Button>
					</div>					
				</div>
				<div class="fontsStyle com-width" v-if="localScopeId != ''">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="localSubjectId == ''"></Icon>学科：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="subject in selSubjectList" :key="subject.id"  @click='changeSubject(subject)' :class="{active: subject.id == localSubjectId}">{{subject.name}}</Button>
					</div>
				</div>				
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="version ==''"></Icon>教材版本：</span>	
					<div>
						<Select v-model="version" size="large" style="width:200px">
							<Option value="0" selected>通用版</Option>
							<Option value="1">人教版</Option>							
						</Select>
					</div>	
				</div>				
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5 v-if="description==''"></Icon>课程介绍：</span> 
					<div>
						<textarea v-model="description" name="" id="" cols="60" rows="5"></textarea>					
					</div>					
				</div>				
				<div class="fontsStyle">
					<div>
						<button type="button" class="sub" @click="toNext">保存进入下一步</button>
						<button type="button" class="back" @click="toBack">返回</button>
					</div>					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import qs from "qs"
export default {
	name:'Step1',
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
				periodList:[
					{id:1,name:'高中'},
					{id:2,name:'初中'},
					{id:3,name:'小学'},
					{id:4,name:'专题'}
				],				
				subjectList:{					
					1:[{id:1,name:'语文'},{id:2,name:'数学'},{id:3,name:'英语'},{id:4,name:'物理'},{id:5,name:'化学'},{id:6,name:'地理'},{id:7,name:'历史'},{id:8,name:'政治'},{id:9,name:'生物'}],
					2:[{id:1,name:'语文'},{id:2,name:'数学'},{id:3,name:'英语'}]
				},
				scopeAll:{					
					1:[{id:1,name:'高一',subjectId:1},{id:2,name:'高二',subjectId:1},{id:3,name:'高三',subjectId:1}],
					2:[{id:1,name:'初一',subjectId:1},{id:2,name:'初二',subjectId:1},{id:3,name:'初三',subjectId:1}],
					3:[{id:1,name:'一年级',subjectId:2},{id:2,name:'二年级',subjectId:2},{id:3,name:'三年级',subjectId:2},{id:4,name:'四年级',subjectId:2},{id:5,name:'五年级',subjectId:2},{id:6,name:'六年级',subjectId:2}],
					4:[{id:1,name:'高考',subjectId:1},{id:2,name:'中考',subjectId:1},{id:3,name:'小升初',subjectId:2}]
				},				
				scopeList:[],
				selSubjectList:[],				
				courseId:'',
				localPeriodId:'',
				localSubjectId:'',
				localScopeId:'',
				name:'',
				version:'0',
				description:'',
				price:''
		}
	},
	methods:{
		toBack(){
			this.$router.push('/MySpace/minClasses');
		},		
		changePeriod(item){
			this.localPeriodId = item.id;
			this.scopeList = this.scopeAll[item.id];
			this.localSubjectId = '';
			this.localScopeId = '';
		},
	  	getSubjectList(periodId){
			this.$http.post('/web/coursebook/listPeriod2Subject.do',qs.stringify({				
				periodId:periodId,
				name:'',
				status:1,
				pageIndex:1,
				pageSize:100
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.subjectList = result.data.list;
						}else{
							this.subjectList = [];
						}						
					}
				}	
			}).catch(function (error) {
				alert(error);
			});
		},
		changeScope(item){
			this.localScopeId = item.id;
			this.selSubjectList	= this.subjectList[item.subjectId];	
			this.localSubjectId = '';
		},
		changeSubject(item){
			this.localSubjectId = item.id;
		},
		createCource(){
			if(this.name == ''||this.localPeriodId == ''||this.localScopeId.length == ''||this.localSubjectId == ''||this.version == ''||this.description == ''){				
				this.$Message.error(this.msg.emptyInfo);
				return;
			}
			this.$http.post('/web/course/a/createCourse.do',qs.stringify({				
				name:this.name,
				periodId:this.localPeriodId,
				gradeIds:this.localScopeId,
				subjectId:this.localSubjectId,
				versionId:this.version,
				introduction:this.description,
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						this.$router.push({
							path:'/MySpace/CreateClassTwo',
							query:{
								name:result.data.name,
								courseId:result.data.id,
								price:this.price,							
								periodId:this.localPeriodId,
								subjectId:this.localSubjectId,
								versionId:this.version,
								introduction:this.description,
								gradeIds:this.localScopeId				
							}
						});					
					}
				}	
			}).catch(function (error) {
				alert(error);
			});
		},
		updateCource(){			
			if(this.name == ''||this.localPeriodId == ''||this.localScopeId == ''||this.localSubjectId == ''||this.version == ''||this.description == ''){				
				this.$Message.error(this.msg.emptyInfo);
				return;
			}
			this.$http.post('/web/course/a/updateCourse.do',qs.stringify({
				courseId:this.courseId,				
				name:this.name,
				periodId:this.localPeriodId,
				gradeIds:this.localScopeId,
				subjectId:this.localSubjectId,
				versionId:this.version,
				introduction:this.description,
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						this.$router.push({
							path:'/MySpace/CreateClassTwo',
							query:{
								name:result.data.name,
								courseId:result.data.id,
								price:this.price,							
								periodId:this.localPeriodId,
								subjectId:this.localSubjectId,
								versionId:this.version,
								introduction:this.description,
								gradeIds:this.localScopeId				
							}
						});					
					}
				}	
			}).catch(function (error) {
				alert(error);
			});
		},
		toNext(){
			if(this.$route.query.courseId != undefined){
				this.updateCource();
			}else{
				this.createCource();
			}
		},
	},
	mounted(){		
		if(this.$route.query.courseId != undefined){
			this.courseId=this.$route.query.courseId;
			this.localPeriodId=this.$route.query.periodId,			
			this.localSubjectId=this.$route.query.subjectId;
			this.localScopeId=this.$route.query.gradeIds;
			this.name=this.$route.query.name;
			this.version=String(this.$route.query.versionId);
			this.description=this.$route.query.introduction;
			this.price = this.$route.query.price;

			this.scopeList = this.scopeAll[this.localPeriodId];

			for(var i in this.scopeList){				
				if(this.scopeList[i].id == this.localScopeId){
					this.selSubjectList = this.subjectList[this.scopeList[i].subjectId];
				}
			}
		}
	}
	  
}
</script>

<style scoped>
	.fontsStyle{
		width: 100%;
		font-size: 14px;
		color: #666;		
		padding-left: 220px;		
		margin: 10px 0;
		overflow: auto;
	}
	.fontsStyle>span{
		float: left;
		width: 110px;
		height: 40px;
		line-height: 40px;
		padding-right: 10px;
		text-align: right;
	}
	.fontsStyle>div{
		float: left;
	}
	.com-width>div{
		width: 700px;
	}
	.com-width>div button{
		margin-bottom: 10px;
	}	
	.com-btn{
		padding: 7px 18px;
		margin-right: 15px;
		font-size: 14px;
	}
	.com-btn.active{
		color: #2d8cf0;		
		border-color: #2d8cf0;
	}	
	/* .ivu-upload{
		width: 400px;
		display: inline-block;
		vertical-align: top;
	} */
	/* .example-img{
		float: right;
		margin-right: 200px;
		margin-left: 20px;
	}
	.example-img b{
		display: block;
		text-align: center;
		color: #999;
		font-size: 14px;
		font-weight: normal;
	} */
	
	.fontsStyle input{
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		color: #666;
		padding-left: 10px;
	}
	.fontsStyle textarea{
		vertical-align: top;
		border: 1px solid #ddd;
		padding-left: 10px;
		margin-bottom: 10px;
		padding-top: 5px;
		color: #666;
	}
	.number{
		width: 300px;
		height: 30px;
		border: 1px solid #e9e9e9;
		padding: 5px;
		outline: none;
		color: #999;
		border-radius: 4px;		
	}	
	.fontsStyle:last-child{
		margin-top: 30px;
	}
	.sub{
		width: 160px;
		height: 40px;
		line-height: 40px;
		background: #50a7ff;
		color: #fff;
		border: none;
		outline: none;
		margin-left: 110px;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
	}	
	.back{
		border:none;
		margin-left: 50px;
		font-size: 14px;
		color: #666666;
		background-color: #fff;
		cursor: pointer;
	}
	.cancle{
		margin-left: 30px;
		background: #cbcbcb;
	}
	.ivu-icon-asterisk{
		margin-right: 3px;
		vertical-align: middle;
	}
</style>