<template>
  <div>
  	<div class="pageTop">
  		<div class="w-1200">
  			<div class="videoBox left w-880">
  				<video 
  				:src="videoUrl" 
  				autoplay="autoplay" 
  				poster="../../assets/imgs/classes/coursedebg.png" 
          id="video"></video>
  			</div>
  			<div class="videoList right">
	            <ul class="treeList">
                <li v-for="item in courseTree" 
                v-if="item.children.length!=0" 
                @click="playVideo(item)">
                  <span class="font3">{{item.name}}<Icon type="chevron-down"></Icon></span>
                  <ul>

                    <li v-for="itemSub in item.children" 
                    v-if="itemSub.children.length!=0" 
                    @click="playVideo(itemSub)">
                      <span class="font3">{{itemSub.name}}<Icon type="chevron-down"></Icon></span>
                      <ul>
                        <li v-for="itemSubs in itemSub.children"
                        @click="playVideo(itemSubs)">
                          <span class="font6 pl60">{{itemSubs.name}}</span>
                        </li> 
                      </ul>
                    </li> 

                    <li v-for="itemSub in item.children" 
                    v-if="itemSub.children.length==0" 
                    @click="playVideo(itemSub)">
                      <span class="font6 pl40">{{itemSub.name}}</span>
                    </li> 

                  </ul>
                </li> 
                <li v-for="item in courseTree" 
                v-if="item.children.length==0" 
                @click="playVideo(item)">
                  <span class="font6">{{item.name}}</span>
                </li> 
              </ul>
  			</div>
  			<div class="clear"></div>
  		</div>
  		<div class="infoBox w-1200">
  			<div class="infoLeft left">
  				<h2>{{courseInfo.name}}</h2>
  				<p>
  					<span>{{courseInfo.gradeName+courseInfo.subjectName+courseInfo.versionName}}</span>
  					<span>共{{courseInfo.videoNums}}讲</span>
  				</p>
  			</div>
  			<div class="infoRight right" v-show="courseInfo.isMyCourse==0">
          <span class="price" v-show="courseInfo.isFree==0">
            <span>￥</span>
            <span style="font-size: 36px;color: #ff6464;">{{(courseInfo.money)/100}}</span>
          </span>
  				<span v-show="courseInfo.isFree==1">
	  				<span style="font-size: 16px;">免费</span>
  				</span>
  				<span class="payBtn" @click="goConfirmPayment">加入学习</span>
  			</div>
  			<div class="clear"></div>
  		</div>	
  	</div>
  	<div class="pageBottom w-1200">
  		<div>
  			<div class="left teacher">
  				<img src="../../assets/imgs/space/t20.png">
  			</div>
  			<div class="left teacherInfo">
	  			<h4>{{courseInfo.userName}}</h4>
	  			<p>{{teacherInfo.introduce}}</p>
  			</div>
  			<div class="clear"></div>
  		</div>
  		<div>
  			<span class="section-title">课程简介</span>
  			<p>{{courseInfo.introduction}}</p>
  		</div>
  	</div>
  </div>
</template>


