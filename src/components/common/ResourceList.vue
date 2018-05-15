<template>
  <div>      
      <ul class="classes-box">
          <li v-for="item in resourceList">
              <div class="left">
                  <img :src="fileType(item.fileSuffix,1)" alt="学科标识" @click="toDetailResource(item)">
                  <span @click="toDetailResource(item)">{{item.recourceLocalName}}</span>
              </div>
              <!-- <div class="right">
                  <span>{{item.createTime}}</span>
                  <span>{{item.num}}</span>
              </div> -->
          </li>
      </ul>
  </div>
</template>
<script>
import global_ from '@/components/Global'; 
export default {
    name:'ResourceList',
    data(){
        return {
          token:this.$storage.getStorage("token"),
          fileType:global_.setFileType
        }
    },
    props:{
        resourceList:{
            type:Array,
            required:true
        }
    },
    methods:{
        login(){
          this.$router.replace({
             name:"Login",
             query: {redirect: this.$router.currentRoute.fullPath}
            })
        },
        toDetailResource(item){
            if(!this.token){
              this.login();
              return;
            }
            this.$router.push({
              path:'/DetailResource',
              query:{
                resourceLocalId:item.resourceLocalId          
              }
            });   
        },
    }  

}
</script>
<style scoped>
    .classes-box{        
        border: solid 1px #dfe4e9; 
        padding: 30px 20px;  
        background-color: #fff;    
    }
    .classes-box li{
        overflow: hidden;
        height: 50px;
        line-height: 50px;
	    font-size: 14px;	
        color: #666;  
        cursor: pointer;              
    }
    .classes-box .left span{
        padding-left: 16px;   
    }
    .classes-box li img{
      width: 32px;
      vertical-align: middle;   
    }    
    .classes-box .right span{
        color: #999;
        margin-right: 10px;
    }
</style>


