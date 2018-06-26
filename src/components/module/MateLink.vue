<template>
    <div class="right" id="link-common">			
			<div class="rightCont">
				<ul>
					<li v-for="item of matesList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>						
						<p @click="goSpaceShow(item)" :title="item.userName">{{item.userName}}</p>	
            <div v-show="!isHis"> 					
  						<button class="out" @click="unFollow(item)" v-show="item.follow">取消关注</button>
  						<button class="out" @click="follow(item)" v-show="!item.follow">关注</button>
            </div> 
					</li>					
				</ul>
			</div>
      <div class="pageBox">
          <Page :total="totalCount" 
          :current="currPage" 
          :pageSize="pageSize" 
          class="page-box" @on-change="pageChange"></Page> 
      </div>
	</div>
</template>
<script>
export default {
    name:'MateLink',
    data(){
        return {
            matesList:[],
            totalCount:0,
            currPage:1,
            pageSize:12,
            isHis:true
        }
    },
    methods:{
        goSpaceShow(item){
            window.open('#/ShowSpace/?userId='+item.userId);
        },
        getMates(page){//获取关注列表
            this.$http.post('web/user/a/listMyColleague.do',this.$qs.stringify({
              pageSize:12,
              pageIndex:page||1,
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
                  this.totalCount = result.data.totalCount;
                  this.currPage = result.data.currPage;
                  this.pageSize = result.data.pageSize;
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
        },
        pageChange(page){
            this.getMates(page);
        }
    },
    created(){
        let whoSpace=window.location.hash.split('/')[1];
        if(whoSpace=='ShowSpace'){
            this.isHis=true;
        }else{
            this.isHis=false;
        }
    	this.getMates();
    }
}
</script>



