<template>	
	<div class="right">
		<div class="classCont">
			<ul class="classList" v-if="minClassList.length>0">
				<li v-for="item of minClassList">						
					<div class="classImg">						
						<div>
							{{item.name}}
						</div>
					</div>
					<div class="classTitle">
						<p>{{item.name}}</p>
						<p>{{item.periodName}}&nbsp;&nbsp;{{item.videoNums}}节</p>
						<p>
							价格：￥
							<span v-if="item.money == 0">&nbsp;0.00</span>
							<span v-if="item.money > 0">&nbsp;{{item.money | moneyChange}}</span>
						</p>
					</div>
				</li>
			</ul>						
		</div>	
		<Page :total="totalCount" show-elevator show-total v-if="minClassList.length>0" @on-change="changePage"></Page>			
	</div>		
	
</template>
<script>
import qs from "qs"
export default {
	name:'BuiedClass',
	data(){
	  	return {
		  	minClassList:[],
			params:{				
				pageIndex:1,
				pageSize:10,
				token:this.$storage.getStorage("token")
			},
	  	}
    },
	filters: {
		moneyChange:function(value){
			if (!value){ return ''}
			return (value/100).toFixed(2);
		}
	},
	methods:{
		myClassList(){
			this.$http.post('/web/course/a/listMyOrderCourse.do',qs.stringify({				
				pageIndex:this.params.pageIndex,
				pageSize:this.params.pageSize,
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{	
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.minClassList = result.data.list;
							this.totalCount = result.data.totalCount;

						}else{
							this.minClassList = [];
						}						
					}
				}				
			}).catch(function (error) {
				alert(error);
			});
		},
		changePage(page){
			this.params.pageIndex = page;
			this.myClassList();
		},
	},
	created(){
		this.myClassList();
	} 
}
</script>
<style scoped>
    .right{
		float: left;
        width: 940px;
		min-height: 580px;
		border: 1px solid #e9e9e9;
		margin-left: 20px;
		padding: 20px 50px 50px;
		background: #FFFFFF;
	}
	.classList{
		margin-top: 40px;
		overflow: hidden;
	}
	.classList li{
		float: left;
		width: 50%;
		height: 200px;
	}
	.classImg{
		width: 160px;
		height: 120px;
		float: left;
	}
	.classImg>div{
		background: url('../../assets/imgs/resource/proclassdefault.png') no-repeat center center;
		width: 160px;
		text-align: center;
		height: 120px;
		line-height: 120px;
		font-weight: bold;
		margin-bottom: 8px;
		font-size: 16px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.classImg p{
		text-align: center;
	}
	.classTitle{
		float: left;
		margin-left: 20px;
	}
	.classTitle p:first-child{
		font-size: 16px;
		margin-top: 10px;
		color: #333333;
	}
	.classTitle p:nth-child(2){
		font-size: 14px;
		color: #666;
	}
	.classTitle p:last-child{
		margin-top: 10px;
		font-size: 14px;
		color: #666;
	}
	.classTitle p:last-child span{
		color: #ff5a5a;
		font-size: 20px;
		
	}
	.ivu-page{
		text-align: center;
	}
</style>

