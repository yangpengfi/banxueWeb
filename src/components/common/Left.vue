<template>
		<div class="left">
			<ul>
				<li v-for="(item,index) in leftList" v-on:click="changeTitle(item)" :class="{active:item.id==nowId}">
					<span></span>
					<router-link :to='item.path'>{{item.title}}</router-link>
				</li>			
			</ul>
		</div>
</template>
<script>
export default {
  	name:'Left',
    data(){
        return {			
			nowId:this.leftList[0].id
        }
    },
    props:{
        leftList:{
            type:Array,
            required:true
        }
    },
	methods:{
		changeTitle(item){  
			this.nowId=item.id; 			
		}
	}     
}
</script>


<style scoped>	
	.left{
		width: 240px;		
		padding: 20px 25px;
		border: 1px solid #e9e9e9;
		background: #FFFFFF;		
	}
	.left ul li{
		position: relative;
		padding-left: 40px;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #e9e9e9;
		color: #666;
		font-size: 16px;
		cursor: pointer;
	}
	.left ul li a{
		width: 100%;
		display: inline-block;
		height: 60px;
		line-height: 60px;
		color: #666;
		font-size: 16px;
	}
	.left ul li>span{
		position: absolute;
		left: 15px;
		top: 21px;
		height: 18px;
		border-left:2px solid #47a2ff;
		display: none;
	}
	.left ul li.active{
		color: #47a2ff;
		box-shadow: 0px 1.5px 0px  #eee;
	}
	.left ul li.active span{
		display: block;	
	}	
	
</style>

