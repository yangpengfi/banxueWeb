<template>
  <div>
  	<div class="w-1200 surePay">
		<div class="content">
			<ul class="stepUl">
				<li>
					<a href="#">
						<span>1</span>
						<span>确认订单</span>
					</a>
				</li>
				<li class="lefts unfinished">
					<a href="#">
						<span>2</span>
						<span>支付</span>
					</a>
				</li>
				<li class="lefts unfinished">
					<a href="#">
						<span>3</span>
						<span>购买成功</span>
					</a>
				</li>
			</ul>
			<span class="section-title">课程特色</span>
			<div class="classList">
				<!-- <a href="javascript:void(0);">
					<img :src="Class.imgUrl">
        			<p>{{ Class.name }}</p>
				</a> -->					
				<div class="classes-img" v-show="Class.imgUrl!=''">
                    <img :src="Class.imgUrl" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price" v-show="Class.imgUrl!=''">
                    <p>{{Class.name}}</p>
                    <span>￥</span>
                    <b>{{(Class.money)/100}}</b>
                </div> 
                <div class="classText" v-show="Class.imgUrl==''">
                    <div class="classHead" 
                    :style="{backgroundColor:bgcolor(),backgroundImage:`url(${setBgImg(Class.subjectId)})`}">
                        <h1>{{Class.name}}</h1>
                        <p class="textMid">
                            <span>{{Class.gradeName+Class.subjectName+Class.versionName}}</span><br>
                            <span>共{{Class.videoNums}}讲</span>
                        </p>
                    </div>
                    <p class="textFoot">
                        <span v-show="Class.isFree==0">￥<b>{{(Class.money)/100}}</b></span>
                        <span v-show="Class.isFree==1" class="free">免费</span>
                    </p>
                </div> 
			</div>
			<div class="buyBox">
  				<router-link to="/ClassPay" class="payBtn">立即购买</router-link>
				<!-- <span class="price">
	  				<span>￥</span>
	  				<span style="font-size: 36px;color: #ff6464;">{{(Class.money)/100}}</span>
  				</span> -->
			</div>
		</div>
	</div>	
  </div>
</template>


<script>
  import global_ from '@/components/Global'; 
  export default {
	data () {
        return {
            Class:{},
            bgcolor:global_.getCoursebgColor,
            setBgImg:global_.setCourseImg
        }
    },
    created(){
    	this.Class=this.$storage.getSession("courseInfo");
    }
  }
</script>

<style scoped>
.surePay{
	margin-top: 40px;
	margin-bottom: 173px;
	border: 1px solid #e9e9e9;
	background-color: #fff;
	padding: 40px 60px;
}
.content .stepUl{
	margin-left: 0;
    margin-bottom: 60px;
}
.classList{
	margin-top: 20px;
	width: 260px;
}
.buyBox{
	line-height: 50px;
}
.payBtn{
	display: inline-block;
	width: 160px;
	height: 50px;
	margin-right:45px;
	text-align: center;
	color:#fff;
	background-color: #ff6464;
	border-radius: 5px;
	margin-top: 50px;
}

.classes-img{
    width: 260px;
    height: 195px;
    position: relative;
}    
.classes-img img{
    width: 100%;        
    height: 100%;        
}
.classes-img p{
    position: absolute;
    top: 0;
    left: 0;        
    width: 100%;        
    height: 100%;
    background-color:rgba(0,0,0,.3);
    display: none;
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
</style>