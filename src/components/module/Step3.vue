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
					<p>1、可上传文件格式为mp4,mkv</p>
					<p>2、建议单个文件不要超过1G</p>
					<p>3、选择课程目录，出现开始上传按钮，上传成功后视频名称会出现在目录后，每个目录只对应一个上传视频，如果上传的视频错误，请重新上传</p>
							
				</div>			
				<div class="add-class">
					<div class="add-title">
						<span>课程名称：</span>
						<b>{{name}}</b>
					</div>
					<div class="upload-box">
						<ul class="add-content left" v-if="firstList.length>0">
							<li v-for="item of firstList">							
								<span @click="changeCatalog(item)" :class="{active:item.id==catalogId}">{{item.name}}</span>
								<b class="right">{{item.fileName}}</b>
								<ul v-if="item.children.length>0" class="second-content">
									<li v-for="item in item.children">
										<span @click="changeCatalog(item)" :class="{active:item.id==catalogId}">{{item.name}}</span>
										<b class="right">{{item.fileName}}</b>
									</li>
								</ul>
							</li>
						</ul>
						<uploader :options="options" :file-status-text="statusText" ref="uploader" @file-success="fileSuccess" class="uploader-example left">
							<uploader-btn :class="{active:catalogId !=''}" :attrs="attrs">开始上传</uploader-btn>
							<uploader-list></uploader-list>
						</uploader>	
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
                target: 'http://192.168.8.251/banxue/web/chunkUpload/a/uploadChunkFile',
                testChunks: false,
                forceChunkSize:true,
                simultaneousUploads:1,
                allowDuplicateUploads:true,
                query:{
                    identifier:'',
                    token:this.$storage.getStorage("token")
                }
            },
            attrs: {
				accept: '.mp4,.mkv'
            },
            statusText: {  
                success: '成功了',  
                error: '出错了',  
                uploading: '上传中',  
                paused: '暂停中',  
                waiting: '等待中'  
            }  
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
		changeCatalog(item){
			this.fileName = item.name;
			this.catalogId = item.id;
			this.getUniCode();
		},
		getUniCode(){
            this.$http.post('/web/chunkUpload/a/getUniqueIdentifier.do',qs.stringify({				
                fileName:this.fileName,
                token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
                        this.uniCode = result.data;	 
                        this.options.query.identifier = result.data;	
					}
				}	
			}).catch(function (error) {
				alert(error);
			});
        },
		addVideo(identifier,fileName,fileSize){
            this.$http.post('/web/course/a/createCourseCatalogVideo.do',qs.stringify({				
                identifier:identifier,
                fileName:fileName,
                fileSize:fileSize,
                catalogId:this.catalogId,
                courseId:this.courseId,                
                token:this.params.token
            })).then(res => {	
                    if(res.status != 200){
                        this.$Message.error(this.msg.reqError);
                    }else{
                        let result = res.data;
                        if(result.status != 0){
                            this.$Message.error(this.msg.resError);
                        }else{	                            
							this.$Message.success(this.msg.addInfo);
							this.getCourseTree();      
                        }
                    }  
            }).catch(function (error) {
                        alert(error);
            });
		},
		/*fileAdded(file, event){
			if(file.fileType != 'video/mp4' || file.fileType != 'video/mp3'){
				file.cancel();       
				this.$Message.error(this.msg.fileType);
			}
		},*/
		//上传成功的事件  
        fileSuccess (rootFile, file, message, chunk) {  
            
            message = JSON.parse(message);
            
            if(message.data.isFileUploadFinish == 1){
                let identifier = message.data.identifier,
                    fileName = file.name,
                    fileSize = file.size;

				this.addVideo(identifier,fileName,fileSize);

                this.getUniCode();

                file.cancel();                
            }
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
		/* border-bottom: 1px solid #ddd; */
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
		min-width: 300px;
		margin: 10px 10px 40px 20px;
		padding-right: 10px;
		border-right:1px solid #ddd;
	}
	.add-content li{		
		margin-bottom: 10px;
	}
	.second-content{
		margin-top: 10px;
	}
	.second-content>li>span{
		margin-left: 10px;
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
	.upload-box{
		overflow: hidden;		
	}
	.uploader-example{
		width: 350px;
	}
	.uploader-example .uploader-btn{
		margin: 10px 0;
		display: none;
	}
	.uploader-example .uploader-btn.active{
		display: block;
		color: #fff;    
		background-color: #f90;
		border-color: #f90;
	}
	.uploader-example .uploader-btn.active:hover{
		background-color: #ffad33;
		border-color: #ffad33;
	}
	.uploader-example .uploader-list {
		max-height: 440px;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
