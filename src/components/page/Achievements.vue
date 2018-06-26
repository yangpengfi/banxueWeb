<template>
<div class="article-container">
	<div class="leftside left">
		<ul>
			<li @click="changeTitle(0)" :class="{active:nowId==0}">
				<span></span>
				<a href="javascript:void(0);">全部分类</a>
				<b @click.stop="modalClick" v-show="!isHis">
					<Icon type="ios-medical-outline" color="#999" size="20px" title="设置分类"></Icon>
				</b>
			</li>
			<li v-for="(item,index) in achList" 
			@click="changeTitle(item)" 
			:class="{active:item.typeId==nowId}"
			:key="item.typeId">
				<span></span>
				<a href="javascript:void(0);">{{item.typeName}}({{item.articleCount}})</a>
			</li>			
		</ul>
	</div>
	<div id="article-content">
		<p class="article-btn" v-show="!isHis">
			<button @click="toWrite">写文章</button>
			<button @click="showBatch" :class="{active:ifBatch==true}">批量管理</button>
		</p>
		<div class="batch-modify" v-if="ifBatch">
			<input type="checkbox" v-model="single" @change="allSelect()" id="allSelect" />
			<label for="allSelect">全选</label>
			<span @click="clickSetOpen()">设置权限</span>
			<span @click="clickUploadType()">修改分类</span>
			<!-- <Poptip v-show="selArticalId.length>0"
		        confirm
		        title="是否要删除选中的文章?"
		        @on-ok="sureDel"
		        @on-cancel="cancelDel">
				<span class="modifySpan">删除</span>
			</Poptip> -->
		</div>			
		<ul class="content-list">
			<li v-for="item of articleList">					
				<p class="left contLink">
					<input type="checkbox" @change="singleSelect()" v-model="item.check" :value="item.articleId" v-if="ifBatch"/>
          <b v-if="item.openStatus==2"><Icon type="locked" color="#ff9900"></Icon></b>
					<span v-html="item.title" @click="goArticleId(item)"></span>
				</p>
				<div class="right">
					<span class="mr20 detes" :title="item.typeName">{{item.typeName}}</span>
					<span class="detes">{{formatTime(item.createTime)}}</span>
					<!-- <span class="nums">{{item.num}}/{{item.total}}</span>	 -->
				</div>
				<div class="edit" v-show="!isHis">
					<p class="edit-title">
						<span>编辑</span> 
						<Icon type="arrow-down-b" color="#1caaf1"></Icon>
					</p>
					<div class="edit-content">
						<span @click="clickSetOpen(item)">设置权限</span>
						<Poptip
					        confirm
					        title="是否要删除这篇文章?"
					        @on-ok="sureDel(item.articleId)"
					        @on-cancel="cancelDel">
							<span class="editSpan">删除文章</span>
						</Poptip>
						<span @click="clickUploadType(item)">修改分类</span>
						<span @click="toTop(item.articleId)">置顶</span>
					</div>
				</div>										
			</li>				
		</ul>		
    <div class="myPage">
      <Page :total="totalCount" 
      :current="currPage" 
      @on-change="pageChange" 
      ></Page>
    </div>	
	</div>
	<Modal
        v-model="modal1"
        title="设置分类"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="typeBox">
        	<p v-for="item in  myList" v-if="item.typeName!='未分类'">
        		<span class="iptText" 
        		v-if="!(item.typeId==currTypeId)" 
        		@click="edit(item)">{{item.typeName}}</span>
	        	<input type="text" v-model="typeName" v-if="(item.typeId==currTypeId)" maxlength="5" title="长度不超过5" id="typeIpt"> 
	        	<span v-if="!(item.typeId==currTypeId)" @click="edit(item)">编辑</span>
	        	<span v-if="!(item.typeId==currTypeId)" @click="del(item)">删除</span>
	        	<span v-if="(item.typeId==currTypeId)" @click="cancels(item)">取消</span>
	        	<span v-if="(item.typeId==currTypeId)" @click="sure(item)">确定</span>
        	</p>
        	<p class="add" @click="addType">+ 添加分类</p>
        </div>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok">关闭</button>
        </div>
    </Modal>
	<Modal
        v-model="modal2"
        title="设置权限"
        @on-ok="ok2"
        @on-cancel="cancel2">
        <div class="authorityInput">
        	<input type="radio" name="authority" value="1" 
			v-model="openStatus"/><label>所有人可见</label>
			<input type="radio" name="authority" value="2" 
			v-model="openStatus"/><label>仅自己可见</label>
        </div>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok2">保存</button>
        </div>
    </Modal>
	<Modal
        v-model="modal3"
        title="修改分类"
        @on-ok="ok3"
        @on-cancel="cancel3" width="300px">
        <div class="selBox">
        	<Select v-model="selTypeId" filterable>
				<Option v-for="item in achList" :value="item.typeId" :key="item.typeId">{{item.typeName}}</Option>
			</Select>
        </div>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok3">保存</button>
        </div>
    </Modal>
