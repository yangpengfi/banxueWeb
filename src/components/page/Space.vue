<template>
  <div>
      <div class="banner">
        <!-- <img src="../../assets/imgs/space/banner.jpg"> -->
        <div class="w-1200">
            <div class="into-space">
                <span>已开通的空间</span>
                <p>{{spaceCount.totalCount}}</p>
                <div>
                    <p>老师 <br><span>{{spaceCount.teacher}}</span></p>
                    <p>学生 <br><span>{{spaceCount.student}}</span></p>
                    <!-- <p>家长 <br><span>{{spaceCount.parent}}</span></p> -->
                </div>
                <button @click="intoSpace">进入我的空间</button> 
            </div>
        </div>
      </div>
      <div id="space" class="w-1200">
        <div>
            <div class="section-box">
                <span class="section-title">优秀教师空间</span>
                <span class="right more" @click="goSpaceMore(1)">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <SpaceList :spaceList="teacherList"></SpaceList> 
        </div>
        <SpaceDynamic :infos="latestNews"></SpaceDynamic> 
        <div class="studentBox">
            <div class="section-box">
                <span class="section-title">优秀学生空间</span>
                <span class="right more" @click="goSpaceMore(2)">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <SpaceList :spaceList="studentList"></SpaceList> 
        </div>
      </div>
      <div class="clear"></div>
  </div>
</template>
<script>
import SpaceList from '@/components/common/SpaceList.vue';
import SpaceDynamic from '@/components/common/SpaceDynamic.vue';
export default {
    name:'Space',
    components:{
        SpaceList,
        SpaceDynamic
    },
    data () {
        return {
            token:this.$storage.getStorage("token"),
            latestNews:[],
            teacherList:[],
            studentList:[],
            spaceCount:{}
        }
    },
    methods:{
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        intoSpace(){
            if(!this.token){
              this.login();
              return;
            }
            this.$router.push('/MySpace/');
        },
        goSpaceMore(val){
            this.$router.push({
              path:'/SpaceMore',
              query:{spaceType:val}
            });
        },
        getSpaceCount(){
            this.$http.post('/web/space/spaceCount.do')
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                this.spaceCount = result.data;         
              }
            } 
            })
             
        },
        getSpaceTeacher(){//获取优秀老师空间
            this.$http.post('web/space/listExcellentTeacherSpace.do',this.$qs.stringify({
              pageSize:9
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.teacherList = result.data.list;
                }else{
                  this.teacherList = [];
                }           
              }
            } 
            })
             
        },
        getSpaceStudent(){//获取优秀学生空间
            this.$http.post('web/space/listExcellentStudentSpace.do',this.$qs.stringify({
              pageSize:9
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.studentList = result.data.list;
                }else{
                  this.studentList = [];
                }           
              }
            } 
            })
             
        },
        getSpaceDynamic(type){//获取最新动态
            this.$http.post('web/space/listAllSpaceDynamic.do',this.$qs.stringify({
              pageSize:11,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.latestNews = result.data.list;
                }else{
                  this.latestNews = [];
                }
              }else{ 
                 this.$Message.error(result.message);          
              }
            } 
            })
             
        },
    },
    created(){
        this.getSpaceCount();
        this.getSpaceTeacher();
        this.getSpaceStudent();
        this.getSpaceDynamic();
    }
}
</script>
<style scoped>
.banner{
  height: 360px;
  text-align: center; 
  background: url("../../assets/imgs/space/banner.png") no-repeat center center; 
}
.banner>div{
    position: relative;
}
.banner>img{
  width: 100%;  
}
.into-space{
    position: absolute;
    right: 0;
    top: 60px;
    width: 330px;
    height: 260px;
    background: url('../../assets/imgs/space/zoneenter.png');
    text-align: center;
    box-sizing: border-box;
    padding-top: 32px;
}
.into-space>span{    
    font-size: 14px;
    line-height: 28px;
    color: #333333;
}
.into-space>p{  
    font-size: 20px;
    letter-spacing: 1px;
    color: #47a2ff;
}
.into-space>div{
    margin-top: 25px;
    margin-bottom: 25px;
    overflow: hidden;
}
.into-space>div>p{
    float: left;
    /*width: 110px;  */
    width: 160px;  
    font-size: 14px;
    line-height: 24px;
    color: #333333;
}
.into-space>div>p>span{
    font-size: 20px;
    color: #1ba4ea;
}
.into-space button{
    width: 160px;
  	height: 40px;
  	background-color: #47a2ff;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}
#space>div{
  position: relative;
	float: left;
	overflow: hidden;
  margin-top: 40px;
  min-height:560px;
}
#space .studentBox{
  position: absolute;
  top:1080px;
}
#space>div#spaceDynamic{
	margin-left: 20px;
  margin-bottom: 60px;
  min-height: 1162px;
}
</style>


