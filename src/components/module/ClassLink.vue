<template>
    <div class="right" id="link-common">
        <div class="link-title">
            <Select v-model="selId" filterable style="width:300px;">
                <Option v-for="item in classList" 
                :value="item.classId" 
                :key="item.classId" @click="changeSel(item)">{{item.className}}</Option>
            </Select>
            <div class="right">
                <button type="button" :class="{active:selType==1}" @click="changeType(1)">老师</button>
                <button type="button" :class="{active:selType==2}" @click="changeType(2)">学生</button>
            </div>
        </div>
			
			<div class="rightCont">
				<ul>
					<li v-for="item of classMemeberList">
						<img :src="item.logo" @click="goSpaceShow(item)"/>						
						<p @click="goSpaceShow(item)">{{item.userName}}</p>	
                        <div v-show="!isHis">				
    						<button class="out" @click="unFollow(item)" v-show="item.follow">取消关注</button>
                            <button class="out" @click="follow(item)" v-show="!item.follow">关注</button>
                        </div>  
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
            classMemeberList:[],
            classList:[],
            selId:0,
            selType:1,
            isHis:true
        }
    },
    watch:{
        selId:'changeSel'//监听班级ID变化
    },
    methods:{
        goSpaceShow(item){
          window.open('#/ShowSpace/?userId='+item.userId);
        },
        getClasses(){//获取所在班级
            this.$http.post('web/class/a/listJoinClass.do',this.$qs.stringify({
              token:this.$storage.getStorage("token")
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data instanceof Array && result.data.length>0){
                  this.classList = result.data;
                  this.selId=result.data[0].classId;
                  this.getClassMemeber(this.selId,1);
                }else{
                  this.classList = [];
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
        getClassMemeber(cId,uType){//获取关注列表
            this.$http.post('web/class/a/listClassMemeber.do',this.$qs.stringify({
              token:this.$storage.getStorage("token"),
              classId:cId,
              userType:uType,
              pageSize:12
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.classMemeberList = result.data.list;
                }else{
                  this.classMemeberList = [];
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
        changeSel(){
            this.getClassMemeber(this.selId,this.selType);
        },
        changeType(item){
            this.selType=item;
            this.getClassMemeber(this.selId,this.selType);
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
                this.getClassMemeber(this.selId,this.selType);
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
                this.getClassMemeber(this.selId,this.selType);
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
        let whoSpace=window.location.hash.split('/')[1];
        if(whoSpace=='ShowSpace'){
            this.isHis=true;
        }else{
            this.isHis=false;
        }
        console.log(whoSpace)
        this.getClasses();
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


