<template>	
	<div id="right-resource">
		<div class="right-title">
			<p>
				<a href="javascript:void(0);" v-for="(title,index) in titles" @click="changeTitle(title)" :class="{active:title.id == selTitle}">{{title.name}}</a>
			</p>
			<div>		
				<div id="select-box">
					<div id="select-btn">
						<input v-model="selData" readonly @click="openSel" class="select" placeholder="筛选">
						<div v-if="selData == ''"><Icon type="arrow-down-b"></Icon></div>
						<div v-if="selData != ''" v-on:click.stop="closeSel"><Icon type="close-circled"></Icon></div>
					</div>
					<div v-if="open" id="content">
						<ul>
							<li v-for="(item,index) in classList" @click="getsubject(item.id,item.name)" :class="{active:item.id==periodId}">
								{{item.name}}								
							</li>
						</ul>
						<ul v-if="subjectList.length>0">
							<li v-for="(item,index) in subjectList" @click="getbook(item.subjectId,item.subjectName)" :class="{active:item.subjectId==subjectId}">
								{{item.subjectName}}								
							</li>
						</ul>
						<ul v-if="bookList.length>0">
							<li v-for="(item,index) in bookList" @click="gettexBook(item.id,item.name)" :class="{active:item.id==bookId}">
								{{item.name}}								
							</li>
						</ul>
						<ul v-if="textBookList.length>0">
							<li v-for="(item,index) in textBookList" @click="seltexBook(item.textbookId,item.textbookName)" :class="{active:item.textbookId==textBookId}">
								{{item.textbookName}}
							</li>
						</ul>
					</div>
				</div>			
				<input v-model="name" placeholder="请输入资源名称" class="left search" @keyup.enter="searchResource"/>
				<button class="left" @click="searchResource">搜索</button>
			</div>
		</div>	
		<div class="operator" v-show="!isHis">	
			<button v-if="resourceList.length>1" @click="showBatch" :class="{active:ifBatch==true}">批量设置</button>
		</div>		
		<div class="batch-modify" v-show="ifBatch && resourceList.length>1">
			<label for="all-check">全选</label> 
			<input type="checkbox" id="all-check" @click="selectAll"/>	
			<span @click="pushAll">推送</span>
			<span @click="deleteAll">删除</span>
		</div>
		<ul class="resourceCont" v-if="resourceList.length>0">
			<li v-for="item of resourceList">
				<div>
					<p>
						<input type="checkbox" :value="item.resourceLocalId" v-model="selectArr" v-show="ifBatch" @click="selectOne"/>
					</p>
					<img :src="item.fileSuffix | fillType" @click="toDetailResource(item)"/>				
					<div class="doc-content">
						<p class="doc-title">
							<span @click="toDetailResource(item)">{{item.recourceLocalName}}</span> 
							<button v-if="item.resourceTypeId != 0">{{item.resourceTypeName}}</button>
						</p>
						<div class="sub-title">
							<span>{{item.periodName}}</span>
							<span>{{item.subjectName}}</span>
							<span>{{item.versionName}}</span>
							<span>{{item.textbookName}}</span>							
							<span>{{item.bname1 = item.bname1 == "无"?'':item.bname1}}</span>
							<span>{{item.bname2 = item.bname2 == "无"?'':item.bname2}}</span>
							<span>{{item.bname3 = item.bname3 == "无"?'':item.bname3}}</span>	
							<span>{{item.kname1 = item.kname1 == "无"?'':item.kname1}}</span>
							<span>{{item.kname2 = item.kname2 == "无"?'':item.kname2}}</span>
							<span>{{item.kname3 = item.kname3 == "无"?'':item.kname3}}</span>
							<span class="upTime">下载时间：{{item.createTime | formatTime}}</span>
						</div>
						<div class="set" v-show="!isHis">
							<span @click="pushResource(item)">推送</span>
							<span @click="deleteResource(item.resourceLocalId)">删除</span>
						</div>
						<!-- <div class="edit" v-show="!isHis">
							<p class="edit-title">
								<span>编辑</span> 
								<Icon type="arrow-down-b" color="#1caaf1"></Icon>
							</p>
							<div class="edit-content">
								<span @click="pushResource(item)">推送</span>
								<span @click="deleteResource(item.resourceLocalId)">删除</span>
							</div>			
						</div> -->								
					</div>	
				</div>									
			</li>
		</ul>
		<Modal
			v-model="model.pushModel"
			title="推送"
        	:loading="loading"
			@on-ok="confirmPushResource"
			@on-cancel="cancelPush"
			>
			<div id="push-box">
				<p>选择班级</p>
				<div v-if="gradeList.length>0">
					<ul class="grade-title">
						<li v-for="item of gradeList" @click="changeGrade(item)" :class="{active:item.key == currentGrade}">{{item.name}}</li>
					</ul>					
					<ul class="grade-content" v-if="currentGradeList.length>0">
						<li v-for="item of currentGradeList" @click="changeClass(item)" :class="{active:item.classId == currentClassId}">{{item.className}}</li>
					</ul>
				</div>
				<p class="mt20 clear">选择分组</p>
				<div class="mt20">
					<ul class="grade-title">
						<li v-for="item of groupList" @click="clickGroup(item)" :class="{active:item.groupId === selGroup}">{{item.groupName}}</li>
					</ul>
				</div>
				<p class="mt20 clear">已选</p>
				<div class="mt20">
					<Tag v-for="item in tagArr" :key="item.classId+'_'+item.groupId" closable @on-close="handleClose2($event,item)">{{item.className+item.groupName}}</Tag>
				</div>
			</div>			
		</Modal>
		<Page :total="totalCount" :current="params.pageIndex" show-elevator show-total v-if="resourceList.length>0" @on-change="changePage"></Page>	
	</div>
	
