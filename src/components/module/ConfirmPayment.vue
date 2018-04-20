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
				<a href="javascript:void(0);">
					<img :src="Class.imgUrl">
        			<p>{{ Class.name }}</p>
				</a>
			</div>
			<div class="buyBox">
  				<router-link to="/ClassPay" class="payBtn">立即购买</router-link>
				<span class="price">
	  				<span>￥</span>
	  				<span style="font-size: 36px;color: #ff6464;">{{(Class.money)/100}}</span>
  				</span>
			</div>
		</div>
	</div>	
  </div>
</template>


<script>
  export default {
	data () {
        return {
            Class:{},
        }
    },
    created(){
    	this.Class=this.$storage.getSession("courseInfo");
    	if(this.Class.imgUrl==''){
    		this.Class.imgUrl=require('../../assets/imgs/classes/coursedebgimg.jpg');
    	}
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
.classList>a{
  display: inline-block;
  margin-right: 30px;
  padding-bottom: 20px;
}
.classList>a>img{
  width: 260px;
  height: 195px;
}
.classList>a>p{
  text-align: center;
  line-height: 50px;
  color: #666;
}
.buyBox{
	line-height: 50px;
}
.price{
	position: relative;
	top:15px;
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
}
</style>