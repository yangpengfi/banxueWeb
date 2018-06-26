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
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>课程名称：</span> 
					<input type="text" v-model="name" class="number" maxlength="30" title="长度不超过30"/>
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
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>分类：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="period in periodList" :key="period.id" @click='changePeriod(period)' :class="{active: period.id == localPeriodId}">{{period.name}}</Button>
					</div>					
				</div>
				<div class="fontsStyle com-width" v-if="localPeriodId != ''">
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>年级/专题：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="scope in scopeList" :key="scope.id"  @click='changeScope(scope)' :class="{active:scope.id == localScopeId}">{{scope.name}}</Button>
					</div>					
				</div>
				<div class="fontsStyle com-width" v-if="localScopeId != ''">
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>学科：</span>
					<div>
						<Button type="ghost" class="com-btn" v-for="item in selSubjectList" :key="item.subjectId"  @click='changeSubject(item)' :class="{active:item.subjectId == localSubjectId}">{{item.subjectName}}</Button>
					</div>
				</div>				
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>教材版本：</span>	
					<div>
						<select v-model="version" class="mySelect">
							<option value="">请选择</option>
							<option v-for="item in versionList" :value="item.id">{{item.name}}</option>							
						</select>
					</div>	
				</div>				
				<div class="fontsStyle">
					<span><Icon type="asterisk" color="#ed3f14" size=5></Icon>课程介绍：</span> 
					<div>
						<textarea v-model="description" name="" id="" cols="60" rows="5" maxlength="1000" title="长度不超过1000"></textarea>		
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
					1:[{subjectId:1,subjectName:'语文'},{subjectId:2,subjectName:'数学'},{subjectId:3,subjectName:'英语'},{subjectId:4,subjectName:'物理'},{subjectId:5,subjectName:'化学'},{subjectId:6,subjectName:'地理'},{subjectId:7,subjectName:'历史'},{subjectId:8,subjectName:'政治'},{subjectId:9,subjectName:'生物'}],
					2:[{subjectId:1,subjectName:'语文'},{subjectId:2,subjectName:'数学'},{subjectId:3,subjectName:'英语'}]
				},
				scopeAll:{					
					1:[{id:10,name:'高一',greadId:10},{id:11,name:'高二',greadId:11},{id:12,name:'高三',greadId:12}],
					2:[{id:7,name:'初一',greadId:7},{id:8,name:'初二',greadId:8},{id:9,name:'初三',greadId:9}],
					3:[{id:1,name:'一年级',greadId:1},{id:2,name:'二年级',greadId:2},{id:3,name:'三年级',greadId:3},{id:4,name:'四年级',greadId:4},{id:5,name:'五年级',greadId:5},{id:6,name:'六年级',greadId:6}],
					4:[{id:15,name:'高考'},{id:14,name:'中考'},{id:13,name:'小升初'}]
				},				
				scopeList:[],
				selSubjectList:[],				
				versionList:[],				
				courseId:'',
				localPeriodId:'',
				localSubjectId:'',
				localScopeId:'',
				name:'',
				version:'',
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
			this.version='';
		},
	  	getversionList(pId,sId,vId){
			this.$http.post('/web/coursebook/listBookVersion.do',qs.stringify({				
				periodId:pId,
				subjectId:sId,
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
							this.versionList = result.data.list;
							this.versionList.unshift({id:0,name:"通用版"})
							if(vId||vId===0){
								this.version=vId;
							}
						}else{
							this.versionList = [];
						}						
					}
				}	
			}) 
		},
	  	getlistSubject(pId,gId,sId){
			this.$http.post('/web/coursebook/listSubjectByGrade.do',qs.stringify({				
				periodId:pId,
				gradeId:gId
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						if(result.data instanceof Array && result.data.length>0){
							this.selSubjectList = result.data;
							if(sId){
								this.localSubjectId=sId;
							}
						}else{
							this.selSubjectList = [];
						}						
					}
				}	
			}) 
		},
		changeScope(item){
			this.localScopeId = item.id;
			this.localSubjectId = '';
			this.version='';
			if(this.localPeriodId==4){
				if(this.localScopeId==13){
					this.selSubjectList=this.subjectList[2];
				}else{
					this.selSubjectList=this.subjectList[1];
				}
			}else{
				this.getlistSubject(this.localPeriodId,this.localScopeId)
			}
		},
		changeSubject(item){
			this.localSubjectId = item.subjectId;
			this.version='';
			if(this.localScopeId==13){
				this.getversionList(3,this.localSubjectId)
			}else if(this.localScopeId==14){
				this.getversionList(2,this.localSubjectId)
			}else if(this.localScopeId==15){
				this.getversionList(1,this.localSubjectId)
			}else{
				this.getversionList(this.localPeriodId,this.localSubjectId)
			}
		},
		createCource(){
			if(!this.name){				
				this.$Message.error('请输入课程名称');
				return;
			}else if(!this.localPeriodId){
				this.$Message.error('请选择分类');
				return;
			}else if(!this.localScopeId){
				this.$Message.error('请选择年级/专题');
				return;
			}else if(!this.localSubjectId){
				this.$Message.error('请选择学科');
				return;
			}else if(this.version===''){
				this.$Message.error('请选择版本');
				return;
			}else if(!this.description){
				this.$Message.error('请输入课程简介');
				return;
			}else if(this.description.length<200){
				this.$Message.error('课程简介长度不少于200字');
				return;
			}

			this.$http.post('/web/course/a/createCourse.do',qs.stringify({				
				name:this.name,
				progress:1,
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
			}) 
		},
		updateCource(pro){			
			if(!this.name){				
				this.$Message.error('请输入课程名称');
				return;
			}else if(!this.localPeriodId){
				this.$Message.error('请选择分类');
				return;
			}else if(!this.localScopeId){
				this.$Message.error('请选择年级/专题');
				return;
			}else if(!this.localSubjectId){
				this.$Message.error('请选择学科');
				return;
			}else if(this.version===''){
				this.$Message.error('请选择版本');
				return;
			}else if(!this.description){
				this.$Message.error('请输入课程简介');
				return;
			}else if(this.description.length<200){
				this.$Message.error('课程简介长度不少于200字');
				return;
			}
			this.$http.post('/web/course/a/updateCourse.do',qs.stringify({
				courseId:this.courseId,	
				progress:pro,			
				name:this.name,
				periodId:this.localPeriodId,
				gradeIds:this.localScopeId,
				subjectId:this.localSubjectId,
				versionId:this.version,
				introduction:this.description,
				token:this.params.token
			})).then(res => {	
				let result = res.data;
				if(result.status != 0){
					this.$Message.error(result.message);
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
			}) 
		},
		toNext(){
			if(this.$route.query.courseId != undefined){
				this.updateCource(1);
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
			this.getlistSubject(this.localPeriodId,this.localScopeId,this.localSubjectId)
			this.name=this.$route.query.name;
			this.version=this.$route.query.versionId;
			if(this.localScopeId==13){
				this.getversionList(3,this.localSubjectId,this.version)
			}else if(this.localScopeId==14){
				this.getversionList(2,this.localSubjectId,this.version)
			}else if(this.localScopeId==15){
				this.getversionList(1,this.localSubjectId,this.version)
			}else{
				this.getversionList(this.localPeriodId,this.localSubjectId,this.version)
			}
			// this.getversionList(this.localPeriodId,this.localSubjectId,this.version)
			this.description=this.$route.query.introduction;
			this.price = this.$route.query.price;
			this.scopeList = this.scopeAll[this.localPeriodId];

			// for(var i in this.scopeList){				
			// 	if(this.scopeList[i].id == this.localScopeId){
			// 		this.selSubjectList = this.subjectList[this.scopeList[i].subjectId];
			// 	}
			// }
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
		font-size: 16px;
	}	
	.back{
		width: 160px;
		height: 40px;
		background-color: #cbcbcb;
		border-radius: 5px;		
		color: #fff;
		border: none;		
		margin-left: 80px;
		font-size: 16px;	
		margin:  0 40px;
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
	.mySelect{
		display: block;
        height: 40px;
        width: 300px;
	    line-height: 40px;
	    font-size: 14px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    padding-left: 8px;
	    padding-right: 24px;
	    color: #999;
	    border-radius: 5px;
	    border:1px solid #ddd;
	}
</style>