</template>
<script>
import qs from "qs"
export default {
  	name:'DownloadResource',
  	data(){
	  	return {
			selectArr: [],
			tagArr: [],
			arr: [],
			model:{							
				pushModel:false
			},
			titles:[
				{id:1,name:'同步资源'},
				{id:2,name:'知识点'}
			],
			selTitle:1,				  	
			ifBatch:false, 			
			loading:true,  				
			resourceList:[],
			totalCount:'',
			name:'',
			params:{				
				pageIndex:1,
				pageSize:10,
				token:this.$storage.getStorage("token")
			},
			withDisabledNode:1,
			open:false,
			subjectList:[],
			bookList:[],
			textBookList:[],
			periodId:0,
			subjectId:0,
			bookId:'',
			textBookId:'',
			period:'',
			subject:'',
			book:'',
			texBook:'',
			classList:[
				{id:1,name:'高中'},
				{id:2,name:'初中'},
				{id:3,name:'小学'},
			],			
			selData:'',
			gradeList:[],
			groupList:[],
			currentSubject:'',
			selGroup:'',
			selGroupName:'',
			selGroupArr:[],
			currentClassId:'',
			currentClassName:'',
			currentClassArr:[],
			currentGrade:'',
			currentGradeList:[],
			currentClassId:'',
			pushArr:[],
			resourceId:'',
			msg:{
				unselectInfo:'您还没有选择资源，请先选择',
				unselectClassify:'您还没有选择类别，请先选择',
				reqError:'请求失败请重试',
				resError:'请求资源失败，请重试',
				deleteInfo:'删除资源成功',
				pushInfo:'推送资源成功'
			},
            isHis:true,
            userId:0
	  	}
  	},
	filters: {
		fillType: function (val) {
			let value=val.toLowerCase()
			if (!value){ return ''}
			if(value == 'doc'|| value == 'docx'){
				value = './static/imgs/resource/fileDoc.png'
			}else if(value == 'ppt'|| value == 'pptx'){
				value = './static/imgs/resource/filePpt.png'
			}else if(value == 'xls' || value == 'xlsx'){
				value = './static/imgs/resource/fileXls.png'
			}else if(value == 'pdf'){
				value = './static/imgs/resource/filePdf.png'
			}else if(value == 'jpg'){
				value = './static/imgs/resource/fileJpg.png'
			}else if(value == 'png'){
				value = './static/imgs/resource/filePng.png'
			}else if(value == 'mp3'){
				value = './static/imgs/resource/fileMp3.png'
			}else if(value == 'avi'||value == 'rmvb'||value == 'mp4'){
				value = './static/imgs/resource/fileVideo.png'
			}else if(value == 'zip'){
				value = './static/imgs/resource/fileZip.png'
			}else if(value == 'rar'){
				value = './static/imgs/resource/fileRar.png'
			}else if(value == 'txt'){
				value = './static/imgs/resource/fileTxt.png'
			}else{
				value = './static/imgs/resource/fileunkonw.png'
			}
			return value;
		},
		formatTime:function (input) {
			var d = new Date(input);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate();			
			return  year+ '-' + month + '-' + day;
		}
	},
	methods:{
        toDetailResource(item){
        	this.$router.push({
	              path:'/DetailResource',
	              query:{
	                resourceLocalId:item.resourceLocalId          
	              }
	            });
        },
		changeTitle(item){
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;

			this.periodId = '';
			this.subjectId = '';
			this.bookId = '';
			this.textBookId = '';
			this.selData = '';
			this.subjectList = [];
			this.bookList = [];
			this.textBookList = [];

			this.selTitle=item.id; 
			this.params.pageIndex = 1;
			this.getResourceList();
		},
		showBatch(){
			if(!this.ifBatch){
				this.ifBatch = true;
			}else{
				this.ifBatch = false;	
				this.selectArr = [];	
				document.getElementById('all-check').checked = false;				
			}
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
							if(result.data.list.length == 1){
								this.open=false;
							}
						}else{
							this.subjectList = [];
						}						
					}
				}			
				
			}) 
		},	
		getBookList(subjectId){
			this.$http.post('/web/coursebook/listBookVersion.do',qs.stringify({				
				periodId:this.periodId,
				subjectId:subjectId,
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
							this.bookList = result.data.list;
							if(result.data.list.length == 1){
								this.open=false;
							}
						}else{
							this.bookList = [];
						}
						
					}
				}			
				
			}) 
		},
		getTextBookList(versionId){
			this.$http.post('/web/coursebook/listTextbook.do',qs.stringify({				
				periodId:this.periodId,
				subjectId:this.subjectId,
				versionId:versionId,
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
							this.textBookList = result.data.list;							
						}else{
							this.textBookList = [];
						}
					}
				}			
				
			}) 
		},		
		getResourceList(){
			this.$http.post('/web/coursebook/listMyDownloadResource.do',qs.stringify({				
				resourceKindId:this.selTitle,
				name:this.name,
				userId:this.userId,
				periodId:this.periodId,
				subjectId:this.subjectId,
				versionId:this.bookId,
				textbookId:this.textBookId,
				pageIndex:this.params.pageIndex,
				pageSize:this.params.pageSize,
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{						
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.resourceList = result.data.list;
							this.totalCount = result.data.totalCount;
						}else{
							this.resourceList = [];
						}
					}
				}			
				
			}) 
		},
		searchResource(){	
			if(this.name.trim() == ''){
				this.name = '';				
			}
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;	
			this.params.pageIndex = 1;
			this.getResourceList();
		},
		changePage(page){
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;	
			this.params.pageIndex = page;
			this.getResourceList();
		},
		getsubject(id,name){      
			this.bookList = [];
			this.textBookList = [];
			this.subjectId = '';
			this.period = name;
			this.selData = this.period;
			  
			this.periodId = id;

			this.getSubjectList(id);
			this.params.pageIndex = 1;
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;	
			this.getResourceList();

		},
		getbook(id,name){
			
			this.textBookList = [];
			this.bookId = '';
			this.subject = name;
			this.selData = this.period+'/'+this.subject;
			
			this.subjectId = id;
			this.getBookList(id);

			this.params.pageIndex = 1;
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;
			this.getResourceList();
		},
		gettexBook(id,name){
		
			this.book = name;
			this.selData = this.period+'/'+this.subject+'/'+this.book;
			
			this.bookId = id;
			this.getTextBookList(id);

			this.params.pageIndex = 1;
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;	
			this.getResourceList();
		},
		seltexBook(id,name){
			this.textBookId = id;
			this.texBook = name;
			this.selData = this.period+'/'+this.subject+'/'+this.book+'/'+this.texBook;
			this.open = false;

			this.params.pageIndex = 1;
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;
			this.getResourceList();
		},
		openSel(){
			if(!this.open){
				this.open = true;				
			}else{
				this.open = false;
			}      
		},
		closeSel(){
			this.selData = '';
			this.periodId = 0;
			this.subjectId = 0;
			this.bookId = '';
			this.textBookId = '';			
			this.subjectList = [];
			this.bookList = [];
			this.textBookList = [];
			this.open = false;

			this.params.pageIndex = 1;
			this.ifBatch = false;	
			this.selectArr = [];	
			document.getElementById('all-check').checked = false;
			this.getResourceList();
		},
		deleteResource(resourceId){
			this.$Modal.confirm({
                title: '删除',
                content: '<p>确定删除吗？</p>',
                onOk: () => {
					this.$http.post('/web/coursebook/a/deleteDownloadResource.do',qs.stringify({				
						resourceLocalIds:resourceId,
						token:this.params.token
					})).then(res => {	
						if(res.status != 200){
							this.$Message.error(this.msg.reqError);
						}else{
							let result = res.data;
							if(result.status != 0){
								this.$Message.error(this.msg.resError);
							}else{	
								this.getResourceList();					
								this.$Message.success(this.msg.deleteInfo);
								document.getElementById('all-check').checked = false;
								this.selectArr = [];
							}
						}			
						
					})                     
                }
            });
		},
		pushResource(item){
			this.currentSubject='';
			this.selGroup='';
			this.selGroupName = '';
			this.currentClassId = '';
			this.currentClassName = '';
			this.pushArr = [];
			this.arr = [];
			this.tagArr = [];
			this.selGroupArr = [];
			this.currentClassArr = [];
			this.groupList=[];
			this.currentSubject = item.subjectId;
			this.model.pushModel = true;
			this.pushArr.push({
				periodId: item.periodId,
				subjectId: item.subjectId,
				resourceId: item.resourceLocalId,
				labelId: item.lableId
			});			
			this.getClassList(); 
		},
		getClassList(){
			this.$http.post('/web/class/a/listJoinClassGroupByGrade.do',qs.stringify({				
					subjectId:this.currentSubject,
					token:this.params.token
				})).then(res => {	
					if(res.status != 200){
						this.$Message.error(this.msg.reqError);
					}else{
						let result = res.data;
						if(result.status != 0){
							this.$Message.error(this.msg.resError);
						}else{							
							if(result.data instanceof Array && result.data.length>0){
								this.gradeList=result.data;																						
							}else{
								this.gradeList = [];
							}							
						}
					}	
				})    
		},
		getGroupList(cId,sId){
			this.$http.post('/web/class/a/listClassGroup.do',qs.stringify({				
					subjectId:sId,
					classId:cId,
					token:this.params.token
				})).then(res => {	
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{							
						if(result.data instanceof Array && result.data.length>0){
							this.groupList=result.data;								
						}else{
							this.groupList = [];
						}							
					}	
				})    
		},
		changeGrade(item){
			this.currentGrade = item.key;
			this.currentGradeList = item.list;
			this.currentClassId = '';
			this.currentClassName = '';
			this.selGroup='';
			this.selGroupName = '';
			this.groupList=[];
			this.loading=false;
		},
		changeClass(item){
			this.loading=true;
			this.selGroup='';
			this.selGroupName = '';
			this.currentClassId = item.classId;
			this.currentClassName = item.className;
			this.getGroupList(item.classId,this.currentSubject)
		},
		clickGroup(item){
			this.loading=false;
			if(!this.currentClassId){
				this.$Message.warning({
                    content: '请选择推送班级！',
                    duration: 2
                });
			}
			this.selGroup = item.groupId;
			this.selGroupName = item.groupName;
			let itemSelf={
				className:this.currentClassName,
				classId:this.currentClassId,
				groupId:this.selGroup,
				groupName:this.selGroupName,
			};
			let classAndGroup=this.currentClassId+'_'+this.selGroup;
			if(this.arr.indexOf(classAndGroup)=='-1'){
				this.currentClassArr.push(this.currentClassId)
				this.selGroupArr.push(this.selGroup)
				this.tagArr.push(itemSelf);
				this.arr.push(classAndGroup);
			}
		},
        handleClose2 (event, item) {
            const index = this.tagArr.indexOf(item);
            this.arr.splice(index, 1);
            this.tagArr.splice(index, 1);
            this.selGroupArr.splice(index, 1);
            this.currentClassArr.splice(index, 1);
        },
		confirmPushResource(){	
			if(this.selGroupArr.length <0){
				this.$Message.warning({
                    content: '请选择推送的对象！',
                    duration: 2
                });
            	this.loading=false;
				return;
			}else{
				this.$http.post('/web/coursebook/a/pushResource2Class.do',qs.stringify({				
					toClassId:this.currentClassArr.join(','),					
					groupIds:this.selGroupArr.join(','),					
					token:this.params.token,
					pushDetailJson:JSON.stringify(this.pushArr)
				})).then(res => {	
					let result = res.data;
					if(result.status == 0){
						this.getResourceList();								
						this.$Message.success(this.message);	
						this.currentGrade='';
						this.currentClassId = '';	
						this.currentGradeList = [];		
						document.getElementById('all-check').checked = false;
						this.selectArr = [];
						this.loading=true;
					}else if(result.status == 105){	
						this.$Message.error("没有权限，不能推送！");
					}else{
						this.$Message.error(this.message);
					}	
				})       
			}
		},
		cancelPush(){
			this.currentGrade='';
			this.currentClassId = '';
			this.currentGradeList = [];
		},
		selectAll(event){
            var _this = this;            
            if (!event.currentTarget.checked) {
              this.selectArr = [];
            } else { 
              _this.selectArr = [];
              _this.resourceList.forEach(function(item, i) {
                _this.selectArr.push(item.resourceLocalId);
              });
            }
		},
		selectOne(event){
			if (!event.currentTarget.checked) {
              if(this.selectArr.length <= 10){
					document.getElementById('all-check').checked = false;
				}
            }
        },
		deleteAll(){
			if(this.selectArr.length < 1){
				this.$Message.info(this.msg.unselectInfo);
			}else{			
				var resourceStr = this.selectArr.join(',');	
				this.deleteResource(resourceStr);				
			}
		},		
		pushAll(){			
			if(this.selectArr.length < 1){
				this.$Message.info(this.msg.unselectInfo);
			}else{
				this.getClassList(); 
				this.pushArr = [];	
				this.selGroup='';
				this.selGroupName = '';
				this.currentClassId = '';
				this.currentClassName = '';
				this.pushArr = [];
				this.arr = [];
				this.tagArr = [];
				this.selGroupArr = [];
				this.currentClassArr = [];			
				for(var i=0;i<this.resourceList.length;i++){
					for(var k=0;k<this.selectArr.length;k++){
						if(this.resourceList[i].resourceLocalId == this.selectArr[k]){
							this.pushArr.push({
								periodId: this.resourceList[i].periodId,
								subjectId: this.resourceList[i].subjectId,
								resourceId: this.resourceList[i].resourceLocalId,
								labelId: this.resourceList[i].lableId
							});
							if(this.resourceList[i].subjectId!=this.pushArr[0].subjectId){
								this.$Message.warning({
				                    content: '请选择同一学科资源批量推送!',
				                    duration: 2
				                });
				                return false;
							}
						}
					}
				}		
				this.currentSubject = this.pushArr[0].subjectId;
				this.model.pushModel = true;				
				// this.confirmPushResource();
			}
		}		
	},
	created:function(){
		this.userId=this.$router.history.current.query.userId;
        let whoSpace=window.location.hash.split('/')[1];
        if(whoSpace=='ShowSpace'){
            this.isHis=true;
        }else{
            this.isHis=false;
        }  		
		this.getResourceList();
    },	 
}
</script>
<style scoped>
#select-box{
  position: relative;
  height: 40px;
  line-height: 40px;
  text-align: left;
  float: left;
  background-color: #fff; 
  border-radius: 5px;
  border: solid 1px #f3f3f3;
  margin-right: 10px;
}
#select-btn{
  min-width: 150px;  
  padding-left: 10px;
  background-color: #fff;
  cursor: pointer;
}
#select-btn input.select{
  float: left;
  padding-left: 10px; 
  min-width: 120px;
  height: 38px;
  line-height: 38px;
  border: none;      
}
#select-btn div{
  float: right;
  margin-right: 10px;
}
#content{  
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 999;
  min-width: 800px;
  height: 300px;   
}
#content ul{  
  float: left;
  min-width: 100px;
  height: 100%;
  overflow-y:auto;
  background-color: #fff;
  border: solid 1px #f3f3f3;  
}
#content li{
	display: block;
	height: 30px;
	line-height: 30px; 
	cursor: pointer;
	margin: 0; 	
	padding: 0 5px;
	text-align: center;
}
#content li:hover{
 background-color: #eee;
}
#content li.active{
 color: #2d8cf0;
}
/* 弹出层 */
#push-box{
	min-height: 100px;
	font-size: 14px;
	margin-bottom: 20px;
	overflow: auto;
}
#push-box>p{
	float: left;
	margin-right: 20px;  
	line-height: 30px;
}
#push-box>div{
	float: left;
	width: 400px;
}
#push-box ul li{
	float: left;
	width: 60px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
}
#push-box .grade-title{
	overflow: hidden;	
}
#push-box .grade-title li{	
	border-radius: 3px;
	margin-right: 5px;	
	background-color: #fff;	
}
#push-box .grade-title li.active{
	color: #50a7ff;	
	background-color: #f8f8f8;
}
#push-box .grade-content{
	overflow: hidden;
	background-color: #f8f8f8;
}
#push-box .grade-content li.active{	
	color: #50a7ff;	
}
#all-check{
	vertical-align: middle;
}
</style>

