<template>
  <div>
	<div class="w-1200 surePay">
		<div class="pageTitle">
			<span class="section-title">{{radata.name}}支付</span>
		</div>
		<div>
			<div class="QRcode left">
				<img :src="payInfo.qrCodeUrl">
				<p>请使用{{radata.name}}扫一扫<br/>扫描二维码支付</p>
			</div>
			<img :src="radata.imgName" class="right mr100">
			<div class="clear"></div>
			<p class="payBtnBox">
				<span 
				@click="check(1)" 
				:class="{active:act==1}">已支付</span>
				<span 
				@click="check(2)" 
				:class="{active:act==2}">重新支付</span>
				<span 
				@click="check(3)"  
				:class="{active:act==3}">更换支付方式</span>
			</p>
		</div>
	</div>

	<div class="payMsg" style="visibility:hidden">
		<div class="msgBox">
			<p class="magCont">
				<i class="successIcon"></i>
				<span>恭喜，您已付款成功！</span>
			</p>
			<p class="msgBtn">
				<span @click="check(1)" @hover :class="{active:act==1}">查看我的课程</span>
				<span @click="check(2)" :class="{active:act==2}">查看订单详情</span>
			</p>
			<p class="msgFoot">
				<span>如遇其他支付问题，请联系客服人员。</span>
				<span class="myTel">4006-168-168</span>
			</p>
		</div>
	</div>
  </div>
</template>

<script>
  export default {
    data () {
        return {
            data:[
	            {name:'微信',imgName:require('../../assets/imgs/classes/wx.png'),url:'/app/pay/a/course/weixin.do'},
	            {name:'支付宝',imgName:require('../../assets/imgs/classes/zfb.png'),url:'/app/pay/a/course/zfb.do'}
            ],
            radata:{},
            payInfo:{},
            courseInfo:{},
            act:0,
            token:''
        }
    },
  	methods:{
	    getPayCode(url,token,courseId){
		this.$http.post(url,this.$qs.stringify({
            token:token,
            courseId:courseId,
            payMethod:2
          }))
         .then((res)=>{
            if(res.data.status==0){

         	// console.log(res.data.data)
            	this.payInfo=res.data.data;
            	this.payInfo.qrCodeUrl=res.data.data.qrCodeServer+res.data.data.qrCodeUrl;
            }else{
            	this.$Message.info(res.data.message);
            }
          })
          .catch((err)=>{
            alert(err);
          })
	    },
	  	check(sel){
	  		this.act=sel;
	  		if(sel==1){
  				this.$router.push('/MySpace/MinClasses/BuiedClass')
	  		}else if(sel==2){
				this.getPayCode(this.radata.url,this.token,this.courseInfo.id)
	  		}else if(sel==3){
				this.$router.push('/ClassPay')
	  		}
	  	} 
	  },
  	created(){
  		this.radata=this.data[this.$storage.getSession('payType')];
  		this.courseInfo=this.$storage.getSession("courseInfo");
  		this.token=this.$storage.getStorage("token");
  		this.getPayCode(this.radata.url,this.token,this.courseInfo.id)
  	}
  }
</script>

<style scoped>
.surePay{
	margin-top: 40px;
	margin-bottom: 50px;
	border: 1px solid #e9e9e9;
	background-color: #fff;
	padding: 40px 60px;
}
.pageTitle{
	margin-bottom: 40px;
	padding-bottom: 30px;
	border-bottom: 1px solid #eee;
}
.QRcode{
	width: 300px;
	margin-left: 130px;
}
.QRcode img{
	box-sizing: border-box;
	width: 300px;
	height: 300px;
	padding: 10px;
	border: 1px solid #eee;
}
.QRcode>p{
	line-height: 24px;
	padding: 8px 0 8px 120px;
	color:#fff;
	font-size: 16px;
	background: #fd7476 url('../../assets/imgs/classes/scan.png') no-repeat 50px 8px;
}
.mr100{
	margin-right: 100px;
}
.payMsg{
	position: fixed;
	top:0;
	left: 0;
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,.4);
}
.msgBox{
	width: 720px;
	height: 351px;
	background:url('../../assets/imgs/classes/delog.png');
}
.successIcon{
	display: inline-block;
	width: 58px;
	height: 58px;
	background: url('../../assets/imgs/classes/success.png');
}
.errorIcon{
	display: inline-block;
	width: 58px;
	height: 58px;
	background: url('../../assets/imgs/classes/error.png');
}
.magCont{
	margin-top: 100px;
	margin-left: 155px;
	position: relative;
}
.magCont>span{
	font-size: 26px;
	color:#666;
	position: absolute;
	top:15px;
	left: 85px;
}
.msgBtn{
	margin-top: 40px;
	line-height: 40px;
	margin-left: 155px;
	padding-left: 20px;
}
.payBtnBox{
	text-align: center;
	margin-top: 40px;
}
.msgBtn>span,.payBtnBox>span{
	display: inline-block;
	padding: 12px 30px;
	font-size: 16px;
	color:#666;
	margin-right: 40px;
	cursor: pointer;
	text-align: center;
	border:1px solid #e9e9e9;
}
.msgBtn .active,.myTel,.payBtnBox .active{
	color:#2ba1fc;
}
.msgFoot{
	margin-top: 60px;
	margin-left: 155px;
	padding-left: 10px;
	font-size: 16px;
	color: #999;
}
</style>