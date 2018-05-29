<template>
    <div id="bg">
        <div id="my-space">
            <div class="space-title">
                <img :src="spaceInfo.logo" alt="头像"/>
                <div class="my-info">
                    <p>{{spaceInfo.userName}}</p>
                    <span>{{spaceInfo.schoolName}}</span>
                </div>
                <div class="my-operate">
                    <p>
                        <b>{{spaceInfo.resourceCount}}</b>
                        <span>资源</span>
                    </p>
                    <p class="no-line">
                        <b>{{spaceInfo.articleCount}}</b>
                        <span>文章</span>
                    </p>
                    <button v-show="!theFollow" @click="follow">关注</button>
                    <button v-show="theFollow"  @click="unFollow">取消关注</button>
                </div>
            </div>
            <ul class="title-list">
                <li v-for="item in titleList" @click="changeTitle(item)">
                    <router-link :to="item.path" :class="{active:item.id == localTitle}">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
        <div class="content" style="min-height:600px">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <v-foot></v-foot>
    </div>
</template>
<script>
import vFoot from '@/components/common/Footer'; 
export default {
    name:'ShowSpace',
    components:{            
        vFoot
    },
    data () {
        return {
            token:this.$storage.getStorage("token"),
            userId:0,
            spaceInfo:{},
            theFollow:false,
            titleList:[
                {id:'showSpace',title:'主页',path:'/ShowSpace/'},
                {id:'myResource',title:'资源中心',path:'/ShowSpace/MyResource?'},
                {id:'achievements',title:'学习成果',path:'/ShowSpace/Achievements'},
                {id:'myList',title:'通讯录',path:'/ShowSpace/MyList'}
            ],
            localTitle:'showSpace',
        } 
    },
    methods:{
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        getSpaceInfo(){
            this.$http.post('web/space/spaceInfo.do',this.$qs.stringify({
              userId:this.userId,
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.spaceInfo = result.data;
                this.$storage.setStorage("spaceInfo",this.spaceInfo); 
              }else{ 
                this.$Message.error(result.message);
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        isFollowers(){//是否关注
            this.$http.post('/web/space/isFollow.do',this.$qs.stringify({
              token:this.token,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.theFollow=result.data;
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
        unFollow(){//取消关注
            this.$http.post('/web/space/a/unFollow.do',this.$qs.stringify({
              token:this.token,
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.isFollowers();
                this.$Message.info(result.message);
              }else{
                this.$Message.error(result.message);            
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        follow(){//关注
            this.$http.post('/web/space/a/follow.do',this.$qs.stringify({
              token:this.$storage.getStorage("token"),
              userId:this.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.isFollowers();
                this.$Message.info(result.message);
              }else{
                this.$Message.error(result.message);            
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        changeTitle(item){
            this.localTitle=item.id;
        }
    },
    created(){
        this.userId=this.$router.history.current.query.userId;
        for(let i=0,len=this.titleList.length;i<len;i++){
            this.titleList[i].path=this.titleList[i].path+'?userId='+this.userId
        }
        let pageId=this.$router.history.current.path.split('/')[2];
        if(!pageId){
           this.localTitle="showSpace" 
        }else{
          this.localTitle=pageId;  
        }
        this.getSpaceInfo();
        this.isFollowers();
    }
}
</script>
<style scoped>
    #bg{
        width: 100%;
        padding-top: 80px;        
        min-height: 480px;
        background: url('../../assets/imgs/space/bg.png') no-repeat top center;
    }
    #my-space{
        width: 1200px;
        margin: auto;
    }
    .space-title{    
        min-height: 130px;
        background-color: #fff;
    }
    .space-title img{
        float: left;
        width: 140px;
        height: 140px;
        margin: -40px 20px 0 20px;
    }
    .my-info{
        float: left;
        font-size: 14px;
        color: #666;
    }
    .my-info p{
        margin-top: 40px;
        font-size: 16px;
        color: #50a7ff;
    }  
    .my-operate{
        float: right;
        margin-right: 60px;
        margin-top: 30px;
    }
    .my-operate p{
        float: left;
        text-align: center;
        border-right:1px solid #f3f3f3;
        margin-right: 25px;
        padding-right: 15px;
    }
    .my-operate p.no-line{
        border-right: none;
         margin-right: 15px;
    }
    .my-operate p b{
        display: block;
        font-size: 20px;
        color: #333;
        font-weight: normal;
    }
    .my-operate button{
        width: 100px;
        height: 40px;
        color: #fff;
        background-color: #1caaf1;
        border-radius: 5px;
        border:none;
        font-size: 16px;
        cursor: pointer;
    }
    .my-operate button:focus{
        outline: none;
    }
    .title-list{
        overflow: hidden;
        width: 100%;
        background-color: #fff;
        padding-left: 40px;
    }
    .title-list li{
        float: left;
    }
    .title-list li a{
        display: inline-block;
        padding: 0 25px 20px;
        font-size: 16px;
        color: #333;  
        cursor: pointer;      
    }
    .title-list li a.active{
        color: #50a6ff; 
        border-bottom:2px solid #50a6ff; 
    }
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
	}
	.viewCont li img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.viewCont li p{
		font-size: 14px;
		color: #7b8085;
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
        font-size: 16px;
        color: #1cb0ea;
    }
    .message ul li .time{   
        float: right;     
        font-size: 12px;
        color: #999;
        margin-top: 3px;
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
        height: 120px;
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
    }
    .list-title b{
        color:#50a6ff;
    }
    .list-content{
        font-size: 14px;
        color:#666;
        line-height: 26px;
        text-indent: 30px;
    }
    .other-info{
        margin-top: 10px;
        text-align: right;
        font-size: 14px;
        color: #999;
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
    }
    .dynamic-operate{
        float: right;
    }
    .dynamic-operate span{
        color: #1cb0ea;
        margin-left: 20px;
        margin-right: 10px;
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
		color: #999;
		font-size: 14px;
		background-color: transparent;
		border-radius: 3px;
		cursor: pointer;
	}
	#load-more:focus{
		outline: none;
	}
</style>


