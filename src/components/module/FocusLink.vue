<template>
    <div class="right" id="link-common">			
			<div class="rightCont">
				<ul>
					<li v-for="item of focusList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>						
						<p @click="goSpaceShow(item)">{{item.userName}}</p>						
						<button class="out" @click="unFollow(item)">取消关注</button>
					</li>					
				</ul>
			</div>
	</div>
</template>
<script>
export default {
    name:'FocusLink',
    data(){
        return {
            focusList:[]
        }
    },
    methods:{
        goSpaceShow(item){
            window.open('#/ShowSpace/?userId='+item.userId);
        },
        getFollowers(){//获取关注列表
            this.$http.post('/web/space/followers.do',this.$qs.stringify({
              pageSize:9,
              userId:this.$storage.getStorage("userInfo").id
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.focusList = result.data.list;
                }else{
                  this.focusList = [];
                }
              }else if(result.status == 9){
                this.login();
                return;
              }else{
                this.$Message.error(result.message);            
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        unFollow(item){//取消关注
            this.$http.post('/web/space/a/unFollow.do',this.$qs.stringify({
              token:this.$storage.getStorage("token"),
              userId:item.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.getFollowers();
                this.$Message.info(result.message);
              }else{
                this.$Message.error(result.message);            
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        }
    },
    created(){
    	this.getFollowers();
    }
}
</script>



