<template>
    <div class="load-box">
        <div class="title">{{resourceKindId == 1?'上传同步资源':'上传知识点'}}</div>
        <div id="load-resource">
            <div class="left resource-lay">
                <div class="resource-search">
                    <div id="res-select-box">
                        <div id="select-btn">
                            <input class="select" v-model="selData" readonly @click="openSel" placeholder="选择上传类别">
                            <Icon type="chevron-down" size=16></Icon>
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
                </div> 
                <ul class="section" v-if="nodeTree.length<1"> 
					<li>暂无任何资源数据</li>  
				</ul>                
				<ul class="section" v-if="nodeTree.length>0">
					<li v-for="item of nodeTree">
						<div>
							<b @click="unfold1(item)" class="fold">
								<Icon type="ios-plus-outline" size=20 v-if="item.children.length>0"></Icon>
							</b>                            
							<span @click="tabLoad1(item)" :class="{active:item.id==loadId1}">{{item.name}}</span>								
						</div>
						<ul class="joint" v-if="item.children.length>0" :class="{active:item.id == foldId1}">
							<li v-for="item of item.children">
								<div>
									<b @click="unfold2(item)" class="fold">
										<Icon type="ios-plus-outline" size=20 v-if="item.children.length>0"></Icon>
									</b>  
									<span @click="tabLoad2(item)" :class="{active:item.id==loadId2}">{{item.name}}</span>										                                  
								</div>
								<ul class="bar-line" v-if="item.children.length>0" :class="{active:item.id == foldId2}">
									<li v-for="item of item.children">                                        
										<span @click="tabLoad3(item)" :class="{active:item.id==loadId3}">{{item.name}}</span>											 
									</li>
								</ul>                               
							</li>
						</ul>
					</li>
				</ul>
            </div>
            <div class="left">
                <p>上传说明：</p>
                <p>1、可上传文件格式为doc、docx、ppt、pptx、xls、xlsx、jpg、png、bmp、pdf、txt、mp3、rmvb、mp4、avi</p>
                <p>2、建议单个文件不要超过1G</p>
                <p>3、选择课程目录，出现开始上传按钮，上传成功后视频名称会出现在表格中，如果上传的视频错误，请重新上传</p>
                <uploader :options="options" :file-status-text="statusText" ref="uploader" @file-success="fileSuccess" class="uploader-example">
                    <uploader-btn :class="{active:bid1 !=''||bid2 !=''||bid3 !=''||kid1 !=''||kid2 !=''||kid3 !=''}">开始上传</uploader-btn>
                    <uploader-list></uploader-list>
                </uploader>
                <Table border :columns="resourceKindId == 1? columns1:columns2" :data="dataLoad"></Table>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs"
