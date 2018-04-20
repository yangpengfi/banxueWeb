<template>
  <div id="filter-content" class="w-1200">     
      <div id="content-box">
        <div class="filters">
          <!-- 左侧过滤 -->
          <div id="load-resource">
            <div class="left">
                <div class="leftHead" @click="showSel">
                    <span class="leftTitle">{{per2sub}}</span>
                    <Icon type="chevron-down"></Icon>
                    <transition name="mybox">
                      <div :class="{selDown:true,top74:resourceKindId==1,top47:resourceKindId==2}" v-show="boxshow">
                          <p>
                              <span>学 段：</span>
                              <select v-model="filter.periodId" id="per">
                                  <option value="0">请选择学段</option>
                                  <option v-for="item in perList" :value="item.id" :key="item.id">{{item.name}}</option>
                              </select>
                          </p>
                          <p>
                              <span>学 科：</span>
                              <select v-model="filter.subjectId" id="sub">
                                  <option value="0">请选择学科</option>
                                  <option v-for="item in subList" :value="item.subjectId" :key="item.subjectId">{{item.subjectName}}</option>
                              </select>
                          </p>
                          <p class="text-center">
                              <span class="bxw-btn-info-xs" @click.stop="mySure">确定</span>
                          </p>
                      </div>
                  </transition>
                </div>
                <ul class="section" v-if="nodeTree.length<1"> 
                  <li>暂无任何资源数据</li>  
                </ul>                
                <ul class="section" v-if="nodeTree.length>0">
                  <li v-for="item of nodeTree">
                    <div>
                      <b @click="unfold1(item)" class="fold">
                        <Icon type="ios-plus-outline" size=20 v-if="item.children.length>0"></Icon>
                      </b>                            
                      <span @click="tabLoad1(item)" :class="{active:item.id==loadId1}">{{item.name}}</span>
                    </div>
                    <ul class="joint" v-if="item.children.length>0" :class="{active:item.id == foldId1}">
                      <li v-for="item of item.children">
                        <div>
                          <b @click="unfold2(item)" class="fold">
                            <Icon type="ios-plus-outline" size=20 v-if="item.children.length>0"></Icon>
                          </b>  
                          <span @click="tabLoad2(item)" :class="{active:item.id==loadId2}">{{item.name}}</span>
                        </div>
                        <ul class="bar-line" v-if="item.children.length>0" :class="{active:item.id == foldId2}">
                          <li v-for="item of item.children">                                        
                            <span @click="tabLoad3(item)" :class="{active:item.id==loadId3}">{{item.name}}</span>
                          </li>
                        </ul>                               
                      </li>
                    </ul>
                  </li>
                </ul>
            </div>
        </div>
        <!-- 左侧过滤 -->
        </div>
        <div class="contents">
          <div class="right-title">           
            <div class="totel">共有 <span>{{totalCount}}</span> 个资源</div>
          </div>
          <ul class="right-list">            
             <li v-for="item of resourceList">
              <div class="file-img">
                <img :src="fileType(item.fileSuffix,0)" alt="文档图片">
              </div>
              <div class="file-content">
                <h5 :title="item.recourceLocalName">{{item.recourceLocalName}}</h5>
                <p>
                  <span>大小：{{formatSize(item.fileSize)}}</span>
                  <span>浏览：{{item.view}}</span>
                  <span>下载：{{item.downloadNum}}次</span>
                  <span>收藏：{{item.collectNum}}</span>
                </p>
                <p>贡献者：{{item.uploadUserName}}</p>
                <p>贡献时间：{{formatTime(item.createTime)}}</p>
              </div>
              <div>
                 <Rate v-model="star"></Rate>
              </div>
            </li>                
          </ul>
          <Page :total="totalCount" 
          :current="current" 
          :pageSize="pageSize" 
          show-elevator show-total 
          class="page-box" @on-change="pageChange"></Page>  			
        </div>
      </div>
  </div>
