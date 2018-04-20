<template>
    <div id="filter-container">
        <resource-nav></resource-nav> 
		<router-view></router-view>
    </div>
</template>

<script>
import ResourceNav from '@/components/common/ResourceNav.vue';
export default {
  	name:'FilterResource',
    components:{
		ResourceNav
    },
    data () {
        return {
			
        }
	}	
}
</script>

<style scoped>
	#filter-container{
		width: 100%; 
	}	
</style>

