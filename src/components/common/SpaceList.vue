<template>
  <div id="spaceList">
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
        spaceList:{
            type:Array,
            required:true
        }
    },
    methods:{
      goSpaceShow(item){
        window.open('#/ShowSpace/?userId='+item.userId);
      }
    }
  }
</script>

<style scoped>
#spaceList{
	width: 880px;
}
#spaceList .section-tab{
	margin-left: 80px;
}
.space-content{
	border:1px solid rgb(233,233,233);
	padding:40px 20px;
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
.space-content li:nth-child(6)~li{
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
</style>