<template>
    <div id="space-content">
        <div class="left-content">
            <div class="show-space">
                <!-- <img src="../../assets/imgs/space/decoration.jpg" alt="装饰图片"> -->
            </div>
            <div class="myView">
				<p class="viewTitle more-focus">
					我的关注
					<span @click="goMyList">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
				</p>
				<ul class="viewCont">
					<li class="marginTop" v-for="item of peopleList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>
            <p  @click="goSpaceShow(item)" :title="item.userName">{{item.userName}}</p>
					</li>
				</ul>
			</div>
			<div class="myView">
				<p class="viewTitle total-visitor">
					最近访客
					<span>{{vTotal}}次</span>
				</p>
				<ul class="viewCont">
					<li class="marginTop" v-for="item of visitorList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>
            <p  @click="goSpaceShow(item)" :title="item.userName">{{item.userName}}</p>
					</li>
				</ul>
				<div>
					<Page :total="vTotalCount" 
                    :current="currPage" 
                    @on-change="pageChange" 
                    :page-size="9" 
                    size="small"></Page>
				</div>
			</div>
            <div class="visitor-total">
                <p>今日访问量：<span>{{visitorCount.todayCount}}</span></p>
                <!-- <p>独立用户访问量：<span>561</span></p>
                <p>学生访问量：<span>362</span></p> -->
                <p>空间访问量：<span>{{visitorCount.totalCount}}</span></p>
            </div>
            <div class="message">
                <p>留言区</p>
                <div>
                    <textarea v-model="comment" placeholder="请写下你的精彩留言……"></textarea>
                </div>
                <div>
                    <button class="comment" disabled v-if="!isLogin">请登录留言</button>
                    <button class="commentAct" @click="createComment" v-if="isLogin">发表留言</button>
                </div>
                <ul>
                    <li v-for="item of messageList">
                        <img :src="item.logo" alt="用户">
                        <div>
                            <p>
                                <span class="name" :title="item.userName">{{item.userName}}</span>
                                <span class="time">{{formatTime(item.createTime)}}</span>
                            </p>
                            <p class="itemCont">{{item.content}}</p>
                        </div>
                    </li>
                </ul>
                <div class="message-page">
					<Page :total="commentTotalCount" 
                    :current="commentCurrPage" 
                    @on-change="commentChange" 
                    :page-size="4"
                    size="small"></Page>
				</div>
            </div>
        </div>
        <div class="right-content">
            <div class="new-achievement">
                <p class="common-title">
                    最新成果
					<span @click="goAchievement" style="cursor:pointer">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                </p>
                <ul>
                    <li v-for="item of newAchList">
                        <div class="list-title">
                            <span v-html="item.title" @click="goArticleId(item)"></span>
                        </div>
                        <!-- <p class="list-content" v-html="item.content">
                        </p> -->
                        <div class="other-info">
                            <span>{{formatTime(item.createTime)}}</span>
                            <span>阅读</span>
                            <b>{{item.readCount}}</b>
                            <span>评论</span>
                            <b>{{item.commentCount}}</b>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="his-resource">
                <p class="common-title">
                    他的资源
					<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                </p>
                <ul>
                    <li v-for="item of resourceList">
                        <p @click="toResourceDetail(item)">
                            {{item.recourceLocalName}}
                        </p>
                        <div>
                            <Rate v-model="item.score"></Rate>
                            <span>{{item.collectNum}}/{{item.browseNum}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="his-dynamic">
                <p  class="common-title">
                    他的动态
					<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                </p>
                <ul>
                    <li v-for="item of latestNews">
                        <img :src="item.logo" alt="用户">
                        <div class="dynamic-content">
                            <p>
                                <span class="name">{{item.userName}}</span>
                               {{item.schoolName}}
                            </p>
                            <p>
                                {{item.title}}
                                <span class="file" @click="toInfo(item)">
                                    {{item.name}}
                                </span>
                            </p>
                        </div>
                        <div class="dynamic-operate">
                            <p>
                                <span>赞</span><!-- <span class="color9">已赞</span> -->{{item.likeCount}}
                                <span>转发</span><!-- <span class="color9">已转发</span> -->{{item.reprintCount}}
                                <span>评论</span> {{item.commentCount}}
                            </p>
                            <p class="time">
                                {{new Date(item.createTime).Format("yyyy-M-d hh:mm:ss")}}
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="more-dynamic">
                    <button id="load-more" @click="getMore" v-show="hasMore">加载更多</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import global_ from '@/components/Global';
export default {
    name:'ShowSpaceIndex',
    data () {
        return {
        	token:this.$storage.getStorage("token"),
            userId:0,
            peopleList:[],
            visitorList:[],
            vTotalCount:0,
            vTotal:25,
            currPage:1,
            visitorCount:{
            	"todayCount": 10,
      			    "totalCount": 154
      			},
            score:5,
            newAchList:[],
            resourceList:[],
            latestNews:[],
            messageList:[],
            comment:'',
            commentTotalCount:0,
            commentCurrPage:1,
            pidx:1,
            isLogin:false,
            hasMore:false,
            formatTime:global_.formatTime
        } 
    },
    methods:{
      getMore(){
        this.pidx++;
        this.getSpaceDynamic(this.pidx,2);
      },
      toResourceDetail(item){
        this.$router.push({
          path:'/DetailResource',
          query:{
            resourceLocalId:item.resourceLocalId,
            userId:this.userId         
          }
        });
      },
      toInfo(item){
          if(!this.token){
            this.login();
            return;
          };
          if(item.type==1){//资源
            this.$router.push({
              path:'/DetailResource',
              query:{
                resourceLocalId:item.fromId ,
                userId:this.userId         
              }
            }); 
          }else{
            this.$router.push({
                path:'/MySpace/ArticalInfo',
                query:{articleId:item.fromId,userId:this.userId}
            });
          }
      },
        goSpaceShow(item){
            this.$router.push({
                path:'/ShowSpace',
                query:{userId:item.userId}
            }); 
        },
        goMyList(){
        	this.$router.push({
                path:'/ShowSpace/MyList',
                query:{userId:this.userId}
            });
        },
        goAchievement(){
        	this.$router.push({
                path:'/ShowSpace/Achievements',
                query:{userId:this.userId}
            });
        },
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        getSpaceInfo(){
            this.$http.post('web/space/spaceInfo.do',this.$qs.stringify({
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.spaceInfo = result.data; 
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
        getFollowers(){//获取关注列表
            this.$http.post('/web/space/followers.do',this.$qs.stringify({
              pageSize:9,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.peopleList = result.data.list;
                }else{
                  this.peopleList = [];
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
        getVisitors(page){//获取访客列表
            this.$http.post('web/space/listVisitors.do',this.$qs.stringify({
              pageIndex:page||1,
              pageSize:9,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.visitorList = result.data.list;
                  this.vTotalCount = result.data.totalCount;
                  this.vTotal = result.data.otherData;
                  this.currPage = result.data.currPage;
                }else{
                  this.visitorList = [];
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
        getVisitorCount(){//获取访客数量
            this.$http.post('/web/space/visitorCount.do',this.$qs.stringify({
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                this.visitorCount=result.data;
              }else{ 
                this.$Message.error(result.message);         
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        }, 
        createComment(){//创建留言
            this.$http.post('/web/space/a/createSpaceComment.do',this.$qs.stringify({
              userId:this.userId,
              token:this.token,
              content:this.comment,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                this.getSpaceComment(1);
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
            this.$http.post('web/space/listSpaceComment.do',this.$qs.stringify({
              pageIndex:page||1,
              pageSize:4,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.messageList = result.data.list;
                  this.commentTotalCount = result.data.totalCount;
                  this.commentCurrPage = result.data.currPage;
                }else{
                  this.messageList = [];
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
                  userId:this.userId
                }))
                .then((res)=>{
                if(res.status != 200){
                  this.$Message.error('请求失败请重试');
                }else{
                  let result = res.data;
                  if(result.status == 0){
                  	if(result.data.list instanceof Array && result.data.list.length>0){
                  	  this.newAchList = result.data.list;
                    }else{
                      this.newAchList = [];
                    };
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
    		getArticleList(tId){//获取文章列表
    			this.$http.post('web/space/article/listArticle.do',this.$qs.stringify({
    			  typeId:tId||0,
    			  pageSize:5,
                  userId:this.userId
                }))
                .then((res)=>{
                if(res.status != 200){
                  this.$Message.error('请求失败请重试');
                }else{
                  let result = res.data;
                  if(result.status == 0){
                  	if(result.data.list instanceof Array && result.data.list.length>0){
                  	  this.newAchList = result.data.list;
                    }else{
                      this.newAchList = [];
                    };
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
    		getResource(){//获取资源列表
    			this.$http.post('/web/coursebook/listUserUploadResource.do',this.$qs.stringify({
    			  pageSize:5,
                  userId:this.userId
                }))
                .then((res)=>{
                if(res.status != 200){
                  this.$Message.error('请求失败请重试');
                }else{
                  let result = res.data;
                  if(result.status == 0){
                  	if(result.data.list instanceof Array && result.data.list.length>0){
                  	  this.resourceList = result.data.list;
                    }else{
                      this.resourceList = [];
                    };
                  }else{ 
                    this.$Message.error(result.message);      
                  }
                } 
                })
                .catch((err)=>{
                    alert(err);
                })
    		},
        getSpaceDynamic(pidx,more){//获取最新动态
            this.$http.post('web/space/listUserSpaceDynamic.do',this.$qs.stringify({
              pageSize:5,
              userId:this.userId,
              pageIndex:pidx||1,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.hasMore=true;
                  if(more){
                    for (var i = 0,len=result.data.list.length; i <len; i++) {
                      this.latestNews.push(result.data.list[i])
                    }
                  }else{
                    this.latestNews = result.data.list;
                  }
                }else{
                  this.hasMore=false;
                  if(pidx>1){
                    this.$Message.info("没有数据了！");
                  }else{
                    this.latestNews=[];
                  }
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
        pageChange(page){
            this.getVisitors(page)
        },
        commentChange(page){
            this.getSpaceComment(page)
        },
        goArticleId(item){
          this.$router.push({
            path:'/ShowSpace/ArticalInfo',
            query:{articleId:item.articleId,userId:this.userId}
          });
        }
    },
    created(){
        this.userId=this.$router.history.current.query.userId;
        if(!this.userId){
            this.userId=this.$storage.getStorage("userInfo").id
        }
	    if(!this.$storage.getStorage("userInfo")){
	      this.isLogin=false;
	    }else{
	      this.isLogin=true;
	    }
        this.getFollowers();
        this.getVisitorCount();
        this.getVisitors(1);
        this.getSpaceComment(1);
        this.getArticleList(0);
        this.getResource();
        this.getSpaceDynamic();
    }
}
</script>
<style scoped>
	.myView{
		width: 100%;
		padding: 40px 20px 0;
		background: #FFFFFF;
		margin-bottom: 10px;
		border: solid 1px #dfe4e9;
	}
	.viewTitle{
		font-size: 16px;
		color: #3f4449;
		margin-bottom: 30px;
	}
	.viewTitle span{
		font-size: 14px;
		color: #3F4449;
		float: right;
	}
	.more-focus span{
		margin-top: 5px;
	}
	.total-visitor span{
		margin-top: 5px;
		color: #7b8085;
	}
	.viewCont{
		width: 100%;
		overflow: hidden;
	}
	.viewCont li{
		float: left;
		width: 33%;
		text-align: center;
		margin-bottom: 25px;
    min-height: 75px;
	}
	.viewCont li img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	    cursor: pointer;
	}
	.viewCont li p{
		font-size: 14px;
		color: #7b8085;
		overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
	}
	.myView>div{
		text-align: center;
		font-size: 14px;
		margin-bottom: 30px;
	}
    #space-content{
        margin-top: 20px;
        width: 1200px;
        margin: auto;
        overflow: auto;
    }
    #space-content .left-content{
        float: left;
        width: 240px;
    }
    .show-space{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .visitor-total{
        background-color: #fff;
        padding: 28px 0 28px 20px;
        border: 1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .visitor-total p{
        line-height: 30px;
    }
    .visitor-total p span{
        font-size: 16px;
        color: #409eff;
        margin-left: 5px;
    }
    .message{
        margin-top: 10px;
        margin-bottom: 60px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
    }
    .message>p{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 20px;
        color: #333;
        border-bottom:1px solid #e9e9e9;
    }
    .message>div{
       padding: 10px 20px 0;       
    }
    .message div textarea{
       display: inline-block;
       width: 200px;
       height: 60px;
       padding-top: 5px;
       padding-left: 5px;
       border-color:#e9e9e9;       
    }
    .message button{
       display: inline-block;
       width: 200px;
       height: 40px;
       border:none;
       background-color: #ccc; 
       font-size: 16px;
       color: #fff;    
       cursor: pointer;
    }
    .message .commentAct{
       background-color: #1caaf1; 
    }
    .message>ul{
        padding: 0 20px;
    }
    .message ul li{
        height: 100px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .message ul li:last-child{        
        border-bottom:none;
    }
    .message ul li>img{
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        margin-top: 20px;
    }
    .message ul li>div{
        float: left;
        width: 130px;
    }
    .message ul li>div p{
        font-size: 14px;
        color: #666;
        margin-top: 5px;
    }
    .message ul li>div p:first-child{
        margin-top: 20px;
    }
    .message ul li .name{   
    	display: inline-block;
    	max-width: 80px;     
        font-size: 16px;
        color: #1cb0ea;
        overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
    }
    .message ul li .time{   
        float: right;     
        font-size: 12px;
        color: #999;
        margin-top: 3px;
    }
    .message ul li .itemCont{   
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color:#666;
        overflow: hidden;
        height: 40px;
    }
    .message-page{
        margin-bottom: 20px;
    }
    #space-content .right-content{
        float: right;
        width: 940px;
        margin-top: 20px;
    }
    .common-title{
        padding: 20px 40px;
        font-size: 20px;
        color: #333;
        border-bottom:1px solid #f3f3f3;
    }
    .common-title span{
        float: right;
        margin-top: 8px;
        font-size: 14px;
        color: #7b8085;
        cursor: pointer;
    }
    .new-achievement,.his-resource,.his-dynamic{
        background-color: #fff;
        border:1px solid #e9e9e9;
        margin-bottom: 10px;
    }
    .new-achievement ul{
        padding: 0 40px;
    }
    .new-achievement ul li{
        /*height: 120px;*/
        height: 60px;
        border-bottom:1px solid #e9e9e9;
    }
    .new-achievement ul li:last-child{
        border-bottom: none;
    }
    .list-title{
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
        margin-top: 20px;
        float: left;
    }
    .list-title b{
        color:#50a6ff;
    }
    .list-content{
        font-size: 14px;
        color:#666;
        line-height: 26px;
        text-indent:2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height: 60px;
    }
    .other-info{
        margin-top: 20px;
        text-align: right;
        font-size: 14px;
        color: #999;
        float: right;
    }
    .other-info span{
        margin-left: 30px;
        margin-right: 5px;
    }
    .other-info b{
        color: #50a6ff;
        font-weight: normal;
    }
    .his-resource ul{
        padding: 0 40px;
    }
    .his-resource ul li{
        height: 50px;
        padding-top: 16px;
        font-size: 14px;
        color: #666;
        border-bottom:1px solid #e9e9e9;
        cursor: pointer;
    }
    .his-resource ul li:last-child{
       border-bottom: none;
    }
    .his-resource ul li p{
        float: left;
        width: 512px;
        text-overflow:ellipsis;
        white-space:nowrap; 
        overflow:hidden; 
    }
    .his-resource ul li>div{
        float: left;
        margin-left: 170px;
    }
    .his-resource ul li>div>span{
        color: #999;
        margin-left: 5px;
    }
    .his-dynamic{
        margin-bottom: 60px;
    }
    .his-dynamic ul{
        padding: 0 40px;
    }
    .his-dynamic ul li{
        height: 90px;
        padding-right: 10px;
        padding-top: 20px;
        border-bottom:1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .his-dynamic ul li:last-child{
        border-bottom:none;
    }
    .his-dynamic ul li img{
        float: left;
        margin-right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .dynamic-content{
        float: left;
    }
    .dynamic-content .name{
        font-size: 16px;
        color: #1cb0ea;
        margin-right: 18px;
    }
    .dynamic-content .file{
        color: #1cb0ea;
        margin-left: 10px;
        cursor: pointer;
    }
    .dynamic-operate{
        float: right;
    }
    .dynamic-operate span{
        color: #1cb0ea;
        margin-left: 20px;
        margin-right: 10px;
        cursor: default;
    }
    .dynamic-operate .color9{
    	color:#999;
    }
    .dynamic-operate span:last-child{
        margin-right: 0;
    }
    .dynamic-operate .time{
        text-align: right;
        color: #999;
        font-size: 12px;
        margin-top: 8px;
    }
    .more-dynamic{
        text-align: center;
        margin: 20px 0;
    }
    #load-more{
		width: 140px;
		height: 40px;
		border: solid 1px #dfe4e9;
		color: #fff;
		font-size: 14px;
		background-color: #1cb0ea;
		border-radius: 3px;
		cursor: pointer;
	}
	#load-more:focus{
		outline: none;
	}
</style>


