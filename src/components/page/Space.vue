<template>
  <div>
      <div class="banner">
        <!-- <img src="../../assets/imgs/space/banner.png"> -->
        <div class="w-1200">
            <div class="into-space">
                <span></span>
                <p>嘻嘻嘻嘻</p>
                <p>
                    <span>访问量：</span>
                    <b>2346</b>
                </p>
                <button @click=" intoSpace ">进入我的空间</button> 
            </div>
        </div>
      </div>
      <div id="space" class="w-1200">
        <div>
            <div class="section-box">
                <span class="section-title">优秀教师空间</span>
                <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <SpaceList></SpaceList> 
        </div>
        <SpaceDynamic :infos="latestNews"></SpaceDynamic> 
        <div>
            <div class="section-box">
                <span class="section-title">优秀学生空间</span>
                <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <SpaceList></SpaceList> 
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
            latestNews:[]
        }
    },
    methods:{
        intoSpace(){
            this.$router.push('/MySpace');
        },
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
    width: 320px;
    height: 240px;
    background-color: #fff;
    text-align: center;
    padding-top: 20px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.into-space>span{    
	display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background:url("../../assets/imgs/space/banner.png") no-repeat center center;
    margin-bottom: 10px;
}
.into-space>p{    
	font-size: 16px;	
	color: #666;
    margin-bottom: 15px;
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
	float: left;
	overflow: hidden;
  margin-top: 40px
}
#space>div#spaceDynamic{
	margin-left: 20px;
}
</style>