</div>
</template>
<script>
import global_ from '@/components/Global';
export default {
	name:'Achievements',
  data () {
    return {
      	token:this.$storage.getStorage("token"),
        achList:[],
  			 myList:[],
  			selArticalId:[],
  			nowId:0,
  			articleList:[
  				{title:'《素书》相传为秦末黄石公作。民间视为奇书、天书。《素书》以道家思想为宗旨。',"createTime": 1525500298000,"articleId": 2,total:'20',num:'8'},
  			],
  			openStatus:1,
  			articleId:1,
  			selTypeId:0,
  			typeName:'',
  			single:false,			
  			ifBatch:false,
  			currTypeId:0,
  			formatTime:global_.formatTime,
  			modal1: false,			
  			modal2: false,			
  			modal3: false,
        totalCount:0,
        currPage:1,
  			userId:'',
        isHis:true			
    }
	},
	methods:{
    		ok () {
                this.modal1 = false;
                this.currTypeId=0;
                this.typeName='';
                this.getAchList();
            },
    		ok2 () {
    			this.setOpen(this.openStatus); 
                this.modal2 = false;
            },
    		ok3 () {
    			this.uploadType (this.selTypeId);
            this.modal3 = false;
        },
        cancel() {
        	this.currTypeId=0;
        	this.typeName='';
          this.getAchList();
        },
        cancel2() {
        	this.currTypeId=0;
        	this.typeName='';
        },
        cancel3() {
        	this.currTypeId=0;
        	this.typeName='';
        },
        edit (item) {
           this.currTypeId=item.typeId;
           this.typeName=item.typeName;
           this.$storage.setSession('atcItem',item);
        },
        sure (item) {
        	let url=item.typeId == '-1' ? '/web/space/article/a/createArticleType.do' : '/web/space/article/a/updateArticleType.do';
        	this.$http.post(url,this.$qs.stringify({
              token:this.token,
              name:this.typeName,
              typeId:item.typeId
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status == 0){
              	this.currTypeId=0;
              	this.typeName='';
              	this.getAchList();
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            }) 
        },
        cancels(item) {
          if(item.typeId=='-1'){
            this. myList.pop(item);
          }
        	this.currTypeId=0;
        	this.typeName='';
          this.getAchList();
        },
        del(item) {
            this.$http.post("/web/space/article/a/deleteArticleType.do",this.$qs.stringify({
              token:this.token,
              typeId:item.typeId
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status == 0){
              	this.getAchList();
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            }) 
        },
        addType() {
        	let item={
            	"articleCount": 0,
      				"type": "0",
      				"typeId": '-1',
      				"typeName": "新增分类"
      			};
            if(this.currTypeId!='-1'){
              this. myList.push(item); 
            }
			      this.currTypeId='-1';
            this.typeName="新增分类";
            if(document.getElementById('typeIpt'))
            document.getElementById('typeIpt').focus()
        },
        modalClick(){
        	this.modal1=true;
        },
        sureDel(item){
        	if(item){
        		this.delAtcal(item);
        	}else{
        		this.delAtcal();
        	}
        },
        cancelDel(){

        },
    		showBatch(){//批量操作按钮
    			let vm=this;	
    			if(!this.ifBatch){
    				this.ifBatch = true;
    				this.single = false;
    				vm.selArticalId=[];
    				vm.articleList.forEach(item => {
    		            item.check = vm.single
    		        })		
    			}else{
    				this.ifBatch = false;
    			}
    		},
    		allSelect(){//全选
    			let vm = this;
    			vm.selArticalId=[];
    	        vm.articleList.forEach(item => {
    	            item.check = vm.single
    	            if(vm.single){
    	            	vm.selArticalId.push(item.articleId)
    	            }
    	        })
    		},
  	    singleSelect() {//单选
  	        let vm = this;
  	        vm.selArticalId=[];
  	        let selectData = vm.articleList.filter(item => {
  	            return item.check == true
  	        })
  	        vm.articleList.forEach(item => {
  	        	if(item.check == true){
  	        		vm.selArticalId.push(item.articleId);
  	        	}
  	        })
  	        selectData.length == vm.articleList.length ? vm.single = true : vm.single = false;
  	    },
    		toWrite(){
    			this.$router.push('/MySpace/WriteArticle');
    		},
    		changeTitle(item){   
    			if(item==0){
            if(item==this.nowId){
              this.$router.go(0)
            }  
    				this.nowId=0;
            this.$storage.setStorage('leftNowId',this.nowId)
    				this.getArticleList(this.nowId,this.currPage);
    				return;
    			} 
          if(item.typeId==this.nowId){
            this.$router.go(0)
          }  
    			this.nowId=item.typeId;
          this.$storage.setStorage('leftNowId',this.nowId)
          this.currPage=1;
    			this.getArticleList(this.nowId,this.currPage); 			
    		},
    		clickSetOpen(item){
    			if(item){
    				this.openStatus=item.openStatus;
    				this.articleId=item.articleId;
    				this.selArticalId=[];
    				this.selArticalId.push(item.articleId);
    			}
          if(this.selArticalId.length>0){
            this.modal2 = true;
          }else{
            this.$Message.warning({
                content: '至少选择一条数据！',
                duration: 2
            });
          }
    		},
        setOpen (openStatus) {
        	this.$http.post("/web/space/article/a/updateOpenStatus.do",this.$qs.stringify({
              token:this.token,
              openStatus:openStatus,
              articleIds:JSON.stringify(this.selArticalId)
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId,this.currPage);
              	this.$Message.success(result.message);  
                this.single = false;
                this.selArticalId=[];
              }else{ 
                this.$Message.error(result.message);      
              }      
            } 
            }) 
        },
    		clickUploadType(item){
    			if(item){
    				this.selTypeId=item.typeId;
    				this.articleId=item.articleId;
    				this.selArticalId=[];
    				this.selArticalId.push(item.articleId);
    			}
          if(this.selArticalId.length>0){
            this.modal3 = true;
          }else{
            this.$Message.warning({
                content: '至少选择一条数据！',
                duration: 2
            });
          }
    		},
        uploadType (typeId) {
        	this.$http.post("/web/space/article/a/updateTypeId.do",this.$qs.stringify({
              token:this.token,
              typeId:typeId,
              articleIds:JSON.stringify(this.selArticalId)
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId,this.currPage);
              	this.$Message.success(result.message); 
                this.single = false; 
                this.selArticalId=[];
                this.getAchList();
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            }) 
        },
        delAtcal (articleId) {
        	if(articleId){
    				this.selArticalId=[];
    				this.selArticalId.push(articleId);
    			}
        	this.$http.post("/web/space/article/a/deleteArticle.do",this.$qs.stringify({
              token:this.token,
              articleIds:JSON.stringify(this.selArticalId)
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId,this.currPage);
              	this.$Message.success(result.message);
                this.single = false;  
                this.selArticalId=[];
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            }) 
        },
        toTop (articleId) {
        	this.$http.post("/web/space/article/a/toTOP.do",this.$qs.stringify({
              token:this.token,
              articleId:articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId,this.currPage);
              	this.$Message.success(result.message);  
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            }) 
        },
    		getAchList(){
    			this.$http.post('/web/space/article/listArticleType.do',this.$qs.stringify({
    		      token:this.token,
              userId:this.userId
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId,this.currPage);
                this. myList = [];
              	if(result.data instanceof Array && result.data.length>0){
                  this.achList = result.data;
                  for(let i=0,len=result.data.length;i<len;i++){
                      this.myList.push(result.data[i])
                  }
                }else{
                  this.achList = [];
                };
              }else if(result.status == 9){
              	global_.login();
              	return;
              }else{ 
                this.$Message.error('请求资源失败，请重试');      
              } 
            }) 
    		},
    		getArticleList(tId,pIdx){
    			this.$http.post('web/space/article/listArticle.do',this.$qs.stringify({
            typeId:tId||0,
    			  pageIndex:pIdx||1,
    			  pageSize:10,
    			  token:this.token,
            userId:this.userId
          }))
          .then((res)=>{
          if(res.status != 200){
            this.$Message.error('请求失败请重试');
          }else{
            let result = res.data;
            if(result.status == 0){
              this.totalCount = result.data.totalCount;
              this.currPage = result.data.currPage;
            	if(result.data.list instanceof Array && result.data.list.length>0){
            	  this.articleList = result.data.list;
              }else{
                this.articleList = [];
              };
            }else if(result.status == 9){
            	global_.login();
            	return;
            }else{ 
              this.$Message.error('请求资源失败，请重试');      
            }
          } 
          })
          .catch((err)=>{
              alert(err);
          })
    		},
        pageChange(page){
            this.getArticleList(0,page)
        },
    		goArticleId(item){
          let whoSpace=window.location.hash.split('/')[1];
    			this.$router.push({
            // path:'/MySpace/ArticalInfo',
    				path:'/'+whoSpace+'/ArticalInfo',
    				query:{articleId:item.articleId}
    			});
    		}
    	},
    	created(){
            let whoSpace=window.location.hash.split('/')[1];
            if(whoSpace=='ShowSpace'){
                this.isHis=true;
            }else{
                this.isHis=false;
            }
    		this.userId=this.$router.history.current.query.userId;
    		if(!this.userId){
    			this.userId=this.$storage.getStorage("userInfo").id;
    		}
        if(this.$storage.getStorage('leftNowId')){
          this.nowId=this.$storage.getStorage('leftNowId')
        }
    		this.getAchList();
    	}	
}
</script>

