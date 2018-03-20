<template>
  <div id="spaceList">
    <ul class="space-content">
        <li v-for="item in infos">
            <img src="../../assets/imgs/space/t17.png" alt="人员照片">
            <div>
                <h1>{{item.name}}</h1>
                <span>{{item.subject}}</span>
                <p>{{item.school}}</p>
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
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'},
            {name:'高琴云',subject:'数学',school:'石狮第五实验中学',imgUrl:'t17.png'}
      ]
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
}
.space-content li>div{
    float: left;
    margin-left: 10px;
    font-size: 14px;
    color: #666;
}
.space-content li>div h1{
	font-size: 16px;
	color: #1cb0ea;
	padding-top: 20px;
}
.space-content li>div p{
	padding-top: 15px;
}
</style>