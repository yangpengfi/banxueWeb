<template>	
	<div id="spaceIndex">
		<div class="bgColor"></div>
		<div class="spaceCont">
			<div class="left">				
				<div id="name">
					<img :src="spaceInfo.logo" alt="头像"/>
					<div id="nameIntroduction">
						<span :title="spaceInfo.userName">{{spaceInfo.userName}}</span>
						<span :title="spaceInfo.userTypeStr">{{spaceInfo.userTypeStr}}</span>
						<p :title="spaceInfo.schoolName">{{spaceInfo.schoolName}}</p> 
					</div>
				</div>
				
				<div id="resource">
					<div id="side">
						<p>{{spaceInfo.resourceCount}}</p>
						<p>资源</p>
					</div>
					<div id="side">
						<p>{{spaceInfo.articleCount}}</p>
						<p>学习成果</p>
					</div>
				</div>
				
				<!-- <div class="homework" v-show="spaceInfo.userType==1">
					<img src="../../assets/imgs/space/work.png" alt="头像" align="absmiddle"/>
					<span>作业</span>
				</div> -->
				
				<div id="code">
					<div id="title">
						<div class="bgImgApp"></div>
						<div class="fonts">下载客户端</div>
					</div>
					<img src="../../assets/imgs/app/ter.png" alt="二维码图片" v-show="spaceInfo.userType==1"/>
					<img src="../../assets/imgs/app/stu.png" alt="二维码图片" v-show="spaceInfo.userType==2"/>
				</div>
			</div>
		
			<div class="center">
				<div class="unfishedList">
					<p class="unfishedTitle">
						<span>待完成任务</span>
					</p>
					<ul v-if="unfinishedList.length>0">
						<li v-for="item of unfinishedList" @click="unfinishClick(item)">
							{{item.itemName}}
							<span v-if="item.itemType==2">
								<span v-if="item.courseWatchProgress==0">，未开始学习</span>
								<span v-else>，已学习了{{item.courseWatchProgress}}%</span>
							</span>
						</li>
					</ul>
					<div>
						<Page :total="unTotalCount" 
						:current="unCurrPage" 
						:page-size="5"
						@on-change="unPageChange" 
						></Page>
					</div>
				</div>
				
				
				<div class="spaceInfo">
					<div>
						<p>空间动态</p>
						<ul class="ulTitle">
							<li v-for="item of spaceStatus" @click="changeStatus(item)" :class="{active:item.id == localStatus}">{{item.title}}</li>
						</ul>
					</div>
					<ul class="spaceList">
						<li v-for="item of latestNews">
							<div class="headImg">
								<img :src="item.logo" />
							</div>
							<div class="headImgInfo">
								<p class="headName">
									<a href="#">{{item.userName}}</a>
									<span>{{new Date(item.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
								</p>
								<p class="className">
									<span>{{item.title}}</span>&nbsp;<a href="javascript:void(0);" @click="toInfo(item)" :title="item.name" v-html="item.name"></a>
								</p>								
								<div class="comment">
									<!-- <p>
										<span></span>
										<a href="javascript:void(0);">赞一个</a>
									</p>
									<p>
										<span class="share"></span>
										<a href="javascript:void(0);">分享</a>
									</p>
									<p>
										<span class="review"></span>
										<a href="javascript:void(0);">评论</a>
									</p> -->
								</div>
							</div>
						</li>
					</ul>
					<button id="load-more" @click="getMore" v-show="hasMore">加载更多</button>
				</div>
			</div>
			
			
			
			<div class="right">
				<div class="threeBtn">
					<button type="button" @click="toLoadResource" v-show="spaceInfo.userType==1">上传资源</button>
					<button type="button" v-show="spaceInfo.userType==2">作业</button>
					<button type="button" v-show="spaceInfo.userType==2">错题本</button>
					<button type="button" v-show="spaceInfo.userType==2">学习分析</button>
					<button type="button" @click="toWrite">写文章</button>
					<button type="button" v-show="spaceInfo.userType==1">班级学情</button>
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
						<span>总浏览：{{vTotal}}次</span>
					</p>
					<ul class="viewCont">
						<li class="marginTop" v-for="item of visitorList">
							<img  :src="item.logo" @click="goSpaceShow(item)"/>
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
			</div> 
		</div>
	</div>
</template>
<script>
import global_ from '@/components/Global';
export default {
	name:'SpaceIndex',
	data(){
		return {
				token:this.$storage.getStorage("token"),
				unfinishedList:[
					{id:1,info:'初二1班“英语作业0511”待批改。'},
					{id:2,info:'新任务“2018年下学期学生评价”。请于2018年6月28日之前完成'},
					{id:3,info:'初二2班“英语作业0511”待批改。'},
					{id:4,info:'初二1班“英语作业0512”待批改。'}
				],
				spaceStatus:[
					{id:0,title:'全部'},
					{id:1,title:'班级'},
					{id:2,title:'好友'},
					{id:3,title:'与我相关'}
				],
				localStatus:0,
				latestNews:[
					{id:1,title:"发布了文章",logo:'http://192.168.8.252:86//user/2018/05/09/1659c4b2bdf44a30be01bac689ed366d.jpg',userName:'刘小斌',name:'《一元一次方程课件.doc》',createTime:1524813477000},
				],
				localSpaceId:1,
				peopleList:[],
				visitorList:[],
				spaceInfo:{},
				vTotalCount:0,
				unTotalCount:0,
				vTotal:0,
				currPage:1,
				unCurrPage:1,
				pidx:1,
				hasMore:true,
		}
	},
	methods:{
		getMore(){
			this.pidx++;
			this.getSpaceDynamic(this.localStatus,this.pidx,2);
		},
		goSpaceShow(item){
	        window.open('#/ShowSpace/?userId='+item.userId);
        },
        goMyList(){
        	this.$router.push({
                path:'/MySpace/MyList'
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
		        resourceLocalId:item.fromId          
		      }
		    }); 
		  }else{
		    this.$router.push({
		        path:'/MySpace/ArticalInfo',
		        query:{articleId:item.fromId}
		    });
		  }
		},
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
		changeStatus(item){
			this.localStatus = item.id;
			this.getSpaceDynamic(this.localStatus)
		},
		toLoadResource(){
			this.$router.push({
				path:'/MySpace/LoadResource/1',  				
			});
		},
		toWrite(){
			this.$router.push('/MySpace/WriteArticle');
		},
		getSpaceInfo(){
			this.$http.post('web/space/spaceInfo.do',this.$qs.stringify({
              userId:this.$storage.getStorage("userInfo").id,
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.spaceInfo = result.data;
              	if(this.spaceInfo.userType==2){
              		this.getUnfinishedList();
              	} 
              }else if(result.status == 9){
              	this.login();
              	return;
              }else{ 
                this.$Message.error('请求资源失败，请重试');      
              }
            } 
            })
             
		},
        getUnfinishedList(page){//获取待办任务列表
            this.$http.post('/web/tasktodo/a/listUserTask.do',this.$qs.stringify({
              pageIndex:page||1,
              pageSize:5,
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.unfinishedList = result.data.list;
                  this.unTotalCount = result.data.totalCount;
                  this.unCurrPage = result.data.currPage;
                }else{
                  this.unfinishedList = [];
                }
              }else if(result.status == 9){
              	this.login();
              	return;
              }else{
                this.$Message.error('请求资源失败，请重试');            
              }
            } 
            })
             
        },
        getFollowers(){//获取关注列表
            this.$http.post('/web/space/followers.do',this.$qs.stringify({
              pageSize:9,
              userId:this.$storage.getStorage("userInfo").id,
              token:this.token
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
                this.$Message.error('请求资源失败，请重试');            
              }
            } 
            })
             
        },
        getVisitors(page){//获取访客列表
            this.$http.post('web/space/listVisitors.do',this.$qs.stringify({
              pageIndex:page||1,
              pageSize:9,
              token:this.token,
              userId:this.$storage.getStorage("userInfo").id
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
                this.$Message.error('请求资源失败，请重试');         
              }
            } 
            })
             
        }, 
        getSpaceDynamic(type,pidx,more){//获取最新动态
            this.$http.post('web/space/listSpaceDynamic.do',this.$qs.stringify({
              pageSize:5,
              token:this.token,
              queryType:type||0,
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
              }else{ 
                 this.$Message.error(result.message);          
              }
            } 
            })
             
        },
        pageChange(page){
            this.getVisitors(page)
        },
        unPageChange(page){
            this.getUnfinishedList(page)
        },
        deleteTask(tId){//删除待办任务
            this.$http.post('/app/tasktodo/a/deleteTask.do',this.$qs.stringify({
              token:this.token,
              taskIds:tId
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
                this.$Message.error('请求资源失败，请重试');            
              }
            } 
            })
             
        },
        unfinishClick(item){
        	if(item.itemType==1){
        		this.$Message.warning({
                    content: '请在伴学网app完成该任务！',
                    duration: 2
                });
                return;
        	}else if(item.itemType==2){
	            this.$router.push({
	              path:'/ClassDatile',
	              query:{
	                courseId:item.itemId          
	              }
	            });  
        	}else if(item.itemType==3){
        		this.deleteTask(item.id)
        		this.$router.push({
	              path:'/DetailResource',
	              query:{
	                resourceLocalId:item.itemId,
	                push:1          
	              }
	            }); 
        	}
        }
	},
	created(){
		this.getSpaceInfo();
		// this.getUnfinishedList();
		this.getFollowers();
		this.getVisitors(1);
		this.getSpaceDynamic();
	}
}
</script>

