<template>
    <div class="content">
        <Left :leftList="resourceList"></Left> 
		<router-view></router-view>
    </div>
</template>

<script>
import Left from '@/components/common/Left.vue';

export default {
  	name:'HisResource',
    components:{
		Left
    },
    data () {
        return {
			resourceList:[
				{title:'他的上传',path:'/ShowSpace/MyResource/',id:'upload'},
				{title:'他的收藏',path:'/ShowSpace/MyResource/CollectResource',id:'collect'},				
				{title:'他的下载',path:'/ShowSpace/MyResource/DownloadResource',id:'download'},
				{title:'推送记录',path:'/ShowSpace/MyResource/PushResource',id:'push'}
			],
			userId:0
        }
	},
	created(){
		let userType=this.$storage.getStorage('spaceInfo').userType;
		if(userType==2){
			this.resourceList=[
				{title:'老师推送',path:'/ShowSpace/MyResource/PushResource',id:'push'},
				{title:'他的收藏',path:'/ShowSpace/MyResource/CollectResource',id:'collect'},				
				{title:'他的下载',path:'/ShowSpace/MyResource/DownloadResource',id:'download'},
			]
		}
        this.userId=this.$router.history.current.query.userId;
        for(let i=0,len=this.resourceList.length;i<len;i++){
            this.resourceList[i].path=this.resourceList[i].path+'?userId='+this.userId
        }
	}	
}
</script>

<style scoped>
	.content{
		width: 1200px;		
		padding-top: 30px;
		margin: auto;
		overflow: hidden;
		margin-bottom: 60px;
	}	
</style>