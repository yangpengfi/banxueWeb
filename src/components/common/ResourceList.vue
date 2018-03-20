<template>
  <div>      
      <ul class="classes-box">
          <li v-for="item in resourceList">
              <div class="left">
                  <img :src="item.img" alt="学科标识">
                  <span>{{item.title}}</span>
              </div>
              <div class="right">
                  <span>{{item.date}}</span>
                  <span>{{item.num}}</span>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name:'ResourceList',
    data(){
        return {

        }
    },
    props:{
        resourceList:{
            type:Array,
            required:true
        }
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
        vertical-align: middle;   
    }    
    .classes-box .right span{
        color: #999;
        margin-right: 10px;
    }
</style>