<style scoped>
	*{
		font-family: MicrosoftYaHeiLight;
	}
	#spaceIndex{
		width: 100%;		
		overflow: hidden;
		margin-bottom: 60px;
		font-family: MicrosoftYaHeiLight;
		/*font-size: 36px;*/
		color: #fff;
	}
	.bgColor{
		width: 100%;
		height: 370px;
		background: #47a2ff;
	}
	.spaceCont{
		width: 1200px;
		height: 1000px;
		margin: -336px auto 0;
	}
	.spaceCont .left{
		float: left;
		width: 300px;
		height: 800px;
	}
	#name{
		width: 300px;
		padding-left: 20px;
		padding-right: 20px;
		height: 122px;
		background: rgb(255, 255, 255);
	}
	#name img{
		margin-top: 20px;
		width: 80px;
		height: 80px;
		border-radius: 4px;
		float: left;
	}
	#nameIntroduction{
		float: left;
		margin-left: 22px;
		margin-top: 20px;
	}
	#nameIntroduction span:first-child{
		display: inline-block;
		max-width: 70px;
		font-size: 16px;
		color: #0098e0;
		overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}
	#nameIntroduction span:nth-child(2){
		display: inline-block;
		max-width: 60px;
		margin-left: 15px;
		font-size: 14px;
		color: #999;
		overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}
	#nameIntroduction p{
		color: #666;
		font-size: 14px;
		font-weight: 600;
		max-width: 150px;
		overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}
	#resource{
		width: 300px;
		height: 100px;
		background: rgb(255, 255, 255);
		margin-top: 10px;
		border: 1px solid rgb(223, 228, 232);
	}
	#resource #side{
		width: 50%;
		height: 60px;
		border-right: 1px solid #ccc; 
		margin-top: 20px;
		float: left;
		text-align: center;
	}
	#resource #side:last-child{
		border: none;
	}
	#resource #side p:first-child{
		font-size: 24px;	
		color: #3f4449;
	}
	#resource #side p:nth-child(2){
		font-size: 16px;
		color: #3f444a;
	}
	.homework{
		width: 300px;
		height: 80px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		margin-top: 10px;
		padding-left: 20px;
		line-height: 75px;
		color: #3f4449;
		font-size: 16px;
	}
	.homework span{
		margin-left: 20px;
		font-weight: 400;
	}
	.bgImg{
		display: inline-block;
		width: 20px;
		height: 18px;
		background: url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat 0 0;		
		margin-left: 100px;
	}
	.bgImg:hover{
		background-position: 0 -20px;
	}
	#code{
		width: 300px;
		height: 300px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		margin-top: 10px;
		color: #666;
		font-size: 16px;
	}
	#code #title{
		padding: 20px;
		height: 70px;
		width: 300px;
	}
	.bgImgApp{
		float: left;
		width: 30px;
		height: 40px;
		background:url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat -25px 0;
	}
	#code .fonts{
		font-size: 18px;
		float: left;
		margin-top: 7px;
		margin-left: 10px;
	}
	#code img{
		margin-left: 50px;
		width: 190px;
	}
	.center{
		width: 580px;		
		margin-left: 10px;
		float: left;
	}
	.unfishedList{
		padding-left: 30px;
		padding-right: 30px;
		width: 100%;
		height: 380px;
		border: 1px solid rgb(223, 228, 232);
		background: rgb(255, 255, 255);
		overflow: hidden;
	}
	.unfishedTitle{
		padding-top: 30px;
		width: 520px;
		height: 70px;
		border-bottom: 1px solid rgb(223, 228, 232);
		text-align: left;
		font-size: 16px;
	}
	.unfishedTitle span{
		display: inline-block;
		width: 100px;
		height: 40px;
		border-bottom: 1px solid rgb(87, 165, 248);
		color: #000000;
	}
	.unfishedList>ul{
		min-height: 250px;
	}
	.unfishedList>ul>li{
		height: 50px;
		line-height: 50px;
		text-align: left;
		font-size: 14px;
		color: #a4a7ac;
		cursor: pointer;
	}
	.unfishedList>ul>li:hover{
		color: #008fd5;
	}
	.unfishedList>ul>li.active{
		color: #008fd5;
	}
	.spaceInfo{
		width: 100%;	
		background: rgb(255, 255, 255);
		border: 1px solid rgb(223, 228, 232);
		margin-top: 10px;
		padding: 35px 15px 30px 20px;
	}
	.spaceInfo>div{
		overflow: hidden;		
	}
	.spaceInfo>div p{
		float: left;
		font-size: 16px;
		color: #666;
		margin-right: 45px;
	}
	.ulTitle{
		float: left;
		overflow: hidden;		
	}
	.ulTitle li{
		float: left;
		padding: 2px 10px 20px;	
		margin-right: 20px;	
		text-align: center;
		color: #7b8085;
		font-size: 14px;
		cursor: pointer;
	}
	.ulTitle li.active{
		color: #3f4449;
		border-bottom:1px solid #3f4449;
	}	
	.spaceInfo .spaceList{
		margin-top: 20px;		
	}
	.spaceList>li{
		overflow: hidden;
	}
	.spaceList .headImg{
		float: left;
		width: 40px;
		height: 40px;
		margin-left: 10px;
	}
	.spaceList .headImg img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.spaceList .headImgInfo{
		float: left;
		width: 470px;
		margin-left: 15px;
		margin-bottom: 15px;
		border-bottom: 1px solid #f3f3f3;
	}
	.spaceList .headName{
		width: 100%;
		height: 30px;
	}
	.spaceList .headName a{
		float: left;
		font-size: 14px;
		color: #008fd5;
	}
	.spaceList .headName span{
		float: right;
		font-size: 14px;
		color: #b7bcc1;
	}
	.spaceList .className{
		text-align: left;		
		color: #3d4548;
		font-size: 14px;
	}
	.spaceList .className span{
		color: #999;
	}	
	.comment{		
		overflow: hidden;
		font-size: 14px;
		margin-bottom: 30px;
		margin-top: 15px;
	}
	.comment p{
		float: left;
		margin-right: 45px;
	}
	.comment a{
		color: #7b8085;
	}
	.comment span{
		height: 24px;
		padding-left: 26px;
		margin-right: 5px;
		font-size: 14px;
		color: #7b8085;
		cursor: pointer;
		background: url('../../assets/imgs/space/TeacherZoneIcon.png') no-repeat -110px -3px;	
	}
	.comment span.share{
		background-position: -85px -4px;	
	}
	.comment span.review{
		background-position: -55px -5px;	
	}
	.comment span:hover{
		background-position: -110px -26px;
	}
	.comment span.share:hover{
		background-position: -85px -26px;
	}
	.comment span.review:hover{
		background-position: -55px -25px;
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
	.right{
		float: left;
		width: 298px;
		height: 1000px;
		margin-left: 10px;
	}
	.right .threeBtn{
		width: 100%;
	    min-height: 220px;
		background: #FFFFFF;
		padding: 30px;
	}
	.right .threeBtn button{
		width: 240px;
		height: 40px;
		color: #FFFFFF;
		background: #86c1ff;
		margin-top: 10px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	.right .threeBtn button:hover{
		background: #47a2ff;
	}
	.myView{
		width: 100%;
		padding: 40px 20px 0;
		background: #FFFFFF;
		margin-top: 10px;
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
	}
	.viewCont li p{
		font-size: 14px;
		color: #7b8085;
		overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}
	.myView>div{
		text-align: center;
		font-size: 14px;
		margin-bottom: 30px;
	}
	
</style>


