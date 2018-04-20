<template>
    <div class="right" id="link-common">			
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
    name:'MateLink',
    data(){
        return {
            focusList:['帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌','帅帅斌']
        }
    }
}
</script>



