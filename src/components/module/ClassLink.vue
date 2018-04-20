<template>
    <div class="right" id="link-common">
        <div class="link-title">
            <ul class="left ulList">
				<li><a href="javascript:;" class="active">华侨城中学 高三八班</a></li>
				<li><a href="javascript:;">南山中学 高三五班</a></li>
			</ul>
            <div class="right">
                <button type="button" class="active">老师</button>
                <button type="button">学生</button>
            </div>
        </div>
			
			<div class="rightCont">
				<ul>
					<li v-for="item of focusList">
						<img src="../../assets/imgs/space/headImg.png" />						
						<p>{{item}}</p>						
						<button class="out">取消关注</button>
					</li>					
				</ul>
			</div>
	</div>
</template>
<script>
export default {
    name:'ClassLink',
    data(){
        return {
            focusList:['帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌']
        }
    }
}
</script>
<style scoped> 
    .link-title{
        overflow: hidden;
        height: 50px;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 30px;
    }   	
	.ulList li{
		float: left;
        width: 200px;
        height: 50px;
        text-align: center;
        position: relative;
	}
	.ulList li a{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;        
        font-size: 18px;
        height: 50px;
        line-height: 50px;
		color: #000;
	}
	.ulList li a.active{
        border-bottom:1px solid #47a2ff;
        margin-top: -1px;
        color: #50a7ff;
	}
	.link-title .right button{
        width: 70px;
        height: 32px;
        text-align: center;        
        border-radius: 5px 0px 0px 5px;
        border:1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
        background-color: #fff;
        cursor: pointer;
        float: left;
    }
    .link-title .right button:first-child{        
        border-radius: 5px 0px 0px 5px;        
    }
    .link-title .right button:last-child{        
        border-radius: 0px 5px 5px 0px;        
    }
    .link-title .right button.active{
        background-color: #50a7ff;
        color: #fff;
        border:1px solid #50a7ff;
    }
</style>


