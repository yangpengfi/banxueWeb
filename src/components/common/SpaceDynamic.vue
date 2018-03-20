<template>
  <div id="spaceDynamic">
  	<div class="section-box">
        <span class="section-title">空间动态</span>
    </div> 
    <ul class="dynamic-content">
    	<li v-for="item in infos" class="clear">
            <img src="../../assets/imgs/space/u01.png" alt="人员照片">
            <div>
                <p><b>{{item.name}}</b><span class="right"><Icon type="ios-time-outline"></Icon>{{item.time}}</span></p>
                <p>{{item.point}}</p>
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
  	    infos:[
            {name:'高琴云',point:'发表话题 你有没有开展过设计类的欣赏课实践？',school:'石狮中学',time:'35分钟',imgUrl:'t17.png'},
            {name:'高琴云',point:'上传了4张照片到相册 《花儿》',school:'石狮中学',time:'25分钟',imgUrl:'t17.png'},
            {name:'高琴云',point:'上传了1张照片到相册 《风景》',school:'石狮中学',time:'20分钟',imgUrl:'t17.png'},
            {name:'高琴云',point:'发表了学习成果 学霸de学习感悟28',school:'石狮中学',time:'15分钟',imgUrl:'t17.png'},
            {name:'高琴云',point:'上传了1张照片到相册 《风景》',school:'石狮中学',time:'刚刚',imgUrl:'t17.png'}
      ]
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
	/*margin-top: 20px;*/
	width:195px;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>