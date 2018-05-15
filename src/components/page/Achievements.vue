<template>
<div class="article-container">
		<!-- <Left :leftList="achList"></Left> -->
		<!-- <router-view></router-view> -->
	<div class="leftside left">
		<ul>
			<li @click="changeTitle(0)" :class="{active:nowId==0}">
				<span></span>
				<a href="javascript:void(0);">全部分类</a>
				<b @click="modalClick">
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
		<p class="article-btn">
			<button @click="toWrite">写文章</button>
			<button @click="showBatch" :class="{active:ifBatch==true}">批量管理</button>
		</p>
		<div class="batch-modify" v-if="ifBatch">
			<Checkbox v-model="single">全选</Checkbox>
			<span>设置权限</span>
			<span>修改分类</span>
			<span>删除</span>
		</div>			
		<ul class="content-list">
			<li v-for="item of articleList">					
				<p class="left contLink">
					<Checkbox v-model="single" :value="item.articleId" v-if="ifBatch"></Checkbox>
					<span v-html="item.title" @click="goArticleId(item)"></span>
				</p>
				<div class="right">
					<span class="mr20" :title="item.typeName">{{item.typeName}}</span>
					<span>{{formatTime(item.createTime)}}</span>
					<!-- <span class="nums">{{item.num}}/{{item.total}}</span>	 -->
				</div>
				<div class="edit">
					<p class="edit-title">
						<span>编辑</span> 
						<Icon type="arrow-down-b" color="#1caaf1"></Icon>
					</p>
					<div class="edit-content">
						<span @click="clickSetOpen(item)">设置权限</span>
						<span @click="delAtcal(item.articleId)">删除文章</span>
						<span @click="clickUploadType(item)">修改分类</span>
						<span @click="toTop(item.articleId)">置顶</span>
					</div>
				</div>										
			</li>				
		</ul>			
	</div>
	<Modal
        v-model="modal1"
        title="设置分类"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="typeBox">
        	<p v-for="item in achList">
        		<span class="iptText" 
        		v-if="!(item.typeId==currTypeId)" 
        		@click="edit(item)">{{item.typeName}}</span>
	        	<input type="text" v-model="typeName" v-if="(item.typeId==currTypeId)" maxlength="5" title="长度不超过5"> 
	        	<span v-if="!(item.typeId==currTypeId)" @click="edit(item)">编辑</span>
	        	<span v-if="!(item.typeId==currTypeId)" @click="del(item)">删除</span>
	        	<span v-if="(item.typeId==currTypeId)" @click="cancels(item)">取消</span>
	        	<span v-if="(item.typeId==currTypeId)" @click="sure(item)">确定</span>
        	</p>
        	<p class="add" @click="addType">+ 添加分类</p>
        </div>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok">保存</button>
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
        title="设置权限"
        @on-ok="ok3"
        @on-cancel="cancel3" width="300px">
        <div class="selBox">
        	<Select v-model="selTypeId" filterable>
				<Option v-for="item in achList" :value="item.typeId">{{item.typeName}}</Option>
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
			userId:''			
        }
	},
	methods:{
		ok () {
			if(!this.$storage.getSession('atcItem')){
				this.sure(this.$storage.getSession('atcItem'));
			}
            this.modal1 = false;
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
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.currTypeId=0;
              	this.typeName='';
              	this.getAchList();
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        cancels(item) {
        	this.currTypeId=0;
        	this.typeName='';
        },
        del(item) {
            this.$http.post("/web/space/article/a/deleteArticleType.do",this.$qs.stringify({
              token:this.token,
              typeId:item.typeId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getAchList();
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        addType() {
        	let item={
            	"articleCount": 0,
				"type": "0",
				"typeId": '-1',
				"typeName": "新增分类"
			};
            this.achList.push(item)
			this.currTypeId='-1';
            this.typeName="新增分类";
            this.$storage.setSession('atcItem',item);
        },
        modalClick(){
        	this.modal1=true;
        },
		showBatch(){
			if(!this.ifBatch){
				this.ifBatch = true;
				this.single = false;				
			}else{
				this.ifBatch = false;
				
			}
		},
		toWrite(){
			this.$router.push('/MySpace/WriteArticle');
		},
		changeTitle(item){  
			if(item==0){
				this.nowId=0;
				this.getArticleList(this.nowId);
				return;
			}
			this.nowId=item.typeId;
			this.getArticleList(this.nowId); 			
		},
		clickSetOpen(item){
			this.openStatus=item.openStatus;
			this.articleId=item.articleId;
			this.modal2 = true;
		},
        setOpen (openStatus) {
        	this.$http.post("/web/space/article/a/updateOpenStatus.do",this.$qs.stringify({
              token:this.token,
              openStatus:openStatus,
              articleId:this.articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId);
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
		clickUploadType(item){
			this.selTypeId=item.typeId;
			this.articleId=item.articleId;
			this.modal3 = true;
		},
        uploadType (typeId) {
        	this.$http.post("/web/space/article/a/updateTypeId.do",this.$qs.stringify({
              token:this.token,
              typeId:typeId,
              articleId:this.articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId);
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        delAtcal (articleId) {
        	this.$http.post("/web/space/article/a/deleteArticle.do",this.$qs.stringify({
              token:this.token,
              articleId:articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId);
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
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
              	this.getArticleList(this.nowId);
              }else{ 
                this.$Message.error('操作失败，请重试');      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
		getAchList(){
			this.$http.post('/web/space/article/listArticleType.do',this.$qs.stringify({
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getArticleList(this.nowId);
              	if(result.data instanceof Array && result.data.length>0){
              	  this.achList = result.data;
                }else{
                  this.achList = [];
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
		getArticleList(tId){
			this.$http.post('web/space/article/listArticle.do',this.$qs.stringify({
			  typeId:tId||0,
			  pageSize:10,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
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
		goArticleId(item){
			this.$router.push({
				path:'/MySpace/ArticalInfo',
				query:{articleId:item.articleId}
			});
		}
	},
	created(){
		this.userId=this.$router.history.current.query.userId;
		if(!this.userId){
			this.userId=this.$storage.getStorage("userInfo").id;
		}
		this.getAchList();
	}	
}
</script>

<style scoped>	
	.mr20{
		margin-right: 20px;
		display: inline-block;
		vertical-align: middle;
		width: 70px;
		text-align: center;
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
	/*修改文章分类*/
	.selBox{

	}
</style>

