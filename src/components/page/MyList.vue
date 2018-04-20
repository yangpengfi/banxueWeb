<template>
	<div class="content">
		<Left :leftList="linkList"></Left>
		<router-view></router-view>
	</div>
</template>
<script>
import Left from '@/components/common/Left.vue';
export default {
  	name:'MyList',
    components:{
        Left
    },
    data () {
        return {
			linkList:[
				{title:'我关注的人',path:'/MySpace/MyList/',id:'focusLink'},
				{title:'我的粉丝',path:'/MySpace/MyList/FunLink',id:'funLink'},
				{title:'我的班级',path:'/MySpace/MyList/ClassLink',id:'classLink'},
				{title:'我的同事',path:'/MySpace/MyList/MateLink',id:'mateLink'}
			]
        }
    }    
}
</script>

<style scoped>
	.content{
		overflow: hidden;
		width: 1200px;		
		margin: auto;
		padding-top: 30px;
		margin-bottom: 60px;
	}	
</style>

