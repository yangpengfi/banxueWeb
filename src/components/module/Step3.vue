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
					<li class="lefts unfinished">
						<a href="#">
							<span>4</span>
							<span>提交审核</span>
						</a>
					</li>
				</ul>	
				<div class="upload-info">
					<p class="upload-info-title">上传说明：</p>
					<p>1、可上传文件格式为mp4</p>
					<p>2、建议单个文件不要超过1G</p>
					<p>3、选择课程目录，出现开始上传按钮，上传成功后视频名称会出现在目录后，每个目录只对应一个上传视频，如果上传的视频错误，请重新上传</p>
							
				</div>			
				<div class="add-class">
					<div class="add-title">
						<span>课程名称：</span>
						<b>{{name}}</b>
					</div>
					<div class="upload-box">
						<ul class="add-content" v-if="firstList.length>0">
							<li v-for="item of firstList" @click="changeCatalog(item)">		
								<span :class="{active:item.id==catalogId,left:true}">{{item.name}}</span>
								<uploader :options="options" 
								:file-status-text="statusText" 
								@file-added="fileAdd"  ref="uploader" 
								@file-success="fileSuccess" 
								class="uploader-example left" 
								v-if="item.children.length==0">
									<uploader-btn :attrs="attrs" :class="{active:item.id==catalogId}">上传</uploader-btn>
									<uploader-list></uploader-list>
								</uploader>
								<b class="right" :title="item.fileName">{{item.fileName}}</b>
								<ul v-if="item.children.length>0" class="second-content clear">
									<li v-for="itemSub in item.children" @click.stop="changeCatalog(itemSub)">
										<span :class="{active:itemSub.id==catalogId,left:true}">{{itemSub.name}}</span>
										<uploader :options="options" 
										:file-status-text="statusText" 
										@file-added="fileAdd"  ref="uploader" 
										@file-success="fileSuccess" 
										class="uploader-example left">
											<uploader-btn :attrs="attrs" :class="{active:itemSub.id==catalogId}">上传</uploader-btn>
											<uploader-list></uploader-list>
										</uploader>
										<b class="right" :title="itemSub.fileName">{{itemSub.fileName}}</b>
										<div class="clear"></div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
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
  	name:'Step3',
	data(){
		return {
			msg:{				
				reqError:'请求失败请重试',
                resError:'请求资源失败，请重试',
                addInfo:'添加视频成功',
				deleteInfo:'删除视频成功',
				fileType:'上传文件格式不正确，请重新选择文件上传'
			},    
			params:{
				token:this.$storage.getStorage("token")
			},
			name:this.$route.query.name,
			courseId:this.$route.query.courseId,
			firstList:[],
			catalogId:'',
			dataLoad:[],
			fileName:'',
			options: {
                target: this.$baseURL +'/web/chunkUpload/a/uploadChunkFile',
                testChunks: false,
                forceChunkSize:true,
                simultaneousUploads:1,
                allowDuplicateUploads:true,
                query:{
                    identifier:'',
                    catalogId:0,
                    token:this.$storage.getStorage("token")
                }
            },
            attrs: {
				accept: '.mp4',
				multiple:'false'
            },
            statusText: {  
                success: '成功了',  
                error: '出错了',  
                uploading: '上传中',  
                paused: '暂停中',  
                waiting: '等待中'  
            }, 
		}
	},
	methods:{
		toBack(){			
			this.$router.push({
				path:'/MySpace/CreateClassTwo',
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
			// console.log(this.firstList)
			for(let j=0,lens=this.firstList.length ; j<lens; j++){
				if(this.firstList[j].children.length>0){
					for(let i=0,len=this.firstList[j].children.length ; i<len; i++) {
						if(!this.firstList[j].children[i].fileName){
							this.$Message.error({
			                    content: '末节点课程视频不能为空！',
			                    duration: 2
			                });
							return false;
						}
					}
				}else{
					if(!this.firstList[j].fileName){
						this.$Message.error({
		                    content: '末节点课程视频不能为空！',
		                    duration: 2
		                });
						return false;
					}
				}
			}
			// this.$router.push('/MySpace/CreateClassFour');
			this.$router.push({
				path:'/MySpace/CreateClassFour',
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
			this.updateCource(3)	
		},
		getCourseTree(){
			this.$http.post('/web/course/getCourseCatalogTree.do',qs.stringify({	
				courseId:this.courseId
			})).then(res => {
				let result = res.data;
				if(result.status != 0){
					this.$Message.error(this.msg.resError);
				}else{									
					if(result.data.children instanceof Array && result.data.children.length>0){
						this.firstList = result.data.children;							
					}else{
						this.firstList = [];							
					}
				}
			}) 
		},
		changeCatalog(item){
			// console.log(item)
			if(item.children.length>0&&item.layer==1){
				this.fileName = '';
				this.catalogId = '';
			}else{
				this.fileName = item.name;
				this.catalogId = item.id;
				this.getUniCode();
				if(document.querySelector("input[multiple]")){
					document.querySelector("input[multiple]").removeAttribute('multiple');
				}
			}
			
		},
		getUniCode(){
            this.$http.post('/web/chunkUpload/a/getUniqueIdentifier.do',qs.stringify({				
                fileName:this.fileName,
                token:this.params.token
			})).then(res => {	
				let result = res.data;
				if(result.status != 0){
					this.$Message.error(this.msg.resError);
				}else{	
                    this.uniCode = result.data;	 
                    this.options.query.identifier = result.data;
            		this.options.query.catalogId = this.catalogId;		
				}	
			}) 
        },
		addVideo(identifier,fileName,fileSize,cId){
            this.$http.post('/web/course/a/createCourseCatalogVideo.do',qs.stringify({				
                identifier:identifier,
                fileName:fileName,
                fileSize:fileSize,
                catalogId:cId,
                courseId:this.courseId,                
                token:this.params.token
            })).then(res => {	
                let result = res.data;
                if(result.status != 0){
                    this.$Message.error(this.msg.resError);
                }else{	                           
					this.$Message.success(this.msg.addInfo);
					this.getCourseTree();      
                } 
            }) 
		},
		fileAdd(file){
			let idx=file.name.lastIndexOf(".");
            let fileType=file.name.substr(idx);
            if(fileType!='.mp4'){
                this.$Message.error({
                    content: '请选择mp4类型的文件',
                    duration: 2
                });
            	file.ignored=true;
            }
            this.options.query.catalogId = this.catalogId;
            this.catalogId=0;
		},
		//上传成功的事件  
        fileSuccess (rootFile, file, message, chunk) {  
            
            message = JSON.parse(message);
            // console.log(message)
            // console.log(chunk)
            let cId=JSON.parse(chunk.file.chunks[0].xhr.response).data.catalogId;
            if(message.data.isFileUploadFinish == 1){
                let identifier = message.data.identifier,
                    fileName = file.name,
                    fileSize = file.size;

				this.addVideo(identifier,fileName,fileSize,cId);

                this.getUniCode();

                file.cancel();                
            }else{
            	this.options.query.catalogId = cId;
                file.retry()
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
		}       
	},
	mounted(){
		this.getCourseTree();
	}
}
</script>


<style scoped>
	.add-class{
		width: 700px;
		margin: auto;
	}
	.upload-info{	
		width: 700px;
		margin: auto;	
		margin-bottom: 20px;
	}	
	.upload-info p{	
		margin-left: 20px;
	}
	.upload-info .upload-info-title{
		margin-left: 0;
		font-weight: bold;
	}
	.add-title{
		padding-left: 8px;
	}
	.add-title span{
		font-size: 14px;
		color: #666;
	}
	.add-title b{
		font-size: 14px;
		color: #333;
	}
	.add-content{
		margin: 10px 10px 40px 100px;
	}
	.add-content li{		
		line-height: 42px;
    	clear: both;
	}
	.add-content li>span{
		margin-right: 20px;
	}
	.add-content li b{    
		display: inline-block;
	    width: 80px;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
		color: #666;
	    font-weight: normal;
	    text-decoration: underline;
	}
	.second-content{
		margin-top: 10px;
	}
	.second-content>li>span{
		margin-left: 20px;
		margin-right: 10px;
	}		
	.add-content li span.active{
		color:#47a2ff;
	}
	.ivu-btn-ghost.active{
		color: #2d8cf0;		
		border-color: #2d8cf0;
	}
	.to-btn{
		margin-top: 40px;
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
	.upload-box{
		overflow: hidden;		
	}
	.uploader-example{
		/*width: 200px;*/
	}
	.uploader-example .uploader-btn{
	    color: #50a7ff; 
		border: none;
		display: none;
	}
	.uploader-example .uploader-btn.active{
		display: inline-block;
	}
	.uploader-example .uploader-list {
		max-width: 350px;
		max-height: 200px;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
