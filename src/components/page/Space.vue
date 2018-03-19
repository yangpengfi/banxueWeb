<template>
  <div>
      <div class="banner">
      	<img src="../../assets/imgs/space/banner.png">
      </div>
      <div id="space" class="w-1200">
        <div>
            <div class="section-box">
                <span class="section-title">优秀教师空间</span>
                <span class="right more">更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
            </div>
            <SpaceList></SpaceList> 
        </div>
        <SpaceDynamic></SpaceDynamic> 
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

        }
    }
}
</script>
<style scoped>
.banner{
  text-align: center;
}
.banner img{
  width: 100%;
  /*height: 360px;*/
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


