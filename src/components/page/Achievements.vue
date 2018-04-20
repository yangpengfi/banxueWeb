<template>
	<div class="article-container">
		<Left :leftList="achList"></Left>
		<router-view></router-view>
	</div>
</template>
<script>
import Left from '@/components/common/Left.vue';
export default {
  	name:'Achievements',
    components:{
        Left
    },
    data () {
        return {
			achList:[
				{title:'全部文章  (32)',path:'/MySpace/Achievements/',id:'allClass'},
				{title:'分类一  (20)',path:'/MySpace/Achievements/ClassifyOne',id:'oneClass'},
				{title:'分类二  (10)',path:'/MySpace/Achievements/ClassifyTwo',id:'twoClass'},
				{title:'分类三  (2)',path:'/MySpace/Achievements/ClassifyThree',id:'threeClass'}
			]			
        }
	}	
}
</script>

<style scoped>	
	.article-container{
		overflow: hidden;
		width: 1200px;
		margin: 30px auto 60px;
		font-size: 14px;
	}	
</style>

