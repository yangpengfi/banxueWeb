<template>
  <div>
      <div class="search-container">
          <div class="left">
            <div class="article-box">
                <div class="article">
                    <h2>
                        {{resourceDetail.documentName}}
                        <p>{{resourceDetail.periodName}}  {{resourceDetail.subjectName}}</p>
                    </h2>
                    <div class="viewBox" v-show="!isMember"></div>
                    <iframe src="http://ow365.cn/?i=15549&furl=http://www.mybanxue.com:86/resource/zxxk/6940294.doc" v-show="isPfd" frameborder="0" width="100%" height="700" id="reader"></iframe>
                    
                    <video :src="resourceUrl" controls="controls" controlslist="nodownload" v-show="isVideo"></video>
                    <audio :src="resourceUrl" controls="controls" controlslist="nodownload" v-show="isAudio"></audio>
                    <img :src="resourceUrl" v-show="isImg">
                    <div class="noMember" v-if="!isMember">
                        <b>如需阅读或下载完整版，请登录APP</b>
                        <span>开通会员</span>
                    </div>
                </div>
                <div class="operate-article">
                    <!-- <a href="javascript:void(0);" @click="collectOrDel" :class="{collect:isCollect}">收藏</a>
                    <a :href="resourceUrl" v-if="!isVideo">下载</a> -->
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
    name:'DetailResourceSubject',
    data(){
        return{
            token:this.$storage.getStorage("token"),
            documentId:0,
            periodId:0,
            subjectId:0,
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
                this.getResourceLocalUrl()
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
            this.resourceId=this.$router.history.current.query.resourceId;
            this.getResourceDetail(this.resourceId);
            this.$router.push({
                path:'/DetailResource',
                query:{
                    resourceId:item.resourceId                    
                }
            });     
        },
        getResourceDetail(rId){
        this.$http.post('/web/coursebook/getZxxkDocument.do',this.$qs.stringify({
            token:this.token,
            periodId:this.periodId,
            subjectId:this.subjectId,
            documentId:rId
          }))
         .then((res)=>{
            if(res.data.status==0){
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
        collectOrDel(){
            if(this.isCollect){
                this.delCollectResource();
            }else{
                this.collectResource();
            }
        },
        collectResource(){
            let url='/web/coursebook/a/collectResourceZxxk.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                documentId:this.documentId
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
            let url='/web/coursebook/a/deleteCollectResourceZxxk.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                documentIds:this.documentId
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
            this.$http.post('/web/coursebook/a/acquireZxxkDocument.do',this.$qs.stringify({
                token:this.token,
                periodId:this.periodId,
                subjectId:this.subjectId,
                documentId:this.documentId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.resourceUrl=res.data.data.url;
               document.getElementById('reader').src=this.$previewURL+res.data.data.viewUrl;
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            }) 
        },
    },
    created(){
        this.getHostSearchResource();
        this.documentId=this.$router.history.current.query.documentId;
        this.periodId=this.$router.history.current.query.periodId;
        this.subjectId=this.$router.history.current.query.subjectId;
        this.getResourceDetail(this.documentId);
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
        min-height: 600px;
        padding-bottom: 40px;
        border:1px solid #e9e9e9;
        background-color: #fff;        
    }    
    .search-container>.right{        
        width: 360px;        
    }  
    .article-box{
        padding: 40px 60px 0;
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
    .article h2>p{
        color: #999;
        font-size: 12px;
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


