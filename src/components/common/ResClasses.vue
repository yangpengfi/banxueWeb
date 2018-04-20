<template>
  <div>      
      <ul class="classes-box">
          <li v-for="item in resClasses">
              <div class="left">
                  <!-- <img :src="item.img" alt="学科标识"> -->
                  <span class="subjectImg" :style="{backgroundColor:item.bgColor}">{{item.subjectName.substr(0,1)}}</span>
                  <span>{{item.recourceLocalName}}</span>
              </div>
              <div class="right">
                  <span>{{item.browseNum}}</span>
                  <!-- <Icon type="ios-cloud-download-outline" size=24></Icon> -->
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name:'ResClasses',
    data(){
        return {
          
        }
    },
    props:{
        resClasses:{
            type:Array,
            required:true
        }
    } 
}
</script>
<style scoped>
    .classes-box{
        padding: 20px 30px;  
        background-color: #fff;       
    }
    .classes-box li{
        overflow: hidden;
        height: 50px;
        line-height: 50px;  
        padding: 0 20px;      
	    font-size: 14px;	
        color: #666;                
    }
    .classes-box .left span{
        padding-left: 16px;   
    }
    .classes-box li img{
        vertical-align: middle;   
    }
    .subjectImg{
      display: inline-block;
      width: 32px;
      height: 30px;
      color: #fff;
      line-height: 30px;
      text-align: center;
      border-radius: 3px;
      /*background-color: red;*/
      padding: 0!important;
    }
    .classes-box li i{
        cursor: pointer; 
        margin-top: 5px;      
    }
    .classes-box .right span{
        color: #999;
        margin-right: 10px;
    }
</style>


