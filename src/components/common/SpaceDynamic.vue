<template>
  <div id="spaceDynamic">
  	<div class="section-box">
        <span class="section-title">最新动态</span>
    </div> 
    <ul class="dynamic-content">
    	<li v-for="item in infos" class="clear">
            <img :src="item.uploadUserLogo" alt="人员照片">
            <div>
                <p><b>{{item.uploadUserName}}</b><span class="right"><Icon type="ios-time-outline"></Icon> {{new Date(item.createTime).getMinutes()}}分钟</span></p>
                <p>上传了 <span>{{item.recourceLocalName}}</span></p>
            </div>
        </li>
    </ul>
  </div>
</template>


<script>
  export default {
	name:'SpaceList',
  	data () {
  	  return {
  	  }
  	},
    props:{
        infos:{
            type:Array,
            required:true
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
}
.dynamic-content li>div p{
	line-height: 30px
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
}
</style>