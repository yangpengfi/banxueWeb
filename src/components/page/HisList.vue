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
				{title:'他关注的人',path:'/ShowSpace/MyList/',id:'focusLink'},
				{title:'他的粉丝',path:'/ShowSpace/MyList/FunLink',id:'funLink'},
				// {title:'他的班级',path:'/ShowSpace/MyList/ClassLink',id:'classLink'},
				// {title:'他的同事',path:'/ShowSpace/MyList/MateLink',id:'mateLink'}
			],
			userId:0
        }
    },
	created(){
		let userType=this.$storage.getStorage('spaceInfo').userType;
		if(userType==2){
			this.linkList=[
				{title:'他关注的人',path:'/ShowSpace/MyList/',id:'focusLink'},
				{title:'他的粉丝',path:'/ShowSpace/MyList/FunLink',id:'funLink'},
				// {title:'他的班级',path:'/ShowSpace/MyList/ClassLink',id:'classLink'},
			]
		}
        this.userId=this.$router.history.current.query.userId;
        for(let i=0,len=this.linkList.length;i<len;i++){
            this.linkList[i].path=this.linkList[i].path+'?userId='+this.userId
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

