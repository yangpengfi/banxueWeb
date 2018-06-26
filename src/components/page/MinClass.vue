<template>
	<div class="content">		
		<Left :leftList="classList"></Left>
		<router-view></router-view>
	</div>
</template>
<script>
import Left from '@/components/common/Left.vue';
export default {
  	name:'MinClass',
    components:{
        Left
    },
    data () {
        return {
			classList:[
				{title:'创建课程',path:'/MySpace/MinClasses/',id:'createClass'},
				{title:'已购课程',path:'/MySpace/MinClasses/BuiedClass',id:'BuiedClass'}
			]		
        }
	},
	created(){
		let userType=this.$storage.getStorage('userInfo').type;
		if(userType==2){
			this.classList=[
				{title:'已购课程',path:'/MySpace/MinClasses/BuiedClass',id:'BuiedClass'}
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