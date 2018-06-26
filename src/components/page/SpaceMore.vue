<template>
  <div>
      <div class="banner">
        <div class="w-1200">
            <div class="into-space">
                <span>已开通的空间</span>
                <p>{{spaceCount.totalCount}}</p>
                <div>
                    <p>老师 <br><span>{{spaceCount.teacher}}</span></p>
                    <p>学生 <br><span>{{spaceCount.student}}</span></p>
                </div>
                <button @click="intoSpace">进入我的空间</button> 
            </div>
        </div>
      </div>
      <div class="w-1200">
        <div class="pageTop">
        	<span :class="{act:actTitle==1}" @click="titleChange(1)">优秀教师空间</span>
        	<span :class="{act:actTitle==2}" @click="titleChange(2)">优秀学生空间</span>
        	<select :class="{ml:actTitle==2}" v-model="provinceId">
        		<option value="">所有省份</option>
        		<option v-for="item in provinceList" :value="item.provinceid">{{ item.provincename }}</option>
        	</select>
        	<select v-model="periodId">
        		<option value="">所有学段</option>
        		<option value="1">高中</option>
        		<option value="2">初中</option>
        		<option value="3">小学</option>
        	</select>
        	<select v-show="actTitle==1" v-model="subjectId">
        		<option value="">所有学科</option>
        		<option v-for="item in subjectList" :value="item.subjectId">{{ item.subjectName}}</option>
        	</select>
        </div>
    	<ul class="space-content">
	        <li v-for="item in spaceList" @click="goSpaceShow(item)">
	            <img :src="item.logo" alt="人员照片">
	            <div>
	                <h1>{{item.userName}}</h1>
	                <span :title="item.subjectName">{{item.subjectName}}</span>
	                <p>{{item.schoolName}}</p>
	            </div>
	        </li>
	    </ul>
	    <div class="pageBox">
	        <Page :total="totalCount" 
	        :current="currPage" 
	        :pageSize="pageSize" 
	        class="page-box" @on-change="pageChange"></Page> 
	    </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'Space',
    data () {
        return {
            token:this.$storage.getStorage("token"),
            spaceList:[],
    	    	provinceList:[],
    	    	subjectList:[],
            actTitle:1,
            spaceCount:{},
            totalCount:0,
            currPage:1,
            pageSize:12,
  	        provinceId:'',
  	        periodId: '',
  	        subjectId: '',
        }
    },
	watch:{
		'provinceId':'flitePro',
		'periodId':'flitePer',
		'subjectId':'fliteSub',
		deep:true
	},
    methods:{
    	flitePro(){
        this.periodId='';
        this.subjectId='';
        this.subjectList=[];
    		if(this.actTitle==1){
				  this.getSpaceTeacher(1,this.provinceId);
    		}else{
    			this.getSpaceStudent(1,this.provinceId);
    		}
    	},
    	flitePer(){
	        this.subjectId='';
	        this.subjectList=[];
	        if(this.actTitle==1){
  				this.getSpaceTeacher(1,this.provinceId,this.periodId);
      		}else{
      			this.getSpaceStudent(1,this.provinceId,this.periodId);
      		}
      		if(this.periodId){
  				  this.getlistSubject(this.periodId);
      		}
    	},
    	fliteSub(){
	        if(this.actTitle==1){
  				  this.getSpaceTeacher(1,this.provinceId,this.periodId,this.subjectId);
      		}
    	},
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
		goSpaceShow(item){
			window.open('#/ShowSpace/?userId='+item.userId);
		},
		titleChange(val){
			this.actTitle=val;
      this.provinceId='';
      this.periodId='';
      this.subjectId='';
			if(val==1){
				this.getSpaceTeacher();
			}else{
				this.getSpaceStudent();
			}
		},
        getSpaceCount(){
            this.$http.post('/web/space/spaceCount.do')
            .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error(result.message);
              }else{ 
                this.spaceCount = result.data;         
              }
            })
             
        },
        /**
        *page:页面索引
        *pCode:省份编码
        *pId:学段ID
        *sId:学科ID
        */
        getSpaceTeacher(page,pCode,pId,sId){//获取优秀老师空间
            this.$http.post('web/space/listExcellentTeacherSpace.do',this.$qs.stringify({
              pageIndex:page||1,
              provinceCode:pCode||'',
              periodId:pId||0,
              subjectId:sId||0,
              pageSize:12
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error(result.message);
              }else{ 
				this.totalCount = result.data.totalCount;
				this.currPage = result.data.currPage;
				this.pageSize = result.data.pageSize;
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.spaceList = result.data.list;
                }else{
                  this.spaceList = [];
                }           
              }
            })
             
        },
        getSpaceStudent(page,pCode,pId){//获取优秀学生空间
            this.$http.post('web/space/listExcellentStudentSpace.do',this.$qs.stringify({
              pageIndex:page||1,
              provinceCode:pCode||'',
              periodId:pId||0,
              pageSize:12
            }))
            .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error(result.message);
              }else{ 
				this.totalCount = result.data.totalCount;
				this.currPage = result.data.currPage;
				this.pageSize = result.data.pageSize;
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.spaceList = result.data.list;
                }else{
                  this.spaceList = [];
                }           
              }
            }) 
        },
    	getlistProvince(){
          this.$http.post('/app/location/listProvince.do')
          .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error(result.message);
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.provinceList=result.data;
                }else{
                  this.provinceList = [];
                }           
              }
          })
           
        },
    	getlistSubject(pId){
          this.$http.post('/web/space/subjects.do',this.$qs.stringify({
              periodId:pId,
            }))
          .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error(result.message);
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.subjectList=result.data;
                }else{
                  this.subjectList = [];
                }           
              }
          })
           
        },
        pageChange(page){
        	if(this.actTitle==1){
        		this.getSpaceTeacher(page);
        	}else{
        		this.getSpaceStudent(page);	
        	}
            
        }
    },
    created(){
        this.getSpaceCount();
        this.getlistProvince();
        if(this.$router.history.current.query.spaceType==1){
        	this.getSpaceTeacher();
        }else{
        	this.getSpaceStudent();
        }
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
/*页面上部*/
.pageTop{
	margin: 95px 0 20px;
	height: 50px;
	border-bottom: 1px solid #dfe4e9;
}
.pageTop>span{
	display: inline-block;
	line-height: 28px;
	font-size: 16px;
	color: #666;
	padding: 10px 30px;
	border-bottom: 1px solid transparent;
	cursor: pointer;
}
.pageTop>span.act{
	color:#1cb0ea;
	border-bottom-color: #1cb0ea;
}
.pageTop>select{
	width: 140px;
	height: 32px;
	border: solid 1px #dfe4e9;
}
.pageTop>select:nth-child(3){
	margin-left: 450px;
}
.ml{
	margin-left: 595px!important;
}
/*空间列表*/
.space-content{
	border:1px solid rgb(233,233,233);
	padding:40px;
    overflow: hidden;
    background-color: #fff;
}
.space-content li{
	width: 270px;
	height: 100px;
	margin-bottom: 60px;
	margin-right: 9px;
	float: left;
}
.space-content li:nth-child(8)~li{
	margin-bottom: 0;
}
.space-content li img{
    float: left;
    width: 100px;
    height: 100px;
    cursor: pointer;
}
.space-content li>div{
    float: left;
    margin-left: 10px;
    font-size: 14px;
    color: #666;
    max-width: 160px;
}
.space-content li>div h1{
	font-size: 16px;
	color: #1cb0ea;
	padding-top: 20px;
  cursor: pointer;
}
.space-content li>div span{
  display: inline-block;
  width: 160px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.space-content li>div p{
	padding-top: 15px;
}
.pageBox{
    text-align: center;
    font-size: 14px;
    padding: 45px 0 85px;
}
</style>


