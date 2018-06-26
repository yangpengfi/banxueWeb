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
							<!-- <div class="add-box-content" v-if="firstAdd">
								<input type="text" v-model="firstName" placeholder="添加目录" class="ipts" maxlength="20" title="长度不超过20"/>
								<Button type="ghost" icon="plus-round" size="small" title="添加目录" @click="createCatalog(firstName,parentId)">添加</Button>
							</div> -->
						</div>
					</div>
					<ul class="add-content" v-if="firstList.length>0">
						<li v-for="item of firstList">							
							<span class="left" v-if="!(item.id==currTypeId)">{{item.name}}</span>
							<input type="text" v-model="firstName" placeholder="添加目录" class="left ipts" maxlength="20" title="长度不超过20" v-if="(item.id==currTypeId)"  id="firstName"/>
							<div class="right">
								<Button type="ghost" icon="close-round" size="small" title="删除目录" @click="deleteCatalog(item.id)" v-if="!(item.id==currTypeId)"></Button>
								<Button type="ghost" icon="minus-round" size="small" title="取消" @click="removeCatalog(item)" v-if="(item.id==currTypeId)"></Button>
								<div class="add-box">
									<Button type="ghost" icon="plus-round" size="small" title="添加目录" @click="addSecondShow(item)" :class="{active:item.id == secondAdd}" v-if="!(item.id==currTypeId)"></Button>
									<Button type="ghost" icon="checkmark-round" size="small" title="确定" @click="createCatalog(firstName,parentId)" :class="{active:item.id == secondAdd}" v-if="(item.id==currTypeId)"></Button>
									<!-- <div class="add-box-content" v-if="item.id == secondAdd">
										<Input v-model="secondName" placeholder="添加目录" style="width: 200px" :maxlength="20"></Input>
										<Button type="ghost" icon="plus-round" size="small" @click="createCatalog(secondName,item.id)">添加</Button>
									</div> -->
								</div>
							</div>							
							<ul v-if="item.children.length>0" class="second-content">
								<li v-for="itemSub in item.children">
									<span class="left" v-if="!(itemSub.id==currTypeId)">{{itemSub.name}}</span>
									<input type="text" v-model="secondName" placeholder="添加目录" class="left ipts mr20" maxlength="20" title="长度不超过20" v-if="(itemSub.id==currTypeId)"  id="secondName"/>
									<Button class="third-delete right" type="ghost" icon="close-round" size="small" title="删除目录" @click="deleteCatalog(itemSub.id)" v-if="!(itemSub.id==currTypeId)"></Button>
									<div class="sureBox right">
										<Button type="ghost" icon="minus-round" size="small" title="取消" @click="removeSub(item,itemSub)" v-if="(itemSub.id==currTypeId)"></Button>
										<Button type="ghost" icon="checkmark-round" size="small" title="确定" @click="createCatalog(secondName,itemSub.parentId,item.hasVideo)" :class="{active:itemSub.id == secondAdd}" v-if="(itemSub.id==currTypeId)"></Button>
									</div>
									<div class="clear"></div>
								</li>
							</ul>
							<div class="clear"></div>
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
			currTypeId:0,
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
			if(this.firstList.length<1){
				this.$Message.error({
                    content: '请创建课程目录',
                    duration: 2
                });
                return;
			}
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
			this.updateCource(2)
		},
		getCourseTree(){
			this.$http.post('/web/course/getCourseCatalogTree.do',qs.stringify({	
				courseId:this.courseId
			})).then(res => {	
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
			}) 
		},
		addFirstShow(){	
			let item={
            	"children": [],
  				"parentId": 0,
  				"id": '-1',
  				"name": "新增节点"
      			};		
			this.secondAdd = '';
			if(this.currTypeId!='-1'){
              this.firstList.push(item); 
            }
	        this.currTypeId='-1';
            this.firstName="新增节点";
            if(document.getElementById('firstName')){
            	document.getElementById('firstName').focus()
            }
		},
		removeCatalog(item) {
          if(item.id=='-1'){
            this.firstList.pop(item);
          }
        	this.currTypeId=0;
        	this.firstName='';
        },
		addSecondShow(item){			
			this.secondAdd = item.id;
			let itemSub={
  				"parentId": item.id,
  				"id": '-1',
  				"name": "新增节点"
      			};		
			if(this.currTypeId!='-1'){
              item.children.push(itemSub); 
            }
	        this.currTypeId='-1';
            this.secondName="新增节点";
            if(document.getElementById('secondName')){
            	document.getElementById('secondName').focus()
            }
		},
		removeSub(item,sub) {
          if(sub.id=='-1'){
            item.children.pop(sub);
          }
        	this.currTypeId=0;
        	this.secondName='';
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
						let result = res.data;
						if(result.status != 0){
							this.$Message.error(this.msg.resError);
						}else{			
							this.currTypeId=0;				
							this.getCourseTree();
						}
					})                     
                }
            });			
		},
		createCatalog(name,parentId,hasVideo){
			// console.log(hasVideo)
			if(hasVideo){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>添加子节点，将删除父节点视频，是否确认添加？</p>',
                    onOk: () => {
                        if(name.trim() == ''){
							this.firstName = '';
							this.secondName = '';
							this.$Message.error('请输入目录名称')
							return;
						}else{
							this.$http.post('/web/course/a/createCourseCatalog.do',qs.stringify({				
								name:name,
								courseId:this.courseId,
								parentId:parentId,
								token:this.params.token
							})).then(res => {	
								let result = res.data;
								if(result.status != 0){
									this.$Message.error(this.msg.resError);
								}else{						
									this.getCourseTree();
									this.firstName = '';
									this.secondName = '';
									this.firstAdd = false;
									this.secondAdd = '';
									this.currTypeId=0;					
								}
							}) 
						}
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
			}else{
				if(name.trim() == ''){
					this.firstName = '';
					this.secondName = '';
					this.$Message.error('请输入目录名称')
					return;
				}else{
					this.$http.post('/web/course/a/createCourseCatalog.do',qs.stringify({				
						name:name,
						courseId:this.courseId,
						parentId:parentId,
						token:this.params.token
					})).then(res => {	
						let result = res.data;
						if(result.status != 0){
							this.$Message.error(this.msg.resError);
						}else{						
							this.getCourseTree();
							this.firstName = '';
							this.secondName = '';
							this.firstAdd = false;
							this.secondAdd = '';
							this.currTypeId=0;					
						}
					}) 
				}
			}
		},
		updateCource(pro){	
			this.$http.post('/web/course/a/updateCourse.do',qs.stringify({
				courseId:this.$route.query.courseId,	
				progress:pro,			
				name:this.$route.query.name,
				periodId:this.$route.query.periodId,
				gradeIds:this.$route.query.gradeIds,
				subjectId:this.$route.query.subjectId,
				versionId:this.$route.query.versionId,
				introduction:this.$route.query.introduction,
				token:this.params.token
			})).then(res => {	
				let result = res.data;
				if(result.status != 0){
					this.$Message.error(result.message);
				}else{	
									
				}	
			}) 
		},
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
		width: 370px;
		margin: 10px 0 40px 375px;
	}
	.add-content>li{
		margin-bottom: 10px;
	}
	sub{		
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
	.add-content>li>span,
	.add-content>li>input{
		margin-left: 20px;
	}
	.second-content>li>span,
	.second-content>li>input{
		margin-left: 40px;
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
	.sureBox{
		line-height: 32px;
	}
	.ipts{
    	display: inline-block;
	    width: 200px;
	    height: 32px;
	    line-height: 1.5;
	    padding: 4px 7px;
	    font-size: 12px;
	    border: 1px solid #dddee1;
	    border-radius: 4px;
	    color: #495060;
	    background-color: #fff;
	    background-image: none;
	    position: relative;
	    cursor: text;
	    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
	}
</style>
	