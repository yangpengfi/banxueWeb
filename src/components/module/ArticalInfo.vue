<template>
	<div class="w-1200">
		<div class="articleBox">
			<p v-html="articleInfo.title" class="articleTitle"></p>
			<div class="articleLikes">
				<span>
                    <b v-show="!articleInfo.hasLike" @click="like">赞</b>
                    <b class="f9" v-show="articleInfo.hasLike" @click="unlike">已赞</b>
                （{{articleInfo.likeCount}}）</span>
				<span><a href="#comments">评论</a>（{{articleInfo.commentCount}}）</span>
				<span>
                    <b @click="reprint" v-show="!articleInfo.hasReprint">转载</b>
                    <b class="f9" v-show="articleInfo.hasReprint" @click="unlike">已转载</b>
                （{{articleInfo.reprintCount}}）</span>
				<span v-if="articleInfo.fromUserId" class="formUser">{{new Date(articleInfo.createTime).Format("yyyy-M-d hh:mm:ss")}} 转载自 {{articleInfo.fromUserName}}</span>
			</div>
			<p v-html="articleInfo.content" class="articleCont"></p>
		</div>
		<div class="comment-box">
            <div class="comment-list">
                <div>
                    <p>评论<span> （{{commentTotalCount}}条）</span></p>
                </div>
                <ul>
                    <li v-for="item of commentList">
                        <p class="left"><img :src="item.logo"  alt="头像"></p>
                        <div class="left">
                            <div class="comment-title">
                                <span>{{item.userName}}</span>
                                <span>{{new Date(item.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
                                <span @click="reply(item)">回复</span>
                            </div>
                            <p class="comment-content">{{item.content}}</p>
                            <ul v-if="item.children.length>0">
                                <li v-for="subItem in item.children">
                                    <p class="left"><img :src="subItem.logo"  alt="头像"></p>
                                    <div class="left">
                                        <div class="comment-titlel">
                                            <span>{{subItem.userName}}</span>
                                            <p class="comment-content w50">{{subItem.content}}</p>
                                            <span>{{new Date(subItem.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-show="item.check" class="reply">
                                <input 
                                    type="text" 
                                    maxlength="200" 
                                    title="长度不超过200" 
                                    v-model="replyCommet" placeholder="我也说一句">
                                    <button @click="commit(item.id)">发表</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pageBox">
	                <Page :total="commentTotalCount" 
			        :current="commentCurrPage" 
			        :pageSize="pageSize" 
			        show-elevator show-total 
			        class="page-box" @on-change="pageChange"></Page> 
		        </div>
            </div>
            <div class="comment" id="comments">
                <textarea  rows="8" v-model="comment" placeholder="发表你的精彩评论啦"></textarea>
                <button @click="createComment(0)" class="myButton">发表评论</button>
            </div>
        </div>
	</div>
</template>


<script>
import global_ from '@/components/Global';
export default {
  	name:'ArticalInfo',
    data () {
        return {
            token:this.$storage.getStorage("token") ,
        	articleId:1	,
        	articleInfo:{},
        	commentList:[],
            comment:'',
            commentTotalCount:0,
            commentCurrPage:1,
            pageSize:4,
            isLike:false,
            replyCommet:'',
        }
	},
	methods:{
        map(data){
            this.emotionsMap = data;
        },
		getArticalInfo(){
			this.$http.post('/web/space/article/info.do',this.$qs.stringify({
              articleId:this.articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  this.articleInfo = result.data;
              }else if(result.status == 9){
              	global_.login();
              	return;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		}, 
        reply(item){
            item.check=!item.check;
        },
        commit(pId){
           this.createComment(pId); 
        },
        createComment(pId){//创建留言
            let comm=''
            if(pId){
                if(!this.replyCommet){
                    this.$Message.info("请输入回复内容！");
                    return;
                } 
                comm=this.replyCommet;
            }else{
               if(!this.comment){
                    this.$Message.info("请输入评论！");
                    return;
                } 
                comm=this.comment;
            }
            this.$http.post('/web/space/article/a/createComment.do',this.$qs.stringify({
              articleId:this.articleId,
              token:this.$storage.getStorage("token"),
              content:comm,
              parentId:pId||0
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                this.$Message.success(result.message);
                this.comment='';
                this.replyCommet='';
                this.getSpaceComment(Math.ceil(this.commentTotalCount/this.pageSize));
              }else{ 
                this.$Message.error(result.message);         
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        getSpaceComment(page){//获取评论列表
            this.$http.post('web/space/article/listComments.do',this.$qs.stringify({
              pageIndex:page||1,
              pageSize:4,
              articleId:this.articleId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.commentList = result.data.list;
                  this.commentTotalCount = result.data.totalCount;
                  this.commentCurrPage = result.data.currPage;
                  this.pageSize = result.data.pageSize;
                }else{
                  this.commentList = [];
                } 
              }else if(result.status == 9){
                this.login();
                return;
              }else{ 
                this.$Message.error(result.message);         
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        like(){//点赞
            this.$http.post('/web/space/article/a/like.do',this.$qs.stringify({
              articleId:this.articleId,
              token:this.token,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.articleInfo.hasLike=true;
                this.articleInfo.likeCount+=1;
                this.$Message.success(result.message); 
              }else if(result.status == 9){
                global_.login();
                return;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        unlike(){//取消点赞
            this.$http.post('/web/space/article/a/unlike.do',this.$qs.stringify({
              articleId:this.articleId,
              token:this.token,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.articleInfo.hasLike=false;
                this.articleInfo.likeCount-=1;
                this.$Message.success(result.message); 
              }else if(result.status == 9){
                global_.login();
                return;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        reprint(){//转载
            this.$http.post('/web/space/article/a/reprint.do',this.$qs.stringify({
              articleId:this.articleId,
              token:this.token,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.articleInfo.reprintCount=result.data;
                this.articleInfo.hasReprint=true;
                this.$Message.success(result.message); 
              }else if(result.status == 9){
                global_.login();
                return;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        pageChange(page){
        	this.getSpaceComment(page);
        }
	},
	created(){
		this.articleId=this.$router.history.current.query.articleId;
		this.getArticalInfo();
		this.getSpaceComment(1);
	}
}
</script>

<style scoped>
.articleBox{
	background-color: #fff;
	padding: 40px 60px;
	border: 1px solid #e9e9e9;
	margin-top: 30px;
	min-height: 400px;
}
.articleBox .articleTitle{
	font-size: 20px;
	line-height: 32px;
	color: #666666;
	padding-bottom: 15px;
	border-bottom: 1px solid #e9e9e9;
}
.articleBox .articleLikes{
	font-size: 14px;
	line-height: 40px;
	color: #47a2ff;
}
.articleBox .articleLikes span{
	margin-right: 35px;
}
.articleBox .articleLikes span b{
    font-weight: normal;
    cursor: pointer;
}
.articleBox .articleLikes span b.f9{
    color:#999;
}
.articleBox .articleLikes span.formUser{
	margin-left: 70px;
	color:#999;
}
.articleBox .articleCont{
	margin-top: 20px;
	color: #666;
}
/*评论*/
	.comment-box{
        padding: 30px 50px;
        border:1px solid #e9e9e9;
        border-top-width:0;
        background-color: #fff;
        margin-bottom: 90px;
    }
    .comment{
        overflow: hidden;
    }
    .comment textarea{
        float: left;
        width: 695px;
        border-radius: 5px;
        border:1px solid #dfe4e9;
        padding: 10px;
        margin-top: 40px;
    }
    .myButton{
        float: left;
        width: 140px;
        height: 40px;
        background-color: #409eff;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        border:none;
        margin-top: 100px;
        margin-left: 40px;
    }
    .comment-list>div{
        overflow: hidden;
        font-size: 24px;
        color: #7b8085;
        border-bottom:1px solid #dfe4e9;       
    }
    .comment-list>div p{
        float: left;
        border-bottom:1px solid #7b8085;
        padding-bottom: 15px;
    }
    .comment-list>div span{
        font-size: 14px;
        color: #3f4449;
    }
    .comment-list>ul{
        padding-top: 30px;
        min-height: 400px;
    }
    .comment-list>ul li{
        overflow: hidden;
        padding-top: 20px;
    }    
    .comment-list>ul>li img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .comment-list>ul>li ul img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .comment-list>ul>li>div{
    	width: calc(100% - 65px);
    	padding-bottom: 20px;
        border-bottom:1px solid #e9e9e9;
    }  
    .comment-title{
        margin-bottom: 15px;
        color:#999;
        font-size: 14px;
    }  
    .comment-title span:first-child,.comment-titlel span:first-child{
        font-size: 16px;
        color: #008fd5;
        margin-right: 35px;
    }
    .comment-title span:last-child{
        float: right;
        color: #008fd5;
        font-size: 14px;
        cursor: pointer;
    }
    .comment-titlel span:last-child{
        font-size: 14px;
        color: #999;
    }
    .comment-content{
        line-height: 28px;
        font-size: 14px;
        color: #7b8085;
        /*text-indent: 2em;*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        max-height: 56px;
    }
    .w50{
        max-width: 600px;
    }
    .comment-list .pageBox{
    	text-align: center;
    	font-size: 14px;
    	padding: 20px 0;
    }
    .reply{
        margin-top: 15px;
    }
    .reply input{
        width: 250px;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        border-radius: 4px;
        border:1px solid #ccc;
        margin-right: 20px;
    }
    .reply button{
        background-color: #47a2ff;
        color:#fff;
        padding: 5px 15px;
        border:none;
        outline: none;
        border-radius: 4px;
    }
</style>