<template>
    <div>
        <div id="load-resource">
            <div class="left">
                <div class="leftHead" @click="showSel">
                    <span class="leftTitle">{{per2sub}} <br> <small :title="ver2text">{{ver2text}}</small></span>
                    <Icon type="chevron-down"></Icon>
                    <transition name="mybox">
                    	<div :class="{selDown:true,top74:resourceKindId==1,top47:resourceKindId==2}" v-show="boxshow">
	                        <p>
	                            <span>学 段：</span>
	                            <select v-model="sel.periodId">
	                                <option value="0">请选择学段</option>
	                                <option value="3">小学</option>
	                                <option value="2">初中</option>
	                                <option value="1">高中</option>
	                            </select>
	                        </p>
	                        <p>
	                            <span>学 科：</span>
	                            <select v-model="sel.subjectId">
	                                <option value="0">请选择学科</option>
	                                <option v-for="item in subjectList" :value="item.subjectId">{{item.subjectName}}</option>
	                            </select>
	                        </p>
	                        <p v-show="resourceKindId==1">
	                            <span>版 本：</span>
	                            <select v-model="sel.versionId">
	                                <option value="0">请选择版本</option>
	                                <option v-for="item in bookList" :value="item.id">{{item.name}}</option>
	                            </select>
	                        </p>
	                        <p v-show="resourceKindId==1">
	                            <span>册 别：</span>
	                            <select v-model="sel.textbookId">
	                                <option value="0">请选择册别</option>
	                                <option v-for="item in textBookList" :value="item.textbookId">{{item.textbookName}}</option>
	                            </select>
	                        </p>
	                        <p class="text-center">
	                            <span class="bxw-btn-info-xs" @click.stop="mySure">确定</span>
	                        </p>
	                    </div>
                	</transition>
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
        </div>
    </div>
</template>
<script>
import qs from "qs"
export default {
  name:'SelectTree',
  props:{
  	resourceKindId:{
            type:Number,
            required:true
        }
  },
    data(){
         return {
            params:{	
				token:this.$storage.getStorage("token")
			},
            subjectList:[],
			bookList:[],
			textBookList:[],
			periodId:2,
			subjectId:2,
			bookId:'',
			textBookId:'',
			period:'',
			subject:'',
			book:'',
			texBook:'',
			boxshow:false,
			per2sub:'初中数学',
			ver2text:'人教版七年级上册',
			classList:[
				{id:1,name:'高中'},
				{id:2,name:'初中'},
				{id:3,name:'小学'},
			],
			sel:{
				periodId:2,
	            subjectId:2,
	            versionId:293,
	            textbookId:1343,
			},			
			selData:'',           
            nodeTree:[],
            loadId1:'',
			loadId2:'',
			loadId3:'',
            foldId1:'',
            foldId2:''
        }
    },
    watch:{
        'sel.periodId': 'filterPer',
        'sel.subjectId': 'filterSub',
        'sel.versionId': 'filterVer',
        deep:true
    },
    methods:{
    	filterPer:function () {
            this.sel.subjectId=0;
            this.sel.versionId=0;
            this.sel.textbookId=0;
            this.subList=[];
            this.verList=[];
            this.textList=[];
            if(this.sel.periodId == '0'){
                return;
            }else{
                this.getSubjectList(this.sel.periodId);
            }
        },
        filterSub:function () {
            this.sel.versionId=0;
            this.sel.textbookId=0;
            this.verList=[];
            this.textList=[];
            if(this.sel.subjectId == '0'){
                return;
            }else{
                this.getVersionList(this.sel.periodId,this.sel.subjectId);
            }
        },
        filterVer:function () {
            this.sel.textbookId=0;
            this.textList=[];
            if(this.sel.versionId == '0'){
                return
            }else{
                this.getTextbookList(this.sel.periodId,this.sel.subjectId,this.sel.versionId);
            }
        },
        showSel:function () {
            this.boxshow = true;
        },
        mySure:function () {
        	this.boxshow = false;
            // console.log(this.sel.textbookId)
            // if(this.sel.textbookId){
            //     $('.selDown').slideUp(200);
            //     this.per2sub=$('#pre option:checked').text()+$('#sub option:checked').text();
            //     this.ver2text=$('#ver option:checked').text()+$('#tex option:checked').text();
            //     getNodeTree(this.sel);
            //     this.uploadPram=this.sel;
            // }
        },
        tabLoad1(item){
            this.loadId1 = item.id;  
			this.loadId2 = '';
			this.loadId3 = '';
			if(this.resourceKindId == 1){
                this.params.bid1 = item.id; 
                // this.params.bname1 = item.name;           
			}else if(this.resourceKindId == 2){
                this.params.kid1 = item.id;
                // this.params.kname1 = item.name; 
            }
            this.$root.$emit('getResourceList',this.params);
        },
		tabLoad2(item){
            this.loadId2 = item.id; 
			this.loadId1 = '';
			this.loadId3 = ''; 
			if(this.resourceKindId == 1){
                this.params.bid2 = item.id; 
                // this.params.bname2 = item.name;              
			}else if(this.resourceKindId == 2){
                this.params.kid2 = item.id;
                // this.params.kname2 = item.name; 
            }
            console.log(item)
            console.log(this.params.bid2)
            this.$root.$emit('getResourceList',this.params);
        },
		tabLoad3(item){
            this.loadId3 = item.id; 
			this.loadId1 = '';
			this.loadId2 = ''; 
			if(this.resourceKindId == 1){
                this.params.bid3 = item.id;
                // this.params.bname3 = item.name;              
			}else if(this.resourceKindId == 2){
                this.params.kid3 = item.id;
                // this.params.kname3 = item.name; 
            }
            this.$root.$emit('getResourceList',this.params);
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
						}						
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
		},	
		getVersionList(subjectId){
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
		}
    },
    created(){
    	this.getKnowTree();
    	console.log(this.resourceKindId)
    }
}
</script>
<style scoped>
.text-center{
	text-align: center;
}
#load-resource{
    min-height: 900px;
    overflow-y:auto;
}
.leftHead{
	margin-top: 20px;
    width: 220px;
    padding: 10px 20px;
    background-color: #1caaf1;
    text-align: center;
    position: relative;
}
.leftTitle{
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 24px;
    max-width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.leftHead>i{
    color:#fff;
    font-size: 16px;
    position: absolute;
    top:28px;
    right: 10px;
}
.selDown{
    text-align: left;
    position: absolute;
    left:0;
    width: 220px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    background-color: #f8f8f8;
    overflow: hidden;
    z-index: 10;
}
.top74{
	top:74px;
}
.top47{
	top:47px;
}
.selDown>p{
    line-height: 40px;
}
.selDown>p select{
    width: 125px;
    height: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding-left: 7px;
    color: #666;
}
.bxw-btn-info-xs{
    display: inline-block;
    padding:0 25px;
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    color:#fff;
    cursor: pointer;
    text-decoration: none;
    background-color: #1daaf3;
}
.mybox-leave-active,.mybox-enter-active{
    transition:  all .5s; 
}
.mybox-leave-active,.mybox-enter{
	padding: 0 15px;
    height:0px !important;
}
.mybox-leave,.mybox-enter-active{
	padding: 15px;
    height: 242px;
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


