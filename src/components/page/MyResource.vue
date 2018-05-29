<template>
    <div class="content">
        <Left :leftList="resourceList"></Left> 
		<router-view></router-view>
    </div>
</template>

<script>
import Left from '@/components/common/Left.vue';

export default {
  	name:'MyResource',
    components:{
		Left
    },
    data () {
        return {
        	userInfo:this.$storage.getStorage('userInfo'),
			resourceList:[
				{title:'我的上传',path:'/MySpace/MyResource/',id:'upload'},
				{title:'我的收藏',path:'/MySpace/MyResource/CollectResource',id:'collect'},				
				{title:'我的下载',path:'/MySpace/MyResource/DownloadResource',id:'download'},
				{title:'推送记录',path:'/MySpace/MyResource/PushResource',id:'push'},
				{title:'更多资源',path:'/Resource',id:'more'}
			]
        }
	},
	created(){
		let userType=this.$storage.getStorage('userInfo').type;
		if(userType==2){
			this.resourceList=[
				{title:'老师推送',path:'/MySpace/MyResource/PushResource',id:'push'},
				{title:'我的收藏',path:'/MySpace/MyResource/CollectResource',id:'collect'},				
				{title:'我的下载',path:'/MySpace/MyResource/DownloadResource',id:'download'},
				{title:'更多资源',path:'/Resource',id:'more'}
			]
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