export default {
  name:'LoadResource',
    data(){
         return {
            resourceKindId:this.$route.params.resourceKindId,
            open:false,
            boxShow:false,
            columns1: [
                 {
                     title: '文件名称',
                     key: 'name'
                },
                {
                    title: '大小',
                    key: 'size'
                },
                {
                    title: '学段',
                    key: 'period'
                },
                {
                    title: '学科',
                    key: 'subject'
                },
                {
                    title: '教材版本',
                    key: 'book'
                },
                {
                    title: '册别',
                    key: 'textbook'
                },
                {
                    title: '章',
                    key: 'section'
                },
                {
                    title: '节',
                    key: 'joint'
                },
                {
                    title: '小节',
                    key: 'barline'
                },
                {
                    title: '操作',
                    key: 'operator',
                    render: (h, params) => {
                            return h('div', [                                
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '删除',
                                                content: '<p>确定删除资源吗？</p>',
                                                onOk: () => {
                                                    this.remove(params.index);          
                                                }
                                            });
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            columns2: [
                 {
                     title: '文件名称',
                     key: 'name'
                },
                {
                    title: '大小',
                    key: 'size'
                },
                {
                    title: '学段',
                    key: 'period'
                },
                {
                    title: '学科',
                    key: 'subject'
                },
                {
                    title: '1级知识点',
                    key: 'firstknow'
                },
                {
                    title: '2级知识点',
                    key: 'twoknow'
                },
                {
                    title: '3级知识点',
                    key: 'thirdknow'
                },
                {
                    title: '操作',
                    key: 'operator',
                    render: (h, params) => {
                            return h('div', [                                
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '删除',
                                                content: '<p>确定删除资源吗？</p>',
                                                onOk: () => {
                                                    this.remove(params.index);          
                                                }
                                            });
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            dataLoad:[],  
            msg:{				
				reqError:'请求失败请重试',
                resError:'请求资源失败，请重试',
                addInfo:'添加资源成功',
                deleteInfo:'删除资源成功'
			},          
            params:{	
				token:this.$storage.getStorage("token")
			},
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
            nodeTree:[],
            loadId1:'',
			loadId2:'',
			loadId3:'',
            foldId1:'',
            foldId2:'',
			bid1:'',
            bid2:'',
            bid3:'',
            kid1:'',
            kid2:'',
            kid3:'',
            bname1:'',
            bname2:'',
            bname3:'',
            kname1:'',
            kname2:'',
            kname3:'',
            fileName:'',
            uniCode:'',
            uniCodeList:[],
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
        tabLoad1(item){
            this.loadId1 = item.id;  
			this.loadId2 = '';
			this.loadId3 = '';
			if(this.resourceKindId == 1){
                this.bid1 = item.id; 
                this.bname1 = item.name;           
			}else if(this.resourceKindId == 2){
                this.kid1 = item.id;
                this.kname1 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
		tabLoad2(item){
            this.loadId2 = item.id; 
			this.loadId1 = '';
			this.loadId3 = ''; 
			if(this.resourceKindId == 1){
                this.bid2 = item.id; 
                this.bname2 = item.name;              
			}else if(this.resourceKindId == 2){
                this.kid2 = item.id;
                this.kname2 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
		tabLoad3(item){
            this.loadId3 = item.id; 
			this.loadId1 = '';
			this.loadId2 = ''; 
			if(this.resourceKindId == 1){
                this.bid3 = item.id;
                this.bname3 = item.name;              
			}else if(this.resourceKindId == 2){
                this.kid3 = item.id;
                this.kname3 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
		unfold1(item){              
            this.foldId1 = item.id;
        },
        unfold2(item){              
            this.foldId2 = item.id;
        },            
        getKnowTree(){
            this.$http.post('/web/coursebook/getKnowledgePointTree.do',qs.stringify({				
				periodId:this.periodId,
				subjectId:this.subjectId,				
				withDisabledNode:1
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error('请求失败请重试');
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error('请求资源失败，请重试');
					}else{	
						if(result.data.children instanceof Array && result.data.children.length>0){
                            this.nodeTree = result.data.children;
						}else{
							this.nodeTree = [];
						}						
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
        },
        getNodeTree(){
            this.$http.post('/web/coursebook/getBookNodeTree.do',qs.stringify({				
				periodId:this.periodId,
				subjectId:this.subjectId,
				versionId:this.bookId,
				textbookId:this.textBookId,
				withDisabledNode:1
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error('请求失败请重试');
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error('请求资源失败，请重试');
					}else{	
						if(result.data.children instanceof Array && result.data.children.length>0){
                            this.nodeTree = result.data.children;
						}else{
							this.nodeTree = [];
						}						
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
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
					this.$Message.error('请求失败请重试');
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error('请求资源失败，请重试');
					}else{	
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.subjectList = result.data.list;
							if(result.data.list.length == 1){
								this.open=false;
							}
						}else{
                            this.subjectList = [];
                            this.nodeTree = []
                            this.open=false;
						}						
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
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
					this.$Message.error('请求失败请重试');
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error('请求资源失败，请重试');
					}else{	
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.bookList = result.data.list;							
						}else{
                            this.bookList = [];
                            this.nodeTree = []
                            this.open=false;
						}
						
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
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
					this.$Message.error('请求失败请重试');
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error('请求资源失败，请重试');
					}else{							
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.textBookList = result.data.list;							
						}else{
                            this.textBookList = [];
                            this.nodeTree = []
                            this.open=false;
						}
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
        },
        getsubject(id,name){      
			this.bookList = [];
			this.textBookList = [];
			this.subjectId = '';
			this.period = name;
			this.periodId = id;
            this.getSubjectList(id);
		},
		getbook(id,name){
			this.textBookList = [];
			this.bookId = '';
			this.subject = name;
            this.subjectId = id;
            if(this.resourceKindId == 1){
                this.getBookList(id);
            }else if(this.resourceKindId == 2){
                this.selData = this.period+'/'+this.subject;
                this.open = false;
                this.getKnowTree();   
            }
		},
		gettexBook(id,name){
			this.book = name;
			this.bookId = id;
			this.getTextBookList(id);
		},
		seltexBook(id,name){
			this.textBookId = id;
			this.texBook = name;
			this.selData = this.period+'/'+this.subject+'/'+this.book+'/'+this.texBook;
            this.open = false;
            this.getNodeTree();
		},
		openSel(){
			if(!this.open){
				this.open = true;				
			}else{
				this.open = false;
			}      
        }, 
        conver(limit){  
            var size = "";  
            if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B  
                size = limit.toFixed(2) + "B";    
            }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
                size = (limit / 1024).toFixed(2) + "KB";              
            }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
                size = (limit / (1024 * 1024)).toFixed(2) + "MB";  
            }else{ //其他转化成GB  
                size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";  
            }  
            
            var sizestr = size + "";   
            var len = sizestr.indexOf("\.");  
            var dec = sizestr.substr(len + 1, 2);  
            if(dec == "00"){//当小数点后为00时 去掉小数部分  
                return sizestr.substring(0,len) + sizestr.substr(len + 3,2);  
            }  
            return sizestr;  
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
        addResource(identifier,fileName,fileSize){
            this.$http.post('/web/coursebook/a/createResourceLocal.do',qs.stringify({				
                identifier:identifier,
                fileName:fileName,
                fileSize:fileSize,
                resourceKindId:this.resourceKindId,
                periodId:this.periodId,
                subjectId:this.subjectId,
                versionId:this.bookId,
                textbookId:this.textBookId,
                bid1:this.bid1,
                bid2:this.bid2,
                bid3:this.bid3,
                kid1:this.kid1,
                kid2:this.kid2,
                kid3:this.kid3,
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
                        }
                    }  
            }).catch(function (error) {
                        alert(error);
            });
        },
        //上传成功的事件  
        fileSuccess (rootFile, file, message, chunk) {  
            
            message = JSON.parse(message);
            
            if(message.data.isFileUploadFinish == 1){
                let identifier = message.data.identifier,
                    fileName = file.name,
                    fileSize = file.size;

                this.addResource(identifier,fileName,fileSize);
                this.uniCodeList.push(identifier);
                if(this.resourceKindId == 1){
                    this.dataLoad.push({
                        name: fileName,
                        size: this.conver(fileSize),
                        period: this.period,
                        subject: this.subject,
                        book: this.book,
                        textbook: this.textbook,
                        textbook:this.texBook,
                        section: this.bname1,
                        joint: this.bname2,
                        barline: this.bname3      
                    })
                }else if(this.resourceKindId == 2){
                    this.dataLoad.push({
                        name: fileName,
                        size: this.conver(fileSize),
                        period: this.period,
                        subject: this.subject,                   
                        firstknow: this.kname1,
                        twoknow: this.kname2,
                        thirdknow: this.kname3   
                    })
                }

                this.getUniCode();

                file.cancel();
                
            }
        },
        remove(index){
            this.dataLoad.splice(index, 1);
            var localIden = this.uniCodeList[index];
            this.$http.post('/web/coursebook/a/deleteUploadResourceFile.do',qs.stringify({				
                identifier:localIden,
                resourceKindId:this.resourceKindId,
                token:this.params.token
            })).then(res => {	
                    if(res.status != 200){
                        this.$Message.error(this.msg.reqError);
                    }else{
                        let result = res.data;
                        if(result.status != 0){
                            this.$Message.error(this.msg.resError);
                        }else{	                            
                            this.$Message.success(this.msg.deleteInfo);
                        }
                    }  
            }).catch(function (error) {
                    alert(error);
            });
        }
    }
}
</script>
<style scoped>
.load-box{
    width: 1200px;
    margin: 30px auto 60px;
    background-color: #fff;
    border: 1px solid #e9e9e9;
}
.load-box>.title{
    height: 36px;
    line-height: 36px;
    background-color: #f0f0f0;
    padding-left: 20px;
    border-bottom:1px solid #e9e9e9;
    font-size: 14px;
}
#load-resource{
    min-height: 900px;
    padding:30px 0;
    overflow-y:auto;
}
.resource-lay{
    width: 250px;
    padding-left: 20px;
    margin-right: 20px;
}
.resource-search{
    width: 100%;
    height: 50px;
}
#res-select-box{
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    float: left;
    background-color: #fff; 
    border-radius: 5px;
    border: solid 1px #eee;
    margin-right: 10px;
}
#res-select-box input{ 
    width: 200px; 
    padding-left: 10px;
    height: 36px;
    line-height: 36px;
    border: none;      
}
.ivu-icon-chevron-down{
    float: right;
    margin-top: 12px;
    margin-right: 8px;
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
.section{
    width: 100%;
    height: 550px;    
    overflow-y:auto;
}
.section li{
    margin: 10px;  
}
.joint>li{
    margin-right: 0;  
}
.bar-line>li{
    margin-right: 0;  
}
.section li .ivu-icon-ios-plus-outline{
   cursor: pointer;
}
.section li p{
    float: right;
    cursor: pointer;
    display: none;
    margin-top: 3px;
}
.section li p.active{
    display: block;
}
.section li span{
    cursor: pointer;
}
.section li span.active{
    color: #47a2ff;
}
.section li .ivu-icon-ios-cloud-upload-outline{
    color: #47a2ff;    
}
.ivu-table-wrapper{
    width: 900px;
    margin-top: 15px;
}
.fold{
    display: inline-block;
    width: 18px;
    height: 20px;
}
.joint,.bar-line{
    display: none;
}
.joint.active,.bar-line.active{
    display: block;
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


