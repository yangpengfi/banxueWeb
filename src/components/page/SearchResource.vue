<template>
  <div>
      <div class="search-bg"></div>
      <div class="search-type">
          <span>类型</span>
          <button v-for="item of typeList" @click="changeType(item)" :class="{active:item.id==typeId}">{{item.title}}</button>
      </div>
      <div class="search-container">
          <div class="left">
                <p>共搜索到 <span>{{totalCount}}</span> 个资源</p>
                <ul class="right-list" v-if='typeId!=3'>
                    <li v-for="item of resourceList">
                        <div class="file-img">
                            <img :src="fileType(item.fileSuffix,0)" alt="文档图片" @click="toDetailResource(item)">
                        </div>
                        <div class="file-content">
                            <h5 :title="item.recourceLocalName" 
                            @click="toDetailResource(item)">{{item.recourceLocalName}}</h5>
                            <p>
                              <span>大小：{{formatSize(item.fileSize)}}</span>
                              <span>浏览：{{item.browseNum}}</span>
                              <span>下载：{{item.downloadNum}}次</span>
                              <span>收藏：{{item.collectNum}}</span>
                            </p>
                            <p>贡献者：{{item.uploadUserName}}</p>
                            <p>贡献时间：{{formatTime(item.createTime)}}</p>
                        </div>
                        <div class="file-star">
                            <Rate allow-half v-model="item.score"></Rate>
                        </div>
                    </li>                
                </ul>
                <ul class="right-list" v-if='typeId==3'>            
                        <li v-for="item of resourceList">
                        <div class="file-img">
                            <img src="../../../static/imgs/resource/fileVideo.png" alt="文档图片" @click="toDetailResource1(item)">
                        </div>
                        <div class="file-content">
                            <h5 @click="toDetailResource1(item)" :title="item.knowledgePoint">{{item.knowledgePoint}} </h5>
                            <p style="margin-top: 55px;">
                            <span>{{item.periodName}}</span>
                            <span>{{item.gradeName}}</span>
                            <span>{{item.subjectName}}</span>
                            <span>专辑名称：{{item.topic}}</span>
                            </p>
                        </div>
                        <div class="file-star">
                        </div>
                        </li>                
                    </ul>
                <Page :total="totalCount"  
                      :current="current" 
                      :pageSize="pageSize" 
                      @on-change="pageChange" 
                      show-elevator show-total></Page>	
          </div>
          <div class="right">
               <div class="hot-list">
                   <p><span></span><b>热门搜索</b></p>
                   <ul>
                        <li v-for="item of recommendSearch">
                            <img :src="fileType(item.fileSuffix,0)" alt="资源图标" @click="toDetailResource(item)">
                            <div>
                                <p @click="toDetailResource(item)">{{item.recourceLocalName}}</p>
                                <Rate allow-half v-model="item.score"></Rate>
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
    name:'SearchResource',
    data(){
        return{
            postData:{
                token:this.$storage.getStorage("token"),
                name:this.$router.history.current.query.name,
            },
            postUrl:'/web/coursebook/listResourceLocal.do',
            typeList:[
                {id:1,title:'区域资源',resourceTypeId:0},
                {id:2,title:'校本资源',resourceTypeId:0},
                {id:3,title:'特色微课',resourceTypeId:0},
                {id:4,title:'优课专区',resourceTypeId:6}
            ],
            typeId:1,
            star:5,
            resourceList:[],
            recommendSearch:[],
            current:1,
            pageSize:10,
            totalCount:10,
            formatSize:global_.formatSize,
            fileType:global_.setFileType,
            formatTime:global_.formatTime
        }
    },
    methods:{
        changeType(item){
            this.typeId = item.id;
            this.postData.pageIndex=1;
            this.postData.resourceTypeId=item.resourceTypeId;
            if(item.id==1){
                this.postUrl="/web/coursebook/listResourceLocal.do";
            }else if(item.id==2){
                this.postUrl='/web/coursebook/a/listResourceLocalSchool.do';
            }else if(item.id==3){
                this.postUrl='/web/microcourse/listResource.do';
            }else if(item.id==4){
                this.postUrl='/web/coursebook/listResourceLocal.do';
            }
            this.getResourceList(this.postUrl,this.postData);
        },
        toDetailResource(item){
            if(!this.postData.token){
              this.login();
              return;
            }
            this.increaseSearchViewNum(item.resourceLocalId);
            this.$router.push({
				path:'/DetailResource',
				query:{
					resourceLocalId:item.resourceLocalId					
				}
			});		
        },
        toDetailResource1(item){
            if(!this.postData.token){
                  this.login();
                  return;
            }
            this.$router.push({
              path:'/DetailResource',
              query:{
                resourceId:item.resourceId,
                microcourse:1          
              }
            });   
        },
        getResourceList(url,posData){
        this.$http.post(url,this.$qs.stringify(posData))
         .then((res)=>{
            if(res.data.status==0){
                this.totalCount=res.data.data.totalCount;
                this.current=res.data.data.currPage;
                this.pageSize=res.data.data.pageSize;
                if(res.data.data.list instanceof Array && res.data.data.list.length>0){
                  this.resourceList=res.data.data.list;
                }else{
                  this.resourceList = [];
                }
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        increaseSearchViewNum(rId){
            this.$http.post('/web/coursebook/increaseSearchViewNum.do',this.$qs.stringify({
            token:this.token,
            resourceLocalId:rId
          }))
         .then((res)=>{
            if(res.data.status==0){
              this.$Message.info(res.data.message);
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        pageChange(page){
            this.postData.pageIndex=page;
            this.getResourceList(this.postUrl,this.postData);
        } ,

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
        }
    },
    created(){
        this.getResourceList(this.postUrl,this.postData);
        this.getHostSearchResource();
    }
}
</script>
<style scoped>
    .search-bg{
        width: 100%;
        height: 220px;
        background-color:#1cb0ea;
        background: url('../../assets/imgs/resource/searchdebg.jpg') no-repeat center center;
    }
    .search-type{
        width: 1200px;
        margin: 30px auto;
        font-size: 14px;
    }
     .search-type span{
        margin-right: 20px;
    }
    .search-type button{
        padding: 3px 15px;
        margin-right: 30px;
        color: #666;
        cursor: pointer;
        border:none;
        background-color: transparent;
    }
    .search-type button:focus{ 
        outline: none; 
    } 
    .search-type button.active{
        color: #fff;
        background-color: #1cb0ea;
    }
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
        padding: 30px 40px;
    }
     .search-container>.left>p span{
        color: #1cb0ea;
    }
    .search-container>.right{        
        width: 360px;        
    }  
    .right-list{
        width: 100%;
    }  
    .right-list li{
        height: 180px;  
        padding-top: 40px;
        position: relative;   
        border-bottom:1px solid #f3f3f3;
    }
    .right-list li:last-child{     
        border-bottom:none;
    }   
    .file-img{
        float: left;
    }
    .file-img img{
        width: 100px;
        height: 100px;
        cursor: pointer;
    }   
    .file-content{
        float: left;
        margin-left: 90px;
        font-size: 14px;
        color: #999;
    }
    .file-content p{
        margin: 5px 0;
    }
    .file-content p span{
        margin-right: 20px;
    }
    .file-content h5{
        color: #333;
        font-size: 14px;
        cursor: pointer;
        max-width: 375px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .ivu-page{
        text-align: center;
        margin-top: 25px;
    }
    .file-star{
        text-align: right;
    }
    .hot-list{
        padding: 35px 20px 0;
        background-color: #fff;
        border:1px solid #e9e9e9;
    }
    .hot-list>p{
        font-size: 20px;  
        margin-bottom: 30px;   
        height: 30px;
        line-height: 30px;  
        vertical-align: middle;   
    }
    .hot-list p span{
        float: left;
        height: 100%;
        margin-right: 20px;
        border-left: 2px solid #0098e0;
    }
    .hot-list p b{
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
        cursor: pointer;
    }
    .search-container>.right ul li>div{
        float: left;
        margin-left: 10px;        
    }
    .search-container>.right ul li>div p{
        cursor: pointer;      
    }
    .ivu-page{
     text-align: center;
     margin-top: 25px;
   }
</style>