<style scoped>	
	.mr20{
    margin-right: 20px;
  }
  .detes{
		margin-right: 10px;
		display: inline-block;
		vertical-align: middle;
		width: 70px;
		text-align: left;
		overflow: hidden;
		text-overflow:ellipsis;
    white-space: nowrap;
	}
	.article-container{
		overflow: hidden;
		width: 1200px;
		margin: 30px auto 60px;
		font-size: 14px;
	}	
	/*左侧列表样式*/
	.leftside{
		width: 240px;		
		padding: 20px 25px;
		border: 1px solid #e9e9e9;
		background: #FFFFFF;		
	}
	.leftside ul li{
		position: relative;
		padding-left: 40px;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #e9e9e9;
		color: #666;
		font-size: 16px;
		cursor: pointer;
	}
	.leftside ul li a{
		width: 80%;
		display: inline-block;
		height: 60px;
		line-height: 60px;
		color: #666;
		font-size: 16px;
		overflow: hidden;
  	text-overflow:ellipsis;
  	white-space: nowrap;    
  	vertical-align: middle;
	}
	.leftside ul li>span{
		position: absolute;
		left: 15px;
		top: 21px;
		height: 18px;
		border-left:2px solid #47a2ff;
		display: none;
	}
	.leftside ul li.active{
		color: #47a2ff;
		box-shadow: 0px 1.5px 0px  #eee;
	}
	.leftside ul li.active span{
		display: block;	
	}
	/*文章分类*/
	.typeBox p{
		font-size: 16px;
		line-height: 40px;
	}	
	.typeBox input{
		width: 200px;
		height: 40px;
		padding-left: 15px;
		border-radius: 5px;
		background-color: #ffffff;
		border: solid 1px #ccc;
		margin-right: 145px;
		box-sizing: border-box;
	}
	.showbord{
		outline: none;
		border:none;
	}
	.typeBox span{
		cursor: pointer;
		margin-right: 20px;
	}
	.typeBox .iptText{
		display: inline-block;
		vertical-align: middle;
		width: 200px;
		height: 40px;
		padding-left: 15px;
		margin-right: 145px;
		box-sizing: border-box;
	}
	.saveBtn{
		width: 160px;
		height: 40px;
		line-height: 40px;
		background-color: #50a7ff;
		border-radius: 5px;
		font-size: 16px;
		color:#fff;
		outline: none;
		border:none;
	}
	.add{
		color:#999;
		font-size: 16px;
		cursor: pointer;
	}
	.contLink{
		width: 520px;
		overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	    cursor: pointer;
	}
	/*权限设置*/
	.authorityInput{
		font-size: 14px;
		color: #333;
	}
	.authorityInput label{
		margin-left: 20px;
	}
	.authorityInput input:first-child{
		margin-left: 0px;
	}
	.authorityInput input{
		margin-left: 100px;
	}
	input[type="checkbox"]{
		margin:5px 10px;    
		vertical-align: middle;
	}
  #article-content .content-list li>.right{
    position: absolute;
    right: 0px;
  }
  .myPage{
    text-align: center;
    margin-top: 50px;
  }
</style>