</template>
<script>
import qs from "qs"
import global_ from '@/components/Global';
export default {
    name:'HightQualityClass',
    data(){
        return{ 
          token:this.$storage.getStorage("token"),
          filter:{
            periodId:2,
            periodName:"初中",
            subjectId:2,
            subjectName:"数学",
            withDisabledNode:1
          },
          nodeTree:[],
          subList:[],
          perList:[
                {id:1,name:'高中'},
                {id:2,name:'初中'},
                {id:3,name:'小学'},
            ],
          loadId1:'',
          loadId2:'',
          loadId3:'',
          foldId1:'',
          foldId2:'',
          boxshow:false,
          per2sub:'初中数学',
          titles:[
            {id:1,name:'同步资源'},
            {id:2,name:'知识点微课'}
          ],
          resourceKindId:2,   
          selTitle:1,       
          typeList:[],
          type:1,
          star:5,
          totalCount:10,
          current:1,
          pageSize:10,
          formatSize:global_.formatSize,
          fileType:global_.setFileType,
          formatTime:global_.formatTime,
          resourceList:[],

      }
    },
    watch:{
        'filter.periodId': 'filterPer',
        deep:true
    },
    methods:{
        filterPer:function () {
            this.filter.subjectId=0;
            this.filter.versionId=0;
            this.filter.textbookId=0;
            this.subList=[];
            this.verList=[];
            this.textList=[];
            if(this.filter.periodId == '0'){
                return;
            }else{
                this.getSubjectList(this.filter.periodId);
            }
        },
        getResourceList(data){
            this.$http.post('/web/coursebook/listResourceLocal.do',this.$qs.stringify(data))
            .then(res => { 
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                this.totalCount=result.data.totalCount;
                this.current=result.data.currPage;
                this.pageSize=result.data.pageSize;
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.resourceList = result.data.list;
                }else{
                  this.resourceList = [];
                }           
              }
            }  
          }).catch(function (error) {
            alert(error);
          });
        },
        showSel:function () {
          this.boxshow = true;
        },
        getSelText(id){
            let myselect=document.getElementById(id);
            let index=myselect.selectedIndex; 
            return myselect.options[index].text; 
        },
        mySure:function () {
            if(this.filter.subjectId){
                this.boxshow = false;
                this.getKnowTree(this.filter);
                this.per2sub=this.getSelText('per')+this.getSelText('sub');
            }
        },
        tabLoad1(item){
          this.loadId1 = item.id;  
          this.loadId2 = '';
          this.loadId3 = '';
          if(this.resourceKindId == 1){
            this.filter.bid1 = item.id; 
            this.filter.kid1 = '';          
          }else if(this.resourceKindId == 2){
            this.filter.kid1 = item.id;
            this.filter.bid1 = '';
          }
          this.getResourceList(this.filter)
        },
        tabLoad2(item){
          this.loadId2 = item.id; 
          this.loadId1 = '';
          this.loadId3 = ''; 
          if(this.resourceKindId == 1){
            this.filter.bid2 = item.id;
            this.filter.kid1 = '';               
          }else if(this.resourceKindId == 2){
            this.filter.kid2 = item.id;
            this.filter.bid1 = '';
          }
          this.getResourceList(this.filter)
        },
        tabLoad3(item){
          this.loadId3 = item.id; 
          this.loadId1 = '';
          this.loadId2 = ''; 
          if(this.resourceKindId == 1){
            this.filter.bid3 = item.id;  
            this.filter.kid1 = '';            
          }else if(this.resourceKindId == 2){
            this.filter.kid3 = item.id;
            this.filter.bid1 = '';
          }
          this.getResourceList(this.filter)
        },
        unfold1(item){              
          this.foldId1 = item.id;
        },
        unfold2(item){              
          this.foldId2 = item.id;
        },
        getKnowTree(data){
            this.$http.post('/web/coursebook/getKnowledgePointTree.do',qs.stringify(data))
            .then(res => { 
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{  
                        if(result.data.children instanceof Array && result.data.children.length>0){
                            this.nodeTree = result.data.children;
                        }else{
                            this.nodeTree = [];
                        }           
                    }
                }     

            })
            .catch(function (error) {
                alert(error);
            });
        },
        getSubjectList(pId,sId){
            this.$http.post('/web/coursebook/listPeriod2Subject.do',qs.stringify({        
                periodId:pId,
                status:1,
                pageIndex:1,
                pageSize:100
            }))
            .then(res => { 
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{  
                        if(result.data.list instanceof Array && result.data.list.length>0){
                            this.subList = result.data.list;
                            if(sId){
                                this.filter.subjectId=sId;
                                this.getKnowTree(this.filter)
                            }
                        }else{
                            this.subList = [];
                            this.nodeTree = []
                        }           
                    }
                }     

            })
            .catch(function (error) {
                alert(error);
            });
        }, 
        getResourceLocalTypeList(){
            this.$http.post('/web/coursebook/listResourceLocalType.do',qs.stringify({        
                type:this.resourceKindId,
                token:this.token
            }))
            .then(res => { 
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{              
                        if(result.data.list instanceof Array && result.data.list.length>0){
                            this.typeList = result.data.list; 
                            this.type=result.data.list[0].id;         
                        }else{
                            this.typeList = [];
                        }
                    }
                }  
            })
            .catch(function (error) {
                alert(error);
            });
        },  
        pageChange(page){
            // this.filter.pageIndex=page;
            // this.getResourceList(this.filter)
            let data={pageIndex:page}
            this.getResourceList(data)
        } 
    },
    created() {
        this.per2sub=this.filter.periodName+this.filter.subjectName;
        this.getSubjectList(2,2);
        this.getResourceList(this.filter)
        this.getResourceLocalTypeList() 
    }
}
</script>
<style scoped>
/*筛选start*/
.text-center{
  text-align: center;
}
#load-resource{
    min-height: 900px;
    overflow-y:auto;
}
.leftHead{
  margin-top: 20px;
    width: 220px;
    padding: 10px 20px;
    background-color: #1caaf1;
    text-align: center;
    position: relative;
}
.leftTitle{
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 24px;
    max-width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.leftHead>i{
    color:#fff;
    font-size: 16px;
    position: absolute;
    top:calc(50% - 9px);
    right: 10px;
}
.selDown{
    text-align: left;
    position: absolute;
    left:0;
    width: 220px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    background-color: #f8f8f8;
    overflow: hidden;
    z-index: 10;
}
.top74{
  top:74px;
}
.top47{
  top:47px;
}
.selDown>p{
    line-height: 40px;
}
.selDown>p select{
    width: 125px;
    height: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding-left: 7px;
    color: #666;
}
.bxw-btn-info-xs{
    display: inline-block;
    padding:0 25px;
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    color:#fff;
    cursor: pointer;
    text-decoration: none;
    background-color: #1daaf3;
}
.mybox-leave-active,.mybox-enter-active{
    transition:  all .5s; 
}
.mybox-leave-active,.mybox-enter{
    padding: 0 15px;
    height:0px !important;
}
.mybox-leave,.mybox-enter-active{
    padding: 15px;
    height: 162px;
}

.section{
    width: 100%;
    min-height: 550px;    
    overflow-y:auto;
}
.section li{
    margin: 10px;  
}
.joint>li{
    margin-right: 0;  
}
.bar-line>li{
    margin-right: 0;  
}
.section li .ivu-icon-ios-plus-outline{
   cursor: pointer;
}
.section li p{
    float: right;
    cursor: pointer;
    display: none;
    margin-top: 3px;
}
.section li p.active{
    display: block;
}
.section li span{
    cursor: pointer;
}
.section li span.active{
    color: #47a2ff;
}
.section li .ivu-icon-ios-cloud-upload-outline{
    color: #47a2ff;    
}
.fold{
    display: inline-block;
    width: 18px;
    height: 20px;
}
.joint,.bar-line{
    display: none;
}
.joint.active,.bar-line.active{
    display: block;
}
.uploader-example .uploader-btn{
    margin: 10px 0;
    display: none;
}
.uploader-example .uploader-btn.active{
    display: block;
    color: #fff;    
    background-color: #f90;
    border-color: #f90;
}
.uploader-example .uploader-btn.active:hover{
    background-color: #ffad33;
    border-color: #ffad33;
}
.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
/*筛选end*/
   #filter-content{
      background-color: #fff;      
      margin-top: 40px;
      margin-bottom: 80px;
      border:1px solid #e9e9e9;
   }   
   #content-box{
     overflow: hidden;
     padding: 0 60px 0 40px;
     width: 100%;
   }
   .filters{
     float: left;
     width: 240px;
     border-right:1px solid #dfe4e9;
   }
   .contents{
     float: left;
     width: 800px;
     margin-left: 40px;     
     margin-bottom:36px;
   }
   .right-title{     
     position: relative;     
     margin-top: 24px;
     height:40px;     
   }   
   .totel{
     position: absolute;
     right: 0;
     top: 10px;
     font-size: 14px;
   }
   .totel span{
     color: #1caaf1;
   }
   .right-list{
     padding: 0 20px 0 60px;
     border:1px solid #f3f3f3;
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
   .right-list li>div:last-child{
     position: absolute;
     right: 0;
     top: 30px;
   }
   .file-img{
     float: left;
   }
   .file-img img{
     width: 100px;
     height: 100px;
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
</style>


