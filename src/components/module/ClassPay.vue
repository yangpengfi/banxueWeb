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
				<li class="lefts">
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
			<span class="section-title">在线支付</span>
			<p class="mb60">
  				<span class="ml20">应付金额：</span>
  				<span>￥</span>
  				<span style="font-size: 36px;color: #ff6464;">{{(courseInfo.money)/100}}</span>
			</p>
			<span class="section-title">支付方式</span>
			<div class="buyBox">
  				<a href="#" class="selPayBtn" @click="goPay(0)"><i class="weChatIcon"></i> 微信支付</a>
  				<a href="#" class="selPayBtn" @click="goPay(1)"><i class="alipayIcon"></i> 支付宝</a>
			</div>
		</div>
	</div>
  </div>
</template>


<script>
  export default {
  	data () {
        return {
            courseInfo:{},
        }
    },
  	methods:{
	    goPay(payType){
			this.$storage.setSession("payType",payType);
	    	this.$router.push("/ClassPaySuccess");
	    } 
	  },
    created(){
    	this.courseInfo=this.$storage.getSession("courseInfo")
    }
  }
</script>

<style scoped>
.weChatIcon{
	display: inline-block;
	vertical-align: middle;
	width: 26px;
	height: 26px;
	background: url('../../assets/imgs/classes/imgsprites.png') no-repeat 0 -20px;
}
.alipayIcon{
	display: inline-block;
	vertical-align: middle;
	width: 26px;
	height: 26px;
	background: url('../../assets/imgs/classes/imgsprites.png') no-repeat -26px -20px;
}
.ml20{
	margin-left: 20px;
}
.mb60{
	margin-bottom: 60px;
}
.surePay{
	margin-top: 40px;
	margin-bottom: 289px;
	border: 1px solid #e9e9e9;
	background-color: #fff;
	padding: 40px 60px;
}
.content .stepUl{
	width: 100%;
	margin-left: 0;
	padding-bottom: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid #eee;
}
.buyBox{
	line-height: 50px;
}
.price{
	position: relative;
	top:15px;
}
.selPayBtn{
	display: inline-block;
	margin-right:60px;
	margin-top: 40px;
	text-align: center;
	width: 160px;
	height: 40px;
	border: solid 1px #50a7ff;
	line-height: 40px;
	font-size: 16px;
	color:#666;
}
</style>