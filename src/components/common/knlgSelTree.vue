<template>
  <div>
    <div id="leftTree">
        <div class="leftHead" @click="showSel">
            <span class="leftTitle">{{per2sub}}</span>
            <i class="fa fa-chevron-down" style="top: calc(50% - 10px);"></i>
            <div class="selDown" style="top: 47px;">
                <p>
                    <span>学 段：</span>
                    <select v-model="sel.periodId" id="pre">
                        <option value="0">请选择学段</option>
                        <option value="3">小学</option>
                        <option value="2">初中</option>
                        <option value="1">高中</option>
                    </select>
                </p>
                <p>
                    <span>学 科：</span>
                    <select v-model="sel.subjectId" id="sub">
                        <option value="0">请选择学科</option>
                        <option v-for="item in subList" :value="item.subjectId">{{item.subjectName}}</option>
                    </select>
                </p>
                <p class="text-center">
                    <span class="bxw-btn-info-xs" @click.stop="mySure">确定</span>
                </p>
            </div>
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
</template>


<script>
  export default {
    data(){
        return{
            nodeTree:[],
            loadId1:'',
            loadId2:'',
            loadId3:''
        }
    },
    methods:{
        tabLoad1(item){
            this.loadId1 = item.id;  
            this.loadId2 = '';
            this.loadId3 = '';
            if(this.resourceKindId == 1){
                this.bid1 = item.id; 
                this.bname1 = item.name;           
            }else if(this.resourceKindId == 2){
                this.kid1 = item.id;
                this.kname1 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
        tabLoad2(item){
            this.loadId2 = item.id; 
            this.loadId1 = '';
            this.loadId3 = ''; 
            if(this.resourceKindId == 1){
                this.bid2 = item.id; 
                this.bname2 = item.name;              
            }else if(this.resourceKindId == 2){
                this.kid2 = item.id;
                this.kname2 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
        tabLoad3(item){
            this.loadId3 = item.id; 
            this.loadId1 = '';
            this.loadId2 = ''; 
            if(this.resourceKindId == 1){
                this.bid3 = item.id;
                this.bname3 = item.name;              
            }else if(this.resourceKindId == 2){
                this.kid3 = item.id;
                this.kname3 = item.name; 
            }
            this.fileName = item.name;
            this.getUniCode();
        },
        unfold1(item){              
            this.foldId1 = item.id;
        },
        unfold2(item){              
            this.foldId2 = item.id;
        },            
        getKnowTree(){
            this.$http.post('/web/coursebook/getKnowledgePointTree.do',qs.stringify({               
                periodId:this.periodId,
                subjectId:this.subjectId,               
                withDisabledNode:1
            })).then(res => {   
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
                
            }).catch(function (error) {
                alert(error);
            });
        },
        getNodeTree(){
            this.$http.post('/web/coursebook/getBookNodeTree.do',qs.stringify({             
                periodId:this.periodId,
                subjectId:this.subjectId,
                versionId:this.bookId,
                textbookId:this.textBookId,
                withDisabledNode:1
            })).then(res => {   
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
                
            }).catch(function (error) {
                alert(error);
            });
        },
        getSubjectList(periodId){
            this.$http.post('/web/coursebook/listPeriod2Subject.do',qs.stringify({              
                periodId:periodId,
                name:'',
                status:1,
                pageIndex:1,
                pageSize:100
            })).then(res => {   
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{  
                        if(result.data.list instanceof Array && result.data.list.length>0){
                            this.subjectList = result.data.list;
                            if(result.data.list.length == 1){
                                this.open=false;
                            }
                        }else{
                            this.subjectList = [];
                            this.nodeTree = []
                            this.open=false;
                        }                       
                    }
                }           
                
            }).catch(function (error) {
                alert(error);
            });
        },  
        getBookList(subjectId){
            this.$http.post('/web/coursebook/listBookVersion.do',qs.stringify({             
                periodId:this.periodId,
                subjectId:subjectId,
                name:'',
                status:1,
                pageIndex:1,
                pageSize:100
            })).then(res => {   
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{  
                        if(result.data.list instanceof Array && result.data.list.length>0){
                            this.bookList = result.data.list;                           
                        }else{
                            this.bookList = [];
                            this.nodeTree = []
                            this.open=false;
                        }
                        
                    }
                }           
                
            }).catch(function (error) {
                alert(error);
            });
        },
        getTextBookList(versionId){
            this.$http.post('/web/coursebook/listTextbook.do',qs.stringify({                
                periodId:this.periodId,
                subjectId:this.subjectId,
                versionId:versionId,
                name:'',
                status:1,
                pageIndex:1,
                pageSize:100
            })).then(res => {   
                if(res.status != 200){
                    this.$Message.error('请求失败请重试');
                }else{
                    let result = res.data;
                    if(result.status != 0){
                        this.$Message.error('请求资源失败，请重试');
                    }else{                          
                        if(result.data.list instanceof Array && result.data.list.length>0){
                            this.textBookList = result.data.list;                           
                        }else{
                            this.textBookList = [];
                            this.nodeTree = []
                            this.open=false;
                        }
                    }
                }           
                
            }).catch(function (error) {
                alert(error);
            });
        },
    }
  }
</script>

<style scoped>
.leftHead{
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
    top:calc(50% - 8px);
    right: 10px;
}
.selDown{
    text-align: left;
    position: absolute;
    top:70px;
    left:0;
    width: 220px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    background-color: #f8f8f8;
    z-index: 10;
    display: none;
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
</style>