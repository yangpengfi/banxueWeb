<template>
  <div>
  	<div class="w-1200 pageContent">
		<p>
			<span><i style="color:red;">*</i> 请选择您的学校：</span>
			<Select v-model="provinceId" filterable style="width:200px;margin-right:20px;">
				<Option value="">请选择省份</Option>
        <Option v-for="item in provinceList" :value="item.provinceid" :key="item.provinceid">{{ item.provincename }}</Option>
      </Select>
			<Select v-model="cityId" filterable style="width:200px;margin-right:20px;">
				<Option value="">请选择城市</Option>
        <Option v-for="item in cityList" :value="item.cityid" :key="item.value">{{ item.cityname }}</Option>
      </Select>
			<Select v-model="areaId" filterable style="width:200px;margin-right:20px;">
				<Option value="">请选择区</Option>
        <Option v-for="item in areaList" :value="item.areaid" :key="item.value">{{ item.areaname }}</Option>
      </Select>
    </p>
		<p>
			<span><i style="color:red;">*</i> 学段：</span>
			<Select v-model="periodId" filterable style="width:240px">
          <Option value="">请选择学段</Option>
          <Option value="3">小学</Option>
          <Option value="2">初中</Option>
          <Option value="1">高中</Option>
      </Select>
    </p>
		<p>
			<span><i style="color:red;">*</i> 学校名称：</span>
			<Input v-model="name" 
      placeholder="请输入学校名称" 
      style="width: 480px" 
      :maxlength="50" 
      title="长度不超过50"></Input>
    </p>
		<p>
			<a href="javascript:void(0);" @click="goCommitPeople" class="myBtn">下一步</a>
    </p>
  	</div>
  </div>
</template>

<script>
  export default {
  	name:'OpenSchool',
	data () {
	    return {
	    	provinceList:[],
	    	cityList:[],
	    	areaList:[],
        provinceId:'',
        cityId: '',
        areaId: '',
        periodId: '',
        name: ''
	    }
	},
	watch:{
		'provinceId':'flitePro',
		'cityId':'fliteCity',
		deep:true
	},
    methods:{
    	flitePro(){
        this.cityId='';
        this.cityList=[];
        this.areaId='';
    		this.areaList=[];
    		if(this.provinceId){
				  this.getlistCity(this.provinceId);
    		}
    	},
    	fliteCity(){
        this.areaId='';
        this.areaList=[];
    		if(this.cityId){
				  this.getlistArea(this.cityId);
    		}
    	},
    	getlistProvince(){
          this.$http.post('/app/location/listProvince')
          .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.provinceList=result.data;
                }else{
                  this.provinceList = [];
                }           
              }
          })
           
        },
    	getlistCity(pId){
          this.$http.post('/app/location/listCity',this.$qs.stringify({
            provinceId:pId
          }))
          .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.cityList=result.data;
                }else{
                  this.cityList = [];
                }           
              }
          })
           
        },
    	getlistArea(cId){
          this.$http.post('/app/location/listArea',this.$qs.stringify({
            cityId:cId
          }))
          .then((res)=>{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                if(result.data instanceof Array && result.data.length>0){
                  this.areaList=result.data;
                }else{
                  this.areaList = [];
                }           
              }
          })
           
        },
      goCommitPeople(){
            if(!this.provinceId){
                this.$Message.warning({
                    content: '请选择省份！',
                    duration: 2
                });
                return;
            }else if(!this.cityId){
                this.$Message.warning({
                    content: '请选择城市！',
                    duration: 2
                });
                return;
            }else if(!this.periodId){
                this.$Message.warning({
                    content: '请选择学段！',
                    duration: 2
                });
                return;
            }else if(!this.name){
                this.$Message.warning({
                    content: '请输入学校名称！',
                    duration: 2
                });
                return;
            }
            let commitData={
              provinceId:this.provinceId,  
              cityId:this.cityId,  
              areaId:this.areaId,  
              periodId:this.periodId,  
              name:this.name
            }
            // console.log(commitData)
            this.$storage.setSession('commitData',commitData)
            this.$router.push({
                path:'/CommitPeople',
                query:{}
            });
      }
    },
    created(){
    	this.getlistProvince();
    }
  }
</script>

<style scoped>
.pageContent{
	margin-top: 40px;
	margin-bottom: 150px;
	padding:100px 70px 120px 260px; 
	border:1px solid #eee;
	background-color: #fff;
}
.pageContent>p{
	line-height: 40px;
	font-size: 16px;
	margin-bottom: 50px;
}
.pageContent>p>span{
	display: inline-block;
	width: 150px;
	text-align: right;
}
.myBtn{
	display: inline-block;
	width: 160px;
	height: 40px;
	margin-left: 150px;
	text-align: center;
	color:#fff;
	background-color: #0098e0;
	border-radius: 5px;
}
</style>