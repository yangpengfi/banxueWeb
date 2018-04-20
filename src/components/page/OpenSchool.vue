<template>
  <div>
  	<div class="w-1200 pageContent">
		<p>
			<span>请选择您的学校：</span>
			<Select v-model="provinceId" filterable style="width:200px;margin-right:20px;">
				<Option value="">请选择省份</Option>
                <Option v-for="item in provinceList" :value="item.provinceid" :key="item.provinceid">{{ item.provincename }}</Option>
            </Select>
            {{provinceId}}
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
			<span>学段：</span>
			<Select v-model="period" filterable style="width:240px">
                <Option value="3">小学</Option>
                <Option value="2">初中</Option>
                <Option value="1">高中</Option>
            </Select>
        </p>
		<p>
			<span>学校名称：</span>
			<Input v-model="name" placeholder="请输入学校名称" style="width: 480px"></Input>
        </p>
		<p>
			<router-link to="/CommitPeople" class="myBtn">下一步</router-link>
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
	        period: 3,
	        name: ''
	    }
	},
	witch:{
		'provinceId':'flitePro',
		'cityId':'fliteCity',
		deep:true
	},
    methods:{
    	flitePro(){
    		console.log(this.provinceId)
    		if(this.provinceId){
				this.getlistCity(this.provinceId);
    		}
    	},
    	fliteCity(){
    		if(this.cityId){
				this.getlistArea(this.cityId);
    		}
    	},
    	getlistProvince(){
          this.$http.post('/app/location/listProvince')
          .then((res)=>{
            // console.log(res.data.data); 
            this.provinceList=res.data.data;
          })
          .catch((err)=>{
            alert(err);
          })
        },
    	getlistCity(pId){
          this.$http.post('/app/location/listCity',this.$qs.stringify({
            provinceId:pId
          }))
          .then((res)=>{
            // console.log(res.data.data.list); 
            this.cityList=res.data.data;
          })
          .catch((err)=>{
            alert(err);
          })
        },
    	getlistArea(cId){
          this.$http.post('/app/location/listArea',this.$qs.stringify({
            cityId:cId
          }))
          .then((res)=>{
            // console.log(res.data.data.list); 
            this.cityList=res.data.data;
          })
          .catch((err)=>{
            alert(err);
          })
        },
    },
    created(){
    	this.getlistProvince();
    	/*this.getlistCity();
    	this.getlistArea();*/
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