<script>
  export default {
	data () {
        return {
            token:this.$storage.getStorage("token"),
            theme2: 'light',
            courseId: '',
            videoUrl: '',
            teacherInfo: {},
            courseInfo: {},
            courseTree: [],
        }
    },
    methods:{
      login(){
        this.$router.replace({
           name:"Login",
           query: {redirect: this.$router.currentRoute.fullPath}
          })
      },
      goConfirmPayment(){
        if(!this.token){
          this.login();
          return;
        }
        if(this.courseInfo.isFree==0){
          this.$router.push('/ConfirmPayment');
          this.$storage.setSession("courseInfo",this.courseInfo);
        }else if(this.courseInfo.isFree==1){
          this.addMycourse(this.courseInfo.id);
        }
      },
      playVideo(item){
        if(item.hasVideo==1){
          this.getCourseVideo(item.courseId,item.id);
          document.getElementById("video").setAttribute("controls", "controls");
        }else{
          this.$Message.info('此目录无视频资源！');
        }
      },
      addMycourse(courseId){
      this.$http.post('/web/course/a/add2MyCourse.do',this.$qs.stringify({
            token:this.token,
            courseId:courseId
          }))
          .then((res)=>{
            // console.log(res.data); 
            if(res.data.status==0){
              this.$Message.info(res.data.message);
              this.courseInfo.isMyCourse=1;
            }else{
              alert(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
      },
      getTeacherInfo(userId){
      this.$http.post('/web/user/getTeacherDetail.do',this.$qs.stringify({
            token:this.token,
            userId:userId
          }))
          .then((res)=>{
            // console.log(res.data.data); 
            this.teacherInfo=res.data.data;
          })
          .catch((err)=>{
            alert(err);
          })
      },
    	getCourseInfo(courseId){
			this.$http.post('/web/course/getCourse.do',this.$qs.stringify({
            token:this.token,
            courseId:courseId
          }))
          .then((res)=>{
            // console.log(res.data.data); 
            this.courseInfo=res.data.data;
            this.getTeacherInfo(this.courseInfo.userId);
          })
          .catch((err)=>{
            alert(err);
          })
    	},
    	getCourseTree(courseId){
			this.$http.post('/web/course/getCourseCatalogTree.do',this.$qs.stringify({
            token:this.token,
            courseId:courseId
          }))
          .then((res)=>{
            // console.log(res.data.data); 
            this.courseTree=res.data.data.children;
          })
          .catch((err)=>{
            alert(err);
          })
    	},
      getCourseVideo(courseId,catalogId){
        if(!this.token){
          this.login();
          return;
        }
        this.$http.post('/web/course/a/getCourseVideo.do',this.$qs.stringify({
            token:this.token,
            courseId:courseId,
            catalogId:catalogId,
          }))
          .then((res)=>{
            // console.log(res.data.data); 
            if(res.data.status==0){
              this.videoUrl=res.data.data;
            }else{
              alert(res.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
      }
    },
    created(){
    	let courseId=this.$router.history.current.query.courseId;
    	this.getCourseInfo(courseId);
    	this.getCourseTree(courseId);
    }
  }
</script>

<style scoped>
/*
*上页面
*/
.pageTop{
	background-color:#fff; 
}
.videoBox video{
	width: 880px;
	height: 495px;
}
.videoList .treeList{
  box-sizing: border-box;
  padding:20px 0;
	width: 320px;
	height: 495px;
  overflow: auto;
  border: 1px solid #e9e9e9;
}
.videoList .treeList li{
  box-sizing: border-box;
  position: relative;
  line-height: 50px;
  cursor: pointer;
}
.font6{
  display: inline-block;
  width: 100%;
  color:#666;
  padding-left: 20px;
  font-size: 14px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
}
.font3{
  display: inline-block;
  width: 100%;
	color:#333;
  padding-left: 20px;
	font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
}
.pl40{
  padding-left: 40px;
}
.pl60{
  padding-left: 60px;
}
.font3 .ivu-icon-chevron-down{
  position: absolute;
  right: 35px;
  top:20px;
  color:#999; 
}
.treeList::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}
.infoBox{
	padding:15px 0 15px 10px;
}
.infoLeft>p{
	line-height: 50px;
	color:#666;
}
.infoLeft>p>span{
	margin-right: 40px;
}
.infoRight{
	line-height: 50px;
}
.price{
	position: relative;
	top:15px;
}
.payBtn{
	display: inline-block;
	width: 140px;
	height: 50px;
	margin-left: 20px;
	text-align: center;
	color:#fff;
  cursor: pointer;
	background-color: #1caaf1;
	border-radius: 5px;
}
/*
*下页面
*/
.pageBottom{
	margin-top: 20px;
	margin-bottom: 60px;
	padding: 40px;
	padding-bottom: 30px;
	background-color: #fff;
	border: 1px solid #e9e9e9;
}
.pageBottom>div{
	margin-bottom: 30px;
}
.pageBottom p{
	margin-top: 15px;
	color:#666;
	line-height: 24px;
	text-indent: 2em;
}
.teacher{
	box-sizing: border-box;
	width: 100px;
	height: 100px;
	padding: 4px;
	border-radius: 50%; 
	border: 1px solid #f3f3f3;
}
.teacher img{
	width: 90px;
	height: 90px;
	border-radius: 50%; 
}
.teacherInfo{
	width:calc(100% - 130px);
	margin-left:30px;
}
.teacherInfo h4{
	padding-top: 5px;
	font-size: 16px;
	color: #1caaf1;
}
</style>