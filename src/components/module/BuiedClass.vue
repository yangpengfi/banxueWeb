<template>	
	<div class="right">
		<div class="classCont">
			<ul class="classList" v-if="minClassList.length>0">
				<li v-for="item of minClassList">						
					<div class="classImg"  @click="goToInfo(item.id)">						
						<div class="classes-img" v-show="item.imgUrl!=''">
		                    <img :src="item.imgUrl" alt="课程图片">
		                    <p></p>

		                        <p class="videoPro" v-if="item.totalProgress==0">未开始</p>
								<p class="videoPro" v-else-if="item.totalProgress==100">已完成</p>
								<p class="videoPro" v-else>已学习{{item.totalProgress}}%</p>
		                </div>                
		                <div class="class-price" v-show="item.imgUrl!=''">
		                    <p>{{item.name}}</p>
		                    <!-- <span>￥</span>
		                    <b>{{(item.money)/100}}</b> -->
		                </div> 
		                <div class="classText" v-show="item.imgUrl==''">
		                    <div class="classHead" 
		                    :style="{backgroundColor:bgcolor(),backgroundImage:`url(${setBgImg(item.subjectId)})`}">
		                        <h1>{{item.name}}</h1>
		                        <p class="textMid">
		                            <span>{{item.gradeName+item.subjectName+item.versionName}}</span><br>
		                            <span>共{{item.videoNums}}讲</span>
		                        </p>
		                        <p class="videoPro" v-if="item.totalProgress==0">未开始</p>
								<p class="videoPro" v-else-if="item.totalProgress==100">已完成</p>
								<p class="videoPro" v-else>已学习{{item.totalProgress}}%</p>
		                    </div>
		                    <p class="textFoot">
		                        <span v-show="item.isFree==0">￥<b>{{(item.money)/100}}</b></span>
		                        <span v-show="item.isFree==1" class="free">免费</span>
		                    </p>
		                </div> 
						
					</div>
					<!-- <div class="classTitle">
						<p  @click="goToInfo(item.id)" style="cursor:pointer">{{item.name}}</p>
						<p>{{item.periodName}}&nbsp;&nbsp;{{item.videoNums}}讲</p>
						<p>
							价格：￥
							<span v-if="item.money == 0">&nbsp;0.00</span>
							<span v-if="item.money > 0">&nbsp;{{item.money | moneyChange}}</span>
						</p>
					</div> -->
				</li>
			</ul>						
		</div>	
		<Page :total="totalCount" show-elevator show-total v-if="minClassList.length>0" @on-change="changePage"></Page>			
	</div>		
	
</template>
<script>
import qs from "qs";
import global_ from '@/components/Global'; 
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
            bgcolor:global_.getCoursebgColor,
            setBgImg:global_.setCourseImg
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
			}) 
		},
		changePage(page){
			this.params.pageIndex = page;
			this.myClassList();
		},
		goToInfo(id){
            this.$router.push('/ClassDatile?courseId='+id);
        }
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
		padding: 20px 25px 50px 55px;
		background: #FFFFFF;
	}
	.classList{
		margin-top: 40px;
		overflow: hidden;
	}
	.classList li{
		float: left;
		width: 260px;
        margin-bottom: 30px; 
        margin-right: 25px; 
	}
	.classImg{
		position: relative;
		cursor: pointer;
	}
	.classImg p{
		text-align: center;
	}
	.classes-img{
        width: 260px;
        height: 195px;
        position: relative;
        overflow: hidden;
    }    
    .classes-img img{
        width: 100%;        
	    height: 100%;        
    }
	.classImg .videoPro{
		position: absolute;    
		width: 120px;
		line-height: 30px;
		background-color: #FFCC00;
		color: #333;
		transform:rotate(45deg);
		top: 15px;
    	right: -30px;
	}
    .class-price{        
        text-align: center;
        width: 260px;
        height: 70px;
        box-shadow: 0px 5px 7px 0px rgba(70,130,147,.2);
    }
    .class-price p{   
        padding-top: 15px;     
        font-size: 16px;        
        color: #666;
    }
    .class-price span{           
        font-size:14px;        
        color: #666;
    }
    .class-price b,.classText b,.free{           
        font-size:20px;        
        color: #ff4242;
    }  
    .classText{
        width: 260px;
        height: 265px;
        background-color: #fff;
        text-align: center;
        box-sizing: border-box;
        box-shadow: 0px 0px 1px 0px rgba(70,130,147,.2); 
    }  
    .classHead{
    	position: relative;
        overflow: hidden;
        padding-top:55px;
        padding-bottom: 50px;

    }
    .classHead h1{
        font-size: 20px;
        color:#fff;
    }
    .textMid{
        font-size: 14px;
        color:#fff;
        line-height: 20px;
        margin-top: 15px;
    }
    .textMid>span:first-child{
        display: inline-block;
        max-width: 240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .textFoot{
        border-top: 2px dashed #e9e9e9;
        width: 260px;
        height: 70px;
        line-height: 70px;
        box-sizing: border-box; 
        box-shadow: 0px 5px 7px 0px rgba(70,130,147,.2);
    }
	.ivu-page{
		text-align: center;
	}
</style>

