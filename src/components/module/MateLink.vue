<template>
    <div class="right" id="link-common">			
			<div class="rightCont">
				<ul>
					<li v-for="item of matesList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>						
						<p @click="goSpaceShow(item)">{{item.userName}}</p>						
						<button class="out" @click="unFollow(item)" v-show="item.follow">取消关注</button>
						<button class="out" @click="follow(item)" v-show="!item.follow">关注</button>
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
            matesList:[]
        }
    },
    methods:{
        goSpaceShow(item){
            window.open('#/ShowSpace/?userId='+item.userId);
        },
        getMates(){//获取关注列表
            this.$http.post('web/user/a/listMyColleague.do',this.$qs.stringify({
              pageSize:12,
              token:this.$storage.getStorage("token")
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.matesList = result.data.list;
                }else{
                  this.matesList = [];
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
              	this.getMates();
                this.$Message.info(result.message);
              }else{
                this.$Message.error(result.message);            
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
        follow(item){//关注
            this.$http.post('/web/space/a/follow.do',this.$qs.stringify({
              token:this.$storage.getStorage("token"),
              userId:item.userId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getMates();
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
    	this.getMates();
    }
}
</script>



