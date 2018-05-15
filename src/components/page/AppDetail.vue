<template>
  <div class="w-1200 pageCont">    
    <div class="left">
        <img :src="appInfo.img0" alt="appLogo" class="appLogo">
    </div>
    <div class="left pageRight">
        <div class="head">
            <span class="headOne">{{appInfo.appName}}</span>
            <span class="headOne">{{appInfo.appFormStr}}</span>
            <span class="goBtn right" @click="toAppUrl(appInfo.appHref)">进入应用</span>
            <br>
            <Rate v-model="appInfo.score"></Rate>
            <span class="charBtn">{{appInfo.isChargeStr}}</span>
        </div>
        <p>{{appInfo.appDesc}}</p>
        <div class="imgBox" @mouseenter="hoverImg = true" @mouseleave="hoverImg = false">
            <div :style="{left:left}">
                <img :src="appInfo.img1">
                <img :src="appInfo.img2">
                <img :src="appInfo.img3">
                <img :src="appInfo.img4">
            </div>
            <button class="goLeft" @click="toLeft" v-show="hoverImg"></button>
            <button class="goRight" @click="toRight" v-show="hoverImg"></button>
        </div>
        <div class="comment-box">
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
                        <p class="left"><img :src="item.logo"  alt="头像"></p>
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
    <div class="clear"></div>
  </div>
</template>
<script>
import global_ from '@/components/Global';
export default {
    name:'AppDetail',
    data(){
        return {
            token:this.$storage.getStorage("token"),
            appId:this.$router.history.current.query.appId,
            appInfo:{},
            commentList:[],
            commentNum:5,
            comment:'',
            recommendStar:0,
            left:'0px',
            hoverImg:false,
        }
    } ,
    methods:{
        getInfo(){
            this.$http.post('/web/appInfo/info.do',this.$qs.stringify({
                token:this.token,
                appId:this.appId
            }))
            .then((res)=>{
            if(res.data.status==0){
               this.appInfo=res.data.data;
               this.getListResourceComment()
            }else{
              this.$Message.info(res.data.message);
            }
            })
            .catch((err)=>{
            alert(err);
            })
        },
        toAppUrl(href){
            window.open(href);
        },
        getListResourceComment(){//评论列表
            let url='/web/appInfo/listComments.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                appId:this.appId
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
            let url='web/appInfo/a/createComment.do';
            this.$http.post(url,this.$qs.stringify({
                token:this.token,
                appId:this.appId,
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
        },
        toLeft(){
            this.left='0px';
        },
        toRight(){
            this.left='-406px';
        }
    },
    created(){
        this.getInfo();
    } 
}
</script>
<style scoped>
    .appLogo{
        width: 120px;
        height: 120px;
    }
    .pageCont{
        margin-top: 40px;
        margin-bottom: 80px;
        min-height: 655px;
        padding:30px 60px;
        background-color: #fff;
    }
    .pageRight{
        width: 930px;
        margin-left: 30px;
    }
    .pageRight>p{
        text-indent: 2em;
        margin-top: 20px;
        font-size: 14px;
        line-height: 22px;
        color: #999;
    }
    .head{
        padding-top: 15px;
    }
    .head>span{
        margin-top: 20px;
    }
    .headOne{
        font-size: 20px;
        color: #666;
        margin-right: 60px;
        max-width: 150px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .goBtn{
        width: 100px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        color:#fff;
        background-color: #ffa93a;
        border-radius: 5px;
    }
    .charBtn{
        display: inline-block;
        width: 64px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        font-size: 14px;
        background-color: #36c433;
        border-radius: 3px;
    }
    .imgBox{
        width: 930px;
        height: 600px;
        overflow-x: scroll;
        margin:40px auto;
        position: relative;
    }
    .imgBox>div{
        position: absolute;
        width: 1335px;
        background-color: #f5f5f5;
        transition: left 1s;
        -moz-transition: left 1s;  /* Firefox 4 */
        -webkit-transition: left 1s;   /* Safari 和 Chrome */
        -o-transition: left 1s;    /* Opera */
    }
    .imgBox>div>img{
        width: 310px;
        height: 550px;
        margin:25px 10px;
        vertical-align: middle;
    }
    .imgBox button{
        width: 20px;
        height: 42px;
        position: absolute;
        top:280px;
        outline: none;
        border:none;
        z-index: 99;
    }
    .imgBox .goLeft{
        left: 0;
        background:url('../../assets/imgs/app/scrollleft.png') no-repeat center;
    }
    .imgBox .goRight{
        right: 0;
        background:url('../../assets/imgs/app/scrollright.png') no-repeat center;
    }
    /*隐藏滚动条*/
    .imgBox::-webkit-scrollbar{
        display: none;
        width: 0;
        height: 0;
    }
    /*评论*/
    .comment-box{
        margin-top: 20px;
    }
    .comment{
        overflow: hidden;
    }
    .comment textarea{
        float: left;
        width: 930px;
        border-radius: 5px;
        border:1px solid #dfe4e9;
        padding: 10px;
    }
    .myButton{
        width: 140px;
        height: 40px;
        background-color: #409eff;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        border:none;
        margin-top: 15px;
    }
    .res-quality{
        font-size: 16px;
        margin-top: 8px;
        color: #3f4449;
        margin-bottom: 90px;
    }
    .comment-list>div{
        overflow: hidden;
        text-align: left;
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


