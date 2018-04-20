<template>
    <div>
        <div id="filter-list" class="w-1200">
            <div>
                <p>
                    <Icon type="ios-list-outline"></Icon>
                    <span>类型</span>
                </p>
                <ul>
                    <li v-for="item of allType" @click="changeType(item)" :class="{active:item.id==selType}">{{item.name}}</li>
                </ul>
            </div>
            <div v-if="selType ==1">
                <p>
                   <Icon type="ios-list-outline"></Icon>
                    <span>学段</span>
                </p>
                <ul>
                    <li v-for="item of periodList" 
                    @click="changePeriod(item)" 
                    :class="{active:item.id==selPeriod}" v-if="item.id>0">{{item.name}}</li>
                </ul>
            </div>
            <div v-if="selType ==1">
                <p>
                    <Icon type="ios-list-outline"></Icon>
                    <span>年级</span>
                </p>
                <ul>
                    <li v-for="item of gradeList" 
                    @click="changeGrade(item)" 
                    :class="{active:item.id==selGrade}" v-if="item.id>3">{{item.name}}</li>
                </ul>
            </div>
            <div v-if="selType ==1">
                <p>
                    <Icon type="ios-list-outline"></Icon>
                    <span>学科</span>
                </p>
                <ul>
                    <li v-for="item of subjectList" 
                    @click="changeSubject(item)" 
                    :class="{active:item.id==selSubject}">{{item.name}}</li>
                </ul>
            </div>
            <div v-if="selType ==2">
                <p>
                    <Icon type="ios-list-outline"></Icon>
                    <span>专题</span>
                </p>
                <ul>
                    <li v-for="item of specialList" 
                    @click="changeSpecial(item)" 
                    :class="{active:item.columnId==selSpecial}">{{item.columnName}}</li>
                </ul>
            </div>
            <div v-if="selType ==2">
                <p>
                    <Icon type="ios-list-outline"></Icon>
                    <span>学科</span>
                </p>
                <ul>
                    <li v-for="item of themeList" 
                    @click="changeTheme(item)" 
                    :class="{active:item.themeId==selTheme}">{{item.themeName}}</li>
                </ul>
            </div>
            
        </div>
       <div id="filter-content" class="w-1200">
     
            <div id="content-box">
                <ul class="filters" v-if="selType ==1">
                    <li v-for="item of titleList" 
                    :class="{active:item.topicId==selTopic}" 
                    @click="changelist(item)" :title="item.topicName">
                        <span></span>{{item.topicName}}
                    </li>                                      
                </ul>
                <div class="contents" :class="{contentsAll:selType ==2}">
                    <div class="right-title">           
                        <div class="totel">共有 <span>30</span> 个资源</div>
                    </div>
                    <ul class="right-list">            
                        <li v-for="item of resourceList">
                        <div class="file-img">
                            <img src="/static/imgs/resource/fileVideo.png" alt="文档图片">
                        </div>
                        <div class="file-content">
                            <h5>{{item.knowledgePoint}} </h5>
                            <p>
                            <span>{{item.periodName}}</span>
                            <span>{{item.gradeName}}</span>
                            <span>{{item.subjectName}}</span>
                            <span>专辑名称：{{item.topic}}</span>
                            </p>
                            <!-- <p>讲师：{{item.lecturer}}</p> -->
                        </div>
                        <div class="file-star">
                            <!-- <span>特色微课</span> -->
                            <!-- <Rate v-model="star"></Rate> -->
                        </div>
                        </li>                
                    </ul>
                    <Page :total="totalCount" show-elevator show-total class="page-box"></Page>	
                </div>
            </div>
        </div>
    </div>
       
