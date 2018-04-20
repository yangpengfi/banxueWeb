<template>
  <div>
  	<div class="fliterClass w-1200">
  		<p>
        <Icon type="ios-list-outline" color="#999"></Icon>
  			<span class="font9">分类</span>
  			<!-- <span :class="{active:selPeriod==0}" 
        @click="changePeriod(0)">全部</span> -->
  			<span 
        v-for="item in per2gradeList" 
        :key="item.id"
        @click="changePeriod(item)"
        :class="{active:item.id==selPeriod}">{{item.name}}</span>
  		</p>
      <p>
        <Icon type="ios-paper-outline" color="#999"></Icon>
        <span class="font9">年级/专题</span>
        <span :class="{active:selGrade==0}" 
        @click="changeGrade(0)" 
        v-show="selPeriod!=0">全部</span>
        <span
        v-for="item in gradeList" 
         :key="item.id"
        @click="changeGrade(item)"
        :class="{active:item.id==selGrade}">{{item.name}}</span>
      </p>
  		<p>
        <Icon type="ios-paper-outline" color="#999"></Icon>
  			<span class="font9">学科</span>
  			<span :class="{active:selSubject==0}" 
        @click="changeSubject(0)">全部</span>
        <span 
        v-for="item in subjectList" 
        :key="item.subjectId"
        @click="changeSubject(item)"
        :class="{active:item.subjectId==selSubject}">{{item.subjectName}}</span>
  		</p>
  	</div>
  	<!-- <div class="classList w-1200">
  		<a href="javascript:void(0);" v-for="(item,index) in ClassList" :key="index" @click="goToInfo(item.id)">
        <img :src="item.imgUrl">
        <p>{{ item.name }}</p>
      </a>
      
  	</div> -->
    <div class="classLists w-1200">
      <ClassList :classList="ClassList"></ClassList> 
    </div>
  </div>
</template>


<script>
import global_ from '@/components/Global'; 
import ClassList from '@/components/common/ClassList'; 
  export default {
	  name:'ClassSub',
    components:{
        ClassList
    },
    data () {
        return {
            per2gradeList:global_.per2gradeList,
            selPeriod:0,
            gradeList:[],
            selGrade:0,
            subjectList:[],
            selSubject:0,
            ClassList:[]
        }
    },
    methods:{  
      goToInfo(id){
            this.$router.push('/ClassDatile?courseId='+id);
        },
      changePeriod(item){
        if(item.id==0){
          this.selGrade=13;
        }else{
          this.selGrade=0; 
        }
        this.selPeriod=item.id; 
        this.gradeList=item.gradeList;
        this.getClassesList(this.selPeriod);
        this.getSubjectList(this.selPeriod,this.selGrade);
        
      },  
      changeGrade(item){
        this.selSubject=0; 
        if(item==0){
          this.selGrade=0; 
          this.getSubjectList(this.selPeriod,0);
          this.getClassesList(this.selPeriod,this.selGrade);
          return;
        }
        this.selGrade=item.id; 
        this.getSubjectList(this.selPeriod,item.id);
        this.getClassesList(this.selPeriod,this.selGrade);
      },
      changeSubject(item){
        if(item==0){
          this.selSubject=0;
          this.getClassesList(this.selPeriod,this.selGrade,this.selSubject); 
          return;
        }
        this.selSubject=item.subjectId; 
        this.getClassesList(this.selPeriod,this.selGrade,this.selSubject);
      },
      getSubjectList(pId,gId){
        this.$http.post('/web/coursebook/listSubjectByGrade.do',this.$qs.stringify({
            periodId:pId,
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
      getClassesList(pId,gId,sId){
        let periodId=pId||0;
        let gradeId=gId||0;
        let subjectId=sId||0;
          this.$http.post('/web/course/listCourse.do',this.$qs.stringify({
            periodId:periodId,
            gradeId:gradeId,
            subjectId:subjectId
          }))
          .then((res)=>{
            // console.log(res.data.data.list); 
            if(res.data.status==0){
              this.ClassList=res.data.data.list;
            }else{
              this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },    
    },
    created:function(){
      this.selPeriod=this.$route.query.pId;
      this.selGrade=this.$route.query.gId;
      if(this.selPeriod==0){
        this.gradeList=this.per2gradeList[3].gradeList;
      }else{
        this.gradeList=this.per2gradeList[(this.selPeriod - 1)].gradeList;
      }
      this.getSubjectList(this.selPeriod,this.selGrade);
      this.getClassesList(this.selPeriod,this.selGrade);
    }
  }
</script>

<style scoped>
/**
*筛选项
*/
.fliterClass{
  padding-top: 40px;
  padding-left: 20px;
}
.fliterClass>p{
  line-height: 50px;
  color:#666;
}
.fliterClass>p>span{
  margin-right: 30px;
  padding:5px 10px;
}
.fliterClass .font9{
  color:#999;
  display: inline-block;
  width: 60px;
  margin-left: 30px;
  padding:0;
}
.fliterClass .active{
  background-color: #1ca9f1;
  color:#fff;
}
/**
*列表项
*/
.classLists{
  padding-top: 40px;
  margin-bottom: 80px;
  /*border: 1px solid #e9e9e9;*/
  /*background-color: #fff;*/
  overflow: hidden;
}
.classList{
  padding-top: 40px;
  padding-left: 30px;
  margin-bottom: 80px;
  border: 1px solid #e9e9e9;
  background-color: #fff;
  overflow: hidden;
}
.classList>a{
  display: inline-block;
  margin-right: 30px;
  padding-bottom: 20px;
}
.classList>a>img{
  width: 260px;
  height: 195px;
}
.classList>a>p{
  text-align: center;
  line-height: 50px;
  color: #666;
}
</style>