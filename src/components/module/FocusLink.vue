<template>
    <div class="right" id="link-common">			
			<div class="rightCont">
				<ul>
					<li v-for="item of focusList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>						
						<p @click="goSpaceShow(item)" :title="item.userName">{{item.userName}}</p>	
            <div v-show="!isHis"> 					
						    <button class="out" @click="unFollow(item)">取消关注</button>
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
    name:'FocusLink',
    data(){
        return {
            token:this.$storage.getStorage("token"),
            focusList:[],
            isHis:true,
            totalCount:0,
            currPage:1,
            pageSize:12,
            userId:0
        }
    },
    methods:{
        goSpaceShow(item){
            window.open('#/ShowSpace/?userId='+item.userId);
        },
        getFollowers(page){//获取关注列表
            this.$http.post('/web/space/followers.do',this.$qs.stringify({
              pageSize:12,
              pageIndex:page||1,
              userId:this.userId,
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.focusList = result.data.list;
                  this.totalCount = result.data.totalCount;
                  this.currPage = result.data.currPage;
                  this.pageSize = result.data.pageSize;
                }else{
                  this.focusList = [];
                }
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
                this.getFollowers();
                this.$Message.info(result.message);
              }else{
                this.$Message.error(result.message);            
              }
            } 
            }) 
        },
        pageChange(page){
            this.getFollowers(page);
        }
    },
    created(){
        this.userId=this.$router.history.current.query.userId;
        if(!this.userId){
            this.userId=this.$storage.getStorage("userInfo").id
        }
        let whoSpace=window.location.hash.split('/')[1];
        if(whoSpace=='ShowSpace'){
            this.isHis=true;
        }else{
            this.isHis=false;
        }
    	this.getFollowers();
    }
}
</script>