</template>
<script>
import global_ from '@/components/Global'; 
export default {
  name:'SpecialClass',
  data(){
      return{
            token:this.$storage.getStorage('token'),
            star:5,
            totalCount:10,
            allType:[
                {id:1,name:'同步微课'},
                {id:2,name:'专题微课'}
            ],
            selType:1,
            periodList:global_.per2gradeList,
            selPeriod:2,
            gradeList:global_.per2gradeList[1].gradeList,
            selGrade:7,
            subjectList:global_.subjectList,
            selSubject:1,
            specialList:[],
            selSpecial:1,
            themeList:[],
            selTheme:1,
            titleList:[],
            selTopic:119,
            resourceList:[]
      }
  },
  methods:{
    changeType(item){
      this.selType=item.id; 
      if(this.selType==2){
        this.getColumnList(0)
        this.getThemeList(0,0,1)
        this.getResourceList(0,0,2,this.selTheme);
      }
    },
    changePeriod(item){
      this.selPeriod=item.id;
      if(item.id==3){
        this.selGrade=item.gradeList[3].id;
      }else{
        this.selGrade=item.gradeList[0].id;
      }
      this.gradeList=item.gradeList;
      this.getSubjectList(this.selGrade);
      this.getTitleList(this.selPeriod,this.selGrade,1);
      this.getResourceList(this.selPeriod,this.selGrade,1);
    },
    changeGrade(item){
      this.selGrade=item.id;
      this.getSubjectList(this.selGrade);
      this.getTitleList(this.selPeriod,this.selGrade,1);
      this.getResourceList(this.selPeriod,this.selGrade,1); 
    },
    changeSubject(item){
      this.selSubject=item.id; 
      this.getTitleList(this.selPeriod,this.selGrade,this.selSubject); 
      this.getResourceList(this.selPeriod,this.selGrade,this.selSubject); 
    },
    changeSpecial(item){
      this.selSpecial=item.columnId;
      this.getThemeList(0,0,this.selSpecial) 
    },
    changeTheme(item){
      this.selTheme=item.themeId; 
      this.getResourceList(0,0,item.subjectId,this.selTheme);
    },
    changelist(item){
      this.selTopic=item.topicId; 
      this.getResourceList(this.selPeriod,this.selGrade,this.selSubject,0,this.selTopic);
    },
    getColumnList(gId){
    this.$http.post('/web/microcourse/listColumn.do',this.$qs.stringify({
        token:this.token,
        gradeId:gId
      }))
     .then((res)=>{
        if(res.data.status==0){
          if(res.data.data instanceof Array && res.data.data.length>0){
              this.specialList=res.data.data;
            }else{
              this.specialList = [];
            }
        }else{
          this.$Message.info(res.data.message);
        }
      })
      .catch((err)=>{
        alert(err);
      })
    },
    getThemeList(pId,gId,cId){
    this.$http.post('/web/microcourse/listTheme.do',this.$qs.stringify({
        token:this.token,
        periodId:pId,
        gradeId:gId,
        cloumnId:cId
      }))
     .then((res)=>{
        if(res.data.status==0){
          if(res.data.data instanceof Array && res.data.data.length>0){
              this.themeList=res.data.data;
              this.selTheme=res.data.data[0].themeId;
              this.selSubject=res.data.data[0].subjectId;
              this.getResourceList(0,0,this.selSubject,this.selTheme);
            }else{
              this.themeList = [];
            }
        }else{
          this.$Message.info(res.data.message);
        }
      })
      .catch((err)=>{
        alert(err);
      })
    },
    getSubjectList(gId){
    this.$http.post('/web/microcourse/listSubjcectByGradeId.do',this.$qs.stringify({
        gradeId:gId
      }))
     .then((res)=>{
        if(res.data.status==0){
          this.subjectList=res.data.data;
        }else{
          this.$Message.info(res.data.message);
        }
      })
      .catch((err)=>{
        alert(err);
      })
    },
    getTitleList(pId,gId,sId){
    this.$http.post('/web/microcourse/getTopicList.do',this.$qs.stringify({
        token:this.token,
        periodId:pId,
        gradeId:gId,
        subjectId:sId
      }))
     .then((res)=>{
        if(res.data.status==0){
            if(res.data.data instanceof Array && res.data.data.length>0){
              this.titleList=res.data.data;
              this.selTopic=res.data.data[0].topicId;
            }else{
              this.titleList = [];
            }
        }else{
          this.$Message.info(res.data.message);
        }
      })
      .catch((err)=>{
        alert(err);
      })
    }, 
    getResourceList(pId,gId,sId,themId,topicId,pIdx){
    this.$http.post('/web/microcourse/listResource.do',this.$qs.stringify({
        token:this.token,
        periodId:pId||'',
        gradeId:gId||"",
        subjectId:sId||"",
        themeId:themId||0,
        topicId:topicId||0,
        pageIndex:pIdx||1,
        pageSize:10
      }))
     .then((res)=>{
        if(res.data.status==0){
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
  },
  created(){
    this.getTitleList(this.selPeriod,this.selGrade,this.selSubject);
    this.getResourceList(this.selPeriod,this.selGrade,this.selSubject,0,this.selTopic);
  }
}
</script>
<style scoped>
    #filter-list{
        margin-top: 60px;
        margin-bottom: 30px;
        padding-left: 20px;
    }
    #filter-list>div{
        overflow: hidden;
        margin-bottom: 20px;
    }
    #filter-list>div p{
        float: left;
        font-size: 14px;
        color: #999;
        padding: 8px 0;
    }
    #filter-list>div p span{
        margin-left: 35px;
    }
    #filter-list>div ul{
        float: left;
        margin-left: 60px;
        max-width: 1040px;
    }
    #filter-list>div ul li{
        float: left;
        padding: 3px 15px;
        margin-right: 30px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
    }
    #filter-list>div ul li.active{
        color: #fff;
        background-color: #1cb0ea;
    }   
   #filter-content{
      background-color: #fff; 
      margin-bottom: 80px;
      border:1px solid #e9e9e9;
   }
   #content-box{
     overflow: hidden;
     padding: 0 40px;
     width: 100%;
   }
   .filters{
     float: left;
     width: 240px;
     min-height: 650px;
     margin-top: 30px;
     padding-right: 20px;
     border-right:1px solid #eee;
   }
   .filters li{
     max-width: 215px;
     height: 60px;
     line-height: 60px;
     border-bottom: 1px solid #f3f3f3;
     font-size: 16px;
     padding-left: 20px;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }   
   .filters li.active{
     height: 60px;
     line-height: 60px;
     border-bottom: 1px solid #f3f3f3;
     font-size: 20px;
     color: #1caaf1;
     position: relative;
   }
   .filters li.active span{
     position: absolute;
     left: 0;
     top: 15px;
     /*border-left: 3px solid #1caaf1;*/
     height: 30px;
   }
   .contents{
     float: left;
     width: 800px;
     margin-left: 40px;     
     margin-bottom:36px;
   }
   .contentsAll{
       width: 100%;
       margin-left: 0;
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
     margin-top: 55px;
   }
   .file-content p span{
     margin-right: 20px;
   }
   .file-content h5{
     color: #333;
     font-size: 14px;
   }
   .ivu-page{
     text-align: center;
     margin-top: 25px;
   }
   .file-star{
        text-align: right;
    }
    .file-star span{
        font-size: 14px;
        color:#1caaf1;
        border: 1px solid #1caaf1;
        font-weight: 400;
        padding: 3px;
    }
</style>




