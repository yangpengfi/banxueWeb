<template>
  <div>
      <div class="search-container">
          <div class="left">
            <div class="article-box">
                <div class="article">
                    <h2 v-if="!isMicrocourse">{{resourceDetail.recourceLocalName}}</h2>
                    <h2 v-if="isMicrocourse">{{resourceDetail.knowledgePoint}}</h2>
                    <div class="viewBox" v-show="!isMember"></div>
                    <!-- <div id="reader" v-show="isPfd"></div> -->
                    <iframe src="http://ow365.cn/?i=15549&furl=http://www.mybanxue.com:86/resource/zxxk/6940294.doc" v-show="isPfd" frameborder="0" width="100%" height="500" id="reader"></iframe>
                    <video :src="resourceUrl" controls="controls" controlslist="nodownload" v-show="isVideo"></video>
                    <audio :src="resourceUrl" controls="controls" controlslist="nodownload" v-show="isAudio"></audio>
                    <img :src="resourceUrl" v-show="isImg">
                    <div class="noMember" v-if="!isMember">
                        <b>如需阅读或下载完整版，请登录APP</b>
                        <span>开通会员</span>
                    </div>
                </div>
                <div class="from" v-if="!isMicrocourse">
                    <span>贡献者：</span>{{resourceDetail.uploadUserName}}
                    <span>贡献时间：</span>{{formatTime(resourceDetail.createTime)}}
                    <span v-show="resourceDetail.schoolName">所在学校：</span>
                    <b v-show="resourceDetail.schoolName">{{resourceDetail.schoolName}}</b>
                    <Rate v-model="resourceDetail.score" allow-half disabled class="rate"></Rate>
                </div>
                <div class="operate-article">
                    <a href="javascript:void(0);" @click="collectOrDel" :class="{collect:isCollect}">收藏</a>
                    <a :href="resourceUrl" v-if="!isVideo">下载</a>
                </div>
            </div>
            <div class="comment-box" v-show="!this.isMicrocourse">
                <div class="comment">
                    <textarea  rows="8" v-model="comment" placeholder="发表你的精彩评论啦"></textarea>
                </div>
                <div class="res-quality">
                    <span>资源质量：</span> <Rate v-model="recommendStar"></Rate><br>
                    <button @click="createResourceComment" class="myButton">发表评论</button>
                </div>
                
                <div class="comment-list">
                    <div>
                        <p>评论<span> （{{commentNum}}条）</span></p>
                    </div>
                    <ul>
                        <li v-for="item of commentList">
                            <p class="left"><img :src="item.headUrl"  alt="头像"></p>
                            <div class="left">
                                <div class="comment-title">
                                    <span>{{item.userName}}</span>
                                    <span>{{new Date(item.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
                                </div>
                                <p class="comment-content">{{item.comment}}</p>
                                <p>
                                    <Rate v-model="item.score"></Rate>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
          <div class="right">               
               <div class="recommend-list">
                    <p><span></span><b>推荐搜索</b></p>
                    <ul>
                        <li v-for="item of recommendSearch">
                            <img :src="fileType(item.fileSuffix,0)" alt="资源图标" @click="toDetailResource(item)">
                            <div>
                                <p @click="toDetailResource(item)" class="resTitle" :title="item.recourceLocalName">{{item.recourceLocalName}}</p>
                                <Rate v-model="item.score"></Rate>
                            </div>
                        </li>
                    </ul>
               </div>
          </div>
      </div>
  </div>
</template>
<script>
import global_ from '@/components/Global';
export default {
    name:'DetailResource',
    data(){
        return{
            token:this.$storage.getStorage("token"),
            resourceLocalId:0,
            resourceDetail:{},
            resourceUrl:'',
            articleStar:5,
            recommendStar:0,
            recommendSearch:[],
            commentList:[],
            commentNum:5,
            comment:'',
            isImg:0,
            isVideo:0,
            isAudio:0,
            isPfd:0,
            isMember:0,
            isCollect:true,
            isMicrocourse:false,
            formatSize:global_.formatSize,
            fileType:global_.setFileType,
            formatTime:global_.formatTime
        }
    },
    methods:{
        viewInit(info){
            if(info.previewType==1){//0=未知，1=图片，2=PDF，3=音频，4=视频，5=百度文库预览
                this.isImg=1;
                this.isVideo=0;
                this.isAudio=0;
                this.isPfd=0;
            }else if(info.previewType==2 || info.previewType==5){
                this.isImg=0;
                this.isVideo=0;
                this.isAudio=0;
                this.isPfd=1;
                this.getBceDocumentPreView();
            }else if(info.previewType==3){
                this.isImg=0;
                this.isVideo=0;
                this.isAudio=1;
                this.isPfd=0;
            }else if(info.previewType==4){
                this.isImg=0;
                this.isVideo=1;
                this.isAudio=0;
                this.isPfd=0;
            }
        },
        toDetailResource(item){
            this.isMicrocourse=false;
            this.resourceLocalId=this.$router.history.current.query.resourceLocalId;
            this.getResourceDetail(this.resourceLocalId);
            this.$router.push({
                path:'/DetailResource',
                query:{
                    resourceLocalId:item.resourceLocalId                    
                }
            });     
        },
        getResourceDetail(rId){
        this.$http.post('/web/coursebook/getResourceLocalDetail.do',this.$qs.stringify({
            token:this.token,
            resourceLocalId:rId
          }))
         .then((res)=>{
            if(res.data.status==0){
                this.getListResourceComment();
                this.resourceDetail=res.data.data;
                this.isCollect=this.resourceDetail.isCollect;
                if(this.isMember){
                  this.getResourceLocalUrl(rId);
                  this.viewInit(res.data.data);  
                }
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        getMicrocourseDetail(rId){
        this.$http.post('/app/microcourse/a/getResourceDetail.do',this.$qs.stringify({
            token:this.token,
            resourceId:rId
          }))
         .then((res)=>{
            if(res.data.status==0){
                this.isImg=0;
                this.isVideo=1;
                this.isAudio=0;
                this.isPfd=0;
                this.getListResourceComment();
                this.resourceUrl=res.data.data.server+res.data.data.videoUrl;
                this.resourceDetail=res.data.data;
                this.isCollect=res.data.data.isCollect;
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        collectOrDel(){
            if(this.isCollect){
                this.delCollectResource();
            }else{
                this.collectResource();
            }
        },
        collectResource(){
            let url=this.isMicrocourse?'/web/microcourse/a/collectResource.do':'/web/coursebook/a/collectResource.do';
            console.log(url)
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                resourceLocalId:this.resourceLocalId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.$Message.info(res.data.message);
               this.isCollect=true;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            }) 
        },
        delCollectResource(){
            let url=this.isMicrocourse?'/web/microcourse/a/deleteCollectResource.do':'/web/coursebook/a/deleteCollectResource.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                resourceLocalIds:this.resourceLocalId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.$Message.info(res.data.message);
               this.isCollect=false;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            }) 
        },
        getHostSearchResource(){
            this.$http.post('/web/coursebook/listHostSearchResource.do',this.$qs.stringify({
                token:this.token
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.recommendSearch=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            }) 
        },
        getResourceLocalUrl(){
            this.$http.post('/web/coursebook/a/getResourceLocalUrl.do',this.$qs.stringify({
                token:this.token,
                resourceLocalId:this.resourceLocalId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.resourceUrl=res.data.data;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            }) 
        },
        getBceDocumentPreView(){//百度预览
            this.$http.post('/web/coursebook/a/getBceDocumentPreView.do',this.$qs.stringify({
                token:this.token,
                resourceLocalId:this.resourceLocalId
            }))
            .then((res)=>{
            if(res.data.status==0){
                /*let option = {
                    docId: res.data.data.documentId,
                    token: res.data.data.token,
                    host: res.data.data.host,
                    serverHost: 'http://doc.bj.baidubce.com',
                    width: 698, // 文档容器宽度
                    pn: 1,  // 定位到第几页，可选
                    fontSize:'big',
                    toolbarConf: {
                        page: true, // 上下翻页箭头图标
                        pagenum: true, // 几分之几页
                        full: false, // 是否显示全屏图标,点击后全屏
                        copy: false, // 是否可以复制文档内容
                        position: 'center', // 设置 toolbar中翻页和放大图标的位置(值有left/center)
                    }, // 文档顶部工具条配置对象,必选
                    enviroment: 'online'
                };*/
                // new Document('reader', option);
               document.getElementById('reader').src="http://ow365.cn/?i=15549&furl="+res.data.data.viewUrl;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            })
        },
        getListResourceComment(){//评论列表
            let url=this.isMicrocourse?'/web/microcourse/listResourceComment.do':'/web/coursebook/listResourceComment.do';
            // console.log(url)
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                resourceLocalId:this.resourceLocalId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.commentList=res.data.data.list;
               this.commentNum=res.data.data.totalCount;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            })
        },
        createResourceComment(){//创建评论
            let url=this.isMicrocourse?'/web/microcourse/a/createResourceComment.do':'/web/coursebook/a/createResourceComment.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                resourceLocalId:this.resourceLocalId,
                comment:this.comment,
                score:this.recommendStar
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.getListResourceComment();
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            })
        }
    },
    created(){
        // let oHead = document.getElementsByTagName('HEAD').item(0); 
        // let oScript= document.createElement("script"); 
        // oScript.type = "text/javascript"; 
        // oScript.src="http://static.bcedocument.com/reader/v2/doc_reader_v2.js"; 
        // oHead.appendChild( oScript);
        this.getHostSearchResource();
        if(this.$router.history.current.query.microcourse){
            this.isMicrocourse=true;
            this.resourceLocalId=this.$router.history.current.query.resourceId;
            this.getMicrocourseDetail(this.resourceLocalId)
        }else{
            this.isMicrocourse=false;
            this.resourceLocalId=this.$router.history.current.query.resourceLocalId;
            this.getResourceDetail(this.resourceLocalId);
        }
        this.isMember=this.$storage.getStorage('vipStatus');
    }
}
</script>
<style scoped>
    .search-container{
        width: 1200px;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 80px;
        overflow: hidden;
    }
    .search-container>.left{
        width: 820px;
        border:1px solid #e9e9e9;
        background-color: #fff;        
    }    
    .search-container>.right{        
        width: 360px;        
    }  
    .article-box{
        padding: 40px 60px 40px;
    }
    .recommend-list{
        padding: 35px 20px 0;
        background-color: #fff;
        border:1px solid #e9e9e9;
    }
    .recommend-list>p{
        font-size: 20px;  
        margin-bottom: 30px;   
        height: 30px;
        line-height: 30px;  
        vertical-align: middle;   
    }
    .recommend-list .resTitle{
        width: 250px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .recommend-list span{
        float: left;
        height: 100%;
        margin-right: 20px;
        border-left: 2px solid #0098e0;
    }
    .recommend-list b{
        float: left;
        font-weight: normal;        
    }
    .search-container>.right ul li{
        overflow: hidden;
        height: 60px;
        border-bottom: 1px solid #f8f8f8;
        margin-bottom: 20px;    
    }
    .search-container>.right ul img{
        float: left;
        width: 40px;
        height: 40px;
    }
    .search-container>.right ul li>div{
        float: left;
        margin-left: 10px;        
    }
    .article{
        position: relative;
        text-align: center;
    }
    .article h2{
        color: #333;
        font-size: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f8f8f8;
        margin-bottom: 16px;
        text-align: left;
    }
    .article img{
        max-width: 695px;
    }
    .article video{
        width: 100%;
    }
    .article audio{
        width: 70%;
        margin: 25px auto;
    }
    .article .viewBox{
        min-height: 400px;
    }
    .article>.noMember{
        position: absolute;
        top: 51px;
        left: 0;
        width: 100%;
        height: 400px;
        line-height: 400px;
        text-align: center;
        background-color: #fff;
        color: #333;
        font-size: 16px;
        box-shadow: 0px 3px 5px 0px rgba(255, 255, 255, 0.2);
    }
    .article>div b{
       font-weight: normal;
    }
    .article>div span{
        color: #ffad27;
        text-decoration: underline;
    }
    .from{
        margin-top: 60px;
        font-size: 14px;
        color: #999;
    }
    .from b{
        font-weight: 400px!important;
    }
    .from span{
        margin-left: 30px;
    }
    .from span:first-child{
        margin-left: 0;
    }
    .rate{
        margin-left: 40px;
    }
    .operate-article{
        text-align: center;
        margin-top: 30px;
    }
    .operate-article a{
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #ff7171;
        color: #ff7171;
    }
    .collect{
        color:#fff!important;
        background-color: #ff7171;
        border-width: 0!important;
    }
    .operate-article a:last-child{
        margin-left: 20px;
        border-color:#32b9ff;
        color: #32b9ff;
    }
    .comment-box{
        padding: 50px 60px 0;
        margin-top: 15px;
        border-top: 1px solid #e9e9e9;
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
    }
    .myButton{
        /*float: left;*/
        width: 140px;
        height: 40px;
        background-color: #409eff;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        border:none;
        margin-top: 15px;
        /*margin-left: 20px;*/
    }
    .res-quality{
        font-size: 16px;
        margin-top: 8px;
        color: #3f4449;
        margin-bottom: 90px;
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
    .comment-list ul{
        padding-top: 30px;
    }
    .comment-list ul li{
        overflow: hidden;
        padding-bottom: 20px;
        padding-top: 10px;
        border-bottom:1px solid #f8f8f8;
    }    
    .comment-list ul li img{
        width: 40px;
        border-radius: 50%;
        margin-right: 40px;
    }
    .comment-list ul li>div{
        width: 600px;
    }  
    .comment-title{
        margin-bottom: 15px;
    }  
    .comment-title span:first-child{
        font-size: 16px;
        color: #008fd5;
    }
    .comment-title span:last-child{
        float: right;
        color: #b7bcc1;
        font-size: 14px;
    }
    .comment-content{
        line-height: 28px;
        font-size: 14px;
    }
</style>


