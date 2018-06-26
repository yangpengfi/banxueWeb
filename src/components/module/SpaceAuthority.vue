<template>
	<div class="container">
		<div v-if="space" class="contBox">
			<div class="boderImg">
				<img src="../../assets/imgs/space/Accessnoperson.png"/>
			</div>
			<p class="authority">用户空间被禁用或不存在，无法访问！</p>
		</div>
		<div v-else class="contBox">
			<div class="boderImg">
				<img src="../../assets/imgs/space/AccessPermissionsed.png"/>
			</div>
			<p class="authority">空间主人设置了权限，暂无法访问！</p>
		</div>

        <v-foot></v-foot>
	</div>
</template>
<script>
import vFoot from '@/components/common/Footer'; 
export default {
	name:'SpaceAuthority',
	components:{
        vFoot
    },
	data(){
		return {
			space:true,
		}
	},
	created(){
		let status=this.$router.history.current.query.status;
		if(status>1503){
			this.space=false;
		}else{
			this.space=true;
		}
	}
}
</script>
<style scoped>
	.container{
		text-align: center;
	}
	.contBox{
		min-height: 693px;
	}
	.boderImg img{
		width: 300px;
		margin-top: 100px;
		padding: 2px;
	}
	.authority{
		font-size: 14px;
		color: #999;
		margin-top: 60px;
	}
</style>
