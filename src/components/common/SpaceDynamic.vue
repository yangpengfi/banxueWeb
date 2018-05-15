<template>
  <div id="spaceDynamic">
  	<div class="section-box">
        <span class="section-title">最新动态</span>
    </div> 
    <ul class="dynamic-content">
    	<li v-for="item in infos" class="clear">
            <img :src="item.logo" alt="人员照片">
            <div>
                <p>
                  <b :title="item.userName">{{item.userName}}</b>
                  <span class="right"><Icon type="ios-time-outline"></Icon> {{new Date(item.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
                  <!-- <span class="right"><Icon type="ios-time-outline"></Icon> {{new Date(item.createTime).getMinutes()}}分钟</span> -->
                </p>
                <p>{{item.title}} <span @click="toInfo(item)" :title="item.name">{{item.name}}</span></p>
            </div>
        </li>
    </ul>
  </div>
</template>


<script>
import global_ from '@/components/Global';
  export default {
	name:'spaceDynamic',
  	data () {
  	  return {
        token:this.$storage.getStorage("token"),
  	  }
  	},
    props:{
        infos:{
            type:Array,
            required:true
        }
    } ,
    methods:{
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
      toInfo(item){
          if(!this.token){
            this.login();
            return;
          };
          if(item.type==1){//资源
            this.$router.push({
              path:'/DetailResource',
              query:{
                resourceLocalId:item.fromId          
              }
            }); 
          }else{
            this.$router.push({
                path:'/MySpace/ArticalInfo',
                query:{articleId:item.fromId}
            });
          }
      }
    }
  }
</script>

<style scoped>
.mr10{margin-left: 10px}
.mr15{margin-left: 15px}
#spaceDynamic{
    width: 300px;    
}
.dynamic-content{
	border:1px solid rgb(233,233,233);
    padding:0 20px;
    background-color: #fff;
}
.dynamic-content li{
	padding: 20px 0 19px;
	border-bottom:1px solid rgb(243,243,243);
	overflow: hidden;
}
.dynamic-content li img{
    float: left;
    width: 40px;
    margin-top: 10px;
    border-radius: 50%;
}
.dynamic-content li>div{
    float: left;
    margin-left: 20px;
    font-size: 14px;
    color: #666;
}
.dynamic-content li>div b{
	font-size: 16px;
	/*color: #1cb0ea;*/
  display: inline-block;
  cursor: pointer;
  width: 75px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.dynamic-content li>div p{
	line-height: 30px;
  width:195px;
}
.dynamic-content li>div p span{
	font-size: 12px;
	color: #999;
}
.dynamic-content li>div p:nth-child(2){
	width:195px;
	overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.dynamic-content li>div p:nth-child(2) span{
  font-size: 14px;
  color:#1cb0ea;
  cursor: pointer;
}
